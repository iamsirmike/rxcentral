import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";
import patients from "../features/dummyData";
import PrimaryButton from "../shared/components/forms/PrimaryButton";
import HomeCard from "../shared/components/homeCard";
import NotificationAlert from "../shared/components/notificationAlert";
import PatientCard from "../shared/components/patientCard";
import { Colors } from "../shared/constants/colors";
import { Fonts } from "../shared/constants/fonts";

export default function MedicationsScreen() {
  const [showAlert, setShowAlert] = useState(true);

  const shouldCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      shouldCloseAlert();
    }, 3000);
  }, [showAlert]);

  const renderHeader = () => (
    <>
      <View style={styles.appBar}>
        <Text style={styles.title}>Hello, Topup Pharmacy</Text>
        <View style={styles.searchIconContainer}>
          <Ionicons name="search" size={14} color={"#888888"} />
        </View>
      </View>
      {showAlert && (
        <TouchableOpacity onPress={shouldCloseAlert}>
          <View style={{ paddingRight: 20 }}>
            <NotificationAlert message="Call Mr. Addae to report for his weekly checkup tomorrow" />
          </View>
        </TouchableOpacity>
      )}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
          paddingRight: 20,
        }}
      >
        <View
          style={{
            marginTop: 20,
            height: 55,
            borderColor: "#CCCCCC99",
            borderWidth: 1,
            justifyContent: "center",
            alignContent: "center",
            borderRadius: 10,
            flex: 1,
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            placeholder={{ label: "Select filter", value: null }}
            items={[
              { label: "Today", value: "today" },
              { label: "Last Week", value: "last_week" },
              { label: "Last Month", value: "last_month" },
            ]}
            style={pickerStyles}
          />
        </View>
        <View style={styles.notifContainer}>
          <Ionicons name="alarm" size={14} color={"#888888"} />
        </View>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingRight: 20 }}
      >
        <HomeCard
          value="20"
          label="Prescription dispensed "
          color="#1D74B9"
          statLabel="Most dispensed medicine"
          statValue="Paracetamol 10 mg/ml"
        />
        <View style={{ width: 5 }} />
        <HomeCard value="120k" label="Total patients " color="#D35400" />
      </ScrollView>
      <Text
        style={{
          marginTop: 20,
          marginLeft: 20,
          fontFamily: Fonts.lato.bold,
          fontWeight: "600",
          fontSize: 18,
          color: Colors.text.primary,
        }}
      >
        Recent patients
      </Text>
    </>
  );

  const renderFooter = () => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        paddingRight: 20,
        marginTop: 20,
        gap: 10,
        paddingBottom: 30,
      }}
    >
      <PrimaryButton
        title="New RX"
        onPress={() => console.log("New RX pressed")}
        isLoading={false}
        width={40}
      />
      <PrimaryButton
        title="New Patient"
        onPress={() => router.push("../features/pmr/addPatient")}
        isLoading={false}
        width={40}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={patients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <PatientCard
            name={item.name}
            prescription={item.prescription}
            onTap={() => console.log(item.name)}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{ paddingLeft: 20, paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.lato.bold,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: 8,
  },
  icon: {
    color: "#888888",
  },
  searchIconContainer: {
    backgroundColor: "#D6D6D666",
    height: 30,
    width: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  alertContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE1C7",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 20,
    gap: 15,
    width: "100%",
    overflow: "hidden",
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "#E77612",
    position: "absolute",
    right: -10,
    bottom: -10,
  },

  notifContainer: {
    backgroundColor: "#D6D6D666",
    height: 40,
    width: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

const pickerStyles = {
  inputIOS: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
    margin: 10,
  },
  inputAndroid: {
    padding: 14,
    borderWidth: 10,
    borderColor: Colors.border.error,
    borderRadius: 8,
    fontSize: 16,
    margin: 10,
  },
};
