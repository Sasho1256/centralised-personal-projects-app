import React from 'react';

type AbstractResultProps = {
    result: string | Record<string, any> | null;
};

const AbstractResult: React.FC<AbstractResultProps> = ({ result }) => {
    if (!result) {
        return null;
    }

    return (
        <div
            style={{
                marginTop: '2rem',
                padding: '1.5rem',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <h2
                style={{
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    color: '#333',
                }}
            >
                Result
            </h2>
            {typeof result === 'string' ? (
                <p
                    style={{
                        fontSize: '1.2rem',
                        textAlign: 'center',
                        color: '#555',
                    }}
                >
                    {result}
                </p>
            ) : (
                <pre
                    style={{
                        backgroundColor: '#f9f9f9',
                        padding: '1rem',
                        borderRadius: '8px',
                        overflowX: 'auto',
                        fontSize: '1rem',
                        color: '#444',
                        lineHeight: '1.5',
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default AbstractResult;
