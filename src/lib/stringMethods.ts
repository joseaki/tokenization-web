export const maskString = (
  value: any,
  mask: string,
  maskPatterns: Record<string, RegExp | ((char: string) => boolean)>
) => {
  value = value || ''
  mask = mask || ''
  maskPatterns = maskPatterns || {}

  let maskedValue = ''
  const valueParts = value.split('')
  const maskParts = mask.split('')

  while (valueParts.length > 0) {
    let unmaskedChar = valueParts.shift()
    while (unmaskedChar !== null) {
      const maskChar = maskParts.shift()
      const maskCharIsOptional = maskParts[0] === '?'
      if (maskCharIsOptional) {
        maskParts.shift()
      }
      if (maskChar !== undefined) {
        const maskPattern = maskPatterns[maskChar.toUpperCase()]
        if (maskPattern !== undefined) {
          let check = false
          if (typeof maskPattern === 'function') {
            check = maskPattern(unmaskedChar)
          } else if (maskPattern instanceof RegExp) {
            check = maskPattern.test(unmaskedChar)
          }
          if (check) {
            maskedValue += unmaskedChar
            unmaskedChar = null
          } else {
            maskParts.unshift(maskChar)
            unmaskedChar = null
          }
        } else {
          maskedValue += maskChar

          if (unmaskedChar === maskChar) {
            unmaskedChar = null
          }
        }
      } else {
        unmaskedChar = null
      }
    }
  }

  return maskedValue
}
