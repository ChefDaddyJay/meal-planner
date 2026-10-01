import { Themes } from "@/colors";
import { Modal, StyleSheet, View } from "react-native";
import ModalTitle from "./modalTitle";

type Props = {
  title: string;
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export default function AddItemModal({
  title,
  isVisible,
  onClose,
  children,
}: Props) {
  const { frame } = styles;

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={frame}>
          <ModalTitle text={title} onClose={onClose} />
          {children}
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
    backgroundColor: Themes.border,
    position: "absolute",
    bottom: 0,
  },
});
