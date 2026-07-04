import yaml from 'js-yaml';

export async function loadYaml(path, fallback) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const value = yaml.load(await response.text());
    const matchesFallback = Array.isArray(fallback)
      ? Array.isArray(value)
      : typeof fallback === 'object' && fallback !== null
        ? typeof value === 'object' && value !== null && !Array.isArray(value)
        : value !== undefined && value !== null;
    return matchesFallback ? value : fallback;
  } catch (error) {
    console.warn(`Failed to load YAML from ${path}:`, error);
    return fallback;
  }
}
