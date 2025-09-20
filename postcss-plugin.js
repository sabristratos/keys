/**
 * PostCSS Plugin for Keys UI
 * Resolves @import 'keys-ui' to the correct vendor path
 */
module.exports = (opts = {}) => {
    return {
        postcssPlugin: 'keys-ui-resolver',
        AtRule: {
            import(atRule) {
                // Check if this is an import for 'keys-ui'
                const importValue = atRule.params.replace(/['"]/g, '').trim();

                if (importValue === 'keys-ui') {
                    // Update to the vendor path
                    atRule.params = '"vendor/keys-ui/keys-ui.css"';
                } else if (importValue === '@keys/ui') {
                    // Also support scoped package name
                    atRule.params = '"vendor/keys-ui/keys-ui.css"';
                }
            }
        }
    };
};

module.exports.postcss = true;