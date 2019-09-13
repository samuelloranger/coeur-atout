import {Validations} from './Validations';
import {Etapes} from './Etapes';

document.querySelector("body").classList.add("js");

const objEtapes = new Etapes();

new Validations(objEtapes);