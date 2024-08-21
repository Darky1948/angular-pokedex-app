import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  name = signal('Pikachu');
  life = signal(21);
  size = computed(() => this.sizeOfPokemon());
  imageSrc = signal('https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png');

  constructor() {
    effect(() => {
      console.log('The life counter has been updated:', this.life());
    })
  }
  incrementLife(): void {
    console.log("Increment")
    this.life.update(n => n +1);
  }

  decrementLife(): void {
    console.log("Decrement")
    this.life.update(n => n - 1);
  }

  sizeOfPokemon(): string {
    if(this.life() <= 15) {
      return "Petit";
    } else if (this.life() >= 25) {
      return "Grand";
    } else {
      return "Moyen";
    }
  }
}
