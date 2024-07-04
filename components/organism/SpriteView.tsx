import { ActivityIndicator, Button, FlatList, StyleSheet, View, Text, Image } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { useQuery } from '@tanstack/react-query';
import { get_pokemons } from '@/app/api/pokemons';
import { useState } from 'react';


export default function SpriteView(props: {
  url?: string, 
  size?: number,
  id: number
}) {
  const { url, size, id } = props
  const [isLoading, setLoading] = useState(false)

  function formatNumber(num: number) {
    return num.toString().padStart(3, '0');
  }

  return (
    <View style={styles.container}>
      {isLoading && <View style={[StyleSheet.absoluteFill, {justifyContent: 'center', alignItems: 'center'}]}><Text>...</Text></View>}
			<Image
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        style={{width: size ? size : 100, height: size ? size : 100}}
        source={{
          uri: url ? url : `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${formatNumber(id)}.png`,
        }}
				alt='sprite'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});