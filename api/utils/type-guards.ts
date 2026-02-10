import type { StatusValue } from "../data/status-mapping";
import type { IHttpErrorStatus } from "../interfaces/http-error-status";

export function isApiStatus(status: StatusValue | IHttpErrorStatus): status is StatusValue {
    return 'gravity' in status && ['none', 'minor', 'major', 'critical', 'maintenance'].includes(status.gravity);
}

export function isHttpError(status: StatusValue | IHttpErrorStatus): status is IHttpErrorStatus {
    return 'httpCategory' in status;
}