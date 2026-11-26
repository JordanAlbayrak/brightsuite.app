// The BrightPause privacy policy, shown as a block in the BrightPause section of the home page.
// /pause/privacy/ (the Microsoft Store "Privacy policy" link) redirects to it.
const ISSUES = "https://github.com/JordanAlbayrak/BrightPause/issues";
const HISTORY = "https://github.com/JordanAlbayrak/BrightPause/commits/main/PRIVACY.md";

const block = (h, meta, lead, parts) => `<div class="policy" id="bp-privacy">
    <h3>${h}</h3>
    <p class="meta">${meta}</p>
    <p class="policy-lead">${lead}</p>
    <div class="policy-grid">
      ${parts.map(([t, p]) => `<div><h4>${t}</h4><p>${p}</p></div>`).join("\n      ")}
    </div>
  </div>`;

export const pausePrivacy = {
  en: block("Privacy", "BrightPause privacy policy. Last updated 25 November 2026.",
    "BrightPause collects nothing about you and shares nothing with anyone. This covers the Microsoft Store version and the version built from the public source code.", [
      ["On your PC only", "<code>settings.json</code> holds your choices. <code>history.jsonl</code> has one line per break (time, kind, and whether you took, postponed or skipped it) for the counts in settings. <code>events.log</code> notes when a break starts, waits or ends and why, for example the file name of a full-screen app; it stays under about 0.5&nbsp;MB. Your background picture is kept too, if you pick one. The Store version keeps these under <code>%LOCALAPPDATA%\\Packages\\</code> and uninstalling deletes them; the source build keeps them in <code>%APPDATA%\\io.github.jordanalbayrak.brightpause\\</code>. You can delete either folder at any time."],
      ["Microphone", "With \"Wait during calls\" on, BrightPause asks Windows whether another app is recording from a microphone, so a break does not start mid-call. It never records, opens or listens to the microphone itself, and learns nothing about the other app except that it is recording."],
      ["Network", "The Store version makes no network connections; the Store delivers its updates. The source build contacts GitHub only to check for updates, when you press \"Check for updates\" or turn on automatic updates (off by default). A source link on a break screen opens in your browser when you click it. No accounts, ads, analytics, crash reports or telemetry."],
      ["Children", "BrightPause collects no personal information from anyone, including children."],
      ["Changes and contact", `Changes appear here and in the app's source code, where <a href="${HISTORY}">its history shows every version</a>. Questions: <a href="${ISSUES}">open an issue on GitHub</a>.`],
    ]),
  fr: block("Confidentialité", "Politique de confidentialité de BrightPause. Dernière mise à jour : 25 novembre 2026.",
    "BrightPause ne collecte rien sur vous et ne partage rien avec personne. Cette politique couvre la version du Microsoft Store et la version compilée à partir du code source public.", [
      ["Uniquement sur votre PC", "<code>settings.json</code> garde vos choix. <code>history.jsonl</code> compte une ligne par pause (heure, type, et si vous l'avez prise, reportée ou ignorée) pour les totaux dans les réglages. <code>events.log</code> note quand une pause commence, attend ou se termine et pourquoi, par exemple le nom de fichier d'une app en plein écran; il reste sous 0,5&nbsp;Mo environ. Votre image de fond est aussi conservée, si vous en choisissez une. La version du Store les garde sous <code>%LOCALAPPDATA%\\Packages\\</code> et sa désinstallation les supprime; la version compilée les garde dans <code>%APPDATA%\\io.github.jordanalbayrak.brightpause\\</code>. Vous pouvez supprimer l'un ou l'autre dossier à tout moment."],
      ["Microphone", "Avec « Attendre pendant les appels » activé, BrightPause demande à Windows si une autre app enregistre depuis un microphone, pour qu'une pause ne commence pas au milieu d'un appel. Il n'enregistre jamais, n'ouvre jamais et n'écoute jamais le microphone lui-même, et n'apprend rien de l'autre app, sauf qu'elle enregistre."],
      ["Réseau", "La version du Store ne se connecte à aucun réseau; le Store livre ses mises à jour. La version compilée se connecte à GitHub uniquement pour vérifier les mises à jour, quand vous appuyez sur « Vérifier les mises à jour » ou activez les mises à jour automatiques (désactivées par défaut). Un lien vers une source sur un écran de pause s'ouvre dans votre navigateur quand vous cliquez dessus. Ni compte, ni pub, ni statistiques d'usage, ni rapports de plantage, ni télémétrie."],
      ["Enfants", "BrightPause ne collecte aucune information personnelle, de personne, y compris des enfants."],
      ["Modifications et contact", `Les modifications paraissent ici et dans le code source de l'app, où <a href="${HISTORY}">son historique montre chaque version</a>. Des questions ? <a href="${ISSUES}">Ouvrez un ticket sur GitHub</a>.`],
    ]),
};
