import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonProfileComponent } from './pokemon/pokemon-profile/pokemon-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from '../core/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { PokemonAddComponent } from './pokemon/pokemon-add/pokemon-add.component';
import { PokemonService } from './pokemon.service';
import { environment } from '../environments/environment';
import { PokemonLocalStorageService } from './pokemon-local-storage.service';
import { PokemonJSONServerService } from './pokemon-json-server.service';

// Defining routes array
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Page de connexion',
  },
  {
    path: 'pokemons',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: PokemonListComponent,
        title: 'Pokédex',

      },
      {
        path: 'add',
        component: PokemonAddComponent,
        title: 'Pokémon'
      },
      {
        path: 'edit/:id',
        component: PokemonEditComponent,
        title: 'Pokémon',
      },
      {
        path: ':id',
        component: PokemonProfileComponent,
        title: 'Pokémon',
      },
    ],
  },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' }, // Home default route that will redirect to /pokemons
  { path: '**', component: PageNotFoundComponent, title: 'Page introuvable' },
];

// Depending on the environment we either use json local mock server or localstorage on production
function pokemonServiceFactory(): PokemonService {
  return environment.production
    ? new PokemonLocalStorageService()
    : new PokemonJSONServerService();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Thanks to provideRouter will tell to angular what are the defined routes.
    provideHttpClient(),
    {
      provide: PokemonService,
      useFactory: pokemonServiceFactory,
    }
  ],
};
