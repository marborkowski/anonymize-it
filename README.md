
# anonymize-it

anonymize-it allows you to anonymize from the end user those data that you may consider as being sensitive. For example, such data could be email addresses, phone numbers, names, credit card numbers. 

anonymize-it is a zero dependency library, so it weighs **only 1.25 KB ** 💪


## Installation

**YARN**
```bash
  yarn add anonymize-it
```
    
**NPM**
```bash
  npm install anonymize-it --save
```
    
## Usage

This library is optimized for both Node and browser use.

### Node 
```js
const { anonymizeString, anonymizeEmail, anonymizeCreditCardNumber } = require("anonymize-it");
```

### Browser 
```js
import { anonymizeString, anonymizeEmail, anonymizeCreditCardNumber } from "anonymize-it";
```

### Code example 
```js
// ******** STRING ANONYMIZATION ********

// output: Lor*********lor
anonymizeString("Loremipsumdolor")

// output: Пис***********тра
anonymizeString("Писаетпротивветра")

// output: L******g *** T****s ** C**l
anonymizeString("Learning New Things is Cool")

// output: D***s
anonymizeString("Doors")

// output 逆**尿
anonymizeString("逆風撒尿")

// output: *** *** **
anonymizeString("逆風尿 Yes Пи")


// ******** EMAIL ANONYMIZATION ********

// output: joh*******sky@y***o.com
anonymizeEmail("john.kowalsky@yahoo.com")

// output: bra*****lee@g****e.co.uk
anonymizeEmail("brandon-lee@google.co.uk")

// output: old****nge@o**t.pl
anonymizeEmail("old_orange@onet.pl")


// ******** CREDIT CARD NUMBER ANONYMIZATION ********

// output: **** **** 742392
anonymizeCreditCardNumber("38761758742392")

// output: **** **** 0563713
anonymizeCreditCardNumber("869921390563713")

// output: **** **** **** 2925
anonymizeCreditCardNumber("6011616862362925")
```

## Credit cards supported

| Issuer Name          | Sample card number | Expected Result       |
| -------------------- | ------------------ |-----------------------|
| American Express     | 377482872281469    | **** **** 2281469     |
| Diners Club          | 38761758742392     | **** **** 742392      |
| Discover             | 6011343644085225   | **** **** **** 5225   |
| enRoute              | 201454890067610    | **** **** 0067610     |
| JCB                  | 3337958266172920   | **** **** **** 2920   |
| JCB 15 digit         | 180069374272646    | **** **** 4272646     |
| MasterCard           | 5276075599908736   | **** **** **** 8736   |
| Visa                 | 4929886509751048   | **** **** **** 1048   |
| Visa 13 digit        | 4024007155571      | **** **** 55571       |
| Voyager              | 869960752668116    | **** **** 2668116     |


Copyright 2022 Marcin Borkowski <marborkowski@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.