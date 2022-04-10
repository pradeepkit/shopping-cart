export interface PeriodicElement {
    id: string;
    altl_contact_number: string;
    contact_number: string;
    designation: string;
    email: string;
    first_name: string;
    last_name: string;
    permanent_address: string;
    same_add_check: boolean;
    temporary_address: string;
}
export interface element {
    key: string;
    lookup: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [
    {
        id: '1',
        altl_contact_number: '1234567890',
        contact_number: '1234567890',
        designation: 'Software Engineer',
        email: 'Hydrogen',
        first_name: 'Hydrogen',
        last_name: 'carbon',
        same_add_check: false,
        permanent_address: `Hydrogen is a chemical element with `,
        temporary_address: `Hydrogen is a chemical element w`
    }
]