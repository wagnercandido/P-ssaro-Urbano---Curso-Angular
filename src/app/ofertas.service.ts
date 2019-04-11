import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oferta } from './shared/ofertas.model';
import { Observable } from 'rxjs';
import { URL_API } from './app.api'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'

@Injectable()
export class OfertasService {

    constructor(private http: HttpClient) { }

    getOfertas(): Promise<Oferta[]> {
        // Efetuar requisição http
        return this.http.get<Oferta[]>(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: any) => { return resposta } )
        // Retornar um Promise<Oferta[]>
    }

    getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: any) => resposta )
    }

    getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: any) => {
                return resposta[0]
            })
    }

    getComoUsarOfertaPorID(id: number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: any) => {
                return resposta[0].descricao;
            })
    }

    getOndeFicaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: any) => {
                return resposta[0].descricao
            })
    }

    pesquisaOfertas(text: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${text}`)
            .retry(10)
            .map((resposta: any) => resposta)
    }

    // Código antigo
    // getOfertas2(): Promise<Array<Oferta>> {
    //     return new Promise((resolve, reject) => {
    //         // Será incluso a lógica o resolve ou o reject baseado na Api
    //         let deu_certo = true;
    //         if (deu_certo) {
    //             setTimeout(() => resolve( this.ofertas ), 3000)

    //         } else {
    //             reject({codido_erro: 404, mensagem_erro: "Servidor não encontrado"})

    //         }
    //     })
    //     .then(( ofertas: Array<Oferta> ) => {
    //         // Trata o objeto retornado, nesse caso a oferta
    //         console.log('Primeiro then');
    //         return ofertas
    //     })
    // }
}