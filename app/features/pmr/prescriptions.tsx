import BackButton from "@/app/shared/components/backButton";
import OutlineButton from "@/app/shared/components/forms/OutlineButton";
import PrimaryButton from "@/app/shared/components/forms/PrimaryButton";
import PrescriptionCard from "@/app/shared/components/prescriptionCard";
import Colors from "@/app/shared/constants/colors";
import { Fonts } from "@/app/shared/constants/fonts";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface Medidation {
  name: string;
  quantity: string;
  dosage: string;
  frequency: string;
  duration: string;
}

const medications: Medidation[] = [
  {
    name: "Paracetamol",
    quantity: "10 mg/ml",
    dosage: "500 mg",
    frequency: "Every 6 hours",
    duration: "5 days",
  },
  {
    name: "Ibuprofen",
    quantity: "200 mg",
    dosage: "400 mg",
    frequency: "Every 8 hours",
    duration: "7 days",
  },
];

const { width, height } = Dimensions.get("window");

export default function PrescriptionsScreen() {
  const [hasPrescriptions, setHasPrescriptions] = useState(false);
  const [prescriptions, setPrescriptions] = useState<Medidation[]>(medications);

  const addPrescription = (medication: Medidation) => {
    setPrescriptions([medication, ...prescriptions]);
  };

  const data = useLocalSearchParams();

  const renderHeader = () => (
    <View style={{ marginRight: 20, marginBottom: 20 }}>
      <PrimaryButton
        onPress={() => {
          router.push({
            pathname: "/features/pmr/addPrescription",
            params: data,
          });
        }}
        title="New Prescription"
        isLoading={false}
        width={"100%"}
      />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <Text style={styles.header}>Prescriptions</Text>
      {prescriptions.length > 0 ? (
        <FlatList
          data={prescriptions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginRight: 20 }}>
              <PrescriptionCard
                name={item.name}
                quantity={item.quantity}
                onTap={() => console.log(item.quantity)}
              />
            </View>
          )}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingLeft: 20, paddingBottom: 100 }}
        />
      ) : (
        <View
          style={{
            alignItems: "center",
            marginTop: 100,
            flex: 1,
            marginHorizontal: 20,
          }}
        >
          <Text style={styles.nopresStyle}>No Prescriptions</Text>
          <Text style={styles.nopressubStyle}>
            Prescriptions added will display here
          </Text>
          <PrimaryButton
            onPress={() => {
              router.push("/features/pmr/addPrescription");
            }}
            title="New Prescription"
            isLoading={false}
            width={"100%"}
          />
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          marginHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <OutlineButton
          title="Back"
          onPress={() => {
            router.dismiss();
          }}
          width={"50%"}
        />
        <PrimaryButton
          title="Next"
          isLoading={false}
          onPress={() => {}}
          width={"50%"}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: Colors.background.primary,
  },
  header: {
    fontSize: 24,
    fontFamily: Fonts.lato.bold,
    color: Colors.text.primary,
    marginTop: 30,
    marginLeft: 20,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  nopresStyle: {
    fontSize: 18,
    fontFamily: Fonts.lato.bold,
    fontWeight: "900",
    color: Colors.text.primary,
    marginTop: 30,
  },
  nopressubStyle: {
    fontSize: 14,
    fontFamily: Fonts.lato.bold,
    fontWeight: "400",
    color: Colors.text.secondary,
    marginTop: 10,
    textAlign: "center",
  },
});
