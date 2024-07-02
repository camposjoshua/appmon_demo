import { ActivityIndicator, Button, FlatList, StyleSheet, View, Text, Touchable, TouchableOpacity, Pressable } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { get_pokemons } from '@/app/api/pokemons';
import SpriteView from './SpriteView';
import { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '@/app/service/stringManipulation';
import Toast from 'react-native-toast-message';
import UserHUD from '../HUD/UserHUD';
import { PokemonProps } from '@/types/user';
import usePartyStore from '@/stores/userParty';
import Colors from '@/constants/Colors';

export default function DataBank() {
  const { party, addPokemon, removePokemon, isEditing, toggleEditing } = usePartyStore();
  const [limit, setLimit] = useState(15);
  const [atLimit, setAtLimit] = useState(false);
  const [pokemonList, setPokemonList] = useState<PokemonProps | null | any>([]);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch, isSuccess } = useQuery({
    queryKey: ['pokemons', limit],
    queryFn: () => get_pokemons(limit),
    staleTime: Infinity, 
  });

  useEffect(() => {
    if (data) {
      setPokemonList(() => [...data]);
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading){
      Toast.show({
        position: "bottom",
        swipeable: false,
        text1: isSuccess ? "Added more Pokemon!" : "Failed to load more :(",
        type: isSuccess ? 'success' : 'error',
        visibilityTime: 2000
      })
    }
  }, [isSuccess, isError]);

  const loadMorePokemon = () => {
      setLimit((prevLimit) => prevLimit + 6);
  }

  const handleAddPokemon = (newPokemon: PokemonProps) => {
    if (party.length === 6){
      Toast.show({
        position: 'bottom',
        type: 'error',
        text1: 'Party is Full! Remove some first',
        visibilityTime: 2000,
        swipeable: false,
      })
    }else if (party.some((pokemon) => pokemon.id === newPokemon.id)) {
      removePokemon(newPokemon.id as number)
    }else{
      addPokemon(newPokemon);
    }
  };
  
  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator size={"large"} /> : null}
      {isError ? <Text>Couldn't Load Pokemon : </Text> : null}

      <Pressable onPress={() => toggleEditing()}>
        <Text>
          {isEditing ? 'Stop Editing' : 'Start Editing'}
        </Text>
      </Pressable>

      <View style={{height: "80%"}}>
        <FlatList 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: 'space-between', alignItems: "center" }}
          style={{paddingHorizontal: 0, width: "100%"}} 
          data={pokemonList} 
          numColumns={3}
          renderItem={({item}) => {
            const isInParty = party.some((pokemon) => pokemon.id === item.id);

            return(
                <TouchableOpacity 
                  disabled={!isEditing} 
                  onPress={() => handleAddPokemon(item)}
                >
                  <View style={[
                    { alignItems: "center", margin: 8},
                      isInParty && styles.inPartyBorder
                    ]}>
                    <SpriteView url={item.sprite} />
                    <View style={styles.nameContainer}>
                      <Text>{capitalizeFirstLetter(item.name)}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
            )
          }} />
      </View>
      <Button title='load' onPress={() => loadMorePokemon()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  inPartyBorder: {
    borderColor: Colors.main.primary,
    borderWidth: 2.5,
    borderRadius: 20
  },
  nameContainer: {
    position: "absolute",
    bottom: -10,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    backgroundColor: "#FAC748",
    borderColor: Colors.main.primary,
  }
});