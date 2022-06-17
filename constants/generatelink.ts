export function generatelink(stylesList: string[]) {
  let ans = ''
  let wghtFlag = false
  let italFlag = false
  let ansArr: string[] = []
  stylesList.forEach((style) => {
    ans = style.split(' ').slice(0, -3).join('+')
    if (!ansArr.includes(ans)) ansArr.push(ans)
  })
  let ret = ''
  ansArr.forEach((family) => {
    ret += 'family='
    ret += family

    if (!italFlag || !wghtFlag)
      stylesList.forEach((style) => {
        if (style.split(' ').join('+').includes(family)) {
          if (
            (style.includes('100') ||
              style.includes('200') ||
              style.includes('300') ||
              style.includes('500') ||
              style.includes('600') ||
              style.includes('700') ||
              style.includes('800') ||
              style.includes('900')) &&
            !wghtFlag
          )
            wghtFlag = true
          if (style.includes('Italic') && !italFlag) italFlag = true
          ans = style.split(' ').slice(0, -3).join('+')
          if (!ansArr.includes(ans)) ansArr.push(ans)
        }
      })

    if (italFlag || wghtFlag) ret += ':'

    if (italFlag && !wghtFlag) {
      ret += 'ital@'
      stylesList.forEach((style) => {
        console.log(family)
        if (style.split(' ').join('+').includes(family)) {
          if (style.includes('Italic')) ret += '1'
          else ret += '0'
          ret += ';'
        }
      })
      ret = ret.slice(0, -1)
    } else if (!italFlag && wghtFlag) {
      ret += 'wght@'
      stylesList.forEach((style) => {
        console.log(family)
        if (style.split(' ').join('+').includes(family)) {
          if (style.includes('100')) ret += '100'
          else if (style.includes('200')) ret += '200'
          else if (style.includes('300')) ret += '300'
          else if (style.includes('400')) ret += '400'
          else if (style.includes('500')) ret += '500'
          else if (style.includes('600')) ret += '600'
          else if (style.includes('700')) ret += '700'
          else if (style.includes('800')) ret += '800'
          else if (style.includes('900')) ret += '900'
          ret += ';'
        }
      })
      ret = ret.slice(0, -1)
    } else if (italFlag && wghtFlag) {
      ret += 'ital,wght@'
      stylesList.forEach((style) => {
        console.log(family)
        if (style.split(' ').join('+').includes(family)) {
          if (style.includes('Italic')) ret += '1'
          else ret += '0'
          ret += ','
          if (style.includes('100')) ret += '100'
          else if (style.includes('200')) ret += '200'
          else if (style.includes('300')) ret += '300'
          else if (style.includes('400')) ret += '400'
          else if (style.includes('500')) ret += '500'
          else if (style.includes('600')) ret += '600'
          else if (style.includes('700')) ret += '700'
          else if (style.includes('800')) ret += '800'
          else if (style.includes('900')) ret += '900'
          ret += ';'
        }
      })
      ret = ret.slice(0, -1)
    }
    ret += '&'
    italFlag = false
    wghtFlag = false
  })

  return ret
}
