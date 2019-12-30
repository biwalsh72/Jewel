export let tokenTypes = {

    //Boolean
    Boolean: 'boolean',
    True: 'true',
    False: 'false',

    //Boolean Operators
    And: ['&&', 'and'],
    Or: ['||', 'or'],
    Not: ['!', 'not'],

    //Number
    Integer: ['integer', 'i'],
    Decimal: ['decimal', 'd'],

    //String
    String: ['string', 's'],

    //Arithmetic Operations
    IntDiv: '//',
    Div: '/',
    Modulo: '%',
    Plus: '+',
    Minus: '-',
    Times: '*',
    Increment: '++',
    Decrement: '--',

    //Comparison Operators
    Equal: '=',
    DoubleEqual: '==', //comparison of values
    TripleEqual: '===', //comparison of values with types
    NotEqual: '!=',
    Less: '<',
    LessEqual: '<=',
    Greater: '>',
    GreaterEqual: '>=',

    //Keywords
    Null: ['null', 'nil'],
    Func: 'func',

    // Delimiters
    Colon: ':',
    Comma: ',',
    LeftBrace: '{',
    LeftBracket: '[',
    LeftParen: '(',
    Newline: '\n',
    RightBrace: '}',
    RightBracket: ']',
    RightParen: ')',

    // Special token types
    EndOfInput: 'EndOfInput',
    Unrecognized: 'Unrecognized'

    


    





};