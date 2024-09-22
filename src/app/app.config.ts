import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';

// Defining routes array
const routes: Routes = [
  { path: 'pokemons', component: PokemonListComponent },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' }, // Home default route that will redirect to /pokemons
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Thanks to provideRouter will tell to angular what are the defined routes.
  ],
};
