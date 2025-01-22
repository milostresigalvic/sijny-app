import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
  ActivityIndicator, // Import ActivityIndicator
  Alert, // Import Alert from React Native
} from "react-native";

import donateStyles from "@/app/style/dontate-styles";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@/providers/stripe/stripeFunctions";
import { createPaymentIntentClientSecret } from "@/app/utils/helpers";

import { useRouter, useNavigation } from "expo-router";

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [donationCategory, setDonationCategory] = useState(null);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const router = useRouter();
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "", // Remove the header title text
    });
  }, [navigation]);

  async function pay() {
    console.log("pay: Starting payment process");
    setIsLoading(true); // Start loading

    const requestBody = {
      amount: selectedAmount * 100, // Convert amount to cents
      currency: "cad",
    };

    try {
      console.log(
        "pay: Creating Payment Intent with requestBody:",
        requestBody
      );
      const { customer, clientSecret } = await createPaymentIntentClientSecret(
        requestBody
      );

      if (!customer || !clientSecret) {
        console.log("pay: Failed to get customer or clientSecret");
        setIsLoading(false); // Stop loading
        return;
      }

      console.log("pay: Received customer and clientSecret:", {
        customer,
        clientSecret,
      });

      const paymentSheetConfig = {
        merchantDisplayName: "Example, Inc.",
        customerId: customer,
        paymentIntentClientSecret: clientSecret,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: "Jane Doe",
        },
        returnURL: "your-app-scheme://redirect",
      };

      console.log(
        "pay: Initializing Payment Sheet with config:",
        paymentSheetConfig
      );
      const { error: initPaymentSheetError } = await initPaymentSheet(
        paymentSheetConfig
      );

      if (initPaymentSheetError) {
        console.error("pay: initPaymentSheetError:", initPaymentSheetError);
        Alert.alert(
          "There was a problem processing the payment",
          "Please try again later"
        );
        setIsLoading(false); // Stop loading
        return;
      }

      console.log("pay: Payment Sheet initialized successfully");

      console.log("pay: Presenting Payment Sheet");
      const { error: presentPaymentSheetError } = await presentPaymentSheet();

      if (presentPaymentSheetError) {
        console.error(
          "pay: presentPaymentSheetError:",
          presentPaymentSheetError
        );
        Alert.alert(
          "There was a problem processing the payment",
          "Please try again later"
        );
        setIsLoading(false); // Stop loading
        return;
      }

      console.log(
        "pay: Payment Sheet presented successfully, navigating to /completion"
      );
      router.navigate("completion");
    } catch (error) {
      console.error("pay: Unexpected error occurred:", error);
    } finally {
      setIsLoading(false); // Stop loading when done
    }
  }

  const donationAmounts = [10, 25, 50, 100, 250, "Other"];
  const donationCategories = ["General Fund", "Ramadhan Fund"];

  return (
    <View style={donateStyles.container}>
      <ScrollView>
        <View style={donateStyles.sectionHeader}>
          <Text style={donateStyles.title}>Donate</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.amountTitle}>$ {selectedAmount}</Text>
          <View style={styles.amountButtonsContainer}>
            {donationAmounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.amountButton,
                  selectedAmount === amount && styles.selectedAmountButton,
                ]}
                onPress={() => {
                  if (amount === "Other") {
                    // Handle custom amount input here
                  } else {
                    setSelectedAmount(amount);
                  }
                }}
              >
                <Text
                  style={[
                    styles.amountButtonText,
                    selectedAmount === amount &&
                      styles.selectedAmountButtonText,
                  ]}
                >
                  {typeof amount === "string" ? amount : `$${amount}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setCategoryModalVisible(true)}
          >
            <Text>
              {donationCategory ? donationCategory : "Select donation Category"}
            </Text>
          </TouchableOpacity>

          {/* Show loading indicator when processing payment */}
          {isLoading ? (
            <ActivityIndicator size="large" color="#D4AF37" />
          ) : (
            <TouchableOpacity style={styles.payButton} onPress={pay}>
              <Text style={styles.payButtonText}>DONATE</Text>
            </TouchableOpacity>
          )}

          {Platform.OS === "ios" && (
            <Text style={styles.note}>
              Please note: ApplePay must be enabled in order to donate.{" "}
              <Text style={styles.link}>How to setup ApplePay →</Text>
            </Text>
          )}
        </View>
      </ScrollView>

      <Modal
        transparent={true}
        visible={categoryModalVisible}
        animationType="slide"
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={donationCategories}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setDonationCategory(item);
                    setCategoryModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItem}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setCategoryModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
  },
  amountTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  amountButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  amountButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#D4AF37",
    borderRadius: 5,
    margin: 5,
  },
  selectedAmountButton: {
    backgroundColor: "#1b7248",
  },
  amountButtonText: {
    fontSize: 16,
  },
  selectedAmountButtonText: {
    color: "#fff",
  },
  dropdown: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  payButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 5,
    marginVertical: 20,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  note: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  link: {
    color: "#007AFF",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalItem: {
    padding: 15,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalCancel: {
    padding: 15,
    fontSize: 18,
    textAlign: "center",
    color: "red",
  },
});
