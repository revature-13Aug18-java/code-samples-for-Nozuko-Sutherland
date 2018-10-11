export class Issue {
    ID: number;
    Name: string;
    Accuracy: number;
    Icd: string;
    IcdName: string;
    ProfName: string;
    Ranking: number;
}

export class Specialisation {
    ID: number;
    Name: string;
    SpecialistID: number;
}

export class Diagnosis {
    Issue: Issue;
    Specialisation: Specialisation[];
}




