import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/ofertas.model';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit {

  oferta: Oferta

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
    ) { }

  ngOnInit() {

    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService.getOfertaPorId(parametros.id)
        .then(( oferta: Oferta) => {
          this.oferta = oferta;
        })
    })
      
  }

  adicionarItemCarrinho(oferta: Oferta) {
    this.carrinhoService.incluirItens(oferta)
    console.log('Carrinho',this.carrinhoService.exibirItens());
  }
  
}

  // this.route.params.subscribe((parametro: any) => {
  //   console.log(parametro.id);
  // })

  // this.route.params.subscribe( 
  //   (parametro: any) => { console.log('parametro ', parametro) }, //Instrução
  //   (erro: any) => { console.log('erro ', erro) }, //Erro
  //   () => console.log('Processamento foi concluído') //Sucesso
  // )

  // Observale
  // let tempo = Observable.interval(500);

  // tempo.subscribe((intervalo: number) => {
  //   console.log(intervalo);
  // })

  // Observable (observável)
  // let meuObservableTeste = Observable.create((observer: Observer<string>) => {
  //   observer.next('Primeiro evento')
  //   observer.next('Segundo evento')
  //   observer.complete()
  //   observer.next('Terceiro evento')
  // })

  // Observable (observador)
  // meuObservableTeste.subscribe(
  //   (resultado: any) => console.log(resultado + 10), 
    
  // )