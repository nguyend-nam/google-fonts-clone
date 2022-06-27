export function generateVariantTitle(styleElement: string) {
  return styleElement.split(' ').slice(0, -1).join(' ')
}
