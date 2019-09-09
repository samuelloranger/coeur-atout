const objMessages = {
    "nameOuId": {
        "label": "Intitulé de la balise label ou d'un attribut title",
        "info": "Informations ou légende explicative",
        "exemple": "Exemple",
        "erreurs": {
            "vide": "Message à afficher si l'élément de formulaire n'est pas complété",
            "motif": "Explication complète du motif attendu"
        }
    },

    "sexe": {
        "label": ["un homme", "une femme", "autre"],
        "erreurs": {
            "vide": "Veuillez préciser votre genre, s’il vous plaît."
        },
        "ok": "Parfait! passons à l'étape suivante..."
    },

    "dateNaissance": {
        "label": "Date de naissance",
        "info": "Il faut avoir plus de 18 ans pour s'inscrire.",
        "erreurs": {
            "vide": "Veuillez entrer votre date de naissance, s’il vous plaît. ",
            "motif": "Vous êtes trop jeune pour vous inscrire ici!",
            "type": {
                "jour": "Entrez votre jour de naissance",
                "mois": "Sélectionnez votre mois de naissance",
                "annee": "Entrez les 4 chiffres de votre année de naissance"
            }
        }
    },

    "codePostal": {
        "label": "Code postal",
        "info": "Votre code postal ne sera pas dévoilé.",
        "exemple": "Ex.: A1A1A1",
        "erreurs": {
            "vide": "Veuillez entrer votre code postal pour nous permettre d'identifier votre lieu de résidence.",
            "motif": "Entrez votre code postal au format A1A1A1, sans espace."
        }
    },

    "pseudo": {
        "label": "Pseudo",
        "info": "Utiliser des lettres, des traits d'unions ou des espaces pour composer votre nom d'usager.",
        "erreurs": {
            "vide": "Veuiller compléter le champ pseudo, s’il vous plaît.",
            "dejaPris": "Ce pseudo existe déjà... Essayez autre chose...",
            "motif": "Attention, votre nom d'usager doit comporter un minimum de 2 lettres. Trait d'union ou espace sont permis pour séparer deux mots."
        }
    },

    "courriel": {
        "label": "Courriel",
        "erreurs": {
            "vide": "Veuillez entrer votre adresse courriel, s’il vous plaît.",
            "motif": "Vérifiez votre adresse courriel, il semble y avoir une erreur."
        }
    },

    "motDePasse": {
        "label": "Mot de passe",
        "info": "Saisir entre 6 et 10 caractères, au moins une minuscule et une majuscule et un caractère numérique.",
        "erreurs": {
            "vide": "Veuillez définir votre mot de passe.",
            "base": "Pour renforcer la sécurité de votre mot de passe: \n",
            "type": {
                "size": "\t  -  saisissez entre 6 et 10 caractères\n",
                "minus": "\t  -  ajoutez au moins une minuscule\n",
                "majus": "\t  -  ajoutez au moins une majuscule\n",
                "num": "\t  -  ajoutez au moins un chiffre\n"
            }
        }
    },

    "basculeTypeMotDePasse": {
        "label": "Afficher le mot de passe"
    },

    "termesUtilisation": {
        "label": "J'accepte les <a href='#'>termes d'utilisation.</a>",
        "info": "Votre consentement légal est requis.",
        "erreurs": {
            "motif": "SVP, cochez même si vous n'avez pas lu les termes d'utilisation."
        }
    }
};

export { objMessages as objJson };