module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": "2018"
    },
    "plugins": [ "jsdoc" ],
    "rules": {
        "require-jsdoc": [
            "error", {
                "require": {
                    "FunctionDeclaration": true,
                    "MethodDefinition": true,
                    "ClassDeclaration": true,
                    "ArrowFunctionExpression": true,
                    "FunctionExpression": true
                }
            }
        ],
        "jsdoc/check-param-names": 0,
        "jsdoc/check-tag-names": 0,
        "jsdoc/check-types": 0,
        "jsdoc/newline-after-description": 0,
        "jsdoc/require-description-complete-sentence": 0,
        "jsdoc/require-example": 0,
        "jsdoc/require-hyphen-before-param-description": 0,
        "jsdoc/require-param": 0,
        "jsdoc/require-param-description": 0,
        "jsdoc/require-param-name": 0,
        "jsdoc/require-param-type": 0,
        "jsdoc/require-returns-description": 0,
        "jsdoc/require-returns-type": 0,
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};