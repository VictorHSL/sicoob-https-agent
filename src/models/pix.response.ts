export class PixResponse {

    public txid: string;
    public value: string;
    public date: Date;
    public endToEndId: string;

    private createFromSicoob(res: any) {
        this.txid = res.txid ?? this.endToEndId;
        this.value = res.valor;
        this.date = res.horario;
        this.endToEndId = res.endToEndId ?? res.txid;
    }

    private createFromBradesco(res: any) {
        this.txid = res.txid ?? this.endToEndId;
        this.value = res.valor?.original ?? res.valor;
        this.date = res.horario;
        this.endToEndId = res.location ?? res.txid;
    }

    create(res: any, bank: string){
        switch(bank){
            case 'SICOOB':
                this.createFromSicoob(res);
                break;
            case 'BRADESCO':
                this.createFromBradesco(res);
                break;
            default:
                throw 'BANK ' + bank + ' NOT FOUND.';
        }
    }
}