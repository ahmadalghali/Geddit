import { twMerge } from "tailwind-merge";

export function cn(...classes: string[]) {
  return twMerge(classes);
}
