import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../pokemon.service';

@Component({
  selector: 'app-pokemon-profile',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-profile.component.html',
  styles: ``,
  providers: [PokemonService],
})
export class PokemonProfileComponent {
  readonly route = inject(ActivatedRoute); // Service to access param of current route.
  readonly pokemonService = inject(PokemonService); // PokemonService to access to pokemon data
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id')); // Looking for pokemonId from the route.
  readonly pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId)).asReadonly(); // Retrieving the pokemon according to its id.

}
