import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IPokemon, IPokemons, SimplePokemon } from '../interfaces';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }
    page = Math.max(0, page);

    return this.http
      .get<IPokemons>(
        `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`
      )
      .pipe(
        map((resp) => {
          const SimplePokemons: SimplePokemon[] = resp.results.map(
            (pokemon) => ({
              id: pokemon.url.split('/').at(-2) ?? '',
              name: pokemon.name,
            })
          );
          return SimplePokemons;
        }),
        tap((pokemons) => console.log(pokemons))
      );
  }
  public loadPokemon(id: string) {
    return this.http.get<IPokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
