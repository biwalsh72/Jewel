import { Expression } from './expression'

export class Boolean extends Expression {
    constructor(value) {
        super();
        this.value = value;
    }
    isBooleanLiteral() { return true; }
}