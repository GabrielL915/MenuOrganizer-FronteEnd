import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

export default function App() {
  const [dayIndex, setDayIndex] = useState(0);
  const daysOfWeek = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];
  const scrollRef = useRef();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSwipeLeft = () => {
    dismissKeyboard();
    setDayIndex((prevIndex) => (prevIndex + 1) % daysOfWeek.length);
  };

  const onSwipeRight = () => {
    dismissKeyboard();
    setDayIndex(
      (prevIndex) => (prevIndex - 1 + daysOfWeek.length) % daysOfWeek.length
    );
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({
      x: dayIndex * Dimensions.get("window").width,
      animated: true,
    });
  }, [dayIndex]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingViewContainer}
    >
      <GestureRecognizer
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        config={config}
        style={styles.gestureRecognizer}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <SafeAreaView style={styles.container}>
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              style={styles.scrollView}
            >
              {daysOfWeek.map((day, index) => (
                <View key={index} style={styles.fullWidthContainer}>
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
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </GestureRecognizer>
    </KeyboardAvoidingView>
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
    marginBottom: 25,
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
  keyboardAvoidingViewContainer: {
    flex: 1,
  },
  gestureRecognizer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedContainer: {
    flex: 1,
    width: "100%",
  },
  fullWidthContainer: {
    width: Dimensions.get('window').width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
