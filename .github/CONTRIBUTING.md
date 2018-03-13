# StanCal :: [ANA](https://ana.asso.fr) Contributing Guide

> All contributions complying to the [Code of Conduct](CODE_OF_CONDUCT.md) made to this project are more than welcome.
> This guide aim to describe how to contribute and what this project needs and improve people contributions.

## Report an issue

1. [Please check if the issue is not already reported.](https://github.com/anairsoft/stancal/issues?q=is%3Aissue+is%3Aopen+)
2. Please describe all the steps to reproduce the issue, including screenshots, and the expected behavior.

## Ask for a new feature

1. [Please check if the feature was not already asked.](https://github.com/anairsoft/stancal/issues?q=is%3Aissue+is%3Aopen+)
2. [Please check if the the feature is not currently being developed.](https://github.com/anairsoft/stancal/pulls?q=is%3Apr+is%3Aopen+)
3. Please describe the feature, why it is needed, how it should be used, what it should do.

## Translate the application

1. Declare new supported languages:
   1. Update `languages: [...],` in file `scripts/translate.js`
   2. Update language detection logic in file `src/index.js`
2. Update translation files with:
   1. `npm run translate:extract` (or `npm run translate:extract:win` on Windows)
   2. `npm run translate:build`
   3. Translate the new languages in `src/lang/*.json` files

## Add new products to the Protective Eyewear Check functionality

1. In the `src/data/products.json` file, please fill the following template for each product to add (do *not* include comments `// ...`):

   ```js
   {
        "brand": "", // Brand of the product
        "name": "",  // Name of the product
        "type": "",  // Type of the product, either "spectacles", "goggles" or "faceshields"
        "standards": [
            { "name": "" }, // Standards matched by the product
            { "name": "", "velocity": 0, "mass": 0 }, // For some standards, it is needed to provide the mass and velocity of the projectile used for high velocity impact tests. velocity is in m/s and mass in kg.
            ...
        ],
        "links": [
            { "lang": "en", "value": "" }, // Link to product documentation, English
            { "lang": "fr", "value": "" }  // Link to product documentation, French
        ],
        "pictures": [
            "", // Provide the links to at least 1 and up to 3 pictures of the product
            "", // Second picture
            ""  // Third picture
        ]
    },
    ```

2. If needed, add pictures of the product in `public/images/products` folder. Naming convention for pictures is `productBrand_productName.jpg`. Please don't add image with larger size bigger than 1024px or more than 90% JPG quality.
3. [Submit the Pull Request.](https://github.com/anairsoft/stancal/compare)