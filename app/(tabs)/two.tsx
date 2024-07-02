import { ActivityIndicator, Button, FlatList, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { useQuery } from '@tanstack/react-query';
import { get_pokemons } from '../api/pokemons';
import DataBank from '@/components/organism/DataBank';
import UserHUD from '@/components/HUD/UserHUD';


export default function TabTwoScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "#4464AD", flex: 1}}>
      <View style={styles.container}>
        <UserHUD />
        <DataBank />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
