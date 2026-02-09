export interface IHttpErrorStatus {
    gravity: 'client_error' | 'server_error' | 'rate_limited' | 'redirect';
    summary:
    | 'Authentication Required'
    | 'Access Forbidden'
    | 'Resource Not Found'
    | 'Rate Limit Exceeded'
    | 'Internal Server Error'
    | 'Service Temporarily Unavailable'
    | 'Gateway Error'
    | 'Redirection Required'
    | 'HTTP Error';
    httpCategory: '3xx' | '4xx' | '5xx';
}