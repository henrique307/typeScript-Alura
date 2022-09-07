import Comparavel from "../interfaces/ehIgual";
import Imprimivel from "./Imprimivel";

export default interface Conjuntao<T> extends Comparavel<T>, Imprimivel {}