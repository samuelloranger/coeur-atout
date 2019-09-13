/**
 * @author Samuel Loranger <samuelloranger@gmail.com>
 */
import {Etapes} from "./Etapes";

export class Validations {
    // ATTRIBUTS
    private objMessages: JSON;

    // Éléments de formulaire à valider
    //Je suis
    private refarrJeSuis: Array<HTMLInputElement> = Array.apply(null, document.querySelectorAll('[name=genre_utilisateur]'));
    private refarrJeCherche: Array<HTMLInputElement> = Array.apply(null, document.querySelectorAll('.genre_recherche'));

    //Date de naissance
    private refJourNaissance:HTMLInputElement = document.querySelector("#naissance_jour");
    private refMoisNaissance:HTMLInputElement = document.querySelector("#naissance_mois");
    private refAnneeNaissance:HTMLInputElement = document.querySelector("#naissance_annee");

    //Mot de passe
    private inputMDP: HTMLInputElement = document.querySelector("#password");
    private checkboxMontrerMDP: HTMLInputElement = document.querySelector("#montrerMDP");

    private refObjEtapes = null;
    private arrEtapes = {
        etape1:{
            genre: false,
            genreRecherche: false
        },
        etape2:{
            dateNaissance: false,
            codePostal: false
        },
        etape3:{
            pseudo: false,
            courriel: false,
            mdp: false
        }
    };

    // Constructeur
    constructor(objEtapes:Etapes) {
        this.refObjEtapes = objEtapes;

        fetch("assets/js/objMessages.json")
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
            element.addEventListener("click", () =>
                this.validerJeSuis(element, "sexe")
            );
        });

        //Boutons checkbox "Je recherche"
        this.refarrJeCherche.forEach((element:HTMLInputElement) => {
            element.addEventListener("click", () =>
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
            this.arrEtapes.etape1.genre = true;
        }

        this.verifierEtape(1);
    };

    private validerJeCherche = (element:HTMLInputElement, type:string):void => {
        //Si l'élément courant est coché
        if(this.verifierSiVide(element)){
            //S'il n'est pas coché, il vérifie si les autres
            let autreElemCoche = false;

            //Passage sur tous les autres éléments
            this.refarrJeCherche.forEach((element:HTMLInputElement) => {
                if(this.verifierSiVide(element)) {
                    autreElemCoche = true;
                }
            });

            //Si aucun autre élément n'est coché, on affiche l'erreur
            if(autreElemCoche) this.afficherErreur(element, type, "vide");
        }
        else{
            this.effacerErreur(element);
            this.montrerSucces(element, type);
            this.arrEtapes.etape1.genreRecherche = true;
        }

        this.verifierEtape(1);
    };

    private validerJourNaissance = (element:HTMLInputElement, type:string):void => {
        if(!this.verifierSiVide(element)){
            this.afficherErreur(element, type, "vide");
        }
        else if(Number(element.value) >= 1 && Number(element.value) <= 31) {
            this.effacerErreur(element);

            //Si le jour est valide, on vérifie le restant de la date
            if(this.verifierDateComplete()){
                //Si la date est complète
                if(this.verifierAge(Number(this.refJourNaissance.value), Number(this.refMoisNaissance.value) - 1, Number(this.refAnneeNaissance.value))){
                    //Valider si la date est valide (Exemple 31 février ne sera pas valide)
                    if(this.verifierDateValide()){
                        //Si toutes les conditions sont respectées, afficher le succès.
                        this.effacerErreur(this.refJourNaissance);
                        this.montrerSucces(element, type);
                        this.arrEtapes.etape2.dateNaissance = true;
                    }
                    else this.afficherErreur(this.refJourNaissance, type, "date_invalide");
                }
                //Sinon, on montre le message de date non valide
                else this.afficherErreur(element, type, "info");
            }
        }
        else{
            if(Number(element.value) > 31 || Number(element.value) < 0){
                this.afficherErreur(element, type, "jour_invalide");
            }
            else this.afficherErreur(element, type, "jour");
        }

        //On vérifie si la date est entrée est complètement entrée
        this.verifierDateComplete();
    };

    private validerMoisNaissance = (element:HTMLInputElement, type):void => {
        if(!this.verifierSiVide(element)){
            this.afficherErreur(element, type, "vide");
        }
        else if(Number(element.value) >= 1 && Number(element.value) <= 12) {
            this.effacerErreur(element);

            //Si le mois est valide, on vérifie le restant de la date
            if(this.verifierDateComplete()){
                //Si la date est complète
                if(this.verifierAge(Number(this.refJourNaissance.value), Number(this.refMoisNaissance.value) - 1, Number(this.refAnneeNaissance.value))){
                    if(this.verifierDateValide()){
                        this.effacerErreur(this.refJourNaissance);
                        this.montrerSucces(element, type);
                        this.arrEtapes.etape2.dateNaissance = true;
                    }
                    else this.afficherErreur(this.refJourNaissance, type, "date_invalide");
                }
                //Sinon, on montre le message de date non valide
                else this.afficherErreur(element, type, "motif");
            }
        }
        else this.afficherErreur(element, type, "mois");
    };

    private validerAnneeNaissance = (element:HTMLInputElement, type:string):void => {
        if(!this.verifierSiVide(element)){
            this.afficherErreur(element, type, "vide");
        }
        else if(Number(element.value) < 2019 && Number(element.value) >= 1900) {
            this.effacerErreur(element);

            //Si l'année est valide, on vérifie le restant de la date
            if(this.verifierDateComplete()){
                //Si la date est complète
                if(this.verifierAge(Number(this.refJourNaissance.value), Number(this.refMoisNaissance.value) - 1, Number(this.refAnneeNaissance.value))){
                    if(this.verifierDateValide()){
                        this.effacerErreur(this.refJourNaissance);
                        this.montrerSucces(element, type);
                        this.arrEtapes.etape2.dateNaissance = true;
                    }
                    else this.afficherErreur(this.refJourNaissance, type, "date_invalide");
                }
                //Sinon, on montre le message de date non valide
                else this.afficherErreur(element, type, "motif");
            }
        }
        else this.afficherErreur(element, type, "annee");
    };

    /**
     * Retourne si la date entrée est complète, donc si le jour, le mois et l'année est entrée
     */
    private verifierDateComplete = ():boolean => {
        return this.refJourNaissance.value != "" && this.refMoisNaissance.value != "" && this.refAnneeNaissance.value != "";
    };

    /**
     * Validation de date.. Par exemple: 31 février sera non-valide
     */
    private verifierDateValide = () => {
        const arrMois31Jours:Array<Number> = [1, 3, 5, 7, 8, 10, 12];
        if(!((Number(this.refJourNaissance.value) == 31) || (Number(this.refJourNaissance.value) == 30)) && Number(this.refMoisNaissance.value) == 2) {
            return true;
        }

        let moisValide = false;
        arrMois31Jours.forEach((mois:Number) => {
            if (mois === Number(this.refMoisNaissance.value)) {
                moisValide = true;
            }
        });

        return moisValide;
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
        return element.value == "" || !element.checked;
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
        else if(element.parentNode.parentNode.parentNode.querySelector(".validation") != null){
            return element.parentNode.parentNode.parentNode.querySelector(".validation");
        }
        else{
            return element.parentNode.parentNode.parentNode.parentNode.querySelector(".validation");
        }
    }

    private afficherErreur = (element:HTMLInputElement, type:string, raison:string) => {
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

    private formaterDateMax = ():Date => {
        //On va chercher la date d'aujourd'hui
        let dateMin = new Date();

        //On retire 18 ans à la date d'aujourd'hui
        dateMin.setFullYear( dateMin.getFullYear() - 18);

        //On retourne la date formatée
        return dateMin;

    };

    private verifierAge = (jour:number, mois:number, annee:number):boolean => {
        //On créer un objet date avec la date de naissance
        let dateNaissance = new Date(annee, mois, jour);

        //Si la date de naissance est plus petite que la date maximale
        if(dateNaissance <= this.formaterDateMax()){
            return true
        }
        else{
            return false
        }
    };

    private basculerTypeMotDePasse = (event) => {
        if (event.currentTarget.checked == true) {
            this.inputMDP.type = "text";
        }
        else {
            this.inputMDP.type = "password";
        }
    };

    private verifierEtape = (numEtape) => {
        switch(numEtape){
            case 1:
                if(this.arrEtapes.etape1.genre == true && this.arrEtapes.etape1.genreRecherche == true){
                    this.refObjEtapes.activerBtnEtapeSuivante(1);
                }
                break;
            case 2:
                if(this.arrEtapes.etape2.dateNaissance == true && this.arrEtapes.etape2.codePostal == true){
                    this.refObjEtapes.activerBtnEtapeSuivante(2);
                }
                break;
            case 3:
                if(this.arrEtapes.etape3.pseudo == true && this.arrEtapes.etape3.courriel == true && this.arrEtapes.etape3.mdp == true){
                    this.refObjEtapes.activerBtnEtapeSuivante(3);
                }
                break;
        }
    }
}