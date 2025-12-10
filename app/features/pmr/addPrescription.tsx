import BackButton from "@/app/shared/components/backButton";
import OutlineButton from "@/app/shared/components/forms/OutlineButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import BottomSheetSelect from "../../shared/components/forms/BottomSheetSelect";
import PrimaryButton from "../../shared/components/forms/PrimaryButton";
import TextField from "../../shared/components/forms/TextField";
import Colors from "../../shared/constants/colors";
import { Fonts } from "../../shared/constants/fonts";

const { width, height } = Dimensions.get("window");

const addPrescriptionSchema = z.object({
  drugName: z.string().min(1, "Drug name is required"),
  quantity: z.string().min(1, "Quantity is required"),
  form: z.string().min(1, "Form is required"),
  dose: z.string().min(1, "Dose is required"),
  strength: z.string().min(1, "Strength is required"),
  brand: z.string().min(1, "Brand is required"),
  batchNumber: z.string().min(1, "Batch number is required"),
  nafdacNumber: z.string().min(1, "NAFDAC number is required"),
  note: z.string().optional(),
});

type AddPrescriptionFormData = z.infer<typeof addPrescriptionSchema>;

export default function AddPrescriptionScreen() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddPrescriptionFormData>({
    resolver: zodResolver(addPrescriptionSchema),
    defaultValues: {
      drugName: "",
      quantity: "",
      form: "",
      dose: "",
      strength: "",
      brand: "",
      batchNumber: "",
      nafdacNumber: "",
      note: "",
    },
  });

  // Watch form values to determine if button should be disabled
  const drugName = watch("drugName");
  const quantity = watch("quantity");
  const form = watch("form");
  const dose = watch("dose");
  const strength = watch("strength");
  const brand = watch("brand");
  const batchNumber = watch("batchNumber");
  const nafdacNumber = watch("nafdacNumber");

  const isButtonDisabled =
    !drugName?.trim() ||
    !quantity?.trim() ||
    !form?.trim() ||
    !dose?.trim() ||
    !strength?.trim() ||
    !brand?.trim() ||
    !batchNumber?.trim() ||
    !nafdacNumber?.trim();

  const onSubmit = (data: AddPrescriptionFormData) => {
    console.log(data);
    // Navigate back to prescriptions list
    router.back();
  };

  const data = useLocalSearchParams();
  console.log("Received params:", data);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.header}>New Prescription</Text>

          <View style={styles.formContainer}>
            <TextField
              name="drugName"
              control={control}
              label="DRUG NAME"
              placeholder="E.g Paracetamol"
              error={errors.drugName}
              autoCapitalize="words"
              keyboardType="default"
            />

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <TextField
                  name="quantity"
                  control={control}
                  label="QUANTITY"
                  placeholder="E.g 20"
                  error={errors.quantity}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.halfWidth}>
                <BottomSheetSelect
                  name="form"
                  control={control}
                  label="FORM"
                  placeholder="Select form"
                  error={errors.form}
                  items={[
                    { label: "Tablet", value: "tablet" },
                    { label: "Injection", value: "injection" },
                    { label: "Syrup", value: "syrup" },
                  ]}
                />
              </View>
            </View>

            <TextField
              name="dose"
              control={control}
              label="DOSE"
              placeholder="Twice daily"
              error={errors.dose}
            />

            <TextField
              name="strength"
              control={control}
              label="STRENGTH"
              placeholder="E.g Very strong"
              error={errors.strength}
            />

            <Text
              style={{
                color: "#676767",
                fontSize: 16,
                fontFamily: Fonts.lato.bold,
                marginVertical: 20,
              }}
            >
              Dispensed drug
            </Text>

            <TextField
              name="brand"
              control={control}
              label="BRAND"
              placeholder="E.g Panadol"
              error={errors.brand}
              autoCapitalize="words"
            />

            <TextField
              name="batchNumber"
              control={control}
              label="BATCH NUMBER"
              placeholder="E.g BN12345"
              error={errors.batchNumber}
            />

            <TextField
              name="nafdacNumber"
              control={control}
              label="NAFDAC NUMBER"
              placeholder="E.g NAF123456"
              error={errors.nafdacNumber}
            />

            <TextField
              name="note"
              control={control}
              label="ADDITIONAL NOTE"
              placeholder="Additional notes"
              error={errors.note}
              multiline
              numberOfLines={4}
              style={{ height: 100, textAlignVertical: "top" }}
            />
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            marginHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <OutlineButton
            title="Back"
            onPress={() => {
              router.back();
            }}
            width={"50%"}
          />
          <PrimaryButton
            title="Add"
            isLoading={false}
            onPress={handleSubmit(onSubmit)}
            width={"50%"}
          />
        </View>
      </KeyboardAvoidingView>
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
  scrollView: {
    marginHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: Fonts.lato.bold,
    color: Colors.text.primary,
    marginTop: 30,
  },
  formContainer: {
    paddingTop: 30,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
