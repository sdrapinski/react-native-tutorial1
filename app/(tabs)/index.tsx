import { StyleSheet, SafeAreaView, ScrollView, Platform } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Lottie from "lottie-react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useRef } from "react";

export default function TabOneScreen() {
  const animationRef = useRef<Lottie>(null);
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingTop: Platform.select({ android: 30 }),
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor={"transparent"}
            onRefresh={() => {
              animationRef.current?.play();
            }}
          />
        }
      >
        <Lottie
          ref={animationRef}
          autoPlay={true}
          source={require("../../lottie-animations/animation_lmb3dd1q.json")}
          loop={false}
          style={{ width: 90, height: 90, alignSelf: "center" }}
          // onAnimationFinish={() => alert("finished")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
