import { StyleSheet, SafeAreaView, ScrollView, Platform } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Lottie from "lottie-react-native";
import { RefreshControl } from "react-native-gesture-handler";
import React, { useRef } from "react";

import { ThreadContext } from "../../context/thread-context";
import ThreadsItem from "../../components/ThredsItem";

export default function TabOneScreen() {
  const animationRef = useRef<Lottie>(null);
  const threads = React.useContext(ThreadContext);
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
        {threads.map((thred) => (
          <ThreadsItem key={thred.id} {...thred} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
