import {removeAllNonCharsNonDigits} from '../removeAllNonCharsNonDigits';

test('Do not change String with only chars and digits.', () => {
    const matchingString = '8sdShd3';
    expect(removeAllNonCharsNonDigits(matchingString)).toBe(matchingString);
});

test('Removes other characters from input string.', () => {
    const inputStringWithOtherCharacters = 'on#ad/012.1';
    const expectedStringRemoveOtherCharacters = 'onad0121';
    expect(removeAllNonCharsNonDigits(inputStringWithOtherCharacters)).toBe(expectedStringRemoveOtherCharacters);
});

test('Removes whitespace from input string.', () => {
    const inputStringWithWhitespace = '7sa9 92SM';
    const expectedStringRemoveWhitespace = '7sa992SM';
    expect(removeAllNonCharsNonDigits(inputStringWithWhitespace)).toBe(expectedStringRemoveWhitespace);
});

test('Call with empty string.', () => {
    expect(removeAllNonCharsNonDigits('')).toBe('');
});