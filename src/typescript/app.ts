import {Validations} from './Validations';
import {Etapes} from './Etapes';

document.querySelector("body").classList.add("js");

//On instancie l'objet Étapes
const objEtapes = new Etapes();

//On instancie l'objet Validations
new Validations(objEtapes);