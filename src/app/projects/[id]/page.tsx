'use client';

import { notFound, useParams } from 'next/navigation';
import { projects } from '@/types/projects';
import AbstractForm from '@/components/AbstractForm';
import AbstractResult from '@/components/AbstractResult';
import { useState } from 'react';
import { InputField } from '@/types/InputField';
import { caesarCipher } from '@/utils/caesarCipher';
import { caesarCipherReverse } from '@/utils/caesarCipherReverse';
import { calc } from '@/utils/calc';
import { avgSchoolGradesCalc } from '@/utils/avgSchoolGradesCalc';
import { batteryHealthCalc } from '@/utils/batteryHealthCalc';
import { digitSumCalc } from '@/utils/digitSumCalc';

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

            default:
                return [];
        }
    })();

    const handleSubmit = (values: Record<string, string | number>) => {
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
                setResult({ Encrypted: caesarCipherReverse(String(values.stringToDecode), String(values.keyLetter)) });
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
