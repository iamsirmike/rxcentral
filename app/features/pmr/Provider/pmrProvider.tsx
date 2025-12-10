import React, { createContext, ReactNode, useContext, useState } from "react";
import { Patient } from "../../dummyData";
import { Medidation } from "../prescriptions";

type PmrContextType = {
  patients: Patient[];
  prescriptions: Medidation[];
  addPatient: (patientData: Patient) => void;
  addPrescription: (prescriptionData: Medidation) => void;
  fetchPrescriptions: () => void;
};

const PmrContext = createContext<PmrContextType | undefined>(undefined);

export const PmrProvider = ({ children }: { children: ReactNode }) => {
  let [patients, setPatient] = useState<Patient[]>([]);
  let [prescriptions, setPrescriptions] = useState<Medidation[]>([]);

  const addPatient = (patientData: Patient) => {
    console.log("Patients:", patients);

    setPatient([patientData, ...patients]);
    console.log("Patients:", patients);
  };

  const addPrescription = (prescriptionData: Medidation) => {
    setPrescriptions([prescriptionData, ...prescriptions]);
  };

  const fetchPrescriptions = () => {};

  return (
    <PmrContext.Provider
      value={{
        patients,
        prescriptions,
        addPatient,
        addPrescription,
        fetchPrescriptions,
      }}
    >
      {children}
    </PmrContext.Provider>
  );
};

export function usePmr() {
  const context = useContext(PmrContext);
  if (!context) {
    throw new Error("PmrContext must be used within a PmrProvider");
  }
  return context;
}
