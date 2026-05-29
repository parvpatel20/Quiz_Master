// Shared option lists and validators used across forms and filters.

export const CLASS_OPTIONS = [
  ...Array.from({ length: 10 }, (_, i) => ({
    value: `Class ${i + 1}`,
    label: `Class ${i + 1}`,
  })),
  { value: "Class 11 (Science)", label: "Class 11 (Science)" },
  { value: "Class 11 (Commerce)", label: "Class 11 (Commerce)" },
  { value: "Class 11 (Arts)", label: "Class 11 (Arts)" },
  { value: "Class 12 (Science)", label: "Class 12 (Science)" },
  { value: "Class 12 (Commerce)", label: "Class 12 (Commerce)" },
  { value: "Class 12 (Arts)", label: "Class 12 (Arts)" },
];

export const DIFFICULTY_OPTIONS = [
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Hard", label: "Hard" },
];

export const FORMAT_OPTIONS = [
  { value: "MCQ-Single", label: "Multiple Choice (Single)" },
  { value: "MCQ-Multiple", label: "Multiple Choice (Multiple)" },
  { value: "True/False", label: "True / False" },
  { value: "Fill-in-the-Blank", label: "Fill in the Blank" },
];

export const FORMAT_LABELS = {
  "MCQ-Single": "MCQ (Single Correct)",
  "MCQ-Multiple": "MCQ (Multiple Correct)",
  "True/False": "True / False",
  "Fill-in-the-Blank": "Fill in the Blank",
};

export const EMAIL_PATTERN = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
export const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$_]).{8,16}$/;
export const PASSWORD_HINT =
  "8–16 characters with an uppercase, lowercase, number, and a special character (@ # $ _).";
