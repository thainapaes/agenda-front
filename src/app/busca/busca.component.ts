import { Component } from '@angular/core';
import { ContatoService } from '../service/contato.service';
import { Contato } from '../model/Contato';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})
export class BuscaComponent {

  formulario = new FormGroup({
    celular: new FormControl('', [Validators.required, Validators.maxLength(11)])
  })

  contato = new Contato();
  tabela: boolean = false;

  constructor(private service:ContatoService) {}

  buscar(celular:string): void{
    debugger
    this.service.buscar(celular).subscribe(

      retorno => {
        this.contato = retorno;
        debugger
        if (retorno != null) {
          this.tabela = true;
        }

      }
    );
  }

}
