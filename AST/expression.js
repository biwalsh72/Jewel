import { AstNode } from './node'

export class Expression extends AstNode {
    constructor() {
        super();
        this.line = -1;
        this.column = -1;
        this.expressionType = undefined;
    }

    hasType() {
        return this.expressionType !== undefined;
    }

    isExpression() { return true; }

    isBoolean() { return false; }
    isDecimal() { return false; }
    isInteger() { return false; }
    isString() { return false; }
}