import { Expression } from './expression'

export class Integer extends Expression {
    constructor(value) { 
        super();
        this.value = value;
    }

    isInteger() { return true; }
}