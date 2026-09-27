import { IngredientEntry } from "@/types";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  ingredient: IngredientEntry;
  checked?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onCheck?: () => void;
  onUncheck?: () => void;
};

export default function IngredientListEntry({
  ingredient,
  checked,
  onOpen,
  onClose,
  onCheck,
  onUncheck,
}: Props) {
  const { container, text, amountContainer, button } = styles;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(checked || false);

  const toggleOpen = () => {
    if (isOpen && onClose) {
      onClose();
    } else if (!isOpen && onOpen) {
      onOpen();
    }
    setIsOpen(!isOpen);
  };
  const toggleChecked = () => {
    if (isChecked && onUncheck) {
      onUncheck();
    } else if (!isChecked && onCheck) {
      onCheck();
    }
    setIsChecked(!isChecked);
  };

  return (
    <View style={isChecked ? [container, {}] : container}>
      <Pressable
        style={button}
        onPress={() => {
          // toggleOpen();
          // if (!isChecked) {
          toggleChecked();
          // }
        }}
      >
        <Text style={text}>{ingredient.name}</Text>
        <Pressable onPress={toggleChecked}>
          <MaterialCommunityIcons
            name={isChecked ? "circle-slice-8" : "circle-outline"}
            size={24}
          />
        </Pressable>
      </Pressable>
      {isOpen && (
        <View style={amountContainer}>
          <Text>pick amount</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 18,
    padding: 6,
    paddingLeft: 12,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
  },
  amountContainer: {},
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
