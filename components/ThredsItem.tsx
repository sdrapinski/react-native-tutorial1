import { Pressable, StyleSheet, View, useColorScheme } from "react-native";
import { Thread } from "../types/threads";
import { Image } from "expo-image";
import { Text } from "./Themed";
import { timeAgo } from "../utils/timeAgo";
import { Ionicons, Feather, AntDesign, FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function ThreadsItem(thred: Thread): JSX.Element {
  return (
    <View style={styles.container}>
      <PostLeftSide {...thred} />
      <View style={{ gap: 6 }}>
        <PostHeading
          name={thred.author.name}
          createdAt={thred.createdAt}
          verified={thred.author.verified}
        />
        <Text>{thred.content}</Text>
        {thred.image && (
          <Image
            source={thred.image}
            style={{
              width: "100%",
              minHeight: 200,
              borderRadius: 10,
            }}
            placeholder={blurhash}
            contentFit="cover"
            transition={200}
          />
        )}
        <BottomIcons />
        <PostFooter replies={thred.repliesCount} likes={thred.likesCount} />
      </View>
    </View>
  );
}

function PostHeading({
  name,
  createdAt,
  verified,
}: {
  name: string;
  createdAt: string;
  verified: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexGrow: 1,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ fontWeight: "500" }}>{name}</Text>
        {verified && (
          <MaterialIcons name="verified" size={14} color="#60a5fa" />
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ color: "gray" }}>{timeAgo(createdAt)}</Text>
        <Feather name="more-horizontal" size={14} color="gray" />
      </View>
    </View>
  );
}

function PostFooter({ replies, likes }: { replies: number; likes: number }) {
  return (
    <Text style={{ color: "gray" }}>
      {replies} replies · {likes} likes
    </Text>
  );
}

function BottomIcons() {
  const iconSize = 20;
  const currentTheme = useColorScheme();
  const iconColor = currentTheme === "dark" ? "white" : "black";
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <FontAwesome name="heart-o" size={iconSize} color={iconColor} />
      <Ionicons name="chatbubble-outline" size={iconSize} color={iconColor} />
      <AntDesign name="retweet" size={iconSize} color={iconColor} />
      <Feather name="send" size={iconSize} color={iconColor} />
    </View>
  );
}

function PostLeftSide(thread: Thread) {
  const currentTheme = useColorScheme();
  const borderColor = currentTheme === "light" ? "#00000020" : "#ffffff20";

  return (
    <View style={{ justifyContent: "space-between" }}>
      <Image
        source={thread.author.photo}
        style={styles.image}
        placeholder={blurhash}
        contentFit="cover"
        transition={500}
      />
      <View
        style={{
          borderWidth: 1,
          alignSelf: "center",
          borderColor: borderColor,
          flexGrow: 1,
        }}
      />
      <View
        style={{
          width: 20,
          alignItems: "center",
          alignSelf: "center",
          gap: 3,
        }}
      >
        {[1, 2, 3].map((index) => (
          <Image
            key={index}
            // @ts-ignore
            source={thread.replies[index - 1]?.author.photo}
            style={{ width: index * 7, height: index * 7, borderRadius: 15 }}
            placeholder={blurhash}
            contentFit="cover"
            transition={500}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
    paddingBottom: 30,
    width: 310,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});