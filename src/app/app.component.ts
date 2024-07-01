import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContatoComponent } from './contato/contato.component';
import { PrincipalComponent } from './principal/principal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContatoComponent, PrincipalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'agenda-front';
}
