export interface BasicRequest {

    client_id: string;
    certificatePfxFullPath: string;
    certificatePassword: string;
    bank: 'SICOOB' | 'BRADESCO';
    client_secret: string;
}