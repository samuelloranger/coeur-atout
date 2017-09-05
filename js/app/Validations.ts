/**
 * Script pour les validations du formulaire Coeur-Atout
 * Placer l'app dans l'état initial de sa version avec js
 * (sans js les validations sont faites avec l'API des formulaires de HTML5);
 */

export class Validations{

    //Attributs


    //Méthodes
    private verifierStrVide($elem):boolean {

    }
    /**
     * S'il y a lieu, afficher le message d'erreur
     * Basculer les classes selon état erreur ou succes
     * Afficher une icône d'avertissement(erreur) ou d'encouragement (succès)
     * @param {$(Input)} $elem
     * @param {String} message
     */
    private montrerErreur($elem, message):void {

    } 
    private viderErreur($elem, message:String=""):void {

    }
    private montrerSucces($elem):void {

    }
    /**
     * Vérification de la valeur du input reçu en argument selon le pattern
     * @param {$(Input)} $elem
     * @return {Bool} -
     */
    private verifPattern($elem):boolean {
        var pattern = new RegExp($elem.attr("pattern"));
        var val = $elem.val();
        return (pattern.test(val)) ? true : false;
    }

    //Méthodes spécifiques à un ou plusieurs formulaires

    /**
     * @desc Valider le choix du genre (boutons radios)
     * @param {Object} e -  Objet Event Blur
     */
    private validerGenre(e:Event){

    }

    private validerJourNaissance(e:Event){

    }

    private validerMoisNaissance(e:Event){

    }

    private validerAnneeNaissance(e:Event){

    }

    private validerCodePostal(e:Event){

    }

    private validerNomUsager(e:Event){

    }

    private changerStep($Elem){

    }
    
    
}