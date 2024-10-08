module.exports = {
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.js',
  importOrder: [
    '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
    '^(next/(.*)$)|^(next$)',
    '^(expo(.*)$)|^(expo$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '',
    '^@/(.*)$',
    '',
    '^~/',
    '^[../]',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.2.2',
  semi: false,
  tabWidth: 2,
  singleQuote: true,
  bracketSpacing: true,
  bracketSameLine: true,
  singleAttributePerLine: true,
  printWidth: 160,
}
