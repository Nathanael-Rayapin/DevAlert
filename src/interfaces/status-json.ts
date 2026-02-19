import type { IIndicator, IPageInfo } from "../index";

export interface IStatusResponse {
    page: IPageInfo;
    status: IStatusIndicator;
}

export interface IStatusIndicator {
    indicator: IIndicator['gravity'];
    description: string;
}
