export function generatecss(stylesList: string[]) {
  let ans = ''
  let ansArr: string[] = []
  stylesList.forEach((style) => {
    ans = style.split(' ').slice(0, -3).join(' ')
    if (!ansArr.includes(ans)) ansArr.push(ans)
  })

  return ansArr
}
