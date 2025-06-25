/**
 * maskPhoneNumber() masks the phone number, if `maskChar` and `showDigits` are not passed,
 * it takes a default value of 'X' and 4 respectively
 * @param phone 
 * @param maskChar the character used to mask the phone number
 * @param showDigits the count of digits to be shown after masking the phone number
 * @returns string in pattern e.g +xxxxxxxxx232
 */
export default function maskPhoneNumber(phone: any, maskChar: string = '*', showDigits: number = 4) {

    //Remove all non digits except leading +
    const cleanedPhoneNumber = phone.replace(/[^\d+]/g, '');

    //Check if the phone number starts with a country code
    const hasCountryCode = cleanedPhoneNumber.startsWith('+');
    const countryCode = hasCountryCode ? '+' : '';

    //Extract digits except the leading +
    const digits = hasCountryCode ? cleanedPhoneNumber.slice(1) : cleanedPhoneNumber;
    //keep the last digits unmasked based on the value in showDigits
    const visibleDigits = digits.slice(-showDigits);
    //Mask all other digits using maskChar 
    const maskedDigits = digits.slice(0, -showDigits).replace(/\d/g, maskChar);

    return `${countryCode}${maskedDigits}${visibleDigits}`;
}