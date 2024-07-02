import axios from "axios";
import ApiManager from "./apiManager";

export const get_pokemons = async (limit: number) => {
	
    try {
			const allpokemon = await ApiManager.get(`pokemon/?limit=${limit}`);
			
			const pokeList = await Promise.all(
				allpokemon.data.results.map(async (pokemon: { name: string, url: string }) => {
				const res = await get_pokemon_detail(pokemon.url);
				return {
					name: res.name,
					id: res.id,
					sprite: res.sprites.front_default,
					types: res.types
				};
				})
			);
			return pokeList;
		} catch (error: any) {
			console.error("Error fetching pokemons:", error);
			return error.response;
		}
  }; 

export const get_pokemon_detail = async (url: string) => {
    try {
        const result = await axios.get(
            url
        )
        return result.data;
      } catch (error: any) {
        return error.response;
      }
    }; 