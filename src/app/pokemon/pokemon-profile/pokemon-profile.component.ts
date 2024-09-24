import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-profile',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './pokemon-profile.component.html',
  styles: ``,
  providers: [PokemonService],
})
export class PokemonProfileComponent {
  readonly route = inject(ActivatedRoute); // Service to access param of current route.
  readonly pokemonService = inject(PokemonService); // PokemonService to access to pokemon data
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id')); // Looking for pokemonId from the route.
  readonly pokemon = toSignal(this.pokemonService.getPokemonById(this.pokemonId)); // Retrieving the pokemon according to its id.
}
