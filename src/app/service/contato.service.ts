import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from '../model/Contato';
import { ContatoRequestDto } from '../model/dto/ContatoRequestDto';
import { ContatoFavRequest } from '../model/dto/ContatoFavRequest';
import { ContatoAtivoRequest } from '../model/dto/ContatoAtivoRequest';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private url: string = 'http://localhost:8090/agenda'

  constructor(private http:HttpClient) { }

  selecionar(): Observable<Contato[]>{
    return this.http.get<Contato[]>(this.url);
  }

  exibir(): Observable<Contato[]>{
    return this.http.get<Contato[]>(this.url);
  }

  salvarContato(obj:ContatoRequestDto):Observable<Contato>{
    return this.http.post<Contato>(this.url, obj);
  }

  alterarContato(celular:string, obj:ContatoRequestDto):Observable<Contato>{
    return this.http.patch<Contato>(this.url + "/" + celular, obj);
  }

  favoritar(obj: ContatoFavRequest):Observable<Contato>{
    return this.http.patch<Contato>(this.url + '/favorito', obj);
  }

  inativar(obj: ContatoAtivoRequest):Observable<Contato>{
    return this.http.patch<Contato>(this.url + "/ativar", obj);
  }



}
