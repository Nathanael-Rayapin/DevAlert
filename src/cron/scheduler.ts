import { Cron } from 'croner';
import { performJsonHealthcheck, isApiStatus, isHttpError, getGravityIcon, getHttpErrorIcon, ISchedulerOptions } from '../index';
import { type IApiConfig } from '../index';

/**
 * Checks the status of all selected APIs.
 * 
 * - Promise.allSettled() allows the process to continue even if one API fails.
 * - Each API is checked in parallel (performance).
 * - The results are displayed with colored icons.
 */
async function checkAllApis(apis: IApiConfig[]): Promise<void> {
    console.log(`Start of health check - ${new Date().toISOString()}`);

    const promises = apis.map(api =>
        performJsonHealthcheck(api.statusUrl, api.timeout)
    );

    const results = await Promise.allSettled(promises);

    results.forEach((result, index) => {
        const api = apis[index];
        if (!api) return;

        if (result.status === 'fulfilled') {
            const check = result.value;

            // Case 1: API returns a normal status (none, minor, major, critical, maintenance)
            if (isApiStatus(check.status)) {
                const icon = getGravityIcon(check.status.gravity);
                console.log(
                    `${icon} ${api.name}: ${check.status.summary} ` +
                    `(${check.responseTime}ms) [${check.status.gravity}]`
                );
            }

            // Case 2: HTTP error (4xx, 5xx)
            if (isHttpError(check.status)) {
                const icon = getHttpErrorIcon(check.status.gravity);
                console.log(
                    `${icon} ${api.name}: ${check.status.summary} ` +
                    `[HTTP ${check.statusCode}] (${check.responseTime}ms) ` +
                    `- ${check.status.httpCategory}`
                );
            }
        } else {
            // Case 3: Promise rejected (timeout, network error, etc.)
            console.error(`❌ ${api.name}: ÉCHEC - ${result.status}`);
        }
    });

    console.log(`Healthcheck terminé\n`);
}

export function startHealthcheckScheduler(
    apis: IApiConfig[],
    options: ISchedulerOptions
): Cron {
    const cronPattern = options.interval >= 60
        // In minutes
        ? `0 */${Math.floor(options.interval / 60)} * * * *`
        // In seconds
        : `*/${options.interval} * * * * *`;

    const job = new Cron(
        cronPattern,
        {
            name: 'api-healthcheck',
            timezone: options.timezone,
            catch: (error) => {
                console.error('❌ Erreur dans le cron job:', error);
            }
        },
        async () => {
            await checkAllApis(apis);
        }
    );

    console.log(`⏰ Cron job démarré : healthcheck toutes les ${options.interval}s`);
    console.log(`📅 Prochaine exécution : ${job.nextRun()?.toISOString()}`);

    return job;
}

export function stopHealthcheckScheduler(job: Cron): void {
    job.stop();
    console.log('🛑 Cron job arrêté');
}

export async function runImmediateHealthcheck(apis: IApiConfig[]): Promise<void> {
    console.log('🔍 Healthcheck immédiat...\n');
    await checkAllApis(apis);
}