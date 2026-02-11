interface ApiConfig {
    name: string;
    url: string;
    timeout?: number;
}

export const APIS_TO_MONITOR: ApiConfig[] = [
    {
        name: 'Vercel',
        url: 'https://www.vercel-status.com/api/v2/status.json',
    },
    {
        name: 'Github',
        url: 'https://www.githubstatus.com/api/v2/status.json',
    },
    {
        name: 'Atlassian',
        url: 'https://status.atlassian.com/api/v2/status.json',
    },
    {
        name: 'Atlassian Bitbucket',
        url: 'https://bitbucket.status.atlassian.com/api/v2/status.json',
    },
    {
        name: 'DigitalOcean',
        url: 'https://status.digitalocean.com/api/v2/status.json',
    },
    {
        name: 'Elastic Cloud (Public)',
        url: 'https://status.elastic.co/api/v2/status.json',
    },
    {
        name: 'Confluence',
        url: 'https://confluence.status.atlassian.com/api/v2/status.json',
    },
    {
        name: 'Cloudflare',
        url: 'https://www.cloudflarestatus.com/api/v2/status.json',
    },
    {
        name: 'Shopify',
        url: 'https://www.shopifystatus.com/api/v2/status.json',
    },
    {
        name: 'Dropbox',
        url: 'https://status.dropbox.com/api/v2/status.json',
    },
    {
        name: 'Segment',
        url: 'https://status.segment.com/api/v2/status.json',
    },
    {
        name: 'Twitch',
        url: 'https://status.twitch.com/api/v2/status.json',
    },
    {
        name: 'Discord',
        url: 'https://discordstatus.com/api/v2/status.json',
    },
    {
        name: 'Zoom',
        url: 'https://status.zoom.us/api/v2/status.json',
    },
    {
        name: 'Intercom',
        url: 'https://www.intercomstatus.com/api/v2/status.json',
    },
    {
        name: 'SendGrid',
        url: 'https://status.sendgrid.com/api/v2/status.json',
    },
    {
        name: 'Mailgun',
        url: 'https://status.mailgun.com/api/v2/status.json',
    },
     {
        name: 'Netlify',
        url: 'https://www.netlifystatus.com/api/v2/status.json',
    },
    {
        name: 'Render',
        url: 'https://status.render.com/api/v2/status.json',
    },
    {
        name: 'Linode',
        url: 'https://status.linode.com/api/v2/status.json',
    },
    {
        name: 'MongoDB Cloud',
        url: 'https://status.cloud.mongodb.com/api/v2/status.json',
    },
    {
        name: 'Redis',
        url: 'https://status.redislabs.com/api/v2/status.json',
    },
     {
        name: 'PlanetScale',
        url: 'https://www.planetscalestatus.com/api/v2/status.json',
    },
    {
        name: 'Supabase',
        url: 'https://status.supabase.com/api/v2/status.json',
    },
    {
        name: 'Npm',
        url: 'https://status.npmjs.org/api/v2/status.json',
    },
    {
        name: 'Notion',
        url: 'https://www.notion-status.com/api/v2/status.json',
    },
    {
        name: 'Datadog US1',
        url: 'https://status.datadoghq.com/api/v2/status.json',
    },
    {
        name: 'Sentry',
        url: 'https://status.sentry.io/api/v2/status.json',
    },
     {
        name: 'Twilio',
        url: 'https://status.twilio.com/api/v2/status.json',
    },
];