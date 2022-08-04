import { BasicRequest } from './basic.request';

export interface CreateCobRequest extends BasicRequest {

    cpf: string;
    cnpj: string;
    value: string;
    pixKey: string;
}