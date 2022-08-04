export class TokenResponse {

    public access_token: string;
    public expires_in: number;
    public created: Date;

    createResponseFromSicoob(res: any) {
        this.access_token = res.access_token;
        this.expires_in = res.expires_in;
        this.created = new Date();
    }

    isExpired(){
        const expireDate = this.created;
        expireDate.setSeconds(expireDate.getSeconds() + this.expires_in);

        return expireDate < new Date();
    }
}