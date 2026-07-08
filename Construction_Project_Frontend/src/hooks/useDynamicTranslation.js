import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { translateDynamicText } from '../services/translationService';

/**
 * A custom hook to easily translate dynamic text blocks via MyMemory API.
 * Automatically respects the active i18next language.
 * 
 * Usage:
 * const { translate, isLoading } = useDynamicTranslation();
 * 
 * useEffect(() => {
 *   const loadTranslations = async () => {
 *      const translatedTitle = await translate(job.title);
 *      // ...
 *   }
 * }, [i18n.language]);
 */
export const useDynamicTranslation = () => {
    const { i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    // Get base language (e.g. 'en-US' -> 'en')
    const currentLang = i18n.language?.split('-')[0] || 'en';

    const translate = async (text) => {
        setIsLoading(true);
        try {
            const translatedText = await translateDynamicText(text, currentLang);
            return translatedText;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Translates an array of strings concurrently
     */
    const translateBatch = async (textsArray) => {
        setIsLoading(true);
        try {
            const promises = textsArray.map(text => translateDynamicText(text, currentLang));
            return await Promise.all(promises);
        } finally {
            setIsLoading(false);
        }
    };

    return { translate, translateBatch, isLoading, currentLang };
};
