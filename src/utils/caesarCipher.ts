export const caesarCipher = (input: string, key: string): string => {
    const trimChars = [' ', '.', ','];
    let text = input.toLowerCase().trim();

    for (const char of trimChars) {
        text = text.replace(char, '');
    }

    const num = key.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);    
    let output = '';

    for (let i = 0; i < text.length; i++) {
        let ch = text[i];

        if (ch >= 'a' && ch <= 'z') {
            ch = String.fromCharCode(((ch.charCodeAt(0) - 'a'.charCodeAt(0) + num) % 26) + 'a'.charCodeAt(0));
        }

        output += ch;
    }

    return output;
};