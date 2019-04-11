import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'descricaoReduzidaPipe'
})
export class DescricaoReduzida implements PipeTransform {
    transform(texto: string, truncarEm: number): string {
        if (texto.length > 15) {
            return texto.substr(0, truncarEm) + '...'
        }
        return texto
    }
}