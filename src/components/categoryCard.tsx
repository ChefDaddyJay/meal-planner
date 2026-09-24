import { Themes } from "@/colors";
import icons from "@/icons";
import { Category } from "@/types";
import { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  category: Category;
};

export default function CategoryCard({ category }: Props) {
  const { container, button, text, image } = styles;
  const { id, name, color } = category;
  const [icon] = useState<ImageSourcePropType>(icons[id as keyof typeof icons]);

  return (
    <View
      style={[
        container,
        {
          backgroundColor: color,
        },
      ]}
    >
      <Pressable style={button}>
        {icon && <Image source={icon} style={image} />}
        <Text style={text}>{name}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    height: 108,
    width: 108,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Themes.border,
  },
  button: {
    padding: 3,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  text: {
    color: Themes.text,
    fontWeight: "bold",
    marginTop: 8,
  },
  image: {
    width: 48,
    height: 48,
  },
});
