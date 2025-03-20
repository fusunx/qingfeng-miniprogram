import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Request,
  Body,
} from "@nestjs/common";
import { Public } from "src/shared/decorators/public.decorator";
import { LocalAuthGuard } from "src/shared/guards/auth-guard.guard";
import { AuthService } from "src/shared/services/auth.service";
import { UtilityService } from "src/shared/services/utility.service";
import { BasicResult } from "src/shared/vo/basic-result.vo";

@Controller("")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly utilityService: UtilityService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  @HttpCode(200)
  async login(@Request() req) {
    const result = await this.authService.createTokens(req.user);
    return BasicResult.success("登录成功", result);
  }

  @Post("/logout")
  @HttpCode(200)
  async logout(@Request() req) {
    const logoutFn = req.logout;
    if (logoutFn && typeof logoutFn === "function") {
      await logoutFn();
      return BasicResult.success("登出成功");
    } else {
      throw new BadRequestException("用户未登录");
    }
  }

  @Public()
  @Post("/refresh")
  @HttpCode(200)
  async refresh(@Body() body) {
    const { refreshToken } = body;
    try {
      const result = await this.authService.refreshToken(refreshToken);
      return BasicResult.success("刷新成功成功", result);
    } catch (error) {
      throw new BadRequestException("刷新token无效或过期", error);
    }
  }
}
