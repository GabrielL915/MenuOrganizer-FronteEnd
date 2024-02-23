import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

export default function App() {
  const [day, setDay] = useState("Segunda");
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSwipeLeft = () => {
    Keyboard.dismiss();
    const daysOfWeek = [
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
      "Domingo",
    ];
    const currentIndex = daysOfWeek.indexOf(day);
    const newIndex = (currentIndex + 1) % daysOfWeek.length;
    setDay(daysOfWeek[newIndex]);
  };

  const onSwipeRight = () => {
    Keyboard.dismiss();
    const daysOfWeek = [
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
      "Domingo",
    ];
    const currentIndex = daysOfWeek.indexOf(day);
    const newIndex = (currentIndex - 1 + daysOfWeek.length) % daysOfWeek.length;
    setDay(daysOfWeek[newIndex]);
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={config}
      style={{
        flex: 1,
        backgroundColor: "#2D3142",
      }}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <SafeAreaView style={styles.container}>
          <View style={styles.dayCard}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              multiline
              placeholder="Insira o almoço..."
              placeholderTextColor="#A9A9A9"
            />
          </View>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              multiline
              placeholder="Insira o jantar..."
              placeholderTextColor="#A9A9A9"
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D3142",
    alignItems: "center",
    paddingTop: 50,
  },
  dayCard: {
    justifyContent: "flex-start",
    backgroundColor: "#EF9227",
    padding: 13,
    width: "90%",
    borderRadius: 10,
    marginBottom: 30,
    borderColor: "#5B6386",
    borderWidth: 0.5,
  },
  card: {
    justifyContent: "flex-start",
    backgroundColor: "#5B6386",
    padding: 13,
    width: "90%",
    height: "40%",
    borderRadius: 10,
    borderColor: "#EF9227",
    borderWidth: 1,
    marginBottom: 30,
  },
  input: {
    color: "#F1F2F6",
    fontSize: 20,
    textAlignVertical: "top",
  },
  dayText: {
    padding: 10,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    color: "#F1F2F6",
  },
});
