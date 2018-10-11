export class Symptom {
    ID: number;
    Name: string;
  }

export class BodySymptom {
  ID: number;
  Name: string;
  HasRedFlag: boolean;
  HealthSymptomLocationIDs: string[];
  ProfName: string;
  Synonyms: string[];
}