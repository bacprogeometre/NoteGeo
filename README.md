# Notes Géo — mise en place

Appli de notation par compétences pour le Bac Pro Géomètre (référentiel 2024), avec photos de terrain prises au téléphone.
La page est hébergée sur **GitHub Pages**, les notes et les photos sont partagées grâce à **Supabase** (formule gratuite).

Compter 20 minutes, une seule fois.

---

## Avant de commencer : essayer en mode démo

Ouvrez `index.html` tel quel. Tant que les réglages Supabase sont vides, l'appli fonctionne en **mode démo** : les données restent dans le navigateur de l'appareil. Touchez « Charger un exemple » pour la découvrir.

---

## Étape 1 — Créer le projet Supabase

1. Allez sur **supabase.com**, puis « Start your project ». Créez un compte (avec GitHub, c'est le plus simple).
2. « New project » :
   - **Name** : `notes-geo`
   - **Database Password** : cliquez sur « Generate a password » et gardez-le de côté (il ne sert pas dans l'appli).
   - **Region** : choisissez **Europe** (Paris ou Frankfurt).
   - Formule **Free**.
3. Attendez une ou deux minutes que le projet soit prêt.

## Étape 2 — Créer les tables et l'espace photos

1. Menu de gauche : **SQL Editor**, puis « New query ».
2. Ouvrez le fichier `supabase.sql`, copiez **tout** son contenu, collez-le, puis cliquez sur **Run**.
3. Le message « Success. No rows returned » confirme que c'est fait. Les tables `classes`, `students`, `evaluations`, `results`, `settings` apparaissent dans **Table Editor**, et l'espace `photos` dans **Storage**.

## Étape 3 — Créer les comptes enseignants

Seules les personnes qui ont un compte peuvent ouvrir l'appli : sans cela, n'importe qui trouvant l'adresse de la page pourrait lire ou modifier les notes.

1. Menu **Authentication** > **Sign In / Providers** (ou **Settings**) : désactivez **Allow new users to sign up**, pour que personne ne puisse se créer un compte tout seul.
2. **Authentication** > **Users** > **Add user** > **Create new user** :
   - votre adresse e-mail et un mot de passe,
   - cochez **Auto Confirm User**.
3. Recommencez pour chaque collègue, ou créez un seul compte commun à la section.

Sur chaque appareil, la connexion se fait une fois puis reste mémorisée.

## Étape 4 — Relier l'appli à Supabase

1. Dans Supabase : **Project Settings** (roue dentée) > **API Keys** (ou **Data API**). Relevez :
   - **Project URL**, de la forme `https://xxxxxxxx.supabase.co` (aussi dans **Project Settings > Data API**),
   - la clé publique : **anon public** (onglet « Legacy API Keys ») ou **publishable**. **Jamais la clé `service_role` / `secret`.**
2. Ouvrez `index.html` dans un éditeur de texte (Bloc-notes, ou directement sur GitHub avec le crayon « Edit »). Tout en haut du script, complétez :

```js
const CONFIG = {
  SUPABASE_URL: "https://xxxxxxxx.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOi...",          // la clé publique
  ETABLISSEMENT: "Lycée Pierre Mendès France"
};
```

La clé publique peut être visible dans la page : c'est prévu ainsi. Ce sont les comptes et les règles de sécurité créées à l'étape 2 qui protègent les données.

## Étape 5 — Mettre en ligne sur GitHub Pages

1. Sur GitHub, dans votre dépôt (ou un nouveau dépôt), déposez **tous ces fichiers ensemble, au même niveau** (« Add file » > « Upload files ») :
   `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`.
   (`supabase.sql` et `README.md` peuvent y être aussi, ils ne gênent pas.)
2. **Settings** > **Pages** > **Branch : main**, dossier **/ (root)** > **Save**.
3. Après une minute, l'adresse de l'appli s'affiche en haut de cette page (`https://votre-nom.github.io/votre-depot/`).

## Étape 6 — Installer l'appli sur chaque appareil

Ouvrez l'adresse GitHub Pages de l'appli, puis :

| Appareil | Comment faire |
|---|---|
| **Android** (Chrome) | Menu ⋮ > **Installer l'application** (ou « Ajouter à l'écran d'accueil »). |
| **iPhone / iPad** | Dans **Safari** uniquement : bouton Partager > **Sur l'écran d'accueil**. |
| **Ordinateur** (Chrome ou Edge) | Icône d'installation à droite de la barre d'adresse (écran avec une flèche), ou menu ⋮ > **Installer Notes Géo**. |
| **Ordinateur** (Firefox, Safari Mac) | Pas d'installation : gardez simplement l'adresse en favori. |

L'appli s'ouvre alors dans sa propre fenêtre, avec son icône, sans barre d'adresse.

**Mises à jour** : quand vous déposez un nouvel `index.html` sur GitHub, l'appli installée le reçoit toute seule à l'ouverture suivante (fermez-la et rouvrez-la une deuxième fois si besoin). Rien à réinstaller.

---

## Utilisation au quotidien

1. **Classes** : créez une classe, puis collez la liste des élèves (une ligne par élève, `Nom;Prénom`) ou importez un CSV.
2. **Évaluer** : choisissez la classe, puis créez l'évaluation de l'une de ces deux façons :
   - **Compétences du référentiel** : choisissez l'activité, ses compétences se cochent toutes seules avec une pondération égale en %, modifiable.
   - **Mes questions / critères** : collez vos questions, avec leurs critères si vous voulez, puis touchez « Créer la grille ». Format conseillé :
     ```
     Question 1 : Quelle est la valeur de l'angle ? Critères : résultat 1 pt ; unité 1 pt
     Question 2 : Calculer la dénivelée entre A et B
     - méthode 1 pt
     - résultat juste 1 pt
     Question 3 : Mettre en station le niveau (2 pts)
     ```
     L'appli propose pour chaque question une compétence C01 à C14, ainsi que l'activité. Vous pouvez ensuite modifier le texte, ajouter ou retirer des critères (« + Ajouter un critère ») et changer les points.
   - Dans le mode **référentiel**, « Noter par les critères officiels » sous une compétence permet de cocher les critères officiels à faire apparaître, chacun avec ses points. Sans critère coché, la compétence est notée d'un seul bloc.
3. Notez chaque élève avec les 4 boutons (sur chaque critère quand la ligne en a : Non acquis = 0 % des points, Fragile = 33 %, Satisfaisant = 67 %, Très bien = 100 %). Avec l'échelle à **5 niveaux**, un niveau « Moyen » à 50 % s'ajoute entre Fragile et Satisfaisant. Le bouton **appareil photo** d'une ligne ouvre la caméra ou la galerie, et la photo est rattachée à l'élève et à la ligne. Sous chaque critère, « + Commentaire pour l'élève » permet d'expliquer ce qui ne va pas : le commentaire apparaît sous le critère dans la fiche PDF. Flèches pour passer à l'élève suivant. Tout s'enregistre seul.
4. **Résultats** : tableau de la classe, moyenne, alertes, **export Pronote (CSV)** et **fiches PDF** avec les photos.
5. **Échelle et résultat affiché** : se choisissent à la création de chaque évaluation (4 ou 5 niveaux ; note /20, pourcentage ou niveau seul). L'appli retient votre dernier choix pour la suivante.
   **Supprimer une évaluation** : icône corbeille dans la liste « Reprendre une évaluation », ou bouton « Supprimer l'évaluation » dans Résultats. Ses notes et ses photos sont supprimées avec elle.
6. Touchez un élève dans **Classes** pour voir sa fiche : progression par compétence et bilan U2 / U31 / U32.

## Bon à savoir

- **Pause du projet gratuit** : sans aucune utilisation pendant 7 jours (vacances), Supabase met le projet en pause. Rien n'est perdu : connectez-vous à supabase.com, ouvrez le projet et cliquez sur **Restore project**. Comptez quelques minutes.
- **Place pour les photos** : 1 Go gratuit. Les photos sont réduites à environ 150 à 250 Ko, soit 4 000 à 6 000 photos. Le remplissage se voit dans **Storage** ; supprimer une classe supprime aussi ses photos.
- **Réseau sur le terrain** : sans connexion, la saisie reste en attente dans la page et part dès que le réseau revient, tant que la page reste ouverte. Les photos, elles, demandent du réseau au moment de la prise.
- **Sauvegarde** : dans Supabase, **Table Editor** > une table > **Export to CSV** permet de garder une copie.

## En cas de problème

| Message ou symptôme | Que faire |
|---|---|
| « E-mail ou mot de passe incorrect » | Vérifiez le compte dans Authentication > Users, et que « Auto Confirm User » était coché. |
| « Impossible de charger les données » | Vérifiez l'URL et la clé dans `CONFIG`, que le script SQL a bien été exécuté, et que le projet n'est pas en pause. |
| La photo ne s'envoie pas | Vérifiez la connexion, et que l'espace `photos` existe dans Storage (relancez `supabase.sql`). |
| Le bandeau « Mode démo » reste affiché | `SUPABASE_URL` ou `SUPABASE_ANON_KEY` est vide dans `index.html`, ou la page en ligne n'est pas la dernière version déposée. |
