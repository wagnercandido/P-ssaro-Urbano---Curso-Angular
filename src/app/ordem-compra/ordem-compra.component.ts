import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { NgForm } from '@angular/forms';
import { CarrinhoService } from '../carrinho.service';
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  @ViewChild('formulario') formulario: NgForm;

  idCompra: number;
  itensCarrinho: ItemCarrinho[] = []

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens();
    console.log(this.itensCarrinho);

  }

  confirmarCompra(): void {
    let pedido: Pedido = new Pedido(
      this.formulario.value.endereco,
      this.formulario.value.numero,
      this.formulario.value.complemento,
      this.formulario.value.formaPagamento,
      this.carrinhoService.exibirItens()
    );

    if (this.itensCarrinho.length === 0) {
      alert('Voçê não adicionou nenhum item')
    } else {
      this.ordemCompraService.efetivarCompra(pedido)
        .subscribe((idPedido) => {
          this.idCompra = idPedido.id;
          this.carrinhoService.limparCarrinho()
        })
    }


  }

  adicionar(item: ItemCarrinho) {
    this.carrinhoService.adicionarQuantidade(item)
  }

  retirarItem(item: ItemCarrinho) {
    this.carrinhoService.retirarItem(item);
  }

}
