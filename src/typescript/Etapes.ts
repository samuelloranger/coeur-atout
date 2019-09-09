/**
 * @author Samuel Loranger <samuelloranger@gmail.com>
 */
export class Etapes {
    private arrZoneFormulaires:Array<HTMLElement> = [];

    // Constructeur
    constructor(){
        this.chargerFormulaire();
        this.ajouterEcouteursEvenements();
    }

    /**
     * Fonction éxécutée au lancement de l'application
     */
    private chargerFormulaire = () => {
        this.arrZoneFormulaires = Array.apply(document.querySelectorAll(".zoneForm"));

        this.arrZoneFormulaires[2].classList.add()
    };

    /**
     * Fonction qui ajoute les écouteurs d'évènements sur les éléments
     */
    private ajouterEcouteursEvenements = () => {

    };

    // Méthodes d'utilisation

    // Méthodes utilitaires

}