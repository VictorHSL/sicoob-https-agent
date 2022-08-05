import { BasicRequest } from './basic.request';

export interface TokenRequest extends BasicRequest{

    client_id: string;
    certificatePfxFullPath: string;
    certificatePassword: string;
}