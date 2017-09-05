/**
 * Script pour les validations du formulaire Coeur-Atout
 * Placer l'app dans l'état initial de sa version avec js
 * (sans js les validations sont faites avec l'API des formulaires de HTML5);
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Validations = (function () {
        function Validations() {
        }
        //Attributs
        //Méthodes
        Validations.prototype.verifierStrVide = function ($elem) {
        };
        /**
         * S'il y a lieu, afficher le message d'erreur
         * Basculer les classes selon état erreur ou succes
         * Afficher une icône d'avertissement(erreur) ou d'encouragement (succès)
         * @param {$(Input)} $elem
         * @param {String} message
         */
        Validations.prototype.montrerErreur = function ($elem, message) {
        };
        Validations.prototype.viderErreur = function ($elem, message) {
            if (message === void 0) { message = ""; }
        };
        Validations.prototype.montrerSucces = function ($elem) {
        };
        /**
         * Vérification de la valeur du input reçu en argument selon le pattern
         * @param {$(Input)} $elem
         * @return {Bool} -
         */
        Validations.prototype.verifPattern = function ($elem) {
            var pattern = new RegExp($elem.attr("pattern"));
            var val = $elem.val();
            return (pattern.test(val)) ? true : false;
        };
        //Méthodes spécifiques à un ou plusieurs formulaires
        /**
         * @desc Valider le choix du genre (boutons radios)
         * @param {Object} e -  Objet Event Blur
         */
        Validations.prototype.validerGenre = function (e) {
        };
        Validations.prototype.validerJourNaissance = function (e) {
        };
        Validations.prototype.validerMoisNaissance = function (e) {
        };
        Validations.prototype.validerAnneeNaissance = function (e) {
        };
        Validations.prototype.validerCodePostal = function (e) {
        };
        Validations.prototype.validerNomUsager = function (e) {
        };
        Validations.prototype.changerStep = function ($Elem) {
        };
        return Validations;
    }());
    exports.Validations = Validations;
});
//# sourceMappingURL=Validations.js.map