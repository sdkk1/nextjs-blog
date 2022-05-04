type ObjectAny = {
  [key: string]: any
}

const detectObject = (obj: any) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    return true
  }
  return false
}

/**
 * オブジェクトキー変換
 * @param {Function} func キー変換関数
 * @return {Object} 変換後オブジェクト
 */
export const convertPropertyObject =
  (func: (s: string) => string) =>
  (data: ObjectAny): object => {
    const recursive = (obj: ObjectAny): ObjectAny => {
      const keys = Object.keys(obj)
      const result: ObjectAny = keys.reduce(
        (accum: object, propName: string) => {
          const propValue = obj[propName]
          return {
            ...accum,
            [func(propName)]: Array.isArray(propValue)
              ? propValue.map(x => (detectObject(x) ? recursive(x) : x))
              : detectObject(propValue)
              ? recursive(propValue)
              : propValue,
          }
        },
        {}
      )
      return result
    }
    return recursive(data)
  }

/**
 * キャメルケース変換
 * @param {String} str 変換前文字列
 * @return {String} 変換後文字列
 */
export const toCamelCase = (str: string): string => {
  return str
    .split('_')
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join('')
}

/**
 * オブジェクトキーをキャメルケース変換
 * @param {Object} obj 変換前オブジェクト
 * @return {Object} 変換後オブジェクト
 */
export const toCamelObject = (obj: object): object => {
  const toCamel = convertPropertyObject(toCamelCase)
  return toCamel(obj)
}

/**
 * 配列のオブジェクトキーをキャメルケース変換
 * @param {Array} arr 変換前配列
 * @return {Array} 変換後配列
 */
export const toCamelArray = (arr: object[]): object[] => {
  const toCamel = convertPropertyObject(toCamelCase)
  const arrConvert: object[] = arr.map(e => toCamel(e))
  return arrConvert
}
