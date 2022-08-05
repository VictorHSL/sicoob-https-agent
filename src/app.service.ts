import { SearchPaymentsResponse } from './models/search-payments.response';
import { GetCobRequest } from './models/get-cob.request';
import { CobResponse } from './models/cob.response';
import { BasicRequest } from './models/basic.request';
import { CreateCobRequest } from './models/create-cob.request';
import { TokenResponse } from './models/token.response';
import {
  Injectable, Logger
} from '@nestjs/common';
import * as qs from 'qs';
import * as https from'https';
import * as fs from 'fs';
import { TokenRequest } from './models/token.request';
import { HttpService } from '@nestjs/axios';
import { SearchPaymentsRequest } from './models/search-payments.request';

@Injectable()
export class AppService {

  private logger: Logger = new Logger("Sicoob");
  private token: TokenResponse;

  constructor(private readonly httpService: HttpService){
    
  }

  private async checkToken(request: BasicRequest) {

    if(!this.token || this.token.isExpired()) {
      const response = await this.getToken(request);
      this.token = response;
    }
  }

  private createHttpsAgent(request: BasicRequest){
    return new https.Agent({
      pfx: fs.readFileSync(request.certificatePfxFullPath),
      passphrase: request.certificatePassword,
      rejectUnauthorized: false
    });
  }

  private async handleError(promise: Promise<any>) {

    let response = undefined;
    let error = false;
    let errorMessage = "";

    await promise.then(
      res => response = res.data
    )
    .catch(e => {
        this.logger.error(e);
        if(e?.response?.data?.detail){
          this.logger.error(e.response.data.detail);
        }
        errorMessage = e.message;
        error = true;
    });

    if(error){
      throw "Houve um erro ao gerar a cobrança. " + errorMessage;
    }

    return response;
  }

  private addAuthHeaders(headers: any, request: BasicRequest) {
    headers.client_id = request.client_id;
    headers.Authorization = 'Bearer ' + this.token.access_token;
  }

  async getToken(request: TokenRequest): Promise<TokenResponse> {

    const data = qs.stringify({
      'grant_type': 'client_credentials',
      'client_id': request.client_id,
      'scope': request.scope 
    });

    const httpsAgent = this.createHttpsAgent(request);

    const config = {
      method: 'post',
      url: 'https://auth.sicoob.com.br/auth/realms/cooperado/protocol/openid-connect/token',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data,
      httpsAgent
    };

    const response = new TokenResponse();
    const res = await this.handleError(this.httpService.axiosRef(config));

    response.createResponseFromSicoob(res);

    return response;
  }

  async createCob(request: CreateCobRequest) {

    await this.checkToken(request);

    const data = {
      "calendario": {
        "expiracao": 3600
      },
      "devedor": {
        
      },
      "valor": {
        "original": request.value
      },
      "chave": request.pixKey
    }

    if(request.cpf){
      data.devedor = {
        "cpf": request.cpf,
        "nome": request.cpf
      }
    } else if(request.cnpj){
      data.devedor = {
        "cnpj": request.cnpj,
        "nome": request.cnpj
      }
    }

    const httpsAgent = this.createHttpsAgent(request);

    const config = {
      method: 'post',
      url: 'https://api.sicoob.com.br/pix/api/v2/cob',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(data),
      httpsAgent
    };

    this.addAuthHeaders(config.headers, request);

    const res = await this.handleError(this.httpService.axiosRef(config));

    const response = new CobResponse();
    response.createResponseFromSicoob(res);

    return response;
  }

  async getCob(request: GetCobRequest) {
    await this.checkToken(request);

    const httpsAgent = this.createHttpsAgent(request);

    const config = {
      method: 'get',
      url: 'https://api.sicoob.com.br/pix/api/v2/cob/' + request.txid,
      headers: { 
      },
      httpsAgent
    };

    this.addAuthHeaders(config.headers, request);

    const response = new CobResponse();
    const res = await this.handleError(this.httpService.axiosRef(config));

    response.createResponseFromSicoob(res);

    return response;

  }

  async searchPayments(request: SearchPaymentsRequest) {
    await this.checkToken(request);
    const httpsAgent = this.createHttpsAgent(request);

    const encodedStartDate = encodeURIComponent(new Date(request.start).toISOString());
    const encodedEndDate = encodeURIComponent(new Date(request.end).toISOString());

    let url = `https://api.sicoob.com.br/pix/api/v2/pix?inicio=${encodedStartDate}&fim=${encodedEndDate}&paginacao.paginaAtual=${request.page}&paginacao.itensPorPagina=${request.itensPerPage}&`;

    if(request.cpf){
      url = url + `cpf=${request.cpf}`;
    }else if (request.cnpj){
      url = url + `cnpj=${request.cnpj}`;
    }

    const config = {
      method: 'get',
      url,
      headers: { 
      },
      httpsAgent
    };

    this.addAuthHeaders(config.headers, request);

    const response = new SearchPaymentsResponse();
    const res = await this.handleError(this.httpService.axiosRef(config));

    response.createResponseFrompix(res);

    return response;
  }

}