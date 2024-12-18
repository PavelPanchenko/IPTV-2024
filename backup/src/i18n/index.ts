import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translations
import enCommon from '../locales/en/common.json';
import esCommon from '../locales/es/common.json';
import ruCommon from '../locales/ru/common.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    defaultNS: 'common',
    ns: ['common'],
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        common: enCommon
      },
      es: {
        common: esCommon
      },
      ru: {
        common: ruCommon
      }
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;