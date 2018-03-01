# StanCal :: [ANA](https://ana.asso.fr) Standards Calculator

> A progressive web application to determine which protective eyewear to use during airsoft games.

![ANA](https://ana.asso.fr/app/uploads/ana/Logo-ANA.png)

__________________________________________________

## Requirements

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://yarnpkg.com/lang/en/docs/install/)

## Installation

1. `git clone https://github.com/anairsoft/stancal.git`
2. `cd stancal`
3. `yarn install`

### Run

* Development mode: `yarn start`
* Production mode: `yarn build`, then explore folder `./build`

### Translations

1. Declare new supported languages:
   1. Update `languages: [...],` in file `scripts/translate.js`
   2. Update language detection logic in file `src/index.js`
2. Update translation files with:
   1. `npm run translate:extract` (or `npm run translate:extract:win` on Windows)
   2. `npm run translate:build`
   3. Translate the new languages in `src/lang/*.json` files

__________________________________________________

## Licence terms

*ANA StanCal* is published under the terms of [GNU General Public License v3](https://www.gnu.org/licenses/gpl-3.0.html), see the [LICENSE](LICENSE) file.

## Support

You can support this project by helping the [Association de Normalisation de l'Airsoft](https://ana.asso.fr).