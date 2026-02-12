// Helper function to get text with fallback to Estonian
export function getLangText(item, key, lang = 'est') {
    const value = item[key];
    
    // If it's a simple string, return it
    if (typeof value === 'string') {
        return value;
    }
    
    // If it's an object with language keys
    if (value && typeof value === 'object') {
        // Try to get the requested language, fallback to Estonian
        return value[lang] || value.est || '';
    }
    
    return '';
}
