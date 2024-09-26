import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';

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
  readonly router = inject(Router);
  readonly pokemonService = inject(PokemonService); // PokemonService to access to pokemon data
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id')); // Looking for pokemonId from the route.

  readonly pokemonResponse = toSignal(
    this.pokemonService.getPokemonById(this.pokemonId).pipe(
      map((value) => ({ value, error: undefined })), catchError((error) => of({ value: undefined, error }))
    )
  ); // Retrieving the pokemon according to its id.

  // En attente de la réponse HTTP
  readonly loading = computed(() => !this.pokemonResponse());
  // Cas erreur HTTP
  readonly error = computed(() => this.pokemonResponse()?.error);
  // Cas succès HTTP
  readonly pokemon = computed(() => this.pokemonResponse()?.value);

  deletePokemon(pokemonId: number) {
    this.pokemonService.deletePokemon(pokemonId).subscribe(() => {
      this.router.navigate(['/pokemons']);
    });
  }
}
