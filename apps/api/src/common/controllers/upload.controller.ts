import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import { BasicResult } from "src/shared/vo/basic-result.vo";

@Controller("upload")
export class UploadController {
  constructor() {}
  @Post()
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, callback) => {
          const filename = uuidv4() + path.extname(file.originalname);
          callback(null, filename);
        },
      }),
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    return BasicResult.success("图片上传成功", {
      ...file,
      url: `/uploads/${file.filename}`,
    });
  }
}
