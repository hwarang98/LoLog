import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// 로깅 미들웨어
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    // 리스폰스가 완료됐을때 로깅 출력
    res.on('finish', () => {
      this.logger.log(`${req.ip} ${req.method} ${res.statusCode}`, req.originalUrl);
    });
    next();
  }
}
