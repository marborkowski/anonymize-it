const assert = require("assert");
const {
  anonymizeString,
  anonymizeEmail,
  anonymizeCreditCardNumber,
} = require("../src/index");
const fakeCards = require("./data/fake-cards.json");

describe("anonymyze-it", () => {
  describe("anonymizeString", () => {
    it("It should anonymize a string that has a minimum of 9 characters in such a way that the first and last three characters are readable.", () => {
      assert.equal(anonymizeString("Loremipsumdolor"), "Lor*********lor");
      assert.equal(anonymizeString("Loremips.umdolor"), "Lor**********lor");
      assert.equal(anonymizeString("Писаетпротивветра"), "Пис***********тра");
      assert.equal(
        anonymizeString("Learning New Things is Cool"),
        "L******g *** T****s ** C**l"
      );
      assert.equal(
        anonymizeString(
          "Писаетпротивветра Писаетпротивветра Писаетпротивветра"
        ),
        "Пис***********тра Пис***********тра Пис***********тра"
      );
    });

    it("It should anonymize a string that has a maximum of 8 characters in such a way that the first and last character are readable.", () => {
      assert.equal(anonymizeString("Doors"), "D***s");
      assert.equal(anonymizeString("Warsaw"), "W****w");
      assert.equal(anonymizeString("Enhance"), "E*****e");
      assert.equal(anonymizeString("Писает"), "П****т");
      assert.equal(anonymizeString("逆風撒尿"), "逆**尿");
    });

    it("It should anonymize a string that has a maximum of 3 characters in such a way that all the characters are anonymized.", () => {
      assert.equal(anonymizeString("Car"), "***");
      assert.equal(anonymizeString("No"), "**");
      assert.equal(anonymizeString("Yes"), "***");
      assert.equal(anonymizeString("Пит"), "***");
      assert.equal(anonymizeString("逆風尿"), "***");
      assert.equal(anonymizeString("逆風尿 Yes Пи"), "*** *** **");
    });

    it("It should return empty string if value length is equal 0 or value is not a string.", () => {
      assert.equal(anonymizeString(""), "");
      assert.equal(anonymizeString(null), "");
      assert.equal(anonymizeString({}), "");
      assert.equal(anonymizeString(undefined), "");
      assert.equal(anonymizeString(4344), "");
    });
  });

  describe("anonymizeEmail", () => {
    it("It should anonymize email address.", () => {
      assert.equal(
        anonymizeEmail("john.kowalsky@yahoo.com"),
        "joh*******sky@y***o.com"
      );

      assert.equal(
        anonymizeEmail("brandon-lee@google.co.uk"),
        "bra*****lee@g****e.co.uk"
      );

      assert.equal(anonymizeEmail("support@go.com"), "s*****t@**.com");

      assert.equal(
        anonymizeEmail("m.walter@google.com"),
        "m******r@g****e.com"
      );

      assert.equal(anonymizeEmail("old_orange@onet.pl"), "old****nge@o**t.pl");
      assert.equal(
        anonymizeEmail("dsadsdsdasdsadasdasdsa@fdsfsfds fsdfsd@FFDSFDSF-.PL"),
        "******************************* *******************"
      );
    });

    it("It should return empty string if value length is equal 0 or value is not a string.", () => {
      assert.equal(anonymizeEmail(""), "");
      assert.equal(anonymizeEmail(null), "");
      assert.equal(anonymizeEmail({}), "");
      assert.equal(anonymizeEmail(undefined), "");
      assert.equal(anonymizeEmail(4344), "");
    });
  });

  describe("anonymizeCreditCardNumber", () => {
    fakeCards.forEach(({ CreditCard }) => {
      it(`Issuer: ${CreditCard.IssuingNetwork}`, () => {
        assert.equal(
          anonymizeCreditCardNumber(CreditCard.CardNumber),
          CreditCard.result
        );
      });
    });

    it("Can handle other strings", () => {
      assert.equal(
        anonymizeCreditCardNumber("12345678901234567890"),
        "**** **** **** **** 7890"
      );
    });
  });
});
