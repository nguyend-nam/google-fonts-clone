export function sortStylesList(a: string, b: string) {
  if (
    a.split(' ').slice(0, -4).join(' ') > b.split(' ').slice(0, -4).join(' ')
  ) {
    return 1
  } else if (
    a.split(' ').slice(0, -4).join(' ') < b.split(' ').slice(0, -4).join(' ')
  ) {
    return -1
  } else {
    if (a.includes('Italic') && !b.includes('Italic')) {
      return 1
    } else if (!a.includes('Italic') && b.includes('Italic')) {
      return -1
    } else {
      let la = a.split(' ').length - 3,
        lb = b.split(' ').length - 3
      if (a.split(' ')[la] === 'Italic') {
        la--
      }
      if (b.split(' ')[lb] === 'Italic') {
        lb--
      }
      if (a.split(' ')[la] > b.split(' ')[lb]) {
        return 1
      } else if (a.split(' ')[la] < b.split(' ')[lb]) {
        return -1
      } else return 0
    }
  }
}
