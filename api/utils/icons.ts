import type { IIndicator } from "../data/status-mapping";

export function getGravityIcon(gravity: IIndicator['gravity']): string {
    const icons = {
        none: '🟢',
        minor: '🟡',
        major: '🔴',
        critical: '⚫',
        maintenance: '🚧'
    };
    return icons[gravity];
}

export function getHttpErrorIcon(
    gravity: 'client_error' | 'server_error' | 'rate_limited' | 'redirect'
): string {
    const icons = {
        client_error: '🔧',
        server_error: '❌',
        rate_limited: '🚦',
        redirect: '🔄'
    };
    return icons[gravity];
}