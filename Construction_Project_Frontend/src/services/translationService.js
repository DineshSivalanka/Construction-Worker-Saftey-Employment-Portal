import axios from 'axios';

// Simple prefix for localStorage keys to avoid collisions
const CACHE_PREFIX = 'mymemory_trans_';

/**
 * Translates text from English to the target language using MyMemory API.
 * Features localStorage caching to prevent redundant API calls.
 * 
 * @param {string} text - The text to translate
 * @param {string} targetLang - The target language code (e.g., 'te', 'hi', 'en')
 * @returns {Promise<string>} - The translated text (or original text if failed/en)
 */
export const translateDynamicText = async (text, targetLang) => {
    // If text is empty, undefined, or language is English, just return it
    if (!text || !text.trim() || targetLang === 'en' || targetLang.startsWith('en-')) {
        return text;
    }

    // Check Cache
    const cacheKey = `${CACHE_PREFIX}${targetLang}_${text}`;
    const cachedTranslation = localStorage.getItem(cacheKey);
    
    if (cachedTranslation) {
        return cachedTranslation;
    }

    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
        const response = await axios.get(url);
        
        if (response.data && response.data.responseData && response.data.responseData.translatedText) {
            const translated = response.data.responseData.translatedText;
            
            // MyMemory sometimes returns an error string in the translated field if limits are hit
            if (!translated.includes("MYMEMORY WARNING:")) {
                // Save to cache
                localStorage.setItem(cacheKey, translated);
                return translated;
            } else {
                console.warn("MyMemory API limit reached:", translated);
                return text; // Fallback
            }
        }
        return text; // Fallback
    } catch (error) {
        console.error("Dynamic translation error:", error);
        return text; // Fallback to English on error
    }
};
