export function generateCSS(stylesList: string[]) {
  let ans = ''
  let ansArr: string[] = []
  stylesList.forEach((style) => {
    ans =
      `'` +
      style.split(' ').slice(0, -4).join(' ') +
      `'` +
      ', ' +
      style.split(' ')[style.split(' ').length - 1]
    if (!ansArr.includes(ans)) {
      ansArr.push(ans)
    }
  })

  return ansArr
}
