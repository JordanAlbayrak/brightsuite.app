// DRAFT: written from BrightQ main at d6e400c (2026-11-19). Jordan reviews before it goes live.
const head = (h1, meta, draft) => `
<div class="wrap"><article class="doc">
  <div class="doc-head"><img src="/assets/logo/brightqueue.svg" alt="" width="56" height="56"><h1>${h1}</h1></div>
  <p class="meta">${meta}</p>
  <p class="draft" role="note">${draft}</p>`;

export const queuePrivacy = {
  en: {
    title: "BrightQueue privacy policy (draft)",
    description: "What BrightQueue stores, the services it relies on, its error monitoring, and how to delete your account.",
    body: `${head(
      "BrightQueue privacy policy",
      "Draft of 19 November 2026",
      `<strong>DRAFT.</strong> Written from what the app's code does today, for review. It is not yet the published policy.`,
    )}
  <p class="summary">BrightQueue is a free learning app with short lessons and quizzes, on the web and in an Android app. You can read and take quizzes without an account. What it stores depends on whether you sign in. It also runs error monitoring for every visitor, described below.</p>

  <h2>Without an account</h2>
  <ul>
    <li>A cookie named <code>bq-seen</code> remembers up to the 50 most recent lessons you were shown, so you are not served repeats. It holds lesson IDs only, nothing about you, and expires after 30 days.</li>
    <li>Your browser keeps your light or dark theme and your read-aloud speed and volume. These stay on your device and are never sent to BrightQueue.</li>
  </ul>

  <h2>With an account</h2>
  <p>Accounts are stored with Supabase, the app's database and sign-in provider:</p>
  <ul>
    <li>Your email address and password. The password is stored hashed and is never visible to BrightQueue.</li>
    <li>A display name, if you set one.</li>
    <li>Which lessons you have read, and when. This powers your progress count and stops you seeing the same lesson twice.</li>
    <li>Your quiz results: topic, score, difficulty and date.</li>
    <li>A public handle and nickname, only if you choose to claim one. A public profile shows your handle, nickname and summary totals to anyone, never your email or your answers. You can make it private again at any time.</li>
  </ul>

  <h2>Challenge links</h2>
  <p>When you send a 1-v-1 challenge, the name typed on it and both scores can be seen by anyone who has the link. Challenges are not tied to an account, so they stay after you delete your account. To have one removed, contact us with the link.</p>

  <h2>Error and performance monitoring</h2>
  <p>BrightQueue uses Sentry to find crashes and slow pages. It starts on every visit, signed in or not, on the web and in the Android app, and there is not yet a setting to turn it off. It sends:</p>
  <ul>
    <li>Errors, with the page and your browser or device type.</li>
    <li>Performance timings for about 1 in 10 visits.</li>
    <li>A replay of on-screen activity inside BrightQueue for about 1 in 10 visits, and for every visit where an error happens. Sentry hides text and form input in replays by default, and BrightQueue keeps that default.</li>
    <li>Your account ID when you are signed in, or the word "anonymous" when you are not.</li>
  </ul>
  <p>It is set not to attach your IP address or email. This data is used only to fix bugs, never for advertising or profiling.</p>

  <h2>Sign-in protection</h2>
  <p>The sign-in page uses Cloudflare Turnstile to block automated sign-ups. Turnstile checks signals from your browser and device to tell people from bots. It runs on the sign-in page only.</p>

  <h2>Read aloud</h2>
  <p>Read aloud uses the speech voices of your browser or phone. BrightQueue sends nothing to its own servers for it. Some browsers use online voices run by the browser maker.</p>

  <h2>What BrightQueue never does</h2>
  <ul>
    <li>No ads, and no advertising or analytics tools.</li>
    <li>Your data is never sold, rented or shared for marketing.</li>
    <li>Lessons and quizzes are written ahead of time. Reading a lesson or taking a quiz sends nothing to any AI service.</li>
  </ul>

  <h2>Services BrightQueue relies on</h2>
  <ul>
    <li><strong>Supabase</strong>: database and sign-in.</li>
    <li><strong>Vercel</strong>: hosting. Like any web host, it receives standard request details such as your IP address.</li>
    <li><strong>Sentry</strong>: error and performance monitoring (above).</li>
    <li><strong>Cloudflare Turnstile</strong>: sign-in protection (above).</li>
  </ul>
  <p>Each handles data under its own privacy policy, and only to provide these functions. All connections use HTTPS.</p>

  <h2>Deleting your account</h2>
  <p>In the app, go to Progress and choose <strong>Delete my account</strong>. No email or request is needed. This permanently removes your sign-in, your display name, your lessons-read history, every quiz score and your public profile. It cannot be undone. Challenge links are the one exception (see above).</p>

  <h2>Children</h2>
  <p>BrightQueue is not directed at children under 13, and accounts are not knowingly created for them. If you believe a child has created an account, contact us and it will be removed.</p>

  <h2>Changes and contact</h2>
  <p>If this policy changes, the date at the top changes too. Questions about privacy or your data: <span class="placeholder">[contact address, to be chosen]</span>.</p>
  <a class="back" href="/#brightqueue">Back to BrightQueue</a>
</article></div>`,
  },
  fr: {
    title: "Politique de confidentialité de BrightQueue (brouillon)",
    description: "Ce que BrightQueue enregistre, les services qu'elle utilise, son suivi des erreurs et comment supprimer votre compte.",
    body: `${head(
      "Politique de confidentialité de BrightQueue",
      "Brouillon du 19 novembre 2026",
      `<strong>BROUILLON.</strong> Rédigé à partir de ce que fait le code de l'app aujourd'hui, pour relecture. Ce n'est pas encore la politique publiée.`,
    )}
  <p class="summary">BrightQueue est une app d'apprentissage gratuite, avec de courtes leçons et des quiz, sur le web et dans une app Android. Vous pouvez lire et faire des quiz sans compte. Ce qu'elle enregistre dépend de votre connexion. Elle fait aussi un suivi des erreurs pour chaque visiteur, décrit plus bas.</p>

  <h2>Sans compte</h2>
  <ul>
    <li>Un cookie nommé <code>bq-seen</code> retient jusqu'aux 50 dernières leçons qui vous ont été montrées, pour ne pas vous les reproposer. Il ne contient que des identifiants de leçons, rien sur vous, et expire après 30 jours.</li>
    <li>Votre navigateur garde votre thème clair ou sombre, ainsi que la vitesse et le volume de la lecture à voix haute. Ces réglages restent sur votre appareil et ne sont jamais envoyés à BrightQueue.</li>
  </ul>

  <h2>Avec un compte</h2>
  <p>Les comptes sont enregistrés chez Supabase, la base de données et le service de connexion de l'app :</p>
  <ul>
    <li>Votre adresse e-mail et votre mot de passe. Le mot de passe est stocké sous forme hachée et n'est jamais visible par BrightQueue.</li>
    <li>Un nom affiché, si vous en choisissez un.</li>
    <li>Les leçons que vous avez lues, et quand. Cela alimente votre compteur de progression et évite de vous montrer deux fois la même leçon.</li>
    <li>Vos résultats de quiz : sujet, score, difficulté et date.</li>
    <li>Un identifiant public et un pseudo, seulement si vous choisissez d'en réserver un. Un profil public montre à tous votre identifiant, votre pseudo et vos totaux, jamais votre e-mail ni vos réponses. Vous pouvez le rendre privé à tout moment.</li>
  </ul>

  <h2>Liens de défi</h2>
  <p>Quand vous envoyez un défi en 1 contre 1, le nom saisi et les deux scores sont visibles par quiconque a le lien. Les défis ne sont pas liés à un compte, ils restent donc après la suppression de votre compte. Pour en faire retirer un, contactez-nous avec le lien.</p>

  <h2>Suivi des erreurs et des performances</h2>
  <p>BrightQueue utilise Sentry pour repérer les plantages et les pages lentes. Il démarre à chaque visite, connecté ou non, sur le web et dans l'app Android, et il n'existe pas encore de réglage pour le désactiver. Il envoie :</p>
  <ul>
    <li>Les erreurs, avec la page et le type de navigateur ou d'appareil.</li>
    <li>Des mesures de performance pour environ 1 visite sur 10.</li>
    <li>Un enregistrement de l'activité à l'écran dans BrightQueue pour environ 1 visite sur 10, et pour chaque visite où une erreur survient. Sentry masque par défaut le texte et les saisies de formulaire dans ces enregistrements, et BrightQueue garde ce réglage.</li>
    <li>L'identifiant de votre compte si vous êtes connecté, ou le mot « anonymous » sinon.</li>
  </ul>
  <p>Il est réglé pour ne pas joindre votre adresse IP ni votre e-mail. Ces données servent seulement à corriger des bogues, jamais à la publicité ni au profilage.</p>

  <h2>Protection de la connexion</h2>
  <p>La page de connexion utilise Cloudflare Turnstile pour bloquer les inscriptions automatiques. Turnstile vérifie des signaux de votre navigateur et de votre appareil pour distinguer les personnes des robots. Il ne fonctionne que sur la page de connexion.</p>

  <h2>Lecture à voix haute</h2>
  <p>La lecture à voix haute utilise les voix de votre navigateur ou de votre téléphone. BrightQueue n'envoie rien à ses propres serveurs pour cela. Certains navigateurs utilisent des voix en ligne fournies par l'éditeur du navigateur.</p>

  <h2>Ce que BrightQueue ne fait jamais</h2>
  <ul>
    <li>Pas de pub, ni d'outil publicitaire ou de statistiques d'usage.</li>
    <li>Vos données ne sont jamais vendues, louées ni partagées à des fins de marketing.</li>
    <li>Les leçons et les quiz sont rédigés à l'avance. Lire une leçon ou faire un quiz n'envoie rien à aucun service d'IA.</li>
  </ul>

  <h2>Services utilisés par BrightQueue</h2>
  <ul>
    <li><strong>Supabase</strong> : base de données et connexion.</li>
    <li><strong>Vercel</strong> : hébergement. Comme tout hébergeur web, il reçoit les informations habituelles d'une requête, comme votre adresse IP.</li>
    <li><strong>Sentry</strong> : suivi des erreurs et des performances (plus haut).</li>
    <li><strong>Cloudflare Turnstile</strong> : protection de la connexion (plus haut).</li>
  </ul>
  <p>Chacun traite les données selon sa propre politique de confidentialité, et seulement pour ces fonctions. Toutes les connexions passent par HTTPS.</p>

  <h2>Supprimer votre compte</h2>
  <p>Dans l'app, allez dans <strong>Progress</strong> et choisissez <strong>Delete my account</strong> (l'app est en anglais). Aucun e-mail ni aucune demande n'est nécessaire. Cela supprime définitivement votre connexion, votre nom affiché, votre historique de lecture, tous vos scores de quiz et votre profil public. C'est irréversible. Les liens de défi sont la seule exception (voir plus haut).</p>

  <h2>Enfants</h2>
  <p>BrightQueue ne s'adresse pas aux enfants de moins de 13 ans, et aucun compte n'est créé sciemment pour eux. Si vous pensez qu'un enfant a créé un compte, contactez-nous et il sera supprimé.</p>

  <h2>Modifications et contact</h2>
  <p>Si cette politique change, la date en haut de la page change aussi. Questions sur la confidentialité ou vos données : <span class="placeholder">[adresse de contact, à choisir]</span>.</p>
  <a class="back" href="/fr/#brightqueue">Retour à BrightQueue</a>
</article></div>`,
  },
};
