import {removeAllNonCharsNonDigitsNonUnderscores} from '../removeAllNonCharsNonDigitsNonUnderscores';

test('Do not change String with only chars, underscores and digits.', () => {
    const matchingString = '8s_dShd3';
    expect(removeAllNonCharsNonDigitsNonUnderscores(matchingString)).toBe(matchingString);
});

test('Removes other characters from input string.', () => {
    const inputStringWithOtherCharacters = '_on_#ad/012.1';
    const expectedStringRemoveOtherCharacters = '_on_ad0121';
    expect(removeAllNonCharsNonDigitsNonUnderscores(inputStringWithOtherCharacters))
        .toBe(expectedStringRemoveOtherCharacters);
});

test('Removes whitespace from input string.', () => {
    const inputStringWithWhitespace = '7sa9_ 92SM';
    const expectedStringRemoveWhitespace = '7sa9_92SM';
    expect(removeAllNonCharsNonDigitsNonUnderscores(inputStringWithWhitespace)).toBe(expectedStringRemoveWhitespace);
});

test('Call with empty string.', () => {
    expect(removeAllNonCharsNonDigitsNonUnderscores('')).toBe('');
});