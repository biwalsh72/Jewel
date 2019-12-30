export class CharIdentifier {
    //return ascii values for letters 'a' - 'z' and 'A' to 'Z'
    static isLetter(char) {
        var code = char.charCodeAt(0);

        return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
    }

    //return ascii values for numbers '0' - '9'
    static isDigit(char) {
        var code = char.charCodeAt(0);

        return code >= 48 && code <= 57;
    }

    static isLetterOrDigit(char) {
        return CharIdentifier.isDigit(char) || CharIdentifier.isLetter(char);
    }

    static isWhiteSpace(char) {
        return /[ \t\r\f\v\u00A0\u2028\u2029\u0020]/.test(char);
    }

    static isDelimiter(char) {
        var delimieters = ['{', '}', '[', ']', '(', ')', ':', ','];
        return (delimieters.indexOf(char) !== -1);
    }

    static isDot(char) {
        return char === '.';
    }

    static isNewLine(char) {
        var newLines = ['\n', '\r\n'];
        return (newLines.indexOf(char) !== -1);
    }

    static isOperator(char) {
        var operators = ['+', '-', '*', '/', '//', '=', '!', '<', '>', '~', '&', '|', 'and', 'or', 'not'];
        return (operators.indexOf(char) !== -1);
    }

    static isIdentifierPart(char) {
        return char === '_' || CharIdentifier.isLetterOrDigit(char) || CharIdentifier.isOperator(char);
    }

    static isIdentifierBeginning(char) {
        return CharIdentifier.isLetter(char) || char === '_';
    }

    static isNumberBeginning(char) {
        return CharIdentifier.isDigit(char) || CharIdentifier.isDot(char);
    }

    static isStringBeginning(char) {
        return char === '"';
    }

    static isLiteralBeginning(char) {
        return CharIdentifier.isLetter(char) || CharIdentifier.isIdentifierBeginning(char) || CharIdentifier.isNumberBeginning(char) || CharIdentifier.isStringBeginning(char);
    }

    static isStringDelimiter(char) {
        return char === '\"';
    }
}