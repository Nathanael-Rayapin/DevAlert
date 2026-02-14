import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export interface UserConfig {
    selectedApis: string[];
    checkInterval: number;
    timezone: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Path to the configuration file in the user's home directory
 * 
 * Reasoning :
 * - Linux/Mac: /home/user/.api-health-monitor/config.json
 * - Windows: C:\Users\User\.api-health-monitor\config.json
 */
const CONFIG_DIR = path.join(os.homedir(), '.api-health-monitor');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

/**
 * Default configuration
 */
const DEFAULT_CONFIG: UserConfig = {
    selectedApis: [],
    checkInterval: 60,
    timezone: 'Europe/Paris',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

/**
 * Creates the configuration folder if it does not exist
 */
function ensureConfigDir(): void {
    if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
}

/**
 * Load user configuration
 */
export function loadConfig(): UserConfig {
    try {
        if (!fs.existsSync(CONFIG_FILE)) {
            return { ...DEFAULT_CONFIG };
        }

        const rawConfig = fs.readFileSync(CONFIG_FILE, 'utf-8');
        const config = JSON.parse(rawConfig);

        if (!Array.isArray(config.selectedApis)) {
            console.warn('Configuration invalide, utilisation de la config par défaut');
            return { ...DEFAULT_CONFIG };
        }

        return config;
    } catch (error) {
        console.error('❌ Erreur lors du chargement de la config:', error);
        return { ...DEFAULT_CONFIG };
    }
}

/**
 * Saves user configuration
 * 
 * @param config - Partial configuration to be merged with the existing one
 */
export function saveConfig(config: Partial<UserConfig>): void {
    try {
        ensureConfigDir();

        const currentConfig = loadConfig();
        const updatedConfig: UserConfig = {
            ...currentConfig,
            ...config,
            updatedAt: new Date().toISOString(),
        };

        fs.writeFileSync(
            CONFIG_FILE,
            JSON.stringify(updatedConfig, null, 2),
            'utf-8'
        );

        console.log('Configuration sauvegardée avec succès');
    } catch (error) {
        console.error('❌ Erreur lors de la sauvegarde de la config:', error);
        throw error;
    }
}

/**
 * Deletes user configuration
 */
export function deleteConfig(): void {
    try {
        if (fs.existsSync(CONFIG_FILE)) {
            fs.unlinkSync(CONFIG_FILE);
            console.log('🗑️ Configuration supprimée');
        }
    } catch (error) {
        console.error('❌ Erreur lors de la suppression de la config:', error);
    }
}

/**
 * Returns the full path of the configuration file
 */
export function getConfigPath(): string {
    return CONFIG_FILE;
}

/**
 * Check if a configuration exists
 */
export function configExists(): boolean {
    return fs.existsSync(CONFIG_FILE);
}
