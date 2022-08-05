import { BasicRequest } from './basic.request';
export interface SearchPaymentsRequest extends BasicRequest {

    start: Date;
    end: Date;
    cpf: string;
    cnpj: string;
    page: number;
    itensPerPage: number;
}