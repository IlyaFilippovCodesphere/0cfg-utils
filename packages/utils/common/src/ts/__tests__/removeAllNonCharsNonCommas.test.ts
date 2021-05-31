import { removeAllNonCharsNonDigitsNonCommas } from "../removeAllNonCharsNonDigitsNonCommas";

test('Do not change String with only chars, digits and commas.', () => {
    const matchingString = ',8sdS,,hd3,';
    expect(removeAllNonCharsNonDigitsNonCommas(matchingString)).toBe(matchingString);
});

test('Removes other characters from input string.', () => {
    const inputStringWithOtherCharacters = 'on,#a,d/012.1';
    const expectedStringRemoveOtherCharacters = 'on,a,d0121';
    expect(removeAllNonCharsNonDigitsNonCommas(inputStringWithOtherCharacters)).toBe(expectedStringRemoveOtherCharacters);
});

test('Removes whitespace from input string.', () => {
    const inputStringWithWhitespace = '7sa9 92S,M';
    const expectedStringRemoveWhitespace = '7sa992S,M';
    expect(removeAllNonCharsNonDigitsNonCommas(inputStringWithWhitespace)).toBe(expectedStringRemoveWhitespace);
});

test('Call with empty string.', () => {
    expect(removeAllNonCharsNonDigitsNonCommas('')).toBe('');
});