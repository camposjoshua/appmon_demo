import { ActivityIndicator, Button, SafeAreaView, StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { get_pokemons } from '@/app/api/pokemons';
import { useQuery } from '@tanstack/react-query';
import { types } from '@babel/core';
import usePartyStore from '@/stores/userParty';
import SpriteView from '../organism/SpriteView';
import { capitalizeFirstLetter } from '@/app/service/stringManipulation';
import Colors from '@/constants/Colors';
import { PokemonProps } from '@/types/user';
import Toast from 'react-native-toast-message';

export default function UserHUD() {

  const { party, removePokemon, isEditing } = usePartyStore();
  
  const handleRemovePokemon = (id: number) => {
    if (party.length !== 1){
      removePokemon(id);
    } else {
      Toast.show({
        position:'bottom',
        type: 'error',
        text1: `Please include 1 pokemon`,
        visibilityTime: 3000,
        swipeable: false
      })
    }
  };

  return (
    <View style={{}}>
      <Text>Pokemon Party</Text>
      <View style={styles.partyContainer}>
        <FlatList 
          data={party}
          numColumns={6}
          contentContainerStyle={{}}
          style={{}}
          renderItem={({item}) => {
            return(
              <TouchableOpacity disabled={!isEditing} onPress={() => handleRemovePokemon(item.id as number)}>
                <View style={styles.unitContainer}>
                  <SpriteView url={item.sprite} size={50} />
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "blue"
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
  partyContainer:{
    backgroundColor: '#C1CEFE',
    borderRadius: 20,
    padding: 4
  },
  unitContainer: {
    alignItems: "center", 
    borderColor: Colors.main.primary,
    borderRadius: 20,
    borderWidth: 2.5,
    overflow: 'hidden',
    marginHorizontal: 2,
    backgroundColor: '#F4F4F4'
  }
});