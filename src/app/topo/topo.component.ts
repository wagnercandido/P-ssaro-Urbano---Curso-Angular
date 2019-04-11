import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/ofertas.model';

import '../util/rxjs-extensions'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  ofertas: Observable<Oferta[]>
  subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa //Retorno de ofertas[]
      .debounceTime(1000)   //Executa o switchMap após 1 segundo
      .distinctUntilChanged()   //Não executa o switchMap caso seja feita a mesma pesquisa, só faz pesquisas distintas
      .switchMap((termoPassadoPesquisa: string) => {
        console.log('Requisição API');

        if(termoPassadoPesquisa.trim() === '') {
          // Retornar um Observável vazio aso apague ou digite espaços...
          return Observable.of<Oferta[]>([])
        }
        return this.ofertasService.pesquisaOfertas(termoPassadoPesquisa)
      })

      .catch((err: any) => {
        // Caso haja algum erro no switchmap será exibido aqui
        console.log('Erro do Catch: ', err);
        return Observable.of<Oferta[]>([])
      })

  }

  pesquisar(termoDaPesquisa: string) {
    console.log('caracter: ',termoDaPesquisa );
    this.subjectPesquisa.next(termoDaPesquisa)


    /* 
    //Código antigo para teste
      this.ofertas = this.ofertasService.pesquisaOfertas(termoDaPesquisa)
      this.ofertas.subscribe(
        (oferta: Oferta[]) => console.log(oferta),
        (error: any) => console.log('Erro status: ',error.status),
        () => console.log('Fluxo de evendos completo')
      )
    */

  }

  limparPesquisa() {
    this.subjectPesquisa.next('');
  }

}
