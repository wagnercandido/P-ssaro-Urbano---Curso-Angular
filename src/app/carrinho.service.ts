import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from './shared/ofertas.model';

export class CarrinhoService {

    itens: ItemCarrinho[] = []

    exibirItens(): ItemCarrinho[] {
        return this.itens
    }

    incluirItens(oferta: Oferta): void {
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        )
        
        // Verificar se o item já existe no array

        let itemEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id )

        if (itemEncontrado) {
            itemEncontrado.quantidade += 1;
        } else {
            this.itens.push(itemCarrinho);
        }

    }

    totalCarrinhoCompras() {
        let total: number = 0;

        this.itens.map((item: ItemCarrinho) => {
            total += (item.quantidade * item.valor)
        })

        return total;
    }

    adicionarQuantidade(itemCarrinho: ItemCarrinho) {
        let itemEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

        if (itemEncontrado) {
            itemEncontrado.quantidade += 1;
        }
        
    }

    retirarItem(itemCarrinho: ItemCarrinho) {
        let itemEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

        if (itemCarrinho) {
            if (itemEncontrado.quantidade > 1) {
                itemEncontrado.quantidade -= 1;
            } else {
                this.itens.splice(this.itens.indexOf(itemEncontrado), 1)
            }
        }
    }

    limparCarrinho() {
        this.itens = []
    }

}

// export { CarrinhoService }