import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-edit',
  standalone: true,
  imports: [RouterLink, DatePipe, ReactiveFormsModule],
  templateUrl: './pokemon-edit.component.html',
  styles: ``,
  providers: [PokemonService]
})
export class PokemonEditComponent {
  readonly route = inject(ActivatedRoute); // Service to access param of current route.
  readonly pokemonService = inject(PokemonService); // PokemonService to access to pokemon data
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id')); // Looking for pokemonId from the route.
  readonly pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId)).asReadonly(); // Retrieving the pokemon according to its id.

  readonly form = new FormGroup({
    name: new FormControl(this.pokemon().name),
    life: new FormControl(this.pokemon().life),
    damage: new FormControl(this.pokemon().damage),
    types: new FormArray(this.pokemon().types.map((type) => new FormControl(type))),
  });
}
