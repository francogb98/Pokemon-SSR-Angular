import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonService } from '../../pokemons/service/pokemon.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsComponent {
  private pokemonsService = inject(PokemonService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  public title = inject(Title);

  //de esta forma extraaemos informacion de los params
  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );
  public loadOnPageChanged = effect(
    () => {
      console.log(this.currentPage());
      this.loadPokemons(this.currentPage());
    },
    {
      allowSignalWrites: true,
    }
  );

  public loadPokemons(page = 0) {
    console.log(page);

    this.pokemonsService
      .loadPage(page)
      .pipe(tap(() => this.title.setTitle(`Pokemons SSR - Page ${page}`)))
      .subscribe((pokemons) => this.pokemons.set(pokemons));
  }
}
