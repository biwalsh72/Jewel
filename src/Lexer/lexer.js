import { Token } from '../Token/tokenizer'
import { tokenTypes } from '../Token/tokentypes'

export class Lexer {
    constructor(input) { 
        this.input = input;
        this.inputSize = input.length;
        this.buffer = [];
        this.position = 0;
        this.line = 0;
        this.column = 0;
    }

    tokenize() {
        let tokens = [];
        let token = null;

        do {
            token = this.nextToken();

            if (token.type === tokenTypes.EndOfInput) { break; }

            tokens.push(token);
        }
        while (token.type !== tokenTypes.EndOfInput);

        return tokens;
    }

    nextToken() {
        if (this.buffer.length > 0) {
            return this.buffer.pop();
        }
        return this.readToken();
    }

    lookahead() {
        var token = this.readToken();
        this.buffer.push(token);
        return token;
    }

    readToken() {
        this.skipWhiteSpaces();

        if (this.position >= this.inputSize) {
            return new Token(tokenTypes.EndOfInput);
        }


    }

    skipWhiteSpaces() {
        //skip whitespace when performing tokenizing
        while (this.position < this.inputSize && CharUtils.isWhiteSpace(this.input.charAt(this.position))) {
            this.position++;
            this.column++;
        }
    }

    skipUntilNewline() {
        while (this.position < this.inputSize && !CharUtils.isNewline(this.input.charAt(this.position))) {
            this.position++;
            this.column++;
        }
    }
}