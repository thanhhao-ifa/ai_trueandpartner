import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AiService } from './gemini.service';

@Controller('ask')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  async askQuestion(@Body('message') message: string) {
    if (!message || message.trim() === '') {
      throw new HttpException('Message is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.aiService.askQuestion(message);
      return result;
    } catch (error) {
      throw new HttpException(
        'Lỗi trong quá trình xử lý yêu cầu với AI.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
