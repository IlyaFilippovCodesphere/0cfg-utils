import {removeAllNonCharsNonDigitsNonDots} from '../removeAllNonCharsNonDigitsNonDots';

test('Do not change String with only chars, digits and dots.', () => {
    const matchingString = '8sd.Shd3.';
    expect(removeAllNonCharsNonDigitsNonDots(matchingString)).toBe(matchingString);
});

test('Removes other characters from input string.', () => {
    const inputStringWithOtherCharacters = 'on#ad/012.1';
    const expectedStringRemoveOtherCharacters = 'onad012.1';
    expect(removeAllNonCharsNonDigitsNonDots(inputStringWithOtherCharacters)).toBe(expectedStringRemoveOtherCharacters);
});

test('Removes whitespace from input string.', () => {
    const inputStringWithWhitespace = '7sa9 92SM';
    const expectedStringRemoveWhitespace = '7sa992SM';
    expect(removeAllNonCharsNonDigitsNonDots(inputStringWithWhitespace)).toBe(expectedStringRemoveWhitespace);
});

test('Call with empty string.', () => {
    expect(removeAllNonCharsNonDigitsNonDots('')).toBe('');
});