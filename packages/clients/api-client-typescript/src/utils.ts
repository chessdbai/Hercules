const recursivelyModifyKeys = (o: any, modifier: (s: string) => string) : any => {
  var newO : {
    [index: string]: any
  } = {};
  var origKey, newKey, value
  if (o instanceof Array) {
    return o.map(function(value) {
        if (typeof value === "object") {
          value = recursivelyModifyKeys(value, modifier)
        }
        return value
    })
  } else {
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (modifier(origKey.charAt(0)) + origKey.slice(1) || origKey).toString()
        value = o[origKey]
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = recursivelyModifyKeys(value, modifier)
        }
        newO[newKey] = value
      }
    }
  }
  return newO
}

export const jsonToUpper = (o: any) : any => recursivelyModifyKeys(o, (str) => str.toUpperCase());
export const jsonToLower = (o: any) : any => recursivelyModifyKeys(o, (str) => str.toLowerCase());