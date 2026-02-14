export interface ApiConfig {
    id: string;
    name: string;
    url: string;
    timeout?: number;
    category: string;
}

export const APIS_TO_MONITOR: ApiConfig[] = [
    // Cloud Infrastructure
    {
        id: 'vercel',
        name: 'Vercel',
        url: 'https://www.vercel-status.com/api/v2/status.json',
        category: 'Cloud Infrastructure',
    },
    {
        id: 'netlify',
        name: 'Netlify',
        url: 'https://www.netlifystatus.com/api/v2/status.json',
        category: 'Cloud Infrastructure',
    },
    {
        id: 'render',
        name: 'Render',
        url: 'https://status.render.com/api/v2/status.json',
        category: 'Cloud Infrastructure',
    },
    {
        id: 'digitalocean',
        name: 'DigitalOcean',
        url: 'https://status.digitalocean.com/api/v2/status.json',
        category: 'Cloud Infrastructure',
    },
    {
        id: 'linode',
        name: 'Linode',
        url: 'https://status.linode.com/api/v2/status.json',
        category: 'Cloud Infrastructure',
    },
    {
        id: 'cloudflare',
        name: 'Cloudflare',
        url: 'https://www.cloudflarestatus.com/api/v2/status.json',
        category: 'Cloud Infrastructure',
    },
    // Developer Tools
    {
        id: 'github',
        name: 'Github',
        url: 'https://www.githubstatus.com/api/v2/status.json',
        category: 'Developer Tools',
    },
    {
        id: 'atlassian',
        name: 'Atlassian',
        url: 'https://status.atlassian.com/api/v2/status.json',
        category: 'Developer Tools',
    },
    {
        id: 'bitbucket',
        name: 'Atlassian Bitbucket',
        url: 'https://bitbucket.status.atlassian.com/api/v2/status.json',
        category: 'Developer Tools',
    },
    {
        id: 'confluence',
        name: 'Confluence',
        url: 'https://confluence.status.atlassian.com/api/v2/status.json',
        category: 'Developer Tools',
    },
    {
        id: 'npm',
        name: 'Npm',
        url: 'https://status.npmjs.org/api/v2/status.json',
        category: 'Developer Tools',
    },
    {
        id: 'datadog',
        name: 'Datadog US1',
        url: 'https://status.datadoghq.com/api/v2/status.json',
        category: 'Developer Tools',
    },
    {
        id: 'sentry',
        name: 'Sentry',
        url: 'https://status.sentry.io/api/v2/status.json',
        category: 'Developer Tools',
    },

    {
        id: 'elastic',
        name: 'Elastic Cloud (Public)',
        url: 'https://status.elastic.co/api/v2/status.json',
        category: 'Developer Tools',
    },
    // Databases
    {
        id: 'mongodb',
        name: 'MongoDB Cloud',
        url: 'https://status.cloud.mongodb.com/api/v2/status.json',
        category: 'Databases',
    },
    {
        id: 'redis',
        name: 'Redis',
        url: 'https://status.redislabs.com/api/v2/status.json',
        category: 'Databases',
    },
    {
        id: 'planetscale',
        name: 'PlanetScale',
        url: 'https://www.planetscalestatus.com/api/v2/status.json',
        category: 'Databases',
    },
    {
        id: 'supabase',
        name: 'Supabase',
        url: 'https://status.supabase.com/api/v2/status.json',
        category: 'Databases',
    },
    // Communication
    {
        id: 'discord',
        name: 'Discord',
        url: 'https://discordstatus.com/api/v2/status.json',
        category: 'Communication',
    },
    {
        id: 'zoom',
        name: 'Zoom',
        url: 'https://status.zoom.us/api/v2/status.json',
        category: 'Communication',
    },
    {
        id: 'twitch',
        name: 'Twitch',
        url: 'https://status.twitch.com/api/v2/status.json',
        category: 'Communication',
    },
    {
        id: 'twilio',
        name: 'Twilio',
        url: 'https://status.twilio.com/api/v2/status.json',
        category: 'Communication',
    },
    {
        id: 'intercom',
        name: 'Intercom',
        url: 'https://www.intercomstatus.com/api/v2/status.json',
        category: 'Communication',
    },
    // E-commerce
    {
        id: 'shopify',
        name: 'Shopify',
        url: 'https://www.shopifystatus.com/api/v2/status.json',
        category: 'E-commerce',
    },
    // Productivity
    {
        id: 'dropbox',
        name: 'Dropbox',
        url: 'https://status.dropbox.com/api/v2/status.json',
        category: 'Productivity',
    },
    {
        id: 'notion',
        name: 'Notion',
        url: 'https://www.notion-status.com/api/v2/status.json',
        category: 'Productivity',
    },
    // Analytics
    {
        id: 'segment',
        name: 'Segment',
        url: 'https://status.segment.com/api/v2/status.json',
        category: 'Analytics',
    },
    // Email Services
    {
        id: 'sendgrid',
        name: 'SendGrid',
        url: 'https://status.sendgrid.com/api/v2/status.json',
        category: 'Email Services',
    },
    {
        id: 'mailgun',
        name: 'Mailgun',
        url: 'https://status.mailgun.com/api/v2/status.json',
        category: 'Email Services',
    }
];