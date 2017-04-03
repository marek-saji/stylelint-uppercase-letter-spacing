var testRule = require('stylelint-test-rule-tape');
var uppercaseLetterSpacing = require('..');

testRule(uppercaseLetterSpacing.rule, {
    ruleName: uppercaseLetterSpacing.ruleName,
    config: {},
    skipBasicChecks: false,

    accept: [
        { code: '.foo\n{} ' },
        { code: '.foo\n{\ntext-transform: initial;\n}' },
        { code: '.foo\n{\ntext-transform: uppercase;\nletter-spacing: 1em;\n}' },
        { code: '.foo\n{\nletter-spacing: 0;\ntext-transform: uppercase;\n}' },
    ],

    reject: [
        {
            code: '.foo\n{\ntext-transform: uppercase;\n}',
            message: uppercaseLetterSpacing.messages.expected,
            line: 3,
        },
    ],
});
