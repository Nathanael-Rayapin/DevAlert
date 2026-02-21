#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './init';
import {
    loadConfig,
    configExists,
    getConfigPath,
    getApisByIds,
    getApisByCategory,
    APIS_TO_MONITOR,
    startHealthcheckScheduler,
    deleteConfig,
    promptIncidentsConfiguration,
    displayIncidentsConfigSummary,
    fetchAllIncidents,
    filterAndSortIncidents,
    displayIncidents
} from '../index';

const program = new Command();

program
    .name('api-monitor')
    .description('Monitor API health status with customizable checks')
    .version('1.0.0');

/**
 * Command: api-monitor init
 * Initializes or reconfigures monitoring
 */
program
    .command('init')
    .description('Initialize or reconfigure the API monitoring')
    .action(async () => {
        await initCommand();
    });

/**
 * Command: api-monitor start
 * Starts monitoring with the saved configuration
 */
program
    .command('start')
    .description('Start the API health monitoring')
    .option('-d, --daemon', 'Run as background daemon (experimental)')
    .action(async (options) => {
        if (!configExists()) {
            console.log(chalk.red('❌ Aucune configuration trouvée'));
            console.log(chalk.yellow('💡 Lancez d\'abord:'), chalk.cyan('api-monitor init\n'));
            process.exit(1);
        }

        const config = loadConfig();

        if (config.selectedApis.length === 0) {
            console.log(chalk.red('❌ Aucune API sélectionnée'));
            console.log(chalk.yellow('💡 Reconfigurez avec:'), chalk.cyan('api-monitor init\n'));
            process.exit(1);
        }

        const selectedApis = getApisByIds(config.selectedApis);

        console.log(chalk.cyan.bold('🚀 Démarrage du monitoring...\n'));
        console.log(chalk.gray('APIs surveillées:'), chalk.white(selectedApis.length));
        console.log(chalk.gray('Intervalle:'), chalk.white(`${config.checkInterval}s`));
        console.log(chalk.gray('Fuseau horaire:'), chalk.white(config.timezone));
        console.log(chalk.gray('─'.repeat(50) + '\n'));

        const job = startHealthcheckScheduler(selectedApis, {
            interval: config.checkInterval,
            timezone: config.timezone,
        });

        process.on('SIGINT', () => {
            console.log(chalk.yellow('\n\n🛑 Arrêt du monitoring...'));
            job.stop();
            console.log(chalk.green('✅ Monitoring arrêté proprement\n'));
            process.exit(0);
        });

        if (options.daemon) {
            console.log(chalk.green('✅ Monitoring démarré en arrière-plan\n'));
            console.log(chalk.gray('Note: Pour un vrai daemon, utilisez pm2 ou systemd'));
        } else {
            console.log(chalk.green('✅ Monitoring actif (Ctrl+C pour arrêter)\n'));
        }
    });

/**
 * Command: api-monitor status
 * Displays the current configuration
 */
program
    .command('status')
    .description('Display current monitoring configuration')
    .action(() => {
        if (!configExists()) {
            console.log(chalk.red('❌ Aucune configuration trouvée'));
            console.log(chalk.yellow('💡 Créez-en une avec:'), chalk.cyan('api-monitor init\n'));
            return;
        }

        const config = loadConfig();
        const selectedApis = getApisByIds(config.selectedApis);

        console.log(chalk.cyan.bold('\nConfiguration actuelle\n'));
        console.log(chalk.gray('─'.repeat(50)));
        console.log(chalk.cyan('Fichier:'), chalk.white(getConfigPath()));
        console.log(chalk.cyan('APIs:'), chalk.white(selectedApis.length + ' sélectionnées'));

        selectedApis.forEach(api => {
            console.log(chalk.gray('  •'), chalk.white(api.name), chalk.gray(`(${api.category})`));
        });

        console.log(chalk.cyan('\nIntervalle:'), chalk.white(`${config.checkInterval}s`));
        console.log(chalk.cyan('Fuseau horaire:'), chalk.white(config.timezone));
        console.log(chalk.cyan('Créée le:'), chalk.white(new Date(config.createdAt).toLocaleString()));
        console.log(chalk.cyan('Modifiée le:'), chalk.white(new Date(config.updatedAt).toLocaleString()));
        console.log(chalk.gray('─'.repeat(50) + '\n'));
    });

/**
 * Command: api-monitor list
 * Lists all available APIs
 */
program
    .command('list')
    .description('List all available APIs to monitor')
    .option('-c, --category <category>', 'Filter by category')
    .action((options) => {
        console.log(chalk.cyan.bold('\nAPIs disponibles\n'));

        if (options.category) {
            const apisByCategory = getApisByCategory();
            const apis = apisByCategory[options.category];

            if (!apis) {
                console.log(chalk.red(`❌ Catégorie "${options.category}" introuvable\n`));
                console.log(chalk.yellow('💡 Catégories disponibles:'));
                Object.keys(apisByCategory).forEach(cat => {
                    console.log(chalk.gray('  •'), chalk.white(cat));
                });
                console.log('');
                return;
            }

            console.log(chalk.yellow.bold(`── ${options.category} ──\n`));
            apis.forEach(api => {
                console.log(chalk.white(api.name));
                console.log(chalk.gray(`   ${api.url}\n`));
            });
        } else {
            const apisByCategory = getApisByCategory();
            const categories = Object.keys(apisByCategory).sort();

            categories.forEach(category => {
                console.log(chalk.yellow.bold(`── ${category} ──`));
                apisByCategory[category]!.forEach(api => {
                    console.log(chalk.gray('  •'), chalk.white(api.name));
                });
                console.log('');
            });

            console.log(chalk.gray(`Total: ${APIS_TO_MONITOR.length} APIs disponibles\n`));
        }
    });

/**
 * Command: api-monitor incidents
 * Displays recent incidents for monitored APIs
 */
program
    .command('incidents')
    .description('Display recent incidents for monitored APIs')
    .action(async () => {
        if (!configExists()) {
            console.log(chalk.red('❌ Aucune configuration trouvée'));
            console.log(chalk.yellow('💡 Lancez d\'abord:'), chalk.cyan('api-monitor init\n'));
            process.exit(1);
        }

        const config = loadConfig();

        if (config.selectedApis.length === 0) {
            console.log(chalk.red('❌ Aucune API sélectionnée'));
            console.log(chalk.yellow('💡 Reconfigurez avec:'), chalk.cyan('api-monitor init\n'));
            process.exit(1);
        }

        const configuredApis = getApisByIds(config.selectedApis);

        try {
            const options = await promptIncidentsConfiguration(configuredApis);
            displayIncidentsConfigSummary(options);

            console.log(chalk.cyan('🔍 Récupération des incidents...\n'));

            const incidentsMap = await fetchAllIncidents(options.apis);

            let totalIncidents = 0;

            for (const api of options.apis) {
                const incidents = incidentsMap.get(api.id) || [];

                const filteredIncidents = filterAndSortIncidents(incidents, {
                    filterType: options.filterType,
                    days: options.days,
                });

                if (filteredIncidents.length > 0) {
                    displayIncidents(api, filteredIncidents);
                    totalIncidents += filteredIncidents.length;
                } else {
                    console.log(chalk.green(`✅ ${api.name}: Aucun incident`));
                }
            }

            console.log(chalk.gray('\n─'.repeat(50)));
            console.log(chalk.bold(`Total: ${totalIncidents} incident(s) trouvé(s)`));
            console.log(chalk.gray('─'.repeat(50) + '\n'));

        } catch (error) {
            if (error instanceof Error) {
                console.error(chalk.red('\n❌ Erreur:'), error.message);
            } else {
                console.error(chalk.red('\n❌ Une erreur inattendue s\'est produite'));
            }
            process.exit(1);
        }
    });

/**
 * Command: api-monitor reset
 * Deletes the configuration
 */
program
    .command('reset')
    .description('Delete current configuration')
    .action(() => {
        if (!configExists()) {
            console.log(chalk.yellow('⚠️ Aucune configuration à supprimer\n'));
            return;
        }

        deleteConfig();
        console.log(chalk.green('✅ Configuration supprimée\n'));
        console.log(chalk.yellow('💡 Créez une nouvelle config avec:'), chalk.cyan('api-monitor init\n'));
    });

program.parse();

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
