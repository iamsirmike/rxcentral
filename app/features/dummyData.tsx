interface Patient {
  name: string;
  dob: string;
  gender: string;
  phone: string;
  address: string;
  email: string;
  prescription: string;
}

const patients: Patient[] = [
  {
    name: "Paul Sean-Don",
    dob: "1990-01-01",
    gender: "Male",
    phone: "123-456-7890",
    address: "123 Main St",
    email: "paul.sean-don@example.com   ",
    prescription: "Paracetamol 10 mg/ml",
  },
  {
    name: "Jane Doe",
    dob: "1985-05-15",
    gender: "Female",
    phone: "987-654-3210",
    address: "456 Elm St",
    email: "jane.doe@example.com",
    prescription: "Ibuprofen 200 mg",
  },
];

export default patients;
