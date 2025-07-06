"use client";

/**
 * Standalone function to convert English numbers to Bengali numbers
 * @param number - The English number to convert
 * @returns The Bengali representation of the number with proper comma formatting
 */
const convertToBengaliNumber = (number: number | string): string => {
  if (number === undefined || number === null) return "";

  // Convert to string and remove any existing commas
  const numStr = number.toString().replace(/,/g, "");

  const bengaliDigits: Record<string, string> = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
    ".": ".",
    ",": ",",
  };

  // Split number into integer and decimal parts
  const [integerPart, decimalPart] = numStr.split(".");

  // Add commas to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Convert to Bengali digits with commas
  const convertedNumber = formattedInteger
    .split("")
    .map((char) => bengaliDigits[char] || char)
    .join("");

  // If there's a decimal part, convert it too
  if (decimalPart) {
    const convertedDecimal = decimalPart
      .split("")
      .map((char) => bengaliDigits[char] || char)
      .join("");
    return `${convertedNumber}.${convertedDecimal}`;
  }

  return convertedNumber;
};

export { convertToBengaliNumber };
