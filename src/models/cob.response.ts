import { PixResponse } from "./pix.response";

export class CobResponse {
    public status: string;
    public txid: string;
    public brcode: string;
    public value: string;
    public cpf: string;
    public cnpj: string;
    public pix: PixResponse[];

    createResponseFromSicoob(res: any) {
        this.brcode = res.brcode;
        this.txid = res.txid;
        this.cnpj = res.devedor.cnpj;
        this.cpf = res.devedor.cpf;
        this.status = res.status;
        this.value = res.valor.original;
        
        this.pix = res.pix?.map(x => {
            const pix = new PixResponse();
            pix.createFromSicoob(x);
            return pix;
        })
    }
}