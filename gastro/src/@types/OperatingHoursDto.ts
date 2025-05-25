import { Weekday } from "../utils/weekdayUtils";

export interface OperatingHoursDto {
    weekday: Weekday;
    opensAt: string;
    closesAt: string;
}

export interface OpeningPeriodDto {
  id?: string;
  periodId?: string;
  weekday: string; // 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN' | 'HOL'
  opensAt: string;
  closesAt: string;
}

export interface LocalOperatingHour {
  day: string;
  openTime: string;
  closeTime: string;
  weekday: string;
}
