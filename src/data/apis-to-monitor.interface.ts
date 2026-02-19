export interface IApiConfig {
    id: string;
    name: string;
    url: string;
    statusUrl: string;
    incidentsUrl: string;
    timeout?: number;
    category: string;
}