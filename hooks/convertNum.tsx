"use client";

/**
 * Custom hook to convert English numbers to Bengali numbers
 * @returns Functions for number conversion
 */
const useNumberConverter = () => {
    /**
     * Converts English numbers to Bengali numbers
     * @param number - The English number to convert (can be number or string)
     * @returns The Bengali representation of the number
     */
    const toBengaliNumber = (number: number | string): string => {
        if (number === undefined || number === null) return '';

        // Convert to string if it's a number
        const numStr = number.toString();

        // Map of English digits to Bengali digits
        const bengaliDigits: Record<string, string> = {
            '0': '০',
            '1': '১',
            '2': '২',
            '3': '৩',
            '4': '৪',
            '5': '৫',
            '6': '৬',
            '7': '৭',
            '8': '৮',
            '9': '৯',
            '.': '.',  // Keep decimal point as is
            ',': ',',  // Keep comma as is
        };

        // Replace each English digit with its Bengali equivalent
        return numStr.split('').map(char => bengaliDigits[char] || char).join('');
    };

    /**
     * Formats a number as Bengali currency (with ৳ symbol)
     * @param amount - The amount to format
     * @returns Formatted Bengali currency string
     */
    const formatBengaliCurrency = (amount: number | string): string => {
        if (amount === undefined || amount === null) return '';

        // Convert to number if it's a string
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

        // Format with commas for thousands
        const formattedAmount = numAmount.toLocaleString('en-IN');

        // Convert to Bengali digits
        return '৳' + toBengaliNumber(formattedAmount);
    };

    return {
        toBengaliNumber,
        formatBengaliCurrency
    };
}

/**
 * Standalone function to convert English numbers to Bengali numbers
 * @param number - The English number to convert
 * @returns The Bengali representation of the number
 */
const convertToBengaliNumber = (number: number | string): string => {
    if (number === undefined || number === null) return '';

    const numStr = number.toString();

    const bengaliDigits: Record<string, string> = {
        '0': '০',
        '1': '১',
        '2': '২',
        '3': '৩',
        '4': '৪',
        '5': '৫',
        '6': '৬',
        '7': '৭',
        '8': '৮',
        '9': '৯',
        '.': '.',
        ',': ',',
    };

    return numStr.split('').map(char => bengaliDigits[char] || char).join('');
}

export { useNumberConverter, convertToBengaliNumber };