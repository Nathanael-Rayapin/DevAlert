import type { IIndicator } from "../index";

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
    indicator: IIndicator['gravity'];
    description: string;
}
