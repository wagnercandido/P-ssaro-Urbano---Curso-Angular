import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pedido } from './shared/pedido.model';
import { Observable } from 'rxjs';
import { URL_API } from './app.api';

import { Response } from 'selenium-webdriver/http';
import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators'


@Injectable() //Para poder injetar e usar o Http
export class OrdemCompraService {

    constructor(private http: HttpClient) { }

    public efetivarCompra(pedido: Pedido): Observable<any> {

        let headers: HttpHeaders = new HttpHeaders()

        headers.append('Content-type', 'applicartion.json')

        return this.http.post(
            `${URL_API}/pedidos`,
            (pedido),
            ({ headers: headers })
        )
        .map((resposta: Response) => resposta )
    }
}