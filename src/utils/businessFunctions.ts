import { Criterias } from "@/types/criterias";

export const avgSchoolGradesCalc = (input: string): {} => {
    const grades: number[] = input.split(' ').map(Number);

    const sum = grades.reduce((acc, grade) => acc + grade, 0);
    const count = grades.length;

    const avg = sum / count;

    return {
        Sum: sum,
        Count: count,
        Avg: avg,
        Avg_f2: avg.toFixed(2),
    }
}

export const batteryHealthCalc = (designCapacity: number, currentCapacity: number) => {
    const batteryHealth = 100 * currentCapacity / designCapacity;
    return batteryHealth.toFixed(2);
}

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

export const caesarCipherReverse = (input: string, key: string): string => {
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
            ch = String.fromCharCode(((ch.charCodeAt(0) - 'a'.charCodeAt(0) - num + 26) % 26) + 'a'.charCodeAt(0));
        }

        output += ch;
    }

    return output;
};

export const digitSumCalc = (number: number) => {
    let sum = 0;

    while (number > 0) {
        sum += number % 10;
        number = Math.trunc(number / 10);
    }

    return sum;
}

export const passwordGenerator = (criterias: Criterias, length: number) => {

    if (length < 1) {
        console.error('Invalid length input.');
        return "Invalid length input."
    }

    const lowerLettersBase = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.toLowerCase().split(' ');
    const upperLettersBase = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(' ');
    const symbolsBase = '! # $ % & \' ( ) * + , - . / : ; < = > ? @ { } [ ] ^ _ { }'.split(' ');
    const digitsBase = '1 2 3 4 5 6 7 8 9 0'.split(' ');

    const base: string[] = [];

    if (criterias.lower) {
        base.push(...lowerLettersBase)
    }
    if (criterias.upper) {
        base.push(...upperLettersBase)
    }
    if (criterias.symbols) {
        base.push(...symbolsBase)
    }
    if (criterias.digits) {
        base.push(...digitsBase)
    }

    if (!base.length) {
        base.push(...lowerLettersBase)
        base.push(...upperLettersBase)
        base.push(...symbolsBase)
        base.push(...digitsBase)
    }

    let password = '';

    for (let i = 0; i < length; i++) {
        password = password.concat(base[Math.floor(base.length * Math.random())])
    }

    return password;
}

export const isPrime = (num: number) => {
    const numAbs = Math.abs(num)

    if (numAbs === 1 || numAbs === 0) {
        return false;
    }

    let count = 0;

    for (let i = 1; i <= numAbs; i++) {
        if (Number.isInteger(numAbs / i)) {
            count++;
        }
    }


    if (count === 2) {
        return true;
    }

    return false
}

export const playerPicker = (players: string, pickDirection: boolean) => {
    const playerArray = players.split(',');

    const chosen = playerArray[Math.floor(playerArray.length * Math.random())];

    return {
        Player: chosen,
        Direction: pickDirection ? Math.random() * 2 < 1 ? 'Clockwise' : 'Counter clockwise' : ':)',
    }
}

export const textReverse = (str: string) => {
    const stringArray = str.split('');

    let reversed = '';

    for (let i = stringArray.length - 1; i >= 0; i--) {
        reversed = reversed.concat(stringArray[i]);
    }

    return reversed
}

export const coinFlip = () => {
    const coin = ['Heads', 'Tails'];

    const chosen = coin[Math.floor(coin.length * Math.random())];

    return chosen;
}

export const rollDice = (diceCount: number) => {

    if (diceCount < 1) {
        console.error('Invalid input.');
        return "Invalid input."
    }

    const dieSides = [1, 2, 3, 4, 5, 6];
    const result: Record<number, number> = {};

    for (let i = 0; i < diceCount; i++) {
        const chosen = dieSides[Math.floor(dieSides.length * Math.random())];

        result[i] = chosen;
    }

    return result;
}

export const toCamelCase = (text: string) => {

    const stringArray = text.split('');

    let result = '';

    for (let i = 0; i < stringArray.length; i++) {
        if (Number.isInteger(i / 2)) {
            result = result.concat(stringArray[i].toLowerCase());
        } else {
            result = result.concat(stringArray[i].toUpperCase());
        }
    }

    return result
}
