import { BasicRequest } from './basic.request';

export interface TokenRequest extends BasicRequest{

    client_id: string;
    scope: string;
    certificatePfxFullPath: string;
    certificatePassword: string;
}