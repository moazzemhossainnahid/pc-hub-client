"use client";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { default as LanguageDetector } from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import tEn from './locales/en/translation.json';
import tBn from './locales/bn/translation.json';

i18n
    // use backend
    .use(Backend)
    // pass backend httpapi
    .use(HttpApi)
    // detect user language
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    .init({
        debug: true,
        // lng: 'en',
        supportedLngs: ['en', 'bn'],
        fallbackLng: 'en',
        detection: {
            // order and from where user language should be detected
            order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
            caches: ['cookie']
        },
        backend: {
            loadPath: '/src/locales/{{lng}}/translation.json',
        },
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: tEn
            },
            bn: {
                translation: tBn
            },
        }
    });

export default i18n;