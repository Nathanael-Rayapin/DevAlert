export interface IApiConfig {
    id: string;
    name: string;
    url: string;
    statusUrl: string;
    timeout?: number;
    category: string;
}