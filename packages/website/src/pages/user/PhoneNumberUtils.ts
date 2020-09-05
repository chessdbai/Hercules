// Thank you https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string

const escapeRegExp = (str: string) : string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

const replaceAll = (target: string, search: string, replacement: string) =>{
    return target.replace(new RegExp(search, 'g'), replacement);
};

export function sanitizeNumberForCognito(phoneNumber: string) : string {
  const charsToReplace : string[] = ['(', ')', ' ', '-'];
  var finalNumber = phoneNumber;
  for (let c of charsToReplace) {
    var cEscaped = escapeRegExp(c);
    finalNumber = replaceAll(finalNumber, cEscaped, '');
  }
  return finalNumber;
}