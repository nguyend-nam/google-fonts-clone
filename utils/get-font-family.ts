export function getFontFamily(styleListsElement: string) {
  return styleListsElement.split(' ').slice(0, -4).join(' ')
}
