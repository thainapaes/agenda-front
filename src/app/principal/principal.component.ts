import { Component } from '@angular/core';
import { ContatoComponent } from '../contato/contato.component';
import { BuscaComponent } from '../busca/busca.component';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [ContatoComponent, BuscaComponent, RouterOutlet, RouterLink],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  setActive(event: Event) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => link.classList.remove('active'));

    const clickedLink = event.target as HTMLLinkElement;
    clickedLink.classList.add('active');
  }

}
