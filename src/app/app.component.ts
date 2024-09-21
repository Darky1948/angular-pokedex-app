import { Component, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { Pokemon, PokemonList } from './pokemon.model';
import { PokemonBorderDirective } from './pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { ReversePipe } from './reverse.pipe';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonBorderDirective, DatePipe, ReversePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [PokemonService]
})
export class AppComponent {
  private readonly pokemonService = inject(PokemonService);
  pokemons: WritableSignal<PokemonList> = signal(this.pokemonService.getPokemonList());
  readonly searchTerm = signal('');
  readonly pokemonListFiltered = computed(() => {
    return this.pokemons().filter((pokemon) => pokemon.name.toLowerCase().includes(this.searchTerm().trim().toLowerCase()));
  });

  incrementLife(pokemon: Pokemon): void {
    console.log("Increment")
    pokemon.life = pokemon.life + 1;
  }

  decrementLife(pokemon: Pokemon): void {
    console.log("Decrement")
    pokemon.life = pokemon.life - 1;
  }

  sizeOfPokemon(pokemon: Pokemon): string {
    if(pokemon.life <= 15) {
      return "Petit";
    } else if (pokemon.life >= 25) {
      return "Grand";
    } else {
      return "Moyen";
    }
  }

}
