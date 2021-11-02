export default interface Identifiable<T>{
    equals(other:T) : boolean;
    hash() : String;
} 