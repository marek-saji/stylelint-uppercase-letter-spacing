var stylelint = require('stylelint');

var ruleName = 'marek-saji/uppercase-letter-spacing';
var messages = stylelint.utils.ruleMessages(ruleName, {
    expected: 'Expected letter-spacing in block with text-transform:uppercase.',
});

module.exports = stylelint.createPlugin(ruleName, function (primaryOption, secondaryOptionObject) {
  return function (postcssRoot, postcssResult) {
    postcssRoot.walkRules(function (rule) {
        var uppercasedDecl;
        var hasLetterSpacing = false;
        rule.walkDecls(function (decl) {
            if (
                'text-transform' === decl.prop &&
                'uppercase' === decl.value
            )
            {
                uppercasedDecl = decl;
            }
            else if ('letter-spacing' === decl.prop)
            {
                hasLetterSpacing = true;
            }
        });

        if (uppercasedDecl && ! hasLetterSpacing)
        {
            stylelint.utils.report({
                ruleName: ruleName,
                result: postcssResult,
                node: uppercasedDecl,
                message: messages.expected,
            });
        }
    });
  }
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
