Coeur Atout
============

## Spécifications pour l'initialisation du projet
* Fourcher (Fork) dans votre répertoire personnel
* Ouvrir dans PHPStorm, et dans son terminal, taper Bower install


## Spécifications pour l'intégration
(Note: les spécifications suivantes ne sont pas une procédure complète
elles sont simplement un petit guide de départ)
* BASE
    * Suivre le guide visuel pour aller chercher les contenus mais ne retapez pas les textes,
copiez-collez les à partir de l'énoncé ou du fichier objMessages.json
    * Baliser pour pouvoir utiliser en programmation le formulaire (attributs name principalement)
    * Étiqueter les éléments de formulaires (label for = id input)
    * Faites des regroupements thématiques d'éléments de formulaire (fieldset)
    * Ajouter des contraintes de saisie en HTML (required, pattern, ...)
    * Utiliser un button type submit "Enregistrer" pour la soumission du formulaire
    * Sous les champs ayant besoin d'explications, ajouter un conteneur .info
* Pour les validations
    * Ajouter un conteneur .erreur après chaque élément (ou groupe d'éléments) de formulaire à valider
* ARIA
    * Ajouter des attributs aria-required
    * Ajouter des attributs aria-describedby aux champs qui possèdent des explications
    * Ajouter aria-live="assertive" sur les zones d'erreur

