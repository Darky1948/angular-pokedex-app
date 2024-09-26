import { inject, Injectable } from '@angular/core';
import { Pokemon, PokemonList } from './pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly POKEMON_API_URL = 'http://localhost:3000/pokemons';

  constructor() { }

  getPokemonList(): Observable<PokemonList> {
    return this.http.get<PokemonList>(this.POKEMON_API_URL);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.POKEMON_API_URL}/${id}`);
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
    ];
  }

  // Met à jour un pokémon existant.
  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.put<Pokemon>(`${this.POKEMON_API_URL}/${pokemon.id}`, pokemon);
  }
  // Supprime un pokémon par son id
  deletePokemon(pokemonId: number): Observable<void> {
    return this.http.delete<void>(`${this.POKEMON_API_URL}/${pokemonId}`);
  }
  // Ajout un pokémon
  // Omit ici permet de dire que nous n'avons pas besoin de l'id car en création il n'y en a pas encore.
  addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon> {
    return this.http.post<Pokemon>(`${this.POKEMON_API_URL}`, pokemon);
  }
}
