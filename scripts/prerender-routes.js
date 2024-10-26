const TOTAL_POKEMONS = 10;
const TOTAL_PAGES = 5;
(async () => {
  const fs = require("fs");

  const pokemonsIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  const pokemonsPages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

  let fileContentPokemon = pokemonsIds.map((id) => `/pokemon/${id}`);
  let fileContentPage = pokemonsPages.map((id) => `/pokemons/page/${id}`);
  let result = [];
  result.push(...fileContentPokemon, ...fileContentPage);
  result = result.join("\n");

  const pokemonNameList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`
  ).then((res) => res.json());

  result += "\n";
  result += pokemonNameList.results
    .map((pokemon) => `/pokemon/${pokemon.name}`)
    .join("\n");

  fs.writeFileSync("routes.txt", result);
})();
