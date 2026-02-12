module.exports = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  // extends: ["@commitlint/config-conventional"],  // parse use then extends disabled
  /*
   * Resolve and load conventional-changelog-atom from node_modules.
   * Referenced packages must be installed
   */
  parser: {
    parse: require('./commit-parser').parse,
  },
  /*
   * Resolve and load @commitlint/format from node_modules.
   * Referenced package must be installed
   */
  formatter: '@commitlint/format',
  /*
   * Any rules defined here will override rules from @commitlint/config-conventional
   */
  rules: {
    'type-case': [2, 'always', 'lower-case'],
    'type-enum': [2, 'always', ['feat', 'fix', 'chore', 'docs', 'refactor', 'test']],
    'type-empty': [2, 'never'],
    'type-max-length': [2, 'always', Infinity],
    'type-min-length': [2, 'always', 3],

    'scope-case': [2, 'always', { cases: ['kebab-case', 'lower-case'], delimiters: ['/'] }],
    'scope-delimiter-style': [2, 'always', ['/']],
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', { scopes: ['auth', 'ui', 'api'], delimiters: ['/'] }],
    'scope-max-length': [2, 'always', 10],
    'scope-min-length': [2, 'always', 3],

    'subject-case': [
      2,
      'always',
      ['camel-case', 'lower-case', 'sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-exclamation-mark': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 100],
    'subject-min-length': [2, 'always', 5],

    'header-case': [0, 'always', 'sentence-case'],
    'header-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
    'header-min-length': [2, 'always', 0],

    'footer-empty': [0, 'never'],
    'footer-leading-blank': [2, 'always'],
    'footer-max-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 80],
    'footer-min-length': [2, 'always', 10],

    'body-case': [
      0,
      'always',
      [
        'lower-case',
        'upper-case',
        'camel-case',
        'kebab-case',
        'pascal-case',
        'sentence-case',
        'snake-case',
        'start-case',
      ],
    ],
    'body-empty': [2, 'never'],
    'body-full-stop': [2, 'never', '.'],
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],
  },

  //   feat(auth): Add password reset

  // this implements email recovery and validates tokens"

  /*
   * Array of functions that return true if commitlint should ignore the given message.
   * Given array is merged with predefined functions, which consist of matchers like:
   *
   * - 'Merge pull request', 'Merge X into Y' or 'Merge branch X'
   * - 'Revert X'
   * - 'v1.2.3' (ie semver matcher)
   * - 'Automatic merge X' or 'Auto-merged X into Y'
   *
   * To see full list, check https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/is-ignored/src/defaults.ts.
   * To disable those ignores and run rules always, set `defaultIgnores: false` as shown below.
   */
  ignores: [(commit) => commit === ''], //rules after use this
  /*
   * Whether commitlint uses the default ignore rules, see the description above.  //rules after use this and ignore show then ignore after use this
   */
  defaultIgnores: true,
  /*
   * Custom URL to show upon failure
   */
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
  /*
   * Custom prompt configs
   */
  prompt: {
    messages: {
      skip: 'skip',
      max: 'upper %d chars',
      min: 'at least %d chars',
      emptyWarning: 'cannot be empty',
    },

    questions: {
      type: {
        description: 'Select commit type:',
        enum: {
          feat: '✨ New feature',
          fix: '🐛 Bug fix',
          chore: '🧹 Chores',
          docs: '📚 Docs',
          refactor: '♻️ Refactor',
          test: '🧪 Tests',
        },
      },
      scope: {
        description: 'Enter scope (auth/ui/api):',
      },
      subject: {
        description: 'Write a short description:',
      },
      body: {
        description: 'Provide a longer description:',
      },
      footer: {
        description: 'Add footer (e.g. Signed-off-by):',
      },
    },
  },
};
