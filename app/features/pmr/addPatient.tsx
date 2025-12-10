import BackButton from "@/app/shared/components/backButton";
import OutlineButton from "@/app/shared/components/forms/OutlineButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
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
import DatePicker from "../../shared/components/forms/DatePicker";
import PrimaryButton from "../../shared/components/forms/PrimaryButton";
import TextField from "../../shared/components/forms/TextField";
import Colors from "../../shared/constants/colors";
import { Fonts } from "../../shared/constants/fonts";
import { usePmr } from "./Provider/pmrProvider";

const { width, height } = Dimensions.get("window");

const addPatientSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  address: z.string().min(1, "Address is required"),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  note: z.string().optional(),
});

type AddPatientFormData = z.infer<typeof addPatientSchema>;

export default function AddPatientScreen() {
  const { addPatient } = usePmr();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddPatientFormData>({
    resolver: zodResolver(addPatientSchema),
    defaultValues: {
      email: "",
      address: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      phone: "",
      note: "",
    },
  });

  // Watch form values to determine if button should be disabled
  const email = watch("email");
  const address = watch("address");
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const dateOfBirth = watch("dateOfBirth");
  const gender = watch("gender");
  const phone = watch("phone");
  const isButtonDisabled =
    !email?.trim() ||
    !address?.trim() ||
    !firstName?.trim() ||
    !lastName?.trim() ||
    !dateOfBirth?.trim() ||
    !gender?.trim() ||
    !phone?.trim();

  const onSubmit = (data: AddPatientFormData) => {
    console.log(data.email);
    // Navigate to OTP verification instead of main app
    addPatient(JSON.parse(JSON.stringify(data)));
    // router.push({
    //   pathname: "/features/pmr/prescriptions",
    //   params: data,
    // });
  };

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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Text style={styles.header}>New patient</Text>
            <Text style={styles.subtitle}>QID232760</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <TextField
                  name="firstName"
                  control={control}
                  label="FIRST NAME"
                  placeholder="E.g John"
                  error={errors.firstName}
                  autoCapitalize="words"
                  keyboardType="default"
                />
              </View>
              <View style={styles.halfWidth}>
                <TextField
                  name="lastName"
                  control={control}
                  label="LAST NAME"
                  placeholder="E.g Doe"
                  error={errors.lastName}
                  autoCapitalize="words"
                  keyboardType="default"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <DatePicker
                  name="dateOfBirth"
                  control={control}
                  label="DATE OF BIRTH"
                  placeholder="Select date"
                  error={errors.dateOfBirth}
                />
              </View>
              <View style={styles.halfWidth}>
                <BottomSheetSelect
                  name="gender"
                  control={control}
                  label="GENDER"
                  placeholder="Select gender"
                  error={errors.gender}
                  items={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                  ]}
                />
              </View>
            </View>

            <TextField
              name="phone"
              control={control}
              label="MOBILE"
              placeholder="E.g 0551806886"
              error={errors.phone}
              keyboardType="phone-pad"
            />
            <TextField
              name="email"
              control={control}
              label="EMAIL"
              placeholder="E.g me@gmail.com"
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <TextField
              name="address"
              control={control}
              label="ADDRESS"
              placeholder="E.g 123 Main St"
              error={errors.address}
            />

            <TextField
              name="note"
              control={control}
              label="NOTE"
              placeholder="Additional notes"
              error={errors.note}
              multiline
              numberOfLines={4}
              style={{ height: 100, textAlignVertical: "top" }}
            />
            <View
              style={{
                flexDirection: "row",
                gap: 12,
                marginHorizontal: 20,
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
                onPress={handleSubmit(onSubmit)}
                width={"50%"}
              />
            </View>
          </View>
        </ScrollView>
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
  logo: {
    marginTop: 40,
  },
  header: {
    fontSize: 24,
    fontFamily: Fonts.lato.bold,
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.lato.regular,
    color: Colors.text.secondary,
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
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: Fonts.lato.bold,
  },
  forgotPassword: {
    color: Colors.primary,
    fontFamily: Fonts.lato.bold,
    fontSize: 14,
  },
  noaccountText: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: Fonts.lato.regular,
    color: Colors.text.secondary,
    textAlign: "right",
  },
  signup: {
    fontFamily: Fonts.lato.bold,
    fontSize: 16,
    color: Colors.primary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
