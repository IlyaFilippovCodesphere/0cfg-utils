/**
 * @param saturation Must be between 0 and 1. Recommended values are around 0.9.
 * @param value Must be between 0 and 1. Recommended values are around 0.9.
 */
export const randomColor = (saturation: number, value: number): { r: number, g: number, b: number } => {
    return hsvToRgb(Math.random(), saturation, value);
};

const componentToHex = (c: number) => {
    return c.toString(16).padStart(2, '0');
};

export const rgbToHex = (rgb: {r: number, g: number, b: number}) => {
    return '#' + componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b);
};

/**
 * Takes HSV values in [0..1[
 *
 * @return RGB values from 0 to 255
 */
export const hsvToRgb = (h: number, s: number, v: number): { r: number, g: number, b: number } => {
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r: number, g: number, b: number;
    switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return {
        r: Math.round(r! * 255),
        g: Math.round(g! * 255),
        b: Math.round(b! * 255),
    };
};
