export type Weekday = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export function mapToWeekday(day: string): Weekday | undefined {
    const mapping: { [key: string]: Weekday } = {
        'Segunda': 'MON',
        'Terça': 'TUE',
        'Quarta': 'WED',
        'Quinta': 'THU',
        'Sexta': 'FRI',
        'Sábado': 'SAT',
        'Domingo': 'SUN',
    };

    return mapping[day];
}

export function mapFromWeekday(weekday: Weekday): string {
    const reverseMapping: { [key in Weekday]: string } = {
        MON: 'Segunda',
        TUE: 'Terça',
        WED: 'Quarta',
        THU: 'Quinta',
        FRI: 'Sexta',
        SAT: 'Sábado',
        SUN: 'Domingo',
    };

    return reverseMapping[weekday];
}