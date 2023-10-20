import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from '@/internationalization/en/translation.json';
import spanish from '@/internationalization/es/translation.json';

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    lng: "es",
    resources: {
      en: {
        translation: english
      },
      es: {
        translation: spanish
      }
    }
  });

export default i18n;