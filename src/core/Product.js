/*
 * This file is part of ANA StanCal.
 * See: <https://github.com/anairsoft/stancal>.
 *
 * Copyright (C) 2018 Association de Normalisation de l'Airsoft <contact@ana.asso.fr>.
 * Copyright (C) 2018 Jérémy Walther <jeremy.walther@golflima.net>.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * Otherwise, see: <https://www.gnu.org/licenses/gpl-3.0>.
 */

import { isNullOrUndefined } from 'util';
import products from '../data/products.json';

function unique(value, index, self) {
  return self.indexOf(value) === index;
}

class Product {
  static getBrandNames() {
    return products.map(p => p.brand).filter(unique).sort();
  }

  static getProductNames(brand = null) {
    return isNullOrUndefined(brand)
      ? products.map(p => p.name).filter(unique).sort()
      : products.filter(p => p.brand === brand).map(p => p.name).filter(unique).sort();
  }

  static getProduct(name, brand = null) {
    const product = isNullOrUndefined(brand)
      ? products.find(p => p.name === name)
      : products.find(p => p.name === name && p.brand === brand);
    if(isNullOrUndefined(product)) {
      return null;
    }
    return product;
  }
}

export default Product;