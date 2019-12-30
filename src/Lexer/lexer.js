import { Token } from '../Token/tokenizer'
import { tokenTypes } from '../Token/tokentypes'
import { CharIdentifier } from '../../Char/charIdentifier';

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

        //recognize end of input
        if (this.position >= this.inputSize) {
            return new Token(tokenTypes.EndOfInput);
        }

        //set the current file position to be a new symbol for tokenizing
        var sym = this.input.charAt(this.position);

        //optimize & reduce unit size
        switch(sym) {
            case CharIdentifier.isLiteralBeginning(sym):
                return this.recognizeLiteral();
            case CharIdentifier.isOperator(sym):
                return this.recognizeOperator();
            case CharIdentifier.isDelimiter(sym):
                return this.recognizeDelimiter(sym);
            case CharIdentifier.isDot(sym): {
                let column = this.column;
                this.position++;
                this.column++;
                return new Token(tokenTypes.Dot, '.', this.line, column);
            }
            case CharIdentifier.isNewLine(sym): {
                let line = this.line;
                let column = this.column;
                this.position++;
                this.line++;
                this.column = 0;
                return new Token(tokenTypes.Newline, '\n', line, column);
            }
        }

        //expand to full error diagnostics later
        throw new Error(Report.error(this.line, this.column, `Unrecognized token '%{symbol}'.`));
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