export class TokenResponse {

    public access_token: string;
    public expires_in: number;
    public created: Date;
    public expireDate: Date;

    createResponseFromSicoob(res: any) {
        this.access_token = res.access_token;
        this.expires_in = res.expires_in;
        this.created = new Date();
        this.expireDate = new Date();
        this.expireDate.setSeconds(this.expireDate.getSeconds() + this.expires_in);
    }

    isExpired(){
        return this.expireDate < new Date();
    }
}