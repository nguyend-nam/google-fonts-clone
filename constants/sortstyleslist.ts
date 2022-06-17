export function sortStylesList(a: string, b: string) {
  if (a.split(' ')[0] > b.split(' ')[0]) {
    return 1
  } else if (a.split(' ')[0] < b.split(' ')[0]) {
    return -1
  } else {
    let la = a.split(' ').length - 1,
      lb = b.split(' ').length - 1
    if (a.split(' ')[la] === 'Italic') la--
    if (b.split(' ')[lb] === 'Italic') lb--
    if (a.split(' ')[la] > b.split(' ')[lb]) {
      return 1
    } else if (a.split(' ')[la] < b.split(' ')[lb]) {
      return -1
    } else {
      if (a.split(' ').length > b.split(' ').length) {
        return 1
      } else if (a.split(' ').length < b.split(' ').length) {
        return -1
      } else return 0
    }
  }
}
