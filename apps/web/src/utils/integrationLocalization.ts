import { Integration } from "@/types/integration";

/**
 * Get localized category name
 * @param category - The category name (e.g., 'Communication', 'Email')
 * @param t - Translation function from i18next
 * @returns Localized category name
 */
export function getLocalizedCategory(
  category: string,
  t: (key: string) => string
): string {
  const translationKey = `integrations.categories.${category}`;
  const translated = t(translationKey);
  // If translation doesn't exist, i18next returns the key, so fallback to original
  return translated === translationKey ? category : translated;
}

/**
 * Get localized display name for an integration from JSON translation files
 * @param integration - The integration object
 * @param t - Translation function from i18next
 * @returns Localized display name or fallback to default
 */
export function getLocalizedDisplayName(
  integration: Integration,
  t: (key: string) => string
): string {
  const translationKey = `integrations.items.${integration.name}.displayName`;
  const translated = t(translationKey);
  // If translation doesn't exist, fallback to database value
  return translated === translationKey ? integration.displayName : translated;
}

/**
 * Get localized description for an integration from JSON translation files
 * @param integration - The integration object
 * @param t - Translation function from i18next
 * @returns Localized description or fallback to default
 */
export function getLocalizedDescription(
  integration: Integration,
  t: (key: string) => string
): string | undefined {
  if (!integration.description) {
    return undefined;
  }

  const translationKey = `integrations.items.${integration.name}.description`;
  const translated = t(translationKey);
  // If translation doesn't exist, fallback to database value
  return translated === translationKey ? integration.description : translated;
}

/**
 * Get fully localized integration object
 * @param integration - The integration object
 * @param t - Translation function from i18next
 * @returns Integration with localized fields
 */
export function getLocalizedIntegration(
  integration: Integration,
  t: (key: string) => string
): Integration {
  return {
    ...integration,
    displayName: getLocalizedDisplayName(integration, t),
    description: getLocalizedDescription(integration, t),
  };
}
