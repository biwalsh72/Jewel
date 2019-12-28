import { Expression } from './expression'

export class String extends Expression {
    constructor(value) {
        super();
        this.value = value;
    }

    isString() { return true; }
}