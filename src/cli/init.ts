import chalk from 'chalk';
import ora from 'ora';
import {
    displayWelcome,
    promptConfiguration,
    promptReconfigure,
    displayConfigSummary,
    promptQuickSelection,
} from './prompts';
import {
    loadConfig,
    saveConfig,
    configExists,
    getConfigPath,
    APIS_TO_MONITOR
} from '../index';

/**
 * Configuration initialization command
 * 
 * Flow reasoning:
 * 1. Checks if config exists → proposes to reconfigure
 * 2. Quick menu (all/custom)
 * 3. If custom → display detailed checkbox
 * 4. Request interval + time zone
 * 5. Save
 * 6. Optionally start monitoring
 */
export async function initCommand(): Promise<void> {
    try {
        displayWelcome();

        if (configExists()) {
            console.log(chalk.yellow('Une configuration existe déjà à:'));
            console.log(chalk.gray(`   ${getConfigPath()}\n`));

            const shouldReconfigure = await promptReconfigure();

            if (!shouldReconfigure) {
                console.log(chalk.blue('\nConfiguration conservée.'));
                console.log(chalk.gray('Utilisez'), chalk.cyan('api-monitor start'), chalk.gray('pour démarrer.\n'));
                return;
            }
        }

        const { action } = await promptQuickSelection();

        let selectedApis: string[] = [];

        switch (action) {
            case 'all':
                selectedApis = APIS_TO_MONITOR.map(api => api.id);
                console.log(chalk.green(`\n✅ ${selectedApis.length} APIs sélectionnées\n`));
                break;

            case 'custom':
                // We move on to the detailed selection (no pre-selection).
                break;

            case 'none':
                console.log(chalk.gray('\n👋 Configuration annulée\n'));
                return;
        }

        // If custom selection, display the complete checkbox
        let answers;
        if (action === 'custom') {
            const existingConfig = configExists() ? loadConfig() : undefined;
            answers = await promptConfiguration(existingConfig);
        } else {
            // For “all,” just request interval + time zone
            const existingConfig = loadConfig();
            answers = await promptConfiguration({
                ...existingConfig,
                selectedApis,
            });
        }

        // Display summary
        displayConfigSummary(answers);

        // Backup with visual feedback
        const spinner = ora('Sauvegarde de la configuration...').start();
        await new Promise(resolve => setTimeout(resolve, 300));

        saveConfig({
            selectedApis: answers.selectedApis,
            checkInterval: answers.checkInterval,
            timezone: answers.timezone,
        });

        spinner.succeed(chalk.green('Configuration sauvegardée !'));

        // Shows the next steps
        console.log(chalk.cyan.bold('\n📚 Prochaines étapes:\n'));
        console.log(chalk.white('  1. Démarrer le monitoring:'));
        console.log(chalk.gray('     $ api-monitor start\n'));
        console.log(chalk.white('  2. Vérifier le statut:'));
        console.log(chalk.gray('     $ api-monitor status\n'));
        console.log(chalk.white('  3. Reconfigurer:'));
        console.log(chalk.gray('     $ api-monitor init\n'));

        // Note: Automatic startup will be managed in commands.ts
        console.log(chalk.yellow('💡 Utilisez'), chalk.cyan('api-monitor start'), chalk.yellow('pour démarrer le monitoring\n'));

    } catch (error) {
        if (error instanceof Error) {
            console.error(chalk.red('\n❌ Erreur:'), error.message);
        } else {
            console.error(chalk.red('\n❌ Une erreur inattendue s\'est produite'));
        }
        process.exit(1);
    }
}
