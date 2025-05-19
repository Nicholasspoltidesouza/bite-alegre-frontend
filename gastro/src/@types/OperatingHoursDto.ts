export interface OperatingHoursDto {
  day: string;
  periods: {
    startTime: string;
    endTime: string;
  }[];
};
