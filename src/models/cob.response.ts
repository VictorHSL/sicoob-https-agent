import { PixResponse } from "./pix.response";

export class CobResponse {
    public status: string;
    public txid: string;
    public brcode: string;
    public value: string;
    public cpf: string;
    public cnpj: string;
    public pix: PixResponse[];

    private createResponseFromSicoob(res: any) {
        this.brcode = res.brcode;
        this.txid = res.txid;
        this.cnpj = res.devedor.cnpj;
        this.cpf = res.devedor.cpf;
        this.status = res.status;
        this.value = res.valor.original;

        this.pix = res.pix?.map(x => {
            const pix = new PixResponse();
            pix.create(x, 'SICOOB');
            return pix;
        })
    }

    private createResponseFromBradesco(res: any) {
        this.brcode = res.brcode;
        this.txid = res.txid;
        this.cnpj = res.devedor.cnpj;
        this.cpf = res.devedor.cpf;
        this.status = res.status;
        this.value = res.valor.original;

        this.pix = [];
        var pix = new PixResponse();
        pix.create(res, 'BRADESCO');
        this.pix.push(pix);
    }

    createResponse(res: any, bank: string){
        switch(bank){
            case 'SICOOB':
                this.createResponseFromSicoob(res);
                break;
            case 'BRADESCO':
                this.createResponseFromBradesco(res);
                break;
            default:
                throw 'BANK ' + bank + ' NOT FOUND.';
        }
    }
}