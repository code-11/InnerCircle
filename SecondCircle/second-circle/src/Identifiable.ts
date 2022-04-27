export default interface Identifiable<T>{
    id:string;
    equals(other:T) : boolean;
    hash() : String;
} 