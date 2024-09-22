import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonProfileComponent } from './pokemon/pokemon-profile/pokemon-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Defining routes array
const routes: Routes = [
  { path: 'pokemons/:id', component: PokemonProfileComponent, title: 'Pokémons' },
  { path: 'pokemons', component: PokemonListComponent, title: 'Pokédex' },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' }, // Home default route that will redirect to /pokemons
  { path: '**', component: PageNotFoundComponent, title: 'Page introuvable' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Thanks to provideRouter will tell to angular what are the defined routes.
  ],
};
