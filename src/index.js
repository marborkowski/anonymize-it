const LONG_WORD_MIN_LENGTH = 9;
const DEFAULT_REPLACEMENT_STRING = "*";
const REPLACABLE_CHARACTERS = /[\w\.\-\?:_\+\p{L}]/giu;
const REPLACABLE_WORDS = /[\w\.\-\?:_\+\p{L}]+/giu;
const EMAIL_PATTERN = /^([a-z0-9_\.-]+)@([\da-z-]+)\.([a-z\.]{2,8})$/i;

const replaceWord = (str, replacement = DEFAULT_REPLACEMENT_STRING) =>
  str.replace(REPLACABLE_CHARACTERS, (character, index) => {
    /**
     * Default position (from, to)
     * This is the definition of the range of characters that will be replaced in the given string.
     */
    let positionFrom = 0;
    let positionTo = str.length - 1;

    /**
     * If the string length is greater than or equal to 9,
     * only the first three characters and the last three characters should be unchanged.
     *
     * Example:
     * `Qwertyuiop` ===> `Qwe****iop`
     * `QwertyuiopQwertyuiop` ===> `Qwe**************iop`
     *
     * OTHERWISE, only the first and last characters should remain unchanged.
     *
     * Example:
     * `Doors` ===> `D***s`
     * `逆風撒尿` ===> `逆**尿`
     */
    if (str.length >= LONG_WORD_MIN_LENGTH) {
      positionFrom = 3;
      positionTo = str.length - positionFrom - 1;
    } else {
      positionFrom = 1;
      positionTo = str.length - positionFrom - 1;
    }

    /**
     * Additionally, if the string has less than 4 characters
     * then all characters should be changed.
     */
    if (str.length < 4) {
      positionFrom = 0;
      positionTo = str.length - 1;
    }

    /**
     * Use positionFrom and positionTo to replace the character.
     */
    if (index >= positionFrom && index <= positionTo) {
      return replacement;
    }

    /**
     * Otherwise, return the original character.
     */
    return character;
  });

const anonymizeString = (value, replacement) => {
  /**
   * If the value is null/undefined/false/0,
   * return the empty string and stop further code execution.
   */
  if (!value) {
    return "";
  }

  /**
   * If the value is not of type string,
   * then return the empty string.
   */
  if (typeof value !== "string") {
    console.error(
      `anonymizeString only accepts strings but the received type is ${typeof value}`
    );

    return "";
  }

  /**
   * Isolate the words from the string and store them in an array.
   */
  const separateWords = value.match(REPLACABLE_WORDS);

  /**
   * Map a word array and anonymize each word individually using the `replaceWord` function.
   */
  return separateWords
    .map((word) => {
      return replaceWord(word, replacement);
    })
    .join(" ");
};

const anonymizeEmail = (value, replacement) => {
  /**
   * If the value is null/undefined/false/0,
   * return the empty string and stop further code execution.
   */
  if (!value) {
    return "";
  }

  /**
   * If the value is not of type string,
   * then return the empty string.
   */
  if (typeof value !== "string") {
    console.error(
      `anonymizeEmail only accepts strings but the received type is ${typeof value}`
    );

    return "";
  }

  /**
   * Verify that the input value is actually an email address.
   */
  if (!EMAIL_PATTERN.test(value)) {
    console.error(
      "Incorrect email address format. The entire string has been anonymized."
    );

    return value
      .split(" ")
      .map(({ length }) => DEFAULT_REPLACEMENT_STRING.repeat(length))
      .join(" ");
  }

  /**
   * Extract email address segments: account name, domain name, domain extension.
   */
  const [, accountName, domainName, domainExtension] = [
    ...value.match(EMAIL_PATTERN),
  ];

  /**
   * Anonymize each segment of the email address using the `replaceWord` function.
   */
  return `${replaceWord(accountName, replacement)}@${replaceWord(
    domainName,
    replacement
  )}.${domainExtension}`;
};

const anonymizeCreditCardNumber = (
  value,
  replacement = DEFAULT_REPLACEMENT_STRING
) => {
  if (!value || !(typeof value === "string" || typeof value === "number")) {
    return "";
  }

  const number = value.toString().replace(/\s/g, "");
  const replaced = number
    .replace(/([0-9]{4})/g, (segment) => {
      return `${segment} `;
    })
    .replace(/([0-9]{4}) ([0-9]{1,3})$/g, "$1$2");

  const segments = replaced.trim().split(" ");

  return segments
    .map((element, index) => {
      if (index < segments.length - 1) {
        return replacement.repeat(element.length);
      }
      return element;
    })
    .join(" ")
    .trim();
};

exports.anonymizeString = anonymizeString;
exports.anonymizeEmail = anonymizeEmail;
exports.anonymizeCreditCardNumber = anonymizeCreditCardNumber;
