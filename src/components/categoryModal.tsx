import { Themes } from "@/colors";
import { Category, IngredientEntry } from "@/types";
import { Modal, StyleSheet, View } from "react-native";
import CategoryContents from "./categoryContents";
import ModalTitle from "./modalTitle";

type Props = {
  isVisible: boolean;
  category: Category;
  contents: IngredientEntry[];
  onClose: () => void;
  onAdd: (ingredient: IngredientEntry) => void;
  onRemove: (ingredient: IngredientEntry) => void;
};

export default function CategoryModal({
  isVisible,
  category,
  contents,
  onClose,
  onAdd,
  onRemove,
}: Props) {
  const { frame } = styles;

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={[frame, { backgroundColor: category.color }]}>
          <ModalTitle text={category.name} onClose={onClose} />
          <CategoryContents
            category={category}
            contents={contents}
            add={onAdd}
            remove={onRemove}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    height: "75%",
    width: "100%",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Themes.border,
    position: "absolute",
    bottom: 0,
  },
});
