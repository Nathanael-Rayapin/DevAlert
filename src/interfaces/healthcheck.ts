import type { StatusValue, IHttpErrorStatus } from "../index";

export interface IHealthcheckResult {
    url: string;
    status: StatusValue | IHttpErrorStatus;
    statusCode?: number;
    responseTime: number;
    errorMessage?: string;
    timestamp: Date;
}