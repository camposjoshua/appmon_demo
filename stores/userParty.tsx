import { PokemonProps } from "@/types/user"
import {create} from "zustand"

type PartyStore = {
    party: Array<PokemonProps>;
    isEditing: boolean;
    addPokemon: (pokemon: PokemonProps) => void;
    removePokemon: (id: number) => void;
    toggleEditing: () => void;
}

export const usePartyStore = create<PartyStore>((set) => ({
    party: [{
        id: 25,
        name: 'pikachu',
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        types: [
            {
                slot: 1,
                type: {
                    name: 'electric',
                    url: 'https://pokeapi.co/api/v2/type/13/'
                }
            }
        ]
    }],
    isEditing: false,
    addPokemon: (pokemon) =>
        set((state) => ({
          party: [...state.party, pokemon],
        })),
    removePokemon: (id) =>
    set((state) => ({
        party: state.party.filter((pokemon) => pokemon?.id !== id),
    })),
    toggleEditing: () =>
        set((state) => ({
          isEditing: !state.isEditing,
        })),
}))

export default usePartyStore;