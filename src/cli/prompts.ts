import { select, checkbox, confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import { APIS_TO_MONITOR, getApisByCategory } from '../index';
import type { UserConfig } from '../index';

interface ConfigAnswers {
    selectedApis: string[];
    checkInterval: number;
    timezone: string;
}

/**
 * Displays the welcome header
 */
export function displayWelcome(): void {
    console.clear();
    console.log(chalk.cyan.bold(`
╔═══════════════════════════════════════════╗
║                                           ║
║     API HEALTH MONITOR                    ║
║     Monitor your favorite APIs            ║
║                                           ║
╚═══════════════════════════════════════════╝
    `));
    console.log(chalk.gray('v1.0.0 - Powered by Statuspage.io\n'));
}

/**
 * Create choices for the checkbox with category separators
 */
function createApiChoices() {
    const choices: any[] = [];
    const apisByCategory = getApisByCategory();
    const sortedCategories = Object.keys(apisByCategory).sort();

    sortedCategories.forEach((category, index) => {
        // Add separator between categories
        if (index > 0) {
            choices.push({ type: 'separator' });
        }

        // Category header
        choices.push({ 
            type: 'separator',
            separator: chalk.bold.yellow(`── ${category} ──`)
        });

        // Add APIs from this category
        apisByCategory[category]!.forEach(api => {
            choices.push({
                name: api.name,
                value: api.id,
                checked: false,
            });
        });
    });

    return choices;
}

/**
 * Main configuration prompt
 */
export async function promptConfiguration(
    existingConfig?: Partial<UserConfig>
): Promise<ConfigAnswers> {
    console.log(chalk.blue.bold('Configuration de votre monitoring\n'));

    // Step 1: Select APIs
    const selectedApis = await checkbox<string>({
        message: chalk.cyan('Selectionnez les APIs a surveiller (Espace = cocher, Entree = valider):'),
        choices: createApiChoices(),
        pageSize: 20,
        required: true,
        validate: (choices) => {
            if (choices.length === 0) {
                return 'Vous devez selectionner au moins une API';
            }
            return true;
        },
    });

    // Step 2: Select check interval
    const checkInterval = await select({
        message: chalk.cyan('A quelle frequence verifier le statut ?'),
        choices: [
            { name: '30 secondes', value: 30 },
            { name: '1 minute (recommandé)', value: 60 },
            { name: '5 minutes', value: 300 },
            { name: '15 minutes', value: 900 },
            { name: '30 minutes', value: 1800 },
        ],
        default: existingConfig?.checkInterval || 60,
    });

    // Step 3: Select timezone
    const timezone = await select({
        message: chalk.cyan('Selectionnez votre fuseau horaire:'),
        choices: [
            { name: 'Europe/Paris', value: 'Europe/Paris' },
            { name: 'Europe/London', value: 'Europe/London' },
            { name: 'America/New_York', value: 'America/New_York' },
            { name: 'America/Los_Angeles', value: 'America/Los_Angeles' },
            { name: 'Asia/Tokyo', value: 'Asia/Tokyo' },
            { name: 'UTC', value: 'UTC' },
        ],
        default: existingConfig?.timezone || 'Europe/Paris',
    });

    return {
        selectedApis,
        checkInterval,
        timezone
    };
}

/**
 * Displays a summary of the configuration
 */
export function displayConfigSummary(config: ConfigAnswers): void {
    console.log(chalk.green.bold('\nConfiguration terminee!\n'));

    console.log(chalk.bold('Resumé:'));
    console.log(chalk.gray('─'.repeat(50)));

    console.log(chalk.cyan('APIs selectionnees:'), chalk.white(config.selectedApis.length));
    config.selectedApis.forEach(apiId => {
        const api = APIS_TO_MONITOR.find(a => a.id === apiId);
        if (api) {
            console.log(chalk.gray('  •'), chalk.white(api.name));
        }
    });

    console.log(chalk.cyan('\nIntervalle:'), chalk.white(`${config.checkInterval}s`));
    console.log(chalk.cyan('Fuseau horaire:'), chalk.white(config.timezone));
    console.log(chalk.gray('─'.repeat(50) + '\n'));
}

/**
 * Ask if the user wants to reconfigure
 */
export async function promptReconfigure(): Promise<boolean> {
    const reconfigure = await confirm({
        message: chalk.yellow('Une configuration existe deja. Voulez-vous la reconfigurer ?'),
        default: false,
    });

    return reconfigure;
}

/**
 * Quick selection menu
 */
export async function promptQuickSelection(): Promise<{
    action: 'all' | 'none' | 'custom';
}> {
    const action = await select({
        message: chalk.cyan('Configuration rapide:'),
        choices: [
            {
                name: 'Toutes les APIs disponibles',
                value: 'all'
            },
            {
                name: 'Selection personnalisee',
                value: 'custom'
            },
            {
                name: 'Annuler',
                value: 'none'
            },
        ],
    });

    return { action: action as 'all' | 'none' | 'custom' };
}