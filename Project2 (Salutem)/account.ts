import { PastSymptom } from "./pastsymptom";


export class Account { // when calling loadIssues()
    accountId: number;
    username: string;
    key:string;
    pastSymptoms: PastSymptom[];
}

