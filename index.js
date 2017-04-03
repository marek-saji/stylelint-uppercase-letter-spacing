var stylelint = require('stylelint');

var ruleName = 'marek-saji/uppercase-letter-spacing';
var messages = stylelint.utils.ruleMessages(ruleName, {
    expected: 'Expected letter-spacing in block with text-transform:uppercase.',
});

module.exports = stylelint.createPlugin(ruleName, function (primaryOption, secondaryOptionObject) {
  return function (postcssRoot, postcssResult) {
    postcssRoot.walkRules(function (rule) {
        var isUppercased = false;
        var hasLetterSpacing = false;
        rule.walkDecls(function (decl) {
            if (
                'text-transform' === decl.prop &&
                'uppercase' === decl.value
            )
            {
                isUppercased = true;
            }
            if ('letter-spacing' === decl.prop)
            {
                hasLetterSpacing = true;
            }
        });

        if (isUppercased && ! hasLetterSpacing)
        {
            stylelint.utils.report({
                ruleName: ruleName,
                result: postcssResult,
                node: rule,
                message: messages.expected,
            });
        }
    });
  }
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
