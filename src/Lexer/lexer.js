import { Token } from '../Token/tokenizer'
import { tokenTypes } from '../Token/tokentypes'
import { CharIdentifier } from '../../Char/charIdentifier';
import { Report } from '../Diagnostics/error';

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

    recognizeLiteral() {
        let sym = this.input.charAt(this.position);

        switch (sym) {
            case CharIdentifier.isLetter(sym): 
                return this.recognizeKeyWordOrIdentifier();
            case CharIdentifier.isIdentifierBeginning(sym):
                return this.recognizeIdentifier();
            case CharIdentifier.isNumberBeginning(sym):
                return this.recognizeNumber();
            case CharIdentifier.isStringBeginning(sym):
                return this.recognizeString();
        }
        throw new Error(Report.error(this.line, this.column, `Unrecognized token '%{symbol}'.`));
    }

    recognizeKeyWordOrIdentifier() {
        let token = this.recognizeKeyWord();
        return token !== null ? token : this.recognizeIdentifier();
    }

    recognizeKeyWord() {
        let sym = this.input.charAt(this.position);
        let keywords = Object.keys(tokenTypes).filter(key => tokenTypes[key].charAt(0) === sym);

        for (let i in keywords) {
            let keyword = keywords[i];
            let token = this.recognizeToken(tokenTypes[keyword]);
            if (token !== null) {
                let offset = token.value.length;
                if (CharIdentifier.isIdentifierPart(this.input.charAt(this.position + offset))) {
                    return null;
                }
                this.position += offset;
                this.column += offset;
                return token;
            }
        }
        return null;
    }

    recognizeIdentifier() {
        let identifier = '';
        while (this.position < this.inputSize) {
            let sym = this.input.charAt(this.position);
            if (!CharIdentifier.isIdentifierPart(sym)) { break; }
            identifier += sym;
            this.position++;
        }
        let col = this.column;
        this.column += identifier.length;
        return new Token(tokenTypes.Identifier, identifier, this.line, col);
    }

    recognizeNumber() {
        let rec = this.buildNumberRecognizer();
        let {recognized, value} = rec.run(this.input.substring(this.position));
        if (!recognized) { throw new Error(Report.error(this.line, this.column, 'Unrecognized number literal.')); }
        if (this.input.charAt(this.position) === '.' && value === '.') {
            this.position++;
            this.column++;
            return new Token(tokenTypes.Dot, '.', this.line, this.column - 1);
        }
        let offset = value.length;
        if (value.charAt(offset - 1) === '.') {
            value = value.substring(0, offset - 1);
            offset--;
        }
        let col = this.column;
        this.position += offset;
        this.column += offset;
        return new Token(value.includes('.') ? tokenTypes.Decimal : tokenTypes.Integer, value, this.line, col);
    }

    recognizeString() {
        let rec = this.buildStringRecognizer();
        let { recognized, value } = rec.run(this.input.substring(this.position));
        if (!recognized) { throw new Error(Report.error(this.line, this.column, 'Invalid string literal.')); }
        let offset = value.length;
        let col = this.column;
        this.position += offset;
        this.column += offset;
        return new this.Token(tokenTypes.String, value, this.line, col);
    }

    recognizeToken(token) {
        let length = token.length;
        for (let i = 0; i < length; ++i) {
            if (this.input.charAt(this.position + i) !== token.charAt(i)) {
                return null;
            }
        }
        return new Token(token, token, this.line, this.column);
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