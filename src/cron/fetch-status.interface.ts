import type { StatusValue, IHttpErrorStatus } from "../index";

export interface IFetchStatusResult {
    url: string;
    status: StatusValue | IHttpErrorStatus;
    statusCode?: number;
    responseTime: number;
    errorMessage?: string;
    timestamp: Date;
}