import { IApiConfig } from "../index";
import { select } from '@inquirer/prompts';
import type { IIncidentsDisplayOptions, IncidentFilterType } from '../index';
import chalk from 'chalk';

/**
 * Asks the user if they want all APIs or just one.
 * 
 * @param configuredApis - List of APIs configured by the user.
 * @returns List of selected APIs.
 */
export async function promptSelectApis(configuredApis: IApiConfig[]): Promise<IApiConfig[]> {
    const choice = await select({
        message: chalk.cyan('Afficher les incidents pour:'),
        choices: [
            {
                name: 'Toutes mes APIs configurées',
                value: 'all'
            },
            {
                name: 'Selectionner une API specifique',
                value: 'select'
            },
        ],
    });

    if (choice === 'all') {
        return configuredApis;
    }

    const selectedApiId = await select({
        message: chalk.cyan('Quelle API ?'),
        choices: configuredApis.map(api => ({
            name: `${api.name} (${api.category})`,
            value: api.id,
        })),
    });

    const selectedApi = configuredApis.find(api => api.id === selectedApiId);
    return selectedApi ? [selectedApi] : [];
}

/**
 * Requests how many days to go back in history.
 * 
 * @returns Number of days (0 = all)
 */
export async function promptDaysFilter(): Promise<number> {
    const choice = await select({
        message: chalk.cyan('Remonter combien de jours dans l\'historique ?'),
        choices: [
            { name: 'Tous les incidents disponibles', value: 0 },
            { name: 'Derniers 7 jours', value: 7 },
            { name: 'Derniers 14 jours', value: 14 },
            { name: 'Dernier mois (30 jours)', value: 30 },
            { name: 'Derniers 3 mois (90 jours)', value: 90 },
        ],
    });

    return choice;
}

/**
 * Requests which type of incidents to display.
 * 
 * @returns Filter type.
 */
export async function promptStatusFilter(): Promise<IncidentFilterType> {
    const filterType = await select<IncidentFilterType>({
        message: chalk.cyan('Quel type d\'incidents afficher ?'),
        choices: [
            { name: 'Tous les incidents', value: 'all' },
            { name: 'Non resolus uniquement', value: 'unresolved' },
            { name: 'Resolus uniquement', value: 'resolved' },
            { name: 'Postmortem uniquement', value: 'postmortem' },
        ],
    });

    return filterType;
}

/**
 * Complete prompt for configuring incident display
 * 
 * @param configuredApis - APIs configured by the user
 * @returns Complete display options
 */
export async function promptIncidentsConfiguration(
    configuredApis: IApiConfig[]
): Promise<IIncidentsDisplayOptions> {
    console.log(chalk.blue.bold('\nConfiguration de l\'affichage des incidents\n'));

    const apis = await promptSelectApis(configuredApis);

    if (apis.length === 0) {
        throw new Error('Aucune API sélectionnée');
    }

    const days = await promptDaysFilter();

    const filterType = await promptStatusFilter();

    return {
        apis,
        days,
        filterType,
    };
}

/**
 * Displays a summary of the selected options.
 * 
 * @param options - Selected options.
 */
export function displayIncidentsConfigSummary(options: IIncidentsDisplayOptions): void {
    console.log(chalk.gray('\n─'.repeat(10)));
    console.log(chalk.bold('Configuration:'));
    console.log(chalk.cyan('APIs:'), chalk.white(
        options.apis.length === 1
            ? options.apis[0].name
            : `${options.apis.length} APIs`
    ));
    console.log(chalk.cyan('Periode:'), chalk.white(
        options.days === 0
            ? 'Tous les incidents'
            : `${options.days} derniers jours`
    ));
    console.log(chalk.cyan('Filtre:'), chalk.white(
        options.filterType === 'all' ? 'Tous' :
            options.filterType === 'unresolved' ? 'Non resolus' :
                options.filterType === 'resolved' ? 'Resolus' :
                    'Postmortem'
    ));
    console.log(chalk.gray('─'.repeat(50) + '\n'));
}