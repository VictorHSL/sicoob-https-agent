export class PixResponse {

    public txid: string;
    public value: string;
    public date: Date;
    public endToEndId: string;

    private createFromSicoob(res: any) {
        this.txid = res.txid;
        this.value = res.valor;
        this.date = res.horario;
        this.endToEndId = res.endToEndId;
    }

    private createFromBradesco(res: any) {
        this.txid = res.txid;
        this.value = res.valor;
        this.date = res.horario;
        this.endToEndId = res.location;
    }

    create(res: any, bank: string){
        switch(bank){
            case 'SICOOB':
                this.createFromSicoob(res);
            case 'BRADESCO':
                this.createFromBradesco(res);
            default:
                throw 'BANK ' + bank + ' NOT FOUND.';
        }
    }
}