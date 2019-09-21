/**
 * @author Samuel Loranger <samuelloranger@gmail.com>
 */
export class Etapes {
    //Arrays d'éléments
    private arrZoneFormulaires:Array<HTMLElement> = Array.apply(null, document.querySelectorAll(".zoneForm"));
    private arrEtapes:Array<HTMLElement> = Array.apply(null, document.querySelectorAll(".elementEtapes"));

    //Éléments boutons
    private btnZone1Suivant:HTMLInputElement = document.querySelector("#btnZone1Suivant");
    private btnZone2Precedent:HTMLInputElement = document.querySelector("#btnZone2Precedent");
    private btnZone2Suivant:HTMLInputElement = document.querySelector("#btnZone2Suivant");
    private btnZone3Precedente:HTMLInputElement = document.querySelector("#btnZone3Precedente");
    private btnEnvoyer:HTMLInputElement = document.querySelector("#btnSoumetre");

    // Constructeur
    constructor(){
        this.chargerFormulaire();
        this.ajouterEcouteursEvenements();
    }

    /**
     * Fonction éxécutée au lancement de l'application
     */
    private chargerFormulaire = () => {
        //On cache les zones deformulaires
        this.arrZoneFormulaires[1].classList.add("visuallyhidden");
        this.arrZoneFormulaires[2].classList.add("visuallyhidden");

        this.btnEnvoyer.setAttribute("disabled", "disabled");
        this.btnEnvoyer.classList.add("boutonDisabled");
    };

    /**
     * Fonction qui ajoute les écouteurs d'évènements sur les éléments
     */
    private ajouterEcouteursEvenements = () => {
        this.btnZone1Suivant.addEventListener("click", () => {
            this.changerZoneForm(1);
        });

        this.btnZone2Precedent.addEventListener("click", () => {
            this.changerZoneForm(2);
        });

        this.btnZone2Suivant.addEventListener("click", () => {
            this.changerZoneForm(2, true);
        });

        this.btnZone3Precedente.addEventListener("click", () => {
            this.changerZoneForm(3);
        });
    };

    // Méthodes d'utilisation
    private changerZoneForm = (numZone:number, etat:boolean = false) => {
        switch(numZone){
            case 1:
                //Changement de zone
                this.arrZoneFormulaires[0].classList.add("visuallyhidden");
                this.arrZoneFormulaires[1].classList.remove("visuallyhidden");

                //Changement du visuel de l'étape
                this.arrEtapes[0].classList.add("elementEtapes__complete");
                this.arrEtapes[0].classList.remove("elementEtapes__courant");
                this.arrEtapes[1].classList.add("elementEtapes__courant");

                //Changement du visuel de l'étape
                break;
            case 2:
                if(etat){
                    //Changement de zone
                    this.arrZoneFormulaires[1].classList.add("visuallyhidden");
                    this.arrZoneFormulaires[2].classList.remove("visuallyhidden");

                    //Changement du visuel de l'étape
                    this.arrEtapes[1].classList.remove("elementEtapes__courant");
                    this.arrEtapes[1].classList.add("elementEtapes__complete");
                    this.arrEtapes[2].classList.add("elementEtapes__courant");
                }
                else{
                    //Changement de zone
                    this.arrZoneFormulaires[0].classList.remove("visuallyhidden");
                    this.arrZoneFormulaires[1].classList.add("visuallyhidden");

                    //Changement du visuel de l'étape
                    this.arrEtapes[0].classList.add("elementEtapes__courant");
                    this.arrEtapes[0].classList.remove("elementEtapes__complete");
                    this.arrEtapes[1].classList.remove("elementEtapes__courant");
                }
                break;
            case 3:
                //Changement de zone
                this.arrZoneFormulaires[2].classList.add("visuallyhidden");
                this.arrZoneFormulaires[1].classList.remove("visuallyhidden");

                //Changement du visuel de l'étape
                this.arrEtapes[1].classList.add("elementEtapes__courant");
                this.arrEtapes[1].classList.add("elementEtapes__complete");
                this.arrEtapes[2].classList.remove("elementEtapes__courant");
                break;
            default:
                break;
        }
    };

    private modifierBtnEtapeSuivante = (numeroBtn:number, activation:boolean) => {
        let refBtn:HTMLInputElement = null;

        switch(numeroBtn){
            case 1:
                refBtn = this.btnZone1Suivant;
                break;
            case 2:
                refBtn = this.btnZone2Suivant;
                break;
            case 3:
                refBtn = this.btnEnvoyer;
                break;
            default:
                break;
        }

        if(activation){
            refBtn.removeAttribute("disabled");
            refBtn.classList.remove("boutonDisabled");
        }
        else{
            refBtn.setAttribute("disabled", "disabled");
            refBtn.classList.add("boutonDisabled");
        }

    };


}