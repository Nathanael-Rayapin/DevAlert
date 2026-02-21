import { IApiConfig, IncidentFilterType } from "../index";

export interface IIncidentsDisplayOptions {
    apis: IApiConfig[];
    days: number;
    filterType: IncidentFilterType;
}