const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: 'tmp/translations',
  translationsDirectory: 'src/lang',
  languages: ['en', 'fr'],
});