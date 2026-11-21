const head = (h1, meta) => `
<div class="wrap"><article class="doc">
  <div class="doc-head"><img src="/assets/logo/brightpause.svg" alt="" width="56" height="56"><h1>${h1}</h1></div>
  <p class="meta">${meta}</p>`;
const ISSUES = "https://github.com/JordanAlbayrak/BrightPause/issues";
const HISTORY = "https://github.com/JordanAlbayrak/BrightPause/commits/main/PRIVACY.md";

export const pausePrivacy = {
  en: {
    title: "BrightPause privacy policy",
    description: "BrightPause collects nothing about you and sends nothing anywhere. What stays on your PC, and the one network check.",
    body: `${head("BrightPause privacy policy", "Last updated 19 November 2026")}
  <p class="summary">BrightPause is a break reminder for Windows. It collects nothing about you and sends nothing anywhere. This policy covers the Microsoft Store version and the version built from the public source code.</p>

  <h2>What stays on your PC</h2>
  <p>BrightPause stores these files on your PC only:</p>
  <ul>
    <li><code>settings.json</code>: your choices (break times, sound, theme, language, shortcuts).</li>
    <li><code>history.jsonl</code>: one line per break with its time, kind and whether you took, postponed or skipped it. This feeds the "today" and week counts in settings.</li>
    <li><code>events.log</code>: one line each time a break starts, waits or ends, with the reason (for example a full-screen app, and that app's file name). It helps explain a missed or late break. It stays on your PC, and BrightPause keeps it under about 0.5 MB.</li>
    <li>Your background picture, if you choose one.</li>
  </ul>
  <p>The version built from the source code keeps them in <code>%APPDATA%\\io.github.jordanalbayrak.brightpause\\</code>. The Store version keeps them in its own folder under <code>%LOCALAPPDATA%\\Packages\\</code>, and uninstalling it deletes them. You can delete either folder at any time.</p>

  <h2>Microphone</h2>
  <p>With "Wait during calls" on, BrightPause asks Windows whether another app is recording from a microphone, so a break does not start in the middle of a call. It never records, opens or listens to the microphone itself, and it learns nothing about the other app except that it is recording.</p>

  <h2>Network</h2>
  <ul>
    <li>The Microsoft Store version makes no network connections. The Store delivers its updates.</li>
    <li>The version built from the source code connects to GitHub only to check for updates, when you press "Check for updates" or turn on automatic updates (off by default).</li>
    <li>A source link on a break screen opens in your default browser when you click it.</li>
  </ul>
  <p>There are no accounts, ads, analytics, crash reports or telemetry, and nothing is shared with anyone.</p>

  <h2>Children</h2>
  <p>BrightPause collects no personal information from anyone, including children.</p>

  <h2>Changes and contact</h2>
  <p>Changes to this policy are published on this page and in the app's source code, where <a href="${HISTORY}">its history shows every version</a>. Questions: <a href="${ISSUES}">open an issue on GitHub</a>.</p>
  <a class="back" href="/#brightpause">Back to BrightPause</a>
</article></div>`,
  },
  fr: {
    title: "Politique de confidentialité de BrightPause",
    description: "BrightPause ne collecte rien sur vous et n'envoie rien nulle part. Ce qui reste sur votre PC, et la seule vérification réseau.",
    body: `${head("Politique de confidentialité de BrightPause", "Dernière mise à jour : 19 novembre 2026")}
  <p class="summary">BrightPause est un rappel de pause pour Windows. Il ne collecte rien sur vous et n'envoie rien nulle part. Cette politique couvre la version du Microsoft Store et la version compilée à partir du code source public.</p>

  <h2>Ce qui reste sur votre PC</h2>
  <p>BrightPause enregistre ces fichiers sur votre PC seulement :</p>
  <ul>
    <li><code>settings.json</code> : vos choix (rythme des pauses, son, thème, langue, raccourcis).</li>
    <li><code>history.jsonl</code> : une ligne par pause, avec son heure, son type et si vous l'avez prise, reportée ou ignorée. Elle alimente les comptes du jour et de la semaine dans les réglages.</li>
    <li><code>events.log</code> : une ligne chaque fois qu'une pause commence, attend ou se termine, avec la raison (par exemple une app en plein écran, et le nom de fichier de cette app). Il aide à expliquer une pause manquée ou en retard. Il reste sur votre PC, et BrightPause le garde sous 0,5 Mo environ.</li>
    <li>Votre image de fond, si vous en choisissez une.</li>
  </ul>
  <p>La version compilée à partir du code source les garde dans <code>%APPDATA%\\io.github.jordanalbayrak.brightpause\\</code>. La version du Store les garde dans son propre dossier sous <code>%LOCALAPPDATA%\\Packages\\</code>, et sa désinstallation les supprime. Vous pouvez supprimer l'un ou l'autre dossier à tout moment.</p>

  <h2>Microphone</h2>
  <p>Avec « Attendre pendant les appels » activé, BrightPause demande à Windows si une autre app enregistre depuis un microphone, pour qu'une pause ne commence pas au milieu d'un appel. Il n'enregistre jamais, n'ouvre jamais et n'écoute jamais le microphone lui-même, et il n'apprend rien de l'autre app, sauf qu'elle enregistre.</p>

  <h2>Réseau</h2>
  <ul>
    <li>La version du Microsoft Store ne se connecte à aucun réseau. Le Store livre ses mises à jour.</li>
    <li>La version compilée à partir du code source se connecte à GitHub uniquement pour vérifier les mises à jour, quand vous appuyez sur « Vérifier les mises à jour » ou activez les mises à jour automatiques (désactivées par défaut).</li>
    <li>Un lien vers une source sur un écran de pause s'ouvre dans votre navigateur par défaut quand vous cliquez dessus.</li>
  </ul>
  <p>Il n'y a ni compte, ni pub, ni statistiques d'usage, ni rapports de plantage, ni télémétrie, et rien n'est partagé avec qui que ce soit.</p>

  <h2>Enfants</h2>
  <p>BrightPause ne collecte aucune information personnelle, de personne, y compris des enfants.</p>

  <h2>Modifications et contact</h2>
  <p>Les modifications de cette politique sont publiées sur cette page et dans le code source de l'app, où <a href="${HISTORY}">son historique montre chaque version</a>. Des questions ? <a href="${ISSUES}">Ouvrez un ticket sur GitHub</a>.</p>
  <a class="back" href="/fr/#brightpause">Retour à BrightPause</a>
</article></div>`,
  },
};
