import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonProfileComponent } from './pokemon/pokemon-profile/pokemon-profile.component';

// Defining routes array
const routes: Routes = [
  { path: 'pokemons/:id', component: PokemonProfileComponent },
  { path: 'pokemons', component: PokemonListComponent },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' }, // Home default route that will redirect to /pokemons
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Thanks to provideRouter will tell to angular what are the defined routes.
  ],
};
