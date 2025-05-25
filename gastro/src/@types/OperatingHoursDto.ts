import { Weekday } from "../utils/weekdayUtils";

export interface OperatingHoursDto {
    weekday: Weekday;
    opensAt: string;
    closesAt: string;
}
