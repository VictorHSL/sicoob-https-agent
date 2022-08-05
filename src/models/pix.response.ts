export class PixResponse {

    public txid: string;
    public value: string;
    public date: Date;
    public endToEndId: string;

    createFromSicoob(res: any) {
        this.txid = res.txid;
        this.value = res.valor;
        this.date = res.horario;
        this.endToEndId = res.endToEndId;
    }
}