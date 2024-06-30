import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContatoComponent } from './contato/contato.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContatoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'agenda-front';
}
