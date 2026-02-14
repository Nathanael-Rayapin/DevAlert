# 🚨 DevAlert

> Ne découvrez plus jamais une panne via des clients en colère.

Alertes instantanées lorsque des services externes (Stripe, AWS, Vercel...) tombent en panne,
que votre certificat SSL expire ou que votre API ralentit.


## 🎯 Le Problème

Vous dormez. L'API Stripe tombe à 3h du matin.  
Votre flux de paiement est interrompu. Les clients ne peuvent pas finaliser leurs achats.  
Vous vous réveillez à 9h avec 47 emails furieux et 12 000 € de chiffre d'affaires perdu.

**Ça vous semble familier ?**

Les solutions actuelles comme Datadog coûtent plus de 500€/mois et sont complexes à configurer.  

## ✨ La Solution

DevAlert surveille tout ce qui peut casser votre application :

### 🔌 Services externes (500+ supportés)

- Stripe, OpenAI, AWS, Vercel, Supabase, Twilio...
- Vérifie les pages de statut officielles toutes les X secondes
- Vous alerte **avant** que vos clients ne remarquent le problème

### 🔒 Certificats SSL

- Surveille les dates d'expiration
- Alertes à 30/7/1 jour(s) avant expiration
- Supporte les certificats wildcard

### 🌐 Domaines

- Surveillance WHOIS
- Détection des changements DNS
- Alertes d'expiration

### ⚡ Vos APIs

- Surveillance uptime (intervalle X secondes)
- Suivi de latence (alerte si >X secondes)
- Surveillance des codes de statut

### 📦 Dépendances

- Scan de vulnérabilités NPM
- Alertes de sécurité automatiques


## 🎨 Captures d'écran
![DevAlert](public/image.png)


## 🛠️ Stack Technique

- **Frontend :** Next.js 15, React, TailwindCSS
- **Backend :** Node.js, PostgreSQL, Redis
- **Monitoring :** Workers distribués (15 emplacements)
- **Alertes :** Twilio (SMS), Resend (Email), Webhooks


## 🗺️ Roadmap

- [ ] Conception Architecture
- [ ] Surveillance des services externes
- [ ] Alertes certificats SSL
- [ ] Notifications Email
- [ ] Alertes SMS (T1 2025)
- [ ] Intégration Slack/Discord (T1 2025)
- [ ] Application mobile (T2 2025)
- [ ] Détection d'anomalies par IA (T2 2025)