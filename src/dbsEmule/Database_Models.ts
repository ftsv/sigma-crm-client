interface ManagerProps {
    id: string;
    initials: string;
}

interface IdentityDocumentProps {
    type: string;
    series: string;
    number: number;
    issuedBy: string;
    issuedDate: Date;
}

export interface ClientProps {
    id: string;
    fullName: string;
    contacts: string;
    identityDocument: IdentityDocumentProps;
    casesIds?: string[];
    cases?: any[];
    manager: ManagerProps;
}

export interface SimpleClientProps {
    id: string;
    fullName: string;
    contacts: string;
    identityDocument?: IdentityDocumentProps;
    casesIds?: string[];
    cases?: any[];
    manager?: ManagerProps;
}

export interface CaseListItemProps {
    id: string;
    totalCost: number;
    category: string;
    clientId: string;
    client?: SimpleClientProps,
}