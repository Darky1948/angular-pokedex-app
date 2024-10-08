import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { Pokemon, PokemonList } from '../../pokemon.model';
import { PokemonService } from '../../pokemon.service';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { ReversePipe } from '../../reverse.pipe';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    PokemonBorderDirective, DatePipe, ReversePipe,
    RouterLink
  ],
  templateUrl: './pokemon-list.component.html',
  styles: [
    `.pokemon-card {
      cursor: pointer;
    }
    `
  ],
})
export class PokemonListComponent {
  private readonly pokemonService = inject(PokemonService);
  readonly pokemons = toSignal(this.pokemonService.getPokemonList());
  readonly loading = computed(() => !this.pokemons());
  readonly searchTerm = signal('');
  readonly pokemonListFiltered = computed(() => {
    return this.pokemons()?.filter((pokemon) => pokemon.name.toLowerCase().includes(this.searchTerm().trim().toLowerCase()));
  });

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
