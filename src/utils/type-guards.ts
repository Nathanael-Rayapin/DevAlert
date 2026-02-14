import type { StatusValue, IHttpErrorStatus } from "../index";

export function isApiStatus(status: StatusValue | IHttpErrorStatus): status is StatusValue {
    return 'gravity' in status && ['none', 'minor', 'major', 'critical', 'maintenance'].includes(status.gravity);
}

export function isHttpError(status: StatusValue | IHttpErrorStatus): status is IHttpErrorStatus {
    return 'httpCategory' in status;
}