export const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const BASE = ALPHABET.length;

export function encodeBase62(num: number): string {
    if (num === 0) return ALPHABET[0];
    let str = "";
    while (num > 0) {
        str = ALPHABET[num % BASE] + str;
        num = Math.floor(num / BASE);
    }
    return str;
}
