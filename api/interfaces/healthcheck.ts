import type { StatusValue } from "../data/status-mapping";
import type { IHttpErrorStatus } from "./http-error-status";

export interface IHealthcheckResult {
    url: string;
    status: StatusValue | IHttpErrorStatus;
    statusCode?: number;
    responseTime: number;
    errorMessage?: string;
    timestamp: Date;
}