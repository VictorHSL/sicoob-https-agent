import { PixResponse } from './pix.response';
export class SearchPaymentsResponse {

    public pix: PixResponse[];

    public parameters: {
        start: Date;
        end: Date;
        cpf: string;
        cnpj: string;
        pagination: {
            currentPage: number;
            itensPerPage: number;
            totalItens: number;
            pageCount: number;
        }
    };

    createResponseFrompix(res: any) {
        this.pix = res?.pix?.map(x => {
            const response = new PixResponse();
            response.createFromSicoob(x);
            return response;
        });

        this.parameters = {
            start: res?.parametros?.inicio,
            end: res?.parametros?.fim,
            cnpj: res?.parametros?.cnpj,
            cpf: res?.parametros?.cpf,
            pagination: {
                currentPage: res?.parametros?.paginacao?.paginaAtual,
                itensPerPage: res?.parametros?.paginacao?.itensPorPagina,
                totalItens: res?.parametros?.paginacao?.quantidadeTotalDeItens,
                pageCount: res?.parametros?.paginacao?.quantidadeDePaginas
            }
        };
    }
}