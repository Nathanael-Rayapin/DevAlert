import { Cron } from 'croner';
import { performJsonHealthcheck } from './healthcheck';
import { isApiStatus, isHttpError } from '../utils/type-guards';
import { getGravityIcon, getHttpErrorIcon } from '../utils/icons';
import { APIS_TO_MONITOR } from '../data/apis-to-monitor';

async function checkAllApis(): Promise<void> {
    console.log(`Start of health check - ${new Date().toISOString()}`);

    const promises = APIS_TO_MONITOR.map(api =>
        performJsonHealthcheck(api.url, api.timeout)
    );

    const results = await Promise.allSettled(promises);    

    results.forEach((result, index) => {
        const api = APIS_TO_MONITOR[index];
        if (!api) return;

        if (result.status === 'fulfilled') {
            const check = result.value;

            if (isApiStatus(check.status)) {
                const icon = getGravityIcon(check.status.gravity);
                console.log(
                    `${icon} ${api.name}: ${check.status.summary} ` +
                    `(${check.responseTime}ms) [${check.status.gravity}]`
                );
            }

            if (isHttpError(check.status)) {
                const icon = getHttpErrorIcon(check.status.gravity);
                console.log(
                    `${icon} ${api.name}: ${check.status.summary} ` +
                    `[HTTP ${check.statusCode}] (${check.responseTime}ms) ` +
                    `- ${check.status.httpCategory}`
                );
            }
        } else {
            console.error(`${api.name}: ÉCHEC - ${result.status}`);
        }
    });

    console.log(`Healthcheck terminé\n`);
}

export function startHealthcheckScheduler(): Cron {
    const job = new Cron(
        '0 * * * * *',
        {
            name: 'api-healthcheck',
            timezone: 'Europe/Paris',
            catch: (error) => {
                console.error('❌ Erreur dans le cron job:', error);
            }
        },
        async () => {
            await checkAllApis();
        }
    );

    console.log('⏰ Cron job démarré : healthcheck toutes les 60 secondes');
    console.log(`📅 Prochaine exécution : ${job.nextRun()?.toISOString()}`);

    return job;
}

export function stopHealthcheckScheduler(job: Cron): void {
    job.stop();
    console.log('🛑 Cron job arrêté');
}