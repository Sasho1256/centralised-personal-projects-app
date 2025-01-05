import React, { useState } from 'react';
import { InputField } from '@/types/InputField';

type AbstractFormProps = {
    fields: InputField[];
    onSubmit: (values: Record<string, string | number>) => void;
    submitLabel?: string;
};

const AbstractForm: React.FC<AbstractFormProps> = ({ fields, onSubmit, submitLabel = 'Submit' }) => {
    const [formState, setFormState] = useState<Record<string, string | number>>(
        Object.fromEntries(fields.map((field) => [field.name, field.defaultValue || '']))
    );

    const handleChange = (name: string, value: string | number) => {
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formState);
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                maxWidth: '400px',
                margin: '0 auto',
                backgroundColor: '#f9f9f9',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            {fields.map((field) => (
                <div key={field.name} style={{ marginBottom: '1.5rem' }}>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                        }}
                    >
                        {field.label}:
                    </label>
                    <input
                        type={field.type}
                        value={formState[field.name]}
                        onChange={(e) =>
                            handleChange(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)
                        }
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>
            ))}
            <button
                type="submit"
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                {submitLabel}
            </button>
        </form>
    );
};

export default AbstractForm;
