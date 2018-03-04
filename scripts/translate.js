const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: 'translations',
  translationsDirectory: 'src/lang',
  languages: ['en', 'fr'],
});