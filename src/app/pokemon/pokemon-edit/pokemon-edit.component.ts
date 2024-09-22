import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';

@Component({
  selector: 'app-pokemon-edit',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './pokemon-edit.component.html',
  styles: ``,
  providers: [PokemonService]
})
export class PokemonEditComponent {
  readonly route = inject(ActivatedRoute); // Service to access param of current route.
  readonly pokemonService = inject(PokemonService); // PokemonService to access to pokemon data
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id')); // Looking for pokemonId from the route.
  readonly pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId)).asReadonly(); // Retrieving the pokemon according to its id.
}
