/**
 * Page-level CMS content (content/pages/*.json): headings, descriptions and
 * page-specific lists. Each page's shape is added here as it is migrated.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PageContent {}

export type PageName = keyof PageContent;
