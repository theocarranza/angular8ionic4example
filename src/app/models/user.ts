export interface User {
    id: number;
    fullName: string;
    login?: string;
    email: string;
    password?: string;
    cpf?: string;
    phone?: string;
    authdata?: string;
}