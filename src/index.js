const LONG_WORD_MIN_LENGTH = 9;
const DEFAULT_REPLACEMENT_STRING = "*";
const REPLACABLE_CHARACTERS = /[\w\.\-\?:_\+\p{L}]/giu;
const REPLACABLE_WORDS = /[\w\.\-\?:_\+\p{L}]+/giu;
const EMAIL_PATTERN = /^([a-z0-9_\.-]+)@([\da-z-]+)\.([a-z\.]{2,8})$/i;

const replaceRange = (str, replacement = DEFAULT_REPLACEMENT_STRING) =>
  str.replace(REPLACABLE_CHARACTERS, (character, index) => {
    let FROM = 0;
    let TO = str.length - 1;

    if (str.length >= LONG_WORD_MIN_LENGTH) {
      FROM = 3;
      TO = str.length - FROM - 1;
    } else {
      FROM = 1;
      TO = str.length - FROM - 1;
    }

    if (str.length < 4) {
      FROM = 0;
      TO = str.length - 1;
    }

    if (index >= FROM && index <= TO) {
      return replacement;
    }

    return character;
  });

const anonymizeString = (value, replacement) => {
  const separateWords = value.match(REPLACABLE_WORDS);

  return separateWords
    .map((word) => {
      return replaceRange(word, replacement);
    })
    .join(" ");
};

const anonymizeEmail = (value, replacement) => {
  if (!EMAIL_PATTERN.test(value)) {
    console.error(
      "Incorrect email address format. The entire string has been anonymized."
    );

    return value
      .split(" ")
      .map(({ length }) => DEFAULT_REPLACEMENT_STRING.repeat(length))
      .join(" ");
  }

  const [, accountName, domainName, domainExtension] = [
    ...value.match(EMAIL_PATTERN),
  ];

  return `${replaceRange(accountName, replacement)}@${replaceRange(
    domainName,
    replacement
  )}.${domainExtension}`;
};

exports.replaceRange = replaceRange;
exports.anonymizeString = anonymizeString;
exports.anonymizeEmail = anonymizeEmail;
