export interface IStatusResponse {
    page: IStatusPage;
    status: IStatusIndicator;
}

export interface IStatusPage {
    id: string;
    name: string;
    url: string;
    time_zone: string;
    updated_at: string;
}

export interface IStatusIndicator {
    indicator: 'none' | 'minor' | 'major' | 'critical';
    description: string;
}
