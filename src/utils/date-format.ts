export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) {
        return 'a l\'instant';
    } else if (diffMins < 60) {
        return `il y a ${diffMins} min`;
    } else if (diffHours < 24) {
        return `il y a ${diffHours}h`;
    } else if (diffDays === 1) {
        return 'hier';
    } else if (diffDays < 7) {
        return `il y a ${diffDays} jours`;
    } else {
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }
}