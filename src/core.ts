
import * as bip39 from 'bip39';
import * as CryptoJS from 'crypto-js';

const MNEMONIC_KEY_STORAGE = 'mnemonic';

export function existsMnemonic(): boolean {
    return localStorage.getItem(MNEMONIC_KEY_STORAGE) != null;
}

export function generateAndSaveMnemonic(secretKey: string): string {
    const mnemonic = bip39.generateMnemonic();
    const ciphered = CryptoJS.AES.encrypt(mnemonic, secretKey).toString();
    localStorage.setItem(MNEMONIC_KEY_STORAGE, ciphered);
    return mnemonic;
}

export function getAndDecipherMnemonic(secretKey: string): string {
    const ciphered = localStorage.getItem(MNEMONIC_KEY_STORAGE) || ''
    const bytes  = CryptoJS.AES.decrypt(ciphered, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}