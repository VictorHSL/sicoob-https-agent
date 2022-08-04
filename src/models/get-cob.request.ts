import { BasicRequest } from './basic.request';

export interface GetCobRequest extends BasicRequest {
    txid: string;
}