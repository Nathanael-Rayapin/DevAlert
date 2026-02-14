import type { IApiConfig } from "../index";
import { APIS_TO_MONITOR } from "../index";

export function getApisByCategory(): Record<string, IApiConfig[]> {
    return APIS_TO_MONITOR.reduce((acc, api) => {
        (acc[api.category] ||= []).push(api);
        return acc;
    }, {} as Record<string, IApiConfig[]>);
}

export function getApiById(id: string): IApiConfig | undefined {
    return APIS_TO_MONITOR.find(api => api.id === id);
}

export function getApisByIds(ids: string[]): IApiConfig[] {
    return ids
        .map(id => getApiById(id))
        .filter((api): api is IApiConfig => api !== undefined);
}