import { IncidentImpact, IncidentStatus } from "../index";
import { IPageInfo } from "./page-info-json";

export interface IIncidentsResponse {
    page: IPageInfo;
    incidents: IIncident[];
}

export interface IIncident {
    id: string;
    name: string;
    status: IncidentStatus;
    created_at: string;
    updated_at: string;
    monitoring_at: string | null;
    resolved_at: string | null;
    impact: IncidentImpact;
    shortlink: string;
    started_at: string;
    page_id: string;
    incident_updates: IIncidentUpdate[];
}

export interface IIncidentUpdate {
    id: string;
    status: IncidentStatus;
    body: string;
    incident: string;
    created_at: string;
    updated_at: string;
    display_at: string;
}