import { 
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity, 
 } from 'react-native';
import Colors from '@/constants/Colors';
import Toast from 'react-native-toast-message';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRef } from 'react';
import { MARKERS } from '@/constants/Markers';
import SpriteView from '../organism/SpriteView';

type LocationProps = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
}

export default function MapHUD() {

  const INITIAL_REGION: LocationProps = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 2,
    longitudeDelta: 2,
  }

  const mapRef = useRef<MapView>(null)

  const focusMap = (coordinates: LocationProps) => {
    mapRef.current?.animateCamera({ center: coordinates, zoom: 100}, {duration: 2000})
  }


  return (
    <View>
      <View style={{height: 300, width: '100%'}}>
          <Text>MapHUD</Text>
          <MapView 
            style={StyleSheet.absoluteFill}
            initialRegion={INITIAL_REGION}
            ref={mapRef}
          >
            {MARKERS.map((marker, index) => (
              <Marker key={index} coordinate={marker.coordinates}>
                <Callout>
                  <View style={{}}>
                    <View>
                      <SpriteView url={marker.sprite} id={0} size={80} />
                    </View>
                    <View>
                      <Text>
                        {marker.name}
                      </Text>
                      <Text>
                        {marker.boss}
                      </Text>
                    </View>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>

      </View>
      <View style={{marginTop: 16, backgroundColor: 'red'}}>
        <TouchableOpacity onPress={() => focusMap(MARKERS[0].coordinates)}>
          <Text>Boss Location</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 16, backgroundColor: 'red'}}>
        <TouchableOpacity onPress={() => focusMap(MARKERS[1].coordinates)}>
          <Text>Boss Location</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 16, backgroundColor: 'red'}}>
        <TouchableOpacity onPress={() => focusMap(MARKERS[2].coordinates)}>
          <Text>Boss Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "blue"
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
});