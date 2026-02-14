import type { ApiConfig } from "../index";
import { APIS_TO_MONITOR } from "../index";

export function getApisByCategory(): Record<string, ApiConfig[]> {
    return APIS_TO_MONITOR.reduce((acc, api) => {
        (acc[api.category] ||= []).push(api);
        return acc;
    }, {} as Record<string, ApiConfig[]>);
}

export function getApiById(id: string): ApiConfig | undefined {
    return APIS_TO_MONITOR.find(api => api.id === id);
}

export function getApisByIds(ids: string[]): ApiConfig[] {
    return ids
        .map(id => getApiById(id))
        .filter((api): api is ApiConfig => api !== undefined);
}