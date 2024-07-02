import { ActivityIndicator, Button, FlatList, StyleSheet, View, Text, Image } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { useQuery } from '@tanstack/react-query';
import { get_pokemons } from '@/app/api/pokemons';


export default function SpriteView(props: {
  url: string, 
  size?: number
}) {
  const { url, size } = props

  return (
    <View style={styles.container}>
			<Image />
			<Image
        style={{width: size ? size : 100, height: size ? size : 100}}
        source={{
          uri: url,
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