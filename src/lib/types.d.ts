// User remains the same
export interface User {
  email: string;
  emailVerified: boolean | null;
  image: string;
  name: string;
  role: UserRole;
}

export type UserRole = "admin" | "user";

// Adjusted Meal to include dynamic day and time definitions
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
  mealType: MealTypeId;
  availableDays: MealAvailability;
};

// New structure for defining meal types
export type MealType = {
  typeId: string; // Unique identifier for the meal type, e.g., "breakfast", "lunch", "dinner"
  name: string; // Human-readable name, e.g., "Breakfast"
  times: string[]; // Array of strings representing the time slots when this meal type is available, e.g., ["07:00", "10:00"]
};

// Structure to define the days when meals are available
export type MealAvailability = {
  mealId: string; // Reference to a Meal
  availableDays: Day[]; // Days when the meal is available
};

export type Day = {
  id?: string;
  day: string;
  meals: SubMeal[];
};

type SubMeal = {
  mealType: MealTypeId;
  deliveryTime: string;
};

export type MealTime = "breakfast" | "lunch" | "dinner";

export type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type FoodAvailability = {
  day: DayOfWeek;
  mealTime: MealTime;
};

export type Food = {
  id?: string;
  name: string;
  description: string;
  price: number;

  availability: FoodAvailability[];
};
