import React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";

const ContactModal = ({ visible, onClose }) => {
  const handleLinkPress = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Contact Al-Mahdi Islamic Center</Text>

          {/* Website Link */}
          <TouchableOpacity
            onPress={() => handleLinkPress("https://hyderi.org.uk/")}
          >
            <View style={styles.linkContainer}>
              <Text style={styles.modalLink}>Visit our Website →</Text>
            </View>
          </TouchableOpacity>

          {/* Email Link */}
          <TouchableOpacity
            onPress={() => handleLinkPress("mailto:secretariat@hyderi.org.uk")}
          >
            <View style={styles.linkContainer}>
              <Text style={styles.modalLink}>Email →</Text>
            </View>
          </TouchableOpacity>

          {/* Email Link */}
          <TouchableOpacity onPress={() => handleLinkPress("tel:02087697553")}>
            <View style={styles.linkContainer}>
              <Text style={styles.modalLink}>Call Us →</Text>
            </View>
          </TouchableOpacity>

          {/* Address Link with Google Maps */}
          <TouchableOpacity
            onPress={() =>
              handleLinkPress(
                "https://www.google.com/maps/place/Hyderi+Islamic+Centre/@51.3468188,-0.0338993,17z/data=!3m1!4b1!4m6!3m5!1s0x4875fff06e935e75:0x2c374c667a96a548!8m2!3d51.3468188!4d-0.0313244!16s%2Fg%2F11htbz08cf?entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D"
              )
            }
          >
            <View style={styles.linkContainer}>
              <Text style={styles.modalLink}>Visit Us: Directions →</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "95%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 14,
    color: "gray",
    fontWeight: "400",
    marginBottom: 15,
    paddingTop: 12,
  },
  linkContainer: {
    borderTopColor: "#eee",
    borderTopWidth: 1,
    width: "100%",
    paddingTop: 15,
  },
  modalLink: {
    fontSize: 16,
    color: "#007aff",
    textAlign: "center",
    fontWeight: "500",
    paddingBottom: 20,
  },
});

export default ContactModal;
