const js = require('@eslint/js');
const globals = require('globals');
const astro = require('eslint-plugin-astro');
const tseslint = require('typescript-eslint');

module.exports = [
  // Global ignores
  {
    ignores: [
      'dist/**',
      '.astro/**',
      'node_modules/**',
      '*.config.js',
      '*.config.mjs',
      'eslint.config.cjs',
      'scripts/**',
      'public/**'
    ]
  },

  // Base configuration for all files
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Astro-specific configuration
  {
    files: ['**/*.astro'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        Astro: 'readonly'
      },
      parser: astro.parser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      astro: astro
    },
    rules: {
      ...astro.configs.recommended.rules,
      ...astro.configs['jsx-a11y-recommended'].rules,
      'astro/no-conflict-set-directives': 'error',
      'astro/no-unused-define-vars-in-style': 'error',
      'astro/valid-compile': 'error',
      'astro/no-deprecated-astro-canonicalurl': 'error',
      'astro/no-deprecated-astro-resolve': 'error',
      'astro/no-deprecated-getentrybyslug': 'error',
      'astro/no-set-html-directive': 'error',
      'astro/no-set-text-directive': 'error',
      'astro/no-unused-css-selector': 'error',
      'astro/prefer-class-list-directive': 'error',
      'astro/prefer-object-class-list': 'error',
      'astro/prefer-split-class-list': 'error',
      'astro/jsx-a11y/alt-text': 'error',
      'astro/jsx-a11y/anchor-has-content': 'error',
      'astro/jsx-a11y/anchor-is-valid': 'error',
      'astro/jsx-a11y/aria-props': 'error',
      'astro/jsx-a11y/aria-proptypes': 'error',
      'astro/jsx-a11y/aria-unsupported-elements': 'error',
      'astro/jsx-a11y/heading-has-content': 'error',
      'astro/jsx-a11y/iframe-has-title': 'error',
      'astro/jsx-a11y/img-redundant-alt': 'error',
      'astro/jsx-a11y/no-access-key': 'error',
      'astro/jsx-a11y/no-distracting-elements': 'error',
      'astro/jsx-a11y/no-redundant-roles': 'error',
      'astro/jsx-a11y/role-has-required-aria-props': 'error',
      'astro/jsx-a11y/role-supports-aria-props': 'error',
      'astro/jsx-a11y/scope': 'error',
      'astro/jsx-a11y/tabindex-no-positive': 'error'
    }
  },

  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'off', // Use TypeScript version instead
      'prefer-const': 'error',
      'no-var': 'error'
    }
  },

  // JavaScript files
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      'no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error'
    }
  },

  // React/Preact components
  {
    files: ['**/*.tsx', '**/*.jsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: require('eslint-plugin-react'),
    },
    rules: {
      'react/jsx-uses-react': 'off', // Not needed in React 17+
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/prop-types': 'off', // Using TypeScript instead
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/no-array-index-key': 'warn',
      'react/no-unescaped-entities': 'error',
      'react/self-closing-comp': 'error'
    }
  },

  // Configuration files
  {
    files: ['*.config.js', '*.config.mjs', 'scripts/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    }
  }
]; 