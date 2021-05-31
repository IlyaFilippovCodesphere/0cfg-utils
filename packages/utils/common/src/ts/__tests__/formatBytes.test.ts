import {formatBytes} from '../formatBytes';

describe('Format bytes', () => {
    test('No negative decimals allowed', () => {
        expect(() => formatBytes(10, -1)).toThrow('No negative decimals allowed.');
    });

    test('No negative byte number allowed', () => {
        expect(() => formatBytes(-10)).toThrow('No negative byte number allowed.');
    });

    describe('Format with correct unit', () => {
        test('No suffix and decimal places if value is 0', () => {
            expect(formatBytes(0, 2)).toBe('0');
        });

        test('Kilobytes', () => {
            expect(formatBytes(1048575)).toBe('1024 KB');
        });

        test('Megabytes', () => {
            expect(formatBytes(1048576)).toBe('1 MB');
        });
    });
});
