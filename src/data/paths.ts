/** The site's base path with a trailing slash: "/" in production, "/pr-preview/pr-<n>/" in previews. */
export const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
