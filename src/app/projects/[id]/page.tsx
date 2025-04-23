'use client';

import { notFound, useParams } from 'next/navigation';
import { projects } from '@/types/projects';
import AbstractForm from '@/components/AbstractForm';
import AbstractResult from '@/components/AbstractResult';
import { useState } from 'react';
import { InputField } from '@/types/InputField';
import { calc } from '@/utils/calc';
import { avgSchoolGradesCalc, batteryHealthCalc, caesarCipher, caesarCipherReverse, digitSumCalc, passwordGenerator, isPrime, playerPicker, textReverse, coinFlip, rollDice, toCamelCase } from '@/utils/businessFunctions';
import { hornerFactorization } from '@/utils/horner';

export default function ProjectPage() {
    const params = useParams();
    const project = projects.find((p) => p.id === params?.id);

    if (!project) {
        notFound();
    }

    const [result, setResult] = useState<string | Record<string, any> | null>(null);

    const fields: InputField[] = (() => {
        switch (params.id) {
            case 'base64encode':
                return [
                    { name: 'stringToEncode', label: 'Plain text', type: 'text' },
                ];
            case 'base64decode':
                return [
                    { name: 'encodedString', label: 'Encoded string', type: 'text' },
                ];
            case 'caesarCipher':
                return [
                    { name: 'stringToEncode', label: 'Plain text', type: 'text' },
                    { name: 'keyLetter', label: 'Key letter', type: 'text' },
                ];
            case 'caesarCipherReverse':
                return [
                    { name: 'stringToDecode', label: 'Caesar cipher code', type: 'text' },
                    { name: 'keyLetter', label: 'Key letter', type: 'text' },
                ];
            case 'calc':
                return [
                    { name: 'input', label: 'Input sequence', type: 'text' },
                ];
            case 'avgSchoolGradesCalc':
                return [
                    { name: 'input', label: 'Grades', type: 'text' },
                ];
            case 'batteryHealthCalc':
                return [
                    { name: 'designCapacity', label: 'Design capacity WH', type: 'text' },
                    { name: 'currentCapacity', label: 'Current full charge capacity WH', type: 'text' },
                ];
            case 'digitSumCalc':
                return [
                    { name: 'number', label: 'Number', type: 'number' },
                ];
            case 'hornerFactorization':
                return [
                    { name: 'coefficients', label: 'Polynomial coefficients (comma separated)', type: 'text' },
                ];
            case 'passwordGenerator':
                return [
                    { name: 'lower', label: 'Lower case letters', type: 'checkbox' },
                    { name: 'upper', label: 'Upper case letters', type: 'checkbox' },
                    { name: 'symbols', label: 'Special symbols', type: 'checkbox' },
                    { name: 'digits', label: 'Digits', type: 'checkbox' },
                    { name: 'length', label: 'Password length', type: 'number' },
                ];
            case 'primeNumbers':
                return [
                    { name: 'number', label: 'Number', type: 'number' },
                ];
            case 'playerPicker':
                return [
                    { name: 'players', label: 'Players (comma separated)', type: 'text' },
                    { name: 'pickDirection', label: 'Pick direction', type: 'checkbox' },
                ];
            case 'textReverse':
                return [
                    { name: 'text', label: 'Text', type: 'text' },
                ];
            case 'coinFlip':
                return [
                    { name: 'hidden', label: 'Flip', type: 'hidden' },
                ];
            case 'rollDice':
                return [
                    { name: 'diceCount', label: 'Dice amount', type: 'number', defaultValue: 1 },
                ];
            case 'toCamelCase':
                return [
                    { name: 'text', label: 'Dice amount', type: 'text' },
                ];

            default:
                return [];
        }
    })();

    const handleSubmit = (values: Record<string, string | number | boolean>) => {
        switch (params.id) {
            case 'base64encode':
                setResult({ Encoded: btoa(String(values.stringToEncode)) });
                break;
            case 'base64decode':
                setResult({ Decoded: atob(String(values.encodedString)) });
                break;
            case 'caesarCipher':
                setResult({ Encrypted: caesarCipher(String(values.stringToEncode), String(values.keyLetter)) });
                break;
            case 'caesarCipherReverse':
                setResult({ Decrypted: caesarCipherReverse(String(values.stringToDecode), String(values.keyLetter)) });
                break;
            case 'calc':
                setResult({ Result: calc(String(values.input)) });
                break;
            case 'avgSchoolGradesCalc':
                setResult(avgSchoolGradesCalc(String(values.input)));
                break;
            case 'batteryHealthCalc':
                setResult({ Battery_Health: batteryHealthCalc(Number(values.designCapacity), Number(values.currentCapacity)) + '%' });
                break;
            case 'digitSumCalc':
                setResult({ Sum: digitSumCalc(Number(values.number)) });
                break;
            case 'hornerFactorization':
                setResult({ Result: hornerFactorization(String(values.coefficients)) });
                break;
            case 'passwordGenerator':
                const criterias = {
                    lower: values.lower ? true : false,
                    upper: values.upper ? true : false,
                    symbols: values.symbols ? true : false,
                    digits: values.digits ? true : false,
                }

                setResult({ Password: passwordGenerator(criterias, Number(values.length)) });
                break;
            case 'primeNumbers':
                setResult({ Is_prime: isPrime(Number(values.number)) });
                break;
            case 'playerPicker':
                setResult(playerPicker(String(values.players), values.pickDirection ? true : false));
                break;
            case 'textReverse':
                setResult(textReverse(String(values.text)));
                break;
            case 'coinFlip':
                setResult(coinFlip());
                break;
            case 'rollDice':
                setResult({ Dice: rollDice(Number(values.diceCount)) });
                break;
            case 'toCamelCase':
                setResult(toCamelCase(String(values.text)));
                break;

            default:
                setResult({ empty: 0 });
                break;
        }
    };

    return (
        <div
            style={{
                padding: '2rem',
                margin: '0 auto',
                maxWidth: '600px',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h1
                style={{
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    color: '#333',
                }}
            >
                {project.name}
            </h1>
            <p
                style={{
                    fontSize: '1rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    color: '#555',
                }}
            >
                {project.description}
            </p>
            {fields.length > 0 && (
                <>
                    <AbstractForm fields={fields} onSubmit={handleSubmit} />
                    <AbstractResult result={result} />
                </>
            )}
        </div>
    );
}
