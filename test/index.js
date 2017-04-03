var testRule = require('stylelint-test-rule-tape');
var uppercaseLetterSpacing = require('..');

testRule(uppercaseLetterSpacing.rule, {
    ruleName: uppercaseLetterSpacing.ruleName,
    config: {},
    skipBasicChecks: false,

    accept: [
        { code: '.foo {} ' },
        { code: '.foo { text-transform: initial; } ' },
        { code: '.foo { text-transform: uppercase; letter-spacing: 1em; }' },
        { code: '.foo { letter-spacing: 0; text-transform: uppercase; }' },
    ],

    reject: [
        {
            code: '.foo { text-transform: uppercase; }',
            message: uppercaseLetterSpacing.messages.expected,
            line: 1,
        },
    ],
});
