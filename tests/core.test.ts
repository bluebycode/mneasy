import { existsMnemonic, generateAndSaveMnemonic, getAndDecipherMnemonic } from '../src/core';

describe('core', () => {
    it('existsMnemonic should return false', () => {
        expect(existsMnemonic()).toBe(false);
    });
    it('existsMnemonic after saved should return true', () => {
        generateAndSaveMnemonic("test-secret")
        expect(existsMnemonic()).toBe(true);
    });
    it('decipherMnemonic after saved should return right mnemonic with 12 words', () => {
        const secret = "test-secret";
        const encryptedMnemonic = generateAndSaveMnemonic(secret)
        expect(existsMnemonic()).toBe(true);
        const deciphered = getAndDecipherMnemonic(secret);
        expect(deciphered).not.toBe(null);
        expect(deciphered.split(' ').length).toBe(12);
    });
});