/**
 * @author Samuel Loranger <samuelloranger@gmail.com>
 */
export class Validations {

    // ATTRIBUTS
    private objMessages:JSON;

    // Éléments de formulaire à valider
    private refarrJeSuis:Array<HTMLElement> = Array.apply(null, document.querySelectorAll('[name=genre_utilisateur]'));

    // Constructeur
    constructor(){
        document.querySelector('form').noValidate = true;
        let requestURL = './assets/js/objMessages.json';
        let request = new XMLHttpRequest();
        let objMessages:JSON = null;
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();

        request.onload = () => {
            objMessages = request.response;
        };

        this.objMessages = objMessages;

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
        if(element.currentTarget == "" || !element.currentTarget.checked ){

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

    private basculerTypeMotDePasse = () => {

    };

}