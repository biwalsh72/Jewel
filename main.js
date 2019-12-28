// Jewel is an interpretive programming lanauge built using Javascript.

// Jewel is a gradual typed language, meaning that variables can be assigned a type at compile time or will be automitcally checked at run time. 
// This allows you to define a variable in two ways:
//
// integer variable = 1;
// i variable = 1;
// decimal variable = 1.0;
// d variable = 1.0;

// OR

// variable = 1; (integer)
// variable = 1.0; (decimal)


// Jewel allows function declaration to be done gradually as well:
// function myFunction(integer paramter) {}
// f myFunction (i paramter) {}

// OR

// myFunction(parameter) {}






// IDEAS
// Gradual typing allow users to statically type their variables or leave them untyped and assign at runtime (similar to typescript)
// allow users to abbreviate type names to a single letter (or two letters) for convenience when writing code
// 

//allows reading of characters from a string
function InputStream(input) {
    var pos = 0; line = 1; col = 0;
    return { 
    next :  next,
    peek :  peek,
    eof :   eof,
    croak : croak
    };
    //returns next value and discards it from stream
    function next() {
        var ch = input.charAt(pos++);
        if (ch == "\n") line++, col = 0; else col++;
        return ch;
    }
    //returns next value without removing from stream
    function peek() {
        return input.charAt(pos);
    }
    //returns true at the end of the stream
    function eof() {
        return peek() == "";
    }
    //throws error
    function croak(msg) {
        throw new Error(msg + " (" + line + ":" + col + ")");
    }
}







