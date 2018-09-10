/**
 *
 */
export class Validations {

    // ATTRIBUTS
    private objMessages: JSON;

    // -- Éléments de formulaire à valider
    // Étape 1
    private refarrJeSuis: Array<HTMLElement> = Array.apply(null, document.querySelectorAll('[name=jeSuis]'));


    // Constructeur
    constructor(objetJSON: JSON){

        document.querySelector('form').noValidate = true

    }

    // Méthodes de validation


    // Méthodes utilitaires



}