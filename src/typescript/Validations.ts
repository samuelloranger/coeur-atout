/**
 * @author Samuel Loranger <samuelloranger@gmail.com>
 */
export class Validations {
    // ATTRIBUTS
    private objMessages: JSON;

    // Éléments de formulaire à valider
    //Je suis
    private refarrJeSuis: Array<HTMLElement> = Array.apply(null, document.querySelectorAll('[name=genre_utilisateur]'));

    //Mot de passe
    private checkboxMontrerMDP: HTMLInputElement = document.querySelector("#montrerMDP");
    private inputMDP: HTMLInputElement = document.querySelector("#password");

    // Constructeur
    constructor() {
        document.querySelector('form').noValidate = true;
        this.ajouterEcouteursEvenements();
    }

    /**
     * Fonction qui ajoute les écouteurs d'évènements sur les éléments
     */
    private ajouterEcouteursEvenements = () => {
        //Boutons radios "Je suis"
        this.refarrJeSuis.forEach((element) => {
            element.addEventListener("blur", this.validerJeSuis);
        });

        //Checkbox bouton montrer mot de passe
        this.checkboxMontrerMDP.addEventListener("click", this.basculerTypeMotDePasse);
    };

    // Méthodes de validation
    private validerJeSuis = (element) => {
        this.verifierSiVide(element.currentTarget);
    };

    private validerJeCherche = () => {

    };

    private validerJourNaissance = () => {

    };

    private validerMoisNaissance = () => {

    };

    private validerAnneeNaissance = () => {

    };

    private validerCodePostal = () => {

    };

    private validerPseudo = () => {

    };

    private validerCourriel = () => {

    };
    private validerMotDePasse = () => {

    };

    private validerConsentement = () => {

    };

    // Méthodes utilitaires

    private verifierSiVide = (element) => {
        if (element.currentTarget == "" || !element.currentTarget.checked) {

        }
    };

    private verifierPattern = () => {

    };

    private afficherErreur = () => {

    };

    private effacerErreur = () => {

    };

    private montrerSucces = () => {

    };

    private formaterDateMax = () => {

    };

    private verifierAge = () => {

    };

    private basculerTypeMotDePasse = (event) => {
        if (event.currentTarget.checked == false) {
            this.inputMDP.type = "text";
        } else {
            this.inputMDP.type = "password";
        }
    };
}