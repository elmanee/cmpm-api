import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UtilService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async checkPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async generarJWT(payload: any): Promise<string> {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: '60s' });
  }

  getPayload(token: string): any {
    const jwt = require('jsonwebtoken');
    return jwt.verify(token, process.env.JWT_SECRET_KEY!);
  }
}