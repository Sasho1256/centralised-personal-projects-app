export type InputField = {
    name: string;
    label: string;
    type: 'text' | 'number' | 'password' | 'email';
    defaultValue?: string | number;
};