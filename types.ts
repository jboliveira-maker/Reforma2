
export interface School {
  id: number;
  name: string;
  description: string;
  segment: string;
  students: number;
  neighborhood: string;
  macroRegion: string;
  region: string;
  investment: number;
}

export interface SummaryStats {
  totalInvestment: number;
  totalStudents: number;
  schoolCount: number;
}
