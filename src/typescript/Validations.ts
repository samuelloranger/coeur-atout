/**
 * @author Samuel Loranger <samuelloranger@gmail.com>
 */
import {Etapes} from "./Etapes";

export class Validations {
    // ATTRIBUTS
    private objMessages: JSON;

    // Éléments de formulaire à valider
    //Je suis
    private refarrJeSuis:Array<HTMLInputElement> = Array.apply(null, document.querySelectorAll('[name=genre_utilisateur]'));
    private refarrJeCherche:Array<HTMLInputElement> = Array.apply(null, document.querySelectorAll('.genre_recherche'));

    //Date de naissance
    private refJourNaissance:HTMLInputElement = document.querySelector("#naissance_jour");
    private refMoisNaissance:HTMLInputElement = document.querySelector("#naissance_mois");
    private refAnneeNaissance:HTMLInputElement = document.querySelector("#naissance_annee");

    //Code postal
    private refCodePostal:HTMLInputElement = document.querySelector("#code_postal");

    //Mon compte
    private refPseudo:HTMLInputElement = document.querySelector("#pseudo");
    private refCourriel:HTMLInputElement = document.querySelector("#courriel");
    private refPassword:HTMLInputElement = document.querySelector("#password");

    //Mot de passe
    private inputMDP:HTMLInputElement = document.querySelector("#password");
    private checkboxMontrerMDP:HTMLInputElement = document.querySelector("#montrerMDP");

    //Checkbox des termes d'utilisation
    private refTermesUtilisation:HTMLInputElement = document.querySelector("#termesUtilisation");

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
            mdp: false,
            termesUtilisation: false
        }
    };

    // Constructeur
    /**
     * Constructeur de la fonction, ajoute les écouteurs d'évènements et
     *  load le JSON des messaegs de validation
     * @param objEtapes: L'objet de la zone de gestion des étapes
     */
    constructor(objEtapes:Etapes) {
        this.refObjEtapes = objEtapes;

        //On va chercher les informations dans le fichier json à l'aide d'un fetch
        fetch("assets/js/objMessages.json")
            //Après que le fetch ait terminé
            .then(response => response.json())
            //Après que la réponse json ait été éxécutée, on l'enregistre
            .then(response => {
                this.objMessages = response;
                this.ajouterEcouteursEvenements();
            });

        //On désactive la validation automatique du formulaire
        document.querySelector('form').noValidate = true;
    }

    /**
     * Fonction qui ajoute les écouteurs d'évènements sur les éléments
     */
    private ajouterEcouteursEvenements = ():void => {
        //Zone 1
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
            element.addEventListener("click", () =>
                this.validerJeCherche(element, "sexe")
            );
        });

        //Zone 2
        //Jour
        this.refJourNaissance.addEventListener("blur", () => {
            this.validerJourNaissance(this.refJourNaissance, "dateNaissance");
        });

        //Mois
        this.refMoisNaissance.addEventListener("blur", () => {
            this.validerMoisNaissance(this.refMoisNaissance, "dateNaissance");
        });

        //Annee
        this.refAnneeNaissance.addEventListener("blur", () => {
            this.validerAnneeNaissance(this.refAnneeNaissance, "dateNaissance");
        });

        //Code postal
        this.refCodePostal.addEventListener("blur", () => {
            this.validerCodePostal(this.refCodePostal, "codePostal");
        });

        //Zone 3
        //Prénom/pseudo
        this.refPseudo.addEventListener("blur", () => {
            this.validerPseudo(this.refPseudo, "pseudo");
        });

        //Courriel
        this.refCourriel.addEventListener("blur", () => {
            this.validerCourriel(this.refCourriel, "courriel");
        });

        //Password
        this.refPassword.addEventListener("blur", () => {
            this.validerMotDePasse(this.refPassword, "motDePasse");
        });

        //Termes d'utilisation
        this.refTermesUtilisation.addEventListener("change", () => {
            this.validerConsentement(this.refTermesUtilisation, "termesUtilisation");
        });

        //Checkbox bouton montrer mot de passe
        this.checkboxMontrerMDP.addEventListener("click", () => {
            this.basculerTypeMotDePasse(this.checkboxMontrerMDP);
        });
    };

    // Méthodes de validation
    /**
     * Fonction qui valide le genre
     * @param element: L'élément HTML input qui a appellé la fonction
     * @param type: Type de validation (ex: date de naissance)
     */
    private validerJeSuis = (element:HTMLInputElement, type:string):void => {
        //Si l'élément est vide
        if(this.verifierSiVide(element)){
            this.afficherErreur(element, type, "vide");
            this.arrEtapes.etape1.genre = false;
        }
        else{
            this.effacerErreur(element);
            this.montrerSuccesZoneForm(element, type);
            this.arrEtapes.etape1.genre = true;
        }

        //On véréfie si l'étape 1 est complétée à 100%
        this.verifierEtape(1);
    };

    /**
     * Fonction qui valide le sexe recherché
     * @param element: L'élément HTML input qui a appellé la fonction
     * @param type: Type de validation (ex: date de naissance)
     */
    private validerJeCherche = (element:HTMLInputElement, type:string):void => {
        //Si l'élément courant est coché
        if(this.verifierSiVide(element)) {
            //S'il n'est pas coché, il vérifie si les autres
            let autreElemCoche = false;

            //Passage sur tous les autres éléments
            this.refarrJeCherche.forEach((element: HTMLInputElement) => {
                if(!this.verifierSiVide(element)) {
                    autreElemCoche = true;
                }
            });

            //Si aucun autre élément n'est coché, on affiche l'erreur
            if (!autreElemCoche) {
                this.afficherErreur(element, type, "vide");
                this.arrEtapes.etape1.genreRecherche = false;
            }
        }
        else{
            this.effacerErreur(element);
            this.montrerSuccesZoneForm(element, type);
            this.arrEtapes.etape1.genreRecherche = true;
        }

        //On véréfie si l'étape 1 est complétée à 100%
        this.verifierEtape(1);
    };

    /**
     * Fonction qui valide le jour de la date de naissance
     * @param element: L'élément HTML input qui a appellé la fonction
     * @param type: Type de validation (ex: date de naissance)
     */
    private validerJourNaissance = (element:HTMLInputElement, type:string):void => {
        //Si l'étape n'est pas vide
        if(!this.verifierSiVide(element)){
            this.afficherErreur(element, type, "vide");
            this.arrEtapes.etape2.dateNaissance = false;
        }
        else if(Number(element.value) >= 1 && Number(element.value) <= 31) {
            // this.effacerErreur(element);

            //Si le jour est valide, on vérifie le restant de la date
            if(this.verifierDateComplete()){
                //Si la date est complète
                if(this.verifierAge(Number(this.refJourNaissance.value), Number(this.refMoisNaissance.value) - 1, Number(this.refAnneeNaissance.value))){
                    //Valider si la date est valide (Exemple 31 février ne sera pas valide)
                    if(this.verifierDateValide()){
                        //Si toutes les conditions sont respectées, afficher le succès.
                        this.montrerSuccesZoneDate(element, type);
                    }
                    else {
                        this.afficherErreur(this.refJourNaissance, type, "date_invalide");
                        this.arrEtapes.etape2.dateNaissance = false;
                    }
                }
                //Sinon, on montre le message de date non valide
                else {
                    this.afficherErreur(element, type, "info");
                    this.arrEtapes.etape2.dateNaissance = false;
                }
            }
        }
        else{
            if(Number(element.value) > 31 || Number(element.value) < 0){
                this.afficherErreur(element, type, "jour_invalide");
            }
            else{
                this.afficherErreur(element, type, "jour");
                this.arrEtapes.etape2.dateNaissance = false;
            }
        }

        //On véréfie si l'étape 1 est complétée à 100%
        this.verifierEtape(2);
    };

    /**
     * Fonction qui valide le mois de la date de naissance
     * @param element: L'élément HTML input qui a appellé la fonction
     * @param type: Type de validation (ex: date de naissance)
     */
    private validerMoisNaissance = (element:HTMLInputElement, type):void => {
        if (!this.verifierSiVide(element)) {
            this.afficherErreur(element, type, "vide");
            this.arrEtapes.etape2.dateNaissance = false;
        }
        else if (Number(element.value) >= 1 && Number(element.value) <= 12) {

            //Si le mois est valide, on vérifie le restant de la date
            if (this.verifierDateComplete()) {
                //Si la date est complète
                if (this.verifierAge(Number(this.refJourNaissance.value), Number(this.refMoisNaissance.value) - 1, Number(this.refAnneeNaissance.value))) {
                    if (this.verifierDateValide()) {
                        this.montrerSuccesZoneDate(element, type);
                    }
                    else {
                        this.afficherErreur(this.refJourNaissance, type, "date_invalide");
                        this.arrEtapes.etape2.dateNaissance = false;
                    }

                }
                //Sinon, on montre le message de date non valide
                else {
                    this.afficherErreur(element, type, "motif");
                    this.arrEtapes.etape2.dateNaissance = false;
                }
            }
        }
        else {
            this.afficherErreur(element, type, "mois");
            this.arrEtapes.etape2.dateNaissance = false;
        }

        //On véréfie si l'étape 2 est complétée à 100%
        this.verifierEtape(2);
    };

    /**
     * Fonction qui valide l'année de la date de naissance
     * @param element: L'élément HTML input qui a appellé la fonction
     * @param type: Type de validation (ex: date de naissance)
     */
    private validerAnneeNaissance = (element:HTMLInputElement, type:string):void => {
        if(!this.verifierSiVide(element)){
            this.afficherErreur(element, type, "vide");
            this.arrEtapes.etape2.dateNaissance = false;
        }
        else if(Number(element.value) < 2019 && Number(element.value) >= 1900) {
            this.effacerErreur(element);

            //Si l'année est valide, on vérifie le restant de la date
            if(this.verifierDateComplete()){
                //Si la date est complète
                if(this.verifierAge(Number(this.refJourNaissance.value), Number(this.refMoisNaissance.value) - 1, Number(this.refAnneeNaissance.value))){
                    if(this.verifierDateValide()){
                        this.montrerSuccesZoneDate(element, type);
                    }
                    else this.afficherErreur(this.refJourNaissance, type, "date_invalide");
                }
                //Sinon, on montre le message de date non valide
                else{
                    this.afficherErreur(element, type, "motif");
                    this.arrEtapes.etape2.dateNaissance = false;
                }
            }
        }
        else {
            this.afficherErreur(element, type, "annee");
            this.arrEtapes.etape2.dateNaissance = false;
        }

        //On véréfie si l'étape 2 est complétée à 100%
        this.verifierEtape(2);
    };

    /**
     * Fonction pour éviter de répéter les 4 mêmes lignes dans la zone de date
     * @param element: L'élément qui a appellé la fonction
     * @param type: Type de validation (ex: date de naissance)
     */
    private montrerSuccesZoneDate = (element:HTMLInputElement, type:string) => {
        //On efface l'erreur du mois
        this.effacerErreur(this.refJourNaissance);

        //On efface l'erreur de l'année
        this.effacerErreur(this.refAnneeNaissance);

        //On affiche le succès
        this.montrerSuccesZoneForm(element, type);

        //On change le statut de l'étape de validation de la date de naissance
        this.arrEtapes.etape2.dateNaissance = true;
    };

    /**
     * Fonction de validaiton du code postal
     * @param element L'élément qui a appellé la fonction
     * @param type: Type de validation (ex: date de naissance)
     */
    private validerCodePostal = (element:HTMLInputElement, type:string) => {
        //Si l'input n'est pas vide...
        if(this.verifierSiVide(element)){
            //On vérifie le pattern...
            if(this.verifierPattern(element)){
                //On efface l'erreur et on affiche le succès
                this.effacerErreur(element);
                this.montrerSuccesZoneForm(element, type);
                this.arrEtapes.etape2.codePostal = true;
            }
            else{
                //Si la longueur de l'input est de 6
                if(element.value.length == 6){
                    //On met le texte en majuscule
                    element.value = element.value.toUpperCase();
                    //On va chercher les 3 premiers caractères,
                    // on ajoute une espace, et on va chercher les derniers caractères
                    element.value = element.value.substring(0, 3) + " " + element.value.substring(3, 6);

                    //On revérifie l'input s'il est maintenant correct...
                    this.validerCodePostal(element, type);
                }
                //Sinon on affiche l'erreur
                else{
                    this.afficherErreur(element, type, "motif");
                    this.arrEtapes.etape2.codePostal = false;
                }

            }
        }
        //Sinon on affiche l'erreur d'input vide...
        else{
            this.afficherErreur(element, type, "vide");
            this.arrEtapes.etape2.codePostal = false;
        }

        this.verifierEtape(2);
    };

    /**
     * Fonction de validaiton du pseudo
     * @param element L'élément qui a appellé la fonction
     * @param type: Type de validation (ex: date de naissance)
     */
    private validerPseudo = (element:HTMLInputElement, type:string) => {
        //Si l'input n'est pas vide...
        if(this.verifierSiVide(element)){
            //On vérifie le pattern...
            if(this.verifierPattern(element)){
                //On efface l'erreur et on affiche le succès
                this.effacerErreur(element);
                this.montrerSuccesZoneForm(element, type);
                this.arrEtapes.etape3.pseudo = true;
            }
            else{
                this.afficherErreur(element, type, "motif");
                this.arrEtapes.etape3.pseudo = false;
            }
        }
        //Sinon on affiche l'erreur d'input vide...
        else{
            this.afficherErreur(element, type, "vide");
            this.arrEtapes.etape3.pseudo = false;
        }

        this.verifierEtape(3);
    };

    /**
     * Fonction de validaiton du courriel
     * @param element L'élément qui a appellé la fonction
     * @param type: Type de validation (ex: date de naissance)
     */
    private validerCourriel = (element:HTMLInputElement, type:string) => {
        //Si l'input n'est pas vide...
        if(this.verifierSiVide(element)){
            //On vérifie le pattern...
            if(this.verifierPattern(element)){
                //On efface l'erreur et on affiche le succès
                this.effacerErreur(element);
                this.montrerSuccesZoneForm(element, type);
                this.arrEtapes.etape3.courriel = true;
            }
            else{
                this.afficherErreur(element, type, "motif");
                this.arrEtapes.etape3.courriel = false;
            }
        }
        //Sinon on affiche l'erreur d'input vide...
        else{
            this.afficherErreur(element, type, "vide");
            this.arrEtapes.etape3.courriel = false;
        }

        this.verifierEtape(3);
    };

    /**
     * Fonction de validaiton du mot de passe
     * @param element L'élément qui a appellé la fonction
     * @param type: Type de validation (ex: date de naissance)
     */
    private validerMotDePasse = (element:HTMLInputElement, type:string) => {
        //Si l'input n'est pas vide...
        if(this.verifierSiVide(element)){
            //On vérifie le pattern...
            if(this.verifierPattern(element)){
                //On efface l'erreur et on affiche le succès
                this.effacerErreur(element);
                this.montrerSuccesZoneForm(element, type);
                this.arrEtapes.etape3.mdp = true;
            }
            else{
                //Tests des types d'erreurs
                const arrElement:Array<string> = element.value.split('');

                //Test de la longueur du mot de passe
                let longueurOk:boolean = false;
                if(arrElement.length >= 6 && arrElement.length <= 15){
                    longueurOk = true;
                }

                //On teste si la longeur est ok
                if(longueurOk){
                    //Si le mot de passe contient un nombre
                    const arrNombres:Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                    let contientNombre = false;
                    arrElement.forEach((lettre:string) => {
                        arrNombres.forEach((nombre:number) => {
                            if(Number(lettre) === nombre){
                                contientNombre = true;
                            }
                        });
                    });

                    //Si le mot de passe ne contient pas de nombre, on affiche l'erreur
                    if(!contientNombre){
                        this.afficherErreur(element, type, "num", true);
                        this.arrEtapes.etape3.mdp = false;
                    }

                    //Si le mot de passe contient une lettre
                    const alphabet = "abcdefghijklmnoprstuvwxyz".split("");
                    let contientLettre = false;
                    arrElement.forEach((char:string) => {
                        alphabet.forEach((lettre:string) => {
                            if(char === lettre || char === lettre.toUpperCase()){
                                contientLettre = true;
                            }
                        });
                    });

                    //Si le mot de passe contient des lettres
                    if(contientLettre){
                        //Si le mot de passe contient une majuscule
                        let contientMajuscule = false;
                        arrElement.forEach((lettre:string) => {
                            if(lettre === lettre.toUpperCase()){
                                contientMajuscule = true;
                            }
                        });

                        //Si le mot de passe ne contient pas de majuscule
                        if(!contientMajuscule){
                            this.afficherErreur(element, type, "majus", true);
                            this.arrEtapes.etape3.mdp = false;
                        }

                        //Si le mot de passe contient une minuscule
                        let contientMinuscule = false;
                        arrElement.forEach((lettre:string) => {
                            if(lettre === lettre.toLowerCase()){
                                contientMinuscule = true;
                            }
                        });

                        //Si le mot de passe contient une minuscule
                        if(!contientMinuscule){
                            this.afficherErreur(element, type, "minus", true);
                            this.arrEtapes.etape3.mdp = false;
                        }
                    }
                    else{
                        this.afficherErreur(element, type, "lettre", true);
                        this.arrEtapes.etape3.mdp = false;
                    }

                }
                else{
                    this.afficherErreur(element, type, "size", true);
                    this.arrEtapes.etape3.mdp = false;
                }
            }
        }
        //Sinon on affiche l'erreur d'input vide...
        else{
            this.afficherErreur(element, type, "vide", true);
            this.arrEtapes.etape3.mdp = false;
        }

        //On véréfir l'étape #3
        this.verifierEtape(3);
    };

    /**
     * Fonction de validaiton du consentement
     * @param element L'élément qui a appellé la fonction
     * @param type: Type de validation (ex: date de naissance)
     */
    private validerConsentement = (element:HTMLInputElement, type:string) => {
        if(!this.verifierSiVide(element)){
            this.arrEtapes.etape3.termesUtilisation = true;
            this.effacerErreur(element);
            this.montrerSuccesZoneForm(element, type);
        }
        else{
            this.afficherErreur(element, type, "motif");
            this.arrEtapes.etape3.termesUtilisation = false;
        }

        this.verifierEtape(3);
    };

    // Méthodes utilitairesx
    /**
     * Vérifie si l'input est vide ou non
     * @param element: Le champ input
     */
    private verifierSiVide = (element:HTMLInputElement):boolean => {
        return element.value == "" || !element.checked;
    };

    /**
     * Teste le pattern et retourne vrai ou faux
     * @param element: Le champ input
     */
    private verifierPattern = (element:HTMLInputElement):boolean => {
        return new RegExp(element.pattern).test(element.value);
    };

    /**
     * Retourne la zone de validationm la plus près, remonte de 4 parents
     * @param element: Élément input qui a appellé la fonction
     * @return: Élément html le plus près du param element
     */
    private getZoneValidation = (element:HTMLInputElement):HTMLElement => {
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
    };

    /**
     * Affiche l'erreur du remplissage du formulaire
     * @param element: Élément input qui a appellé la fonction
     * @param type: Type d'élément de formulaire (ex: date de naissance)
     * @param raison: Raison de l'erreur
     * @param isMpd: Si la zone à valider est le mot de passe
     */
    private afficherErreur = (element:HTMLInputElement, type:string, raison:string, isMpd:boolean = false):void => {
        const zoneValidation = this.getZoneValidation(element);
        element.classList.add("validation--containerErreur");
        zoneValidation.classList.add("validation--erreur");
        zoneValidation.classList.add("validation--iconeErreur");
        zoneValidation.classList.add("validation--icone");
        if(isMpd){
            zoneValidation.innerHTML = this.objMessages[type]["erreurs"]["base"] + "<br/>" +  this.objMessages[type]["erreurs"]["type"][raison];
        }
        else{
            zoneValidation.innerHTML = this.objMessages[type]["erreurs"][raison];
        }
    };

    /**
     * Efface les erreurs du champ
     * @param element: Élément input qui a appellé la fonction
     */
    private effacerErreur = (element:HTMLInputElement):void => {
        const zoneValidation = this.getZoneValidation(element);
        element.classList.remove("validation--containerErreur");
        zoneValidation.classList.remove("validation--erreur");
        zoneValidation.classList.remove("validation--iconeErreur");
        zoneValidation.innerHTML = "";
    };

    /**
     * Affiche le succès du remplissage du formulaire
     * @param element: Élément input qui a appellé la fonction
     * @param type: Type d'élément de formulaire (ex: date de naissance)
     */
    private montrerSuccesZoneForm = (element:HTMLInputElement, type:string):void => {
        const zoneValidation = this.getZoneValidation(element);
        zoneValidation.classList.add("validation--ok");
        zoneValidation.classList.add("validation--icone");
        zoneValidation.classList.add("validation--iconeOk");
        zoneValidation.innerHTML = this.objMessages[type]["ok"];
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
    private verifierDateValide = ():boolean => {
        let listeJoursMois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        let jour:number = Number(this.refJourNaissance.value);
        let mois:number = Number(this.refMoisNaissance.value);
        let annee:number = Number(this.refAnneeNaissance.value);

        //Si l'année est bissextile, on change la valeur dans le tableau
        if ((!(annee % 4) && annee % 100) || !(annee % 400))
            listeJoursMois[1] = 29;

        return jour <= listeJoursMois[mois-1];
    };

    /**
     * Fonction de formatage de date maximale
     */
    private formaterDateMax = ():Date => {
        //On va chercher la date d'aujourd'hui
        let dateMin = new Date();

        //On retire 18 ans à la date d'aujourd'hui
        dateMin.setFullYear( dateMin.getFullYear() - 18);

        //On retourne la date formatée
        return dateMin;
    };

    /**
     * Fonction qui vérifie si l'âge de la personne s'inscrit est plus que 18 ans
     * @param jour Numéro du jour
     * @param mois Numéro du mois
     * @param annee Numéro de l'année
     */
    private verifierAge = (jour:number, mois:number, annee:number):boolean => {
        //On créer un objet date avec la date de naissance
        let dateNaissance = new Date(annee, mois, jour);

        //Si la date de naissance est plus petite que la date maximale
        return dateNaissance <= this.formaterDateMax();
    };

    /**
     * Fonction qui change l'étart de la zone de mot de passe pour toggle l'état de l'input du champ mdp
     * @param element L'élément qui a appellé la fonction
     */
    private basculerTypeMotDePasse = (element:HTMLInputElement):void => {
        if (element.checked == true) {
            this.inputMDP.type = "text";
        }
        else {
            this.inputMDP.type = "password";
        }
    };

    /**
     * Fonction verifierEtape Vérife si l'étape 1, 2, ou 3 a été vérifiée
     * @param numEtape Numéro de l'étape à vérifier
     */
    private verifierEtape = (numEtape):void => {
        switch(numEtape){
            case 1:
                if(this.arrEtapes.etape1.genre == true && this.arrEtapes.etape1.genreRecherche == true)
                    this.refObjEtapes.modifierBtnEtapeSuivante(1, true);
                else
                    this.refObjEtapes.modifierBtnEtapeSuivante(1, false);
                break;
            case 2:
                if(this.arrEtapes.etape2.dateNaissance == true && this.arrEtapes.etape2.codePostal == true)
                    this.refObjEtapes.modifierBtnEtapeSuivante(2, true);
                else
                    this.refObjEtapes.modifierBtnEtapeSuivante(2, false);
                break;
            case 3:
                if(this.arrEtapes.etape3.pseudo == true && this.arrEtapes.etape3.courriel == true && this.arrEtapes.etape3.mdp == true&& this.arrEtapes.etape3.termesUtilisation == true)
                    this.refObjEtapes.modifierBtnEtapeSuivante(3, true);
                else
                    this.refObjEtapes.modifierBtnEtapeSuivante(2, false);
                break;
        }
    }
}