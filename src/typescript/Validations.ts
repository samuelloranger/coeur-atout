/**
 * @author Samuel Loranger <samuelloranger@gmail.com>
 */
export class Validations {
    // ATTRIBUTS
    private objMessages: JSON;

    // Éléments de formulaire à valider
    //Je suis
    private refarrJeSuis: Array<HTMLInputElement> = Array.apply(null, document.querySelectorAll('[name=genre_utilisateur]'));
    private refarrJeCherche: Array<HTMLInputElement> = Array.apply(null, document.querySelectorAll('[name=genre_recherche]'));

    //Date de naissance
    private refJourNaissance:HTMLInputElement = document.querySelector("#naissance_jour");
    private refMoisNaissance:HTMLInputElement = document.querySelector("#naissance_mois");
    private refAnneeNaissance:HTMLInputElement = document.querySelector("#naissance_annee");

    //Mot de passe
    private inputMDP: HTMLInputElement = document.querySelector("#password");
    private checkboxMontrerMDP: HTMLInputElement = document.querySelector("#montrerMDP");

    // Constructeur
    constructor() {
        fetch("/assets/js/objMessages.json")
            .then(response => response.json())
            .then(response => {
                this.objMessages = response;
                this.ajouterEcouteursEvenements();
            });
        document.querySelector('form').noValidate = true;
    }

    /**
     * Fonction qui ajoute les écouteurs d'évènements sur les éléments
     */
    private ajouterEcouteursEvenements = ():void => {
        //Boutons radios "Je suis"
        this.refarrJeSuis.forEach((element:HTMLInputElement) => {
            element.addEventListener("blur", () =>
                this.validerJeSuis(element, "sexe")
            );
        });

        //Boutons checkbox "Je recherche"
        this.refarrJeCherche.forEach((element:HTMLInputElement) => {
            element.addEventListener("blur", () =>
                this.validerJeCherche(element, "sexe")
            );
        });

        this.refJourNaissance.addEventListener("blur", () => {
            this.validerJourNaissance(this.refJourNaissance, "dateNaissance");
        });

        this.refMoisNaissance.addEventListener("blur", () => {
            this.validerMoisNaissance(this.refMoisNaissance, "dateNaissance");
        });

        this.refAnneeNaissance.addEventListener("blur", () => {
            this.validerAnneeNaissance(this.refAnneeNaissance, "dateNaissance");
        });

        //Checkbox bouton montrer mot de passe
        this.checkboxMontrerMDP.addEventListener("click", this.basculerTypeMotDePasse);
    };

    // Méthodes de validation
    private validerJeSuis = (element:HTMLInputElement, type:string):void => {
        if(this.verifierSiVide(element)){
            this.afficherErreur(element, type, "vide");
        }
        else{
            this.effacerErreur(element);
            this.montrerSucces(element, type);
        }

    };

    private validerJeCherche = (element:HTMLInputElement, type:string):void => {
        if(this.verifierSiVide(element)){
            this.afficherErreur(element, type, "vide");
        }
        else{
            this.effacerErreur(element);
            this.montrerSucces(element, type);
        }
    };

    private validerJourNaissance = (element:HTMLInputElement, type:string):void => {
        if(!this.verifierSiVide(element)){
            this.afficherErreur(element, type, "vide");
        }
        else if(Number(element.value) >= 1 && Number(element.value) <= 31) {
            this.effacerErreur(element);
            this.montrerSucces(element, type);
        }
        else{
            if(Number(element.value) > 31 || Number(element.value) < 0){
                this.afficherErreur(element, type, "jour_invalide");
            }
            else{
                this.afficherErreur(element, type, "jour");
            }
        }

    };

    private validerMoisNaissance = (element:HTMLInputElement, type):void => {
        if(!this.verifierSiVide(element)){
            this.afficherErreur(element, type, "vide");
        }
        else if(Number(element.value) >= 1 && Number(element.value) <= 12) {
            this.effacerErreur(element);
            this.montrerSucces(element, type);
        }
        else{
            this.afficherErreur(element, type, "mois");
        }
    };

    private validerAnneeNaissance = (element:HTMLInputElement, type:string):void => {
        if(!this.verifierSiVide(element)){
            this.afficherErreur(element, type, "vide");
        }
        else if(Number(element.value) < 2019 && Number(element.value) >= 1900) {
            this.effacerErreur(element);
            this.montrerSucces(element, type);
        }
        else{
            this.afficherErreur(element, type, "annee");
        }
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

    // Méthodes utilitairesx
    private verifierSiVide = (element:HTMLInputElement):boolean => {
        if (element.value == null || !element.checked) {
            return true;
        }
        else{
            return false;
        }
    };

    private verifierPattern = () => {

    };

    private getZoneValidation(element:HTMLInputElement):HTMLElement{
        if(element.parentNode.querySelector(".validation") != null){
            return element.parentNode.querySelector(".validation");
        }
        else if(element.parentNode.parentNode.querySelector(".validation") != null){
            return element.parentNode.parentNode.querySelector(".validation");
        }
        else{
            return element.parentNode.parentNode.parentNode.querySelector(".validation")
        }
    }

    private afficherErreur = (element:HTMLInputElement, type:string, raison:string) => {
        // console.log(element);
        const zoneValidation = this.getZoneValidation(element);
        element.classList.add("validation--containerErreur");
        zoneValidation.classList.add("validation--erreur");
        zoneValidation.classList.add("validation--iconeErreur");
        zoneValidation.classList.add("validation--icone");
        zoneValidation.innerHTML = this.objMessages[type]["erreurs"][raison];
    };

    private effacerErreur = (element:HTMLInputElement) => {
        const zoneValidation = this.getZoneValidation(element);
        element.classList.remove("validation--containerErreur");
        zoneValidation.classList.remove("validation--erreur");
        zoneValidation.classList.remove("validation--icone");
        zoneValidation.classList.remove("validation--iconeErreur")
        zoneValidation.innerHTML = "";
    };

    private montrerSucces = (element:HTMLInputElement, type:string) => {
        const zoneValidation = this.getZoneValidation(element);
        zoneValidation.classList.add("validation--ok");
        zoneValidation.classList.add("validation--icone");
        zoneValidation.classList.add("validation--iconeOk");
        zoneValidation.innerHTML = this.objMessages[type]["ok"];
    };

    private formaterDateMax = () => {

    };

    private verifierAge = () => {

    };

    private basculerTypeMotDePasse = (event) => {
        if (event.currentTarget.checked == true) {
            this.inputMDP.type = "text";
        }
        else {
            this.inputMDP.type = "password";
        }
    };
}