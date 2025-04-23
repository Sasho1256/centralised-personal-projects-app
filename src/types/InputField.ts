export type InputField = {
    name: string;
    label: string;
    type: 'text' | 'number' | 'password' | 'email' | 'checkbox' | 'hidden';
    defaultValue?: string | number;
};