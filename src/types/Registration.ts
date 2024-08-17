export enum RegistrationStatus {
    Approved = 'approved',
    Review = 'review',
    Reproved = 'reproved',
}

export type Registration = {
    id: string;
    cpf: string;
    status: RegistrationStatus;
    admissionDate: string;
    email: string;
    employeeName: string;
}