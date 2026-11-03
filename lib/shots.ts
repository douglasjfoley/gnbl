// Pure filename matching for shot IDs, kept apart from lib/assets.ts so it can be unit tested.

export const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

/**
 * True when `file` is the primary image for shot `id`: `${id}.jpg` or
 * `${id}-anything.jpg`. `${id}-alt-*` files are spares and never match the
 * primary ID; ask for them explicitly with the ID `${id}-alt`.
 */
export function matchesShot(file: string, id: string): boolean {
  if (!IMAGE_EXT.test(file)) return false;
  const name = file.replace(IMAGE_EXT, "");
  if (name === id) return true;
  return name.startsWith(`${id}-`) && name !== `${id}-alt` && !name.startsWith(`${id}-alt-`);
}
