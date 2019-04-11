import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  descricaoComoUsar: string = '';

  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertasService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((paramentros: Params) => {
      this.ofertaService.getComoUsarOfertaPorID(paramentros.id)
        .then((descricao: string) => {
          this.descricaoComoUsar = descricao;
        })
    })
  }

}
