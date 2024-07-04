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
import { useIsFocused } from '@react-navigation/native';

export default function DataBank() {
  const { party, addPokemon, removePokemon, isEditing, toggleEditing } = usePartyStore();
  const [limit, setLimit] = useState(15);
  const [atLimit, setAtLimit] = useState(false);
  const [pokemonList, setPokemonList] = useState<PokemonProps | null | any>([]);
  const queryClient = useQueryClient();
  const isFocused = useIsFocused();

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
    if (!isFocused && isEditing) {
      toggleEditing()
    }
  }, [isFocused]);

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
      if (party.some((pokemon) => pokemon.id === newPokemon.id)){
        removePokemon(newPokemon.id as number)
      }else {
        Toast.show({
          position: 'bottom',
          type: 'error',
          text1: 'Party is Full! Remove some first',
          visibilityTime: 2000,
          swipeable: false,
        })
      }
    }else if (party.some((pokemon) => pokemon.id === newPokemon.id)) {
      if (party.length === 1) {
        Toast.show({
          position:'bottom',
          type: 'error',
          text1: `Please include 1 pokemon`,
          visibilityTime: 3000,
          swipeable: false
        })
      }else
      removePokemon(newPokemon.id as number)
    }else{
      addPokemon(newPokemon);
    }
  };
  
  return (
    <View style={styles.container}>
      {isError ? <Text style={{marginVertical: 8, alignSelf: 'center'}}>Couldn't load pokemon. Try Again</Text> : null}
      <View style={[{height: "65%"}]}>
        <FlatList 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16,justifyContent: 'space-between', alignItems: "center" }}
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
                    <SpriteView id={item.id} />
                    <View style={styles.nameContainer}>
                      <Text>{capitalizeFirstLetter(item.name)}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
            )
          }} />
      </View>
      
      {isLoading ? 
        <View style={styles.loadButton}>
          <ActivityIndicator size={"small"} />
        </View>
      :
        <TouchableOpacity onPress={() => loadMorePokemon()} style={styles.loadButton}>
          <Text style={{color: '#777777', fontWeight: '700'}}>{isError ? 'Refresh' : 'Load more'}</Text>
        </TouchableOpacity>
      }
    
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, {backgroundColor: isEditing ? '#FF6262' : Colors.main.secondary}]} onPress={() => toggleEditing()}>
          <Text style={[styles.buttonText, {color: isEditing ? 'white' : '#976600'}]}>
            {isEditing ? 'Stop Editing' : 'Start Editing'}
          </Text>
        </TouchableOpacity>
      </View>
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
  buttonGroup: {
    gap: 8,
    flexDirection: 'row',
    alignSelf: "center"
  },
  loadButton: {
    width: '100%', 

    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#D6D6D6'
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: Colors.main.primary,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20
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