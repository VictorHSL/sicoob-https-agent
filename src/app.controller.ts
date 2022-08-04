import { GetCobRequest } from './models/get-cob.request';
import { CreateCobRequest } from './models/create-cob.request';
import { TokenRequest } from './models/token.request';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Post('getCob')
  async getCob(@Body() request: GetCobRequest, @Res() res: Response) {
    try{
      const response = await this.appService.getCob(request);
      res.status(HttpStatus.OK).json(response);
    }
    catch(ex) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: ex });
    }
  }

  @Post("token")
  async getToken(@Body() request: TokenRequest, @Res() res: Response) {
    try{
      const response = await this.appService.getToken(request);
      res.status(HttpStatus.OK).json(response);
    }
    catch(ex) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: ex });
    }
  }

  @Post("cob")
  async createCob(@Body() request: CreateCobRequest, @Res() res: Response) {
    try{
      const response = await this.appService.createCob(request);
      res.status(HttpStatus.OK).json(response);
    }
    catch(ex) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: ex });
    }
  }
}
