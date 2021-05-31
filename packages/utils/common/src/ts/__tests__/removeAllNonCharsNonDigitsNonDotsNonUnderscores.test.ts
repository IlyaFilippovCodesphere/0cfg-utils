import {removeAllNonCharsNonDigitsNonDotsNonUnderscores} from '../removeAllNonCharsNonDigitsNonDotsNonUnderscores';

test('Do not change String with only chars, dots, underscores and digits.', () => {
    const matchingString = '_8._sdShd3.';
    expect(removeAllNonCharsNonDigitsNonDotsNonUnderscores(matchingString)).toBe(matchingString);
});

test('Removes other characters from input string.', () => {
    const inputStringWithOtherCharacters = 'on_.#ad/012.1';
    const expectedStringRemoveOtherCharacters = 'on_.ad012.1';
    expect(removeAllNonCharsNonDigitsNonDotsNonUnderscores(inputStringWithOtherCharacters))
        .toBe(expectedStringRemoveOtherCharacters);
});

test('Removes whitespace from input string.', () => {
    const inputStringWithWhitespace = '7sa9 92_.SM';
    const expectedStringRemoveWhitespace = '7sa992_.SM';
    expect(removeAllNonCharsNonDigitsNonDotsNonUnderscores(inputStringWithWhitespace))
        .toBe(expectedStringRemoveWhitespace);
});

test('Call with empty string.', () => {
    expect(removeAllNonCharsNonDigitsNonDotsNonUnderscores('')).toBe('');
});