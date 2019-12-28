import { Expression } from './expression'

export class Decimal extends Expression {
    constructor(value) {
        super();
        this.value = value;
    }

    isDecimal() { return true; }
}