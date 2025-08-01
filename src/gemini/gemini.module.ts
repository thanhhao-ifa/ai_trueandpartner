import { Module } from '@nestjs/common';
import { AiController } from './gemini.controller';
import { AiService } from './gemini.service';

@Module({
  controllers: [AiController],
  providers: [AiService],
})
export class GeminiModule {}
