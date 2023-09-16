import { ClassNameValue, twMerge } from "tailwind-merge";

export function cn(...classes: ClassNameValue[]) {
  return twMerge(classes);
}
