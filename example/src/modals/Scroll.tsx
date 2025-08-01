import {
  Button,
  RefreshControl,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type ViewStyle,
} from 'react-native';
import { Modal } from 'react-native-reanimated-modal';
import { baseStyles } from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';

export default function ScrollModal({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const { height } = useWindowDimensions();

  const scrollStyles = useMemo<ViewStyle>(
    () => ({
      maxHeight: height / 3,
      marginTop: 5,
    }),
    [height]
  );

  return (
    <Modal
      visible={visible}
      animation="scale"
      swipeDirection="down"
      onHide={() => setVisible(false)}
    >
      <StatusBar style="light" animated />
      <View style={[baseStyles.container, styles.container]}>
        <Text style={baseStyles.title}>📜 Scrollable Modal</Text>
        <ScrollView
          style={scrollStyles}
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => {}} />
          }
          scrollEventThrottle={64}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <View key={i}>
              <Text>Element #{i + 1}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={baseStyles.buttonGroup}>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 0 },
  scrollContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
});
