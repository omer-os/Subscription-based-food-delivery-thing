export interface User {
  email: string;
  emailVerified: boolean | null;
  image: string;
  name: string;
  role: UserRole;
}

export type UserRole = "admin" | "user";

export type Meal = {
  mealId: string;
  title: string;
  description: string;
  ingredients: string[];
  nutritionalInfo: {
    calories: number;
    protein: number; // grams
    carbs: number; // grams
    fats: number; // grams
  };
  mealType: "breakfast" | "lunch" | "dinner";
  availableDays: (
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
  )[];
};
