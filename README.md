Coeur Atout
============

## Spécifications pour l'initialisation du projet
* Fourcher (Fork) dans votre répertoire personnel
* Notez que l'utilisation de fichiers .gitkeep dans les répertoires vides permet de conserver la structure de répertoires car GIT ne sauvegarde pas les dossiers vides.
* Vérifier la présence et le contenu des fichiers .gitignore, bower.json, package.json, gulpfile.js
* Ouvrir dans PHPStorm, et dans son terminal taper:
```
    npm install
```

## Spécifications pour l'intégration
#### Les instructions suivantes ne sont pas un pas à pas complet mais, simplement un petit guide de départ.
* BASE
    * L'esquisse fonctionnelle du formulaire sans JavaScript fourni par Nicole est votre guide visuel.
    * Utilisez-le pour intégrer les contenus mais ne retapez pas les textes,
__copiez-collez__ les à partir de l'énoncé ou du fichier objMessages.json
    * Balisez pour pouvoir utiliser en programmation le formulaire (Ajouter un attribut name sur les éléments de formulaire...)
    * Consultez les sections __Labeling Controls & Grouping Controls__ de https://www.w3.org/WAI/tutorials/forms/
    * Étiquetez les éléments de formulaires
    * Faites des regroupements thématiques d'éléments de formulaire (fieldset...)
    * Consultez la section __Validating Input__ de https://www.w3.org/WAI/tutorials/forms/validation/
    * Ajoutez des contraintes de saisie en HTML (required, pattern, ...)
    * Utilisez un button type submit "Enregistrer" pour la soumission du formulaire
    * Sous les champs ayant besoin d'explications, ajoutez un conteneurBlock.info
* Pour les validations
    * Ajoutez un conteneurBlock.erreur après chaque élément (ou groupe d'éléments) de formulaire à valider
    * La structure à implémenter pour chaque élément ou groupe d'éléments de formulaire
    doit permettre la rédaction de sélecteurs __'.ctnForm .erreur'__ ou '.ctnForm .info'. En voici un aperçu sommaire:
        * Pour les éléments simples:
            * __div.ctnForm__
                * p > étiquette + élément de formulaire
                * p.info (si besoin)
                * p.erreur
        * Pour les  groupes d'éléments comme les boutons radio:
            * __fieldset.ctnForm__
                * legend
                * ul > li > élément de formulaire + étiquette
                * p.info (si besoin)
                * p.erreur
* ARIA
    * Ajoutez des attributs aria-required
    * Ajoutez des attributs aria-describedby aux champs qui possèdent des explications
    * Ajoutez aria-live="assertive" et aria-atomic="true" sur les zones d'erreur

