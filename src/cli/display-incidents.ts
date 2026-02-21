import { formatRelativeTime, getIncidentImpactIcon, getIncidentStatusIcon, IApiConfig, IIncident, INCIDENT_IMPACT, INCIDENT_STATUS, truncate } from "../index";
import chalk from 'chalk';
import Table from 'cli-table3';

function translateStatus(status: string): string {
    switch (status) {
        case INCIDENT_STATUS.INVESTIGATING:
            return 'En investigation';
        case INCIDENT_STATUS.IDENTIFIED:
            return 'Identifie';
        case INCIDENT_STATUS.MONITORING:
            return 'Sous surveillance';
        case INCIDENT_STATUS.RESOLVED:
            return 'Resolu';
        case INCIDENT_STATUS.POSTMORTEM:
            return 'Postmortem';
        default:
            return status;
    }
}

function translateImpact(impact: string): string {
    switch (impact) {
        case INCIDENT_IMPACT.CRITICAL:
            return 'Critique';
        case INCIDENT_IMPACT.MAJOR:
            return 'Majeur';
        case INCIDENT_IMPACT.MINOR:
            return 'Mineur';
        case INCIDENT_IMPACT.NONE:
            return 'Aucun';
        default:
            return impact;
    }
}

function formatIncidentForTable(incident: IIncident): string[] {
    const statusIcon = getIncidentStatusIcon(incident.status);
    const impactIcon = getIncidentImpactIcon(incident.impact);
    const relativeTime = formatRelativeTime(incident.created_at);

    // Ligne 1 : Titre + Status
    const title = `${statusIcon} ${chalk.bold(incident.name)}`;
    const status = `${chalk.gray('Status:')} ${chalk.white(translateStatus(incident.status))}`;

    // Ligne 2 : Impact + Début
    const impact = `${chalk.gray('Impact:')} ${impactIcon} ${chalk.white(translateImpact(incident.impact))}`;
    const started = `${chalk.gray('Debut:')} ${chalk.white(relativeTime)}`;

    // Ligne 3 : Résolution (si applicable)
    let resolved = '';
    if (incident.resolved_at) {
        const resolvedTime = formatRelativeTime(incident.resolved_at);
        resolved = `${chalk.gray('Resolu:')} ${chalk.green(resolvedTime)}`;
    }

    // Ligne 4 : Dernière mise à jour
    let lastUpdate = '';
    if (incident.incident_updates && incident.incident_updates.length > 0) {
        const update = incident.incident_updates[0];
        const updatePreview = truncate(update.body.replace(/\n/g, ' '), 100);
        lastUpdate = `${chalk.gray('Update:')} ${chalk.white(updatePreview)}`;
    }

    // Ligne 5 : Lien
    const link = incident.shortlink
        ? `${chalk.gray('Lien:')} ${chalk.cyan(incident.shortlink)}`
        : '';

    // Construction du contenu
    const lines = [title, status, impact, started];
    if (resolved) lines.push(resolved);
    if (lastUpdate) lines.push(lastUpdate);
    if (link) lines.push(link);

    return [lines.join('\n')];
}

/**
 * Affiche tous les incidents d'une API avec cli-table3
 * 
 * @param api - Configuration de l'API
 * @param incidents - Liste des incidents à afficher
 */
export function displayIncidents(api: IApiConfig, incidents: IIncident[]): void {
    // Créer le tableau avec style
    const table = new Table({
        head: [chalk.bold.cyan(`${api.name} - ${incidents.length} incident(s)`)],
        colWidths: [100],
        style: {
            head: [],
            border: ['gray'],
        },
        wordWrap: true,
    });

    // Ajouter chaque incident comme une ligne
    incidents.forEach((incident) => {
        const formattedIncident = formatIncidentForTable(incident);
        table.push(formattedIncident);
    });

    // Afficher le tableau
    console.log(table.toString());
    console.log('');
}

export function displayNoIncidents(api: IApiConfig): void {
    console.log(chalk.green(`✅ ${api.name}: Aucun incident trouve`));
}