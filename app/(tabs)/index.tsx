import { SafeAreaView, StyleSheet, View, Text} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import UserHUD from '@/components/HUD/UserHUD';
import MapHUD from '@/components/HUD/MapHUD';

export default function TabOneScreen() {
  return (
    <SafeAreaView style={{backgroundColor: "#4464AD"}}>
      <View style={styles.container}>
        <Text>APPMON</Text>
        <UserHUD />
        <MapHUD />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    height: "100%",
    backgroundColor: "white"
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
});
