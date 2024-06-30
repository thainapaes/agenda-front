import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contato } from '../model/Contato';
import { ContatoService } from '../service/contato.service';
import { Router } from '@angular/router';
import { ContatoRequestDto } from '../model/dto/ContatoRequestDto';
import { ContatoFavRequest } from '../model/dto/ContatoFavRequest';
import { ContatoAtivoRequest } from '../model/dto/ContatoAtivoRequest';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {

  exibirBotoes:boolean = true;
  tabelaVisivel:boolean = true;
  btnCadastrar: boolean = true;

  formulario = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    email: new FormControl('', [Validators.email, Validators.maxLength(255)]),
    celular: new FormControl('', [Validators.required, Validators.maxLength(11)]),
    telefone: new FormControl('', [Validators.maxLength(10)]),
  })

  contatos:Contato[] = [];
  contato = new Contato();
  request = new ContatoRequestDto();
  favRequest = new ContatoFavRequest();
  ativoRequest = new ContatoAtivoRequest();

  dto = new ContatoRequestDto();
  statusAtivo: string;
  statusFavorito: string;


  constructor(private service:ContatoService, private router:Router) {}

  exibir(): void{
    this.service.selecionar().subscribe(
      retorno => this.contatos = retorno
    );
  }

  ngOnInit(){
    this.exibir();
  }

  salvarContato():void{
    this.request.nome = this.formulario.value.nome;
    this.request.email = this.formulario.value.email;
    this.request.celular = this.formulario.value.celular;
    this.request.telefone = this.formulario.value.telefone;

    this.service.salvarContato(this.request)
    .subscribe(retorno => {
      this.contatos.push(retorno);

      this.contato = new Contato();
      this.request = new ContatoRequestDto();
      alert('Contato salvo com sucesso!')
    });
  }

  selecionarContato(posicao:number):void{
    this.contato = this.contatos[posicao];
    this.contato.id = posicao;

    this.statusAtivo = this.contato.snAtivo;
    this.statusFavorito = this.contato.snFavorito;

    this.exibirBotoes = false;
    this.tabelaVisivel = false;
  }

  alterar(celular:string):void{
    this.request = this.contatoToRequest(this.formulario.value as Contato);
    debugger
    this.service.alterarContato(celular, this.request)
    .subscribe(retorno => {
      let posicao = this.contatos.findIndex(obj => {
        return obj.id == (retorno.id-1);
      });

      this.contatos[posicao] = retorno;
      this.contato = new Contato();
      this.request = new Contato();

      this.exibirBotoes = true;
      this.tabelaVisivel = true;

      alert('Contato alterado com sucesso!')
    });
  }

  favoritar(celular:string):void{
    this.favRequest.celular = celular
    debugger
    this.service.favoritar(this.favRequest)
    .subscribe(retorno => {
      let posicao = this.contatos.findIndex(obj => {
        return obj.id == (retorno.id-1);
      });

      debugger
      this.contatos[posicao] = retorno;
      this.contato = new Contato();
      this.favRequest = new ContatoFavRequest();

      this.exibirBotoes = true;
      this.tabelaVisivel = true;

      alert('Contato favoritado com sucesso!')
    });
  }

  inativar(celular: string):void{
    this.ativoRequest.celular = celular
    this.service.inativar(this.ativoRequest)
    .subscribe(retorno => {
      let posicao = this.contatos.findIndex(obj => {
        return obj.id == (retorno.id-1);
      });

      this.contatos[posicao] = retorno;
      this.contato = new Contato();
      this.ativoRequest = new ContatoAtivoRequest();

      this.exibirBotoes = true;
      this.tabelaVisivel = true;

      alert('Contato inativado com sucesso!')
    });
  }

  cancelar():void {
    this.contato = new Contato();
    this.exibirBotoes = true;
    this.tabelaVisivel = true;
  }

  contatoToRequest(c: Contato):any{
    this.dto.nome = c.nome;
    this.dto.email = c.email;
    this.dto.celular = c.celular;
    this.dto.telefone = c.telefone;
    return this.dto;
  }

 /*
    O básico aqui, precisa apagar depois


  salvar():void{
    this.contatos.push(this.formulario.value as Contato);
    this.formulario.reset();
    console.table(this.contatos);
  }

  selecionar(posicao:number):void{
    this.indice = posicao;
    this.contato = this.contatos[posicao];

    this.btnCadastrar = false;
    this.tabelaVisivel = false;
  }

  alterarContato():void{
    this.contatos[this.indice] = this.formulario.value as Contato;

    this.formulario.reset();

    this.btnCadastrar = true;
    this.tabelaVisivel = true;
  }

  removerContato(){
    this.contatos.splice(this.indice, 1);

    this.formulario.reset();

    this.btnCadastrar = true;
    this.tabelaVisivel = true;
  }*/

}
