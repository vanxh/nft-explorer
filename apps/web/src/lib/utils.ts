import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateAddress = (address: string) => {
  if (address.length !== 42) {
    return address;
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
