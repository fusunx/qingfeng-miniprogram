import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { LoginDto } from "../dtos/user.dto";
import { JwtService } from "@nestjs/jwt";
import { UtilityService } from "./utility.service";
import { ConfigurationService } from "./configuration.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly utilityService: UtilityService,
    private readonly configurationService: ConfigurationService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    return this.validate(username, pass, this.userService);
  }

  async validate(
    username: string,
    pass: string,
    userService: UserService,
  ): Promise<any> {
    const user = await userService.findOne({ where: { username } });
    if (user) {
      if (await this.utilityService.comparePassword(pass, user.password)) {
        delete user.password;
        return user;
      } else {
        throw new BadRequestException("密码错误");
      }
    }
    return null;
  }

  async createTokens(user: LoginDto) {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: this.configurationService.jwtExpirationTime,
        secret: this.configurationService.jwtSecret,
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: "7d",
        secret: this.configurationService.jwtSecret,
      }),
      username: user.username,
    };
  }

  async editPassword(user: LoginDto, password: string, newPassword: string) {
    const userInfo = await this.userService.findOne({
      where: { username: user.username },
    });
    if (userInfo) {
      if (
        await this.utilityService.comparePassword(password, userInfo.password)
      ) {
        userInfo.password = await this.utilityService.hashPassword(newPassword);
        await this.userService.save(userInfo);
        return true;
      } else {
        throw new BadRequestException("密码错误");
      }
    } else {
      throw new BadRequestException("用户不存在");
    }
  }

  async refreshToken(token: string) {
    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: this.configurationService.jwtSecret,
      });
      return await this.createTokens(user);
    } catch (error) {
      throw error;
    }
  }
}
