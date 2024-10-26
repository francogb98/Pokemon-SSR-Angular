import { Component, OnInit, inject, signal } from '@angular/core';
import { PokemonService } from '../../pokemons/service/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { IPokemon } from '../../pokemons/interfaces';
import { Meta, Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css',
})
export default class PokemonPageComponent implements OnInit {
  private pokemonsService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<IPokemon | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.pokemonsService
      .loadPokemon(id)
      .pipe(
        tap(({ name, id }) => {
          const pageTitle = `#${id} - ${name}`;
          const pageDescription = `Página del Pokémon ${name}`;
          this.title.setTitle(pageTitle);

          this.meta.updateTag({
            name: 'description',
            content: pageDescription,
          });
          this.meta.updateTag({ name: 'og:title', content: pageTitle });
          this.meta.updateTag({
            name: 'og:description',
            content: pageDescription,
          });
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          });
        })
      )
      .subscribe(this.pokemon.set);
  }
}
