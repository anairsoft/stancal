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

import { isArray, isNullOrUndefined } from 'util';
import standards from '../data/standards.json';

function unique(value, index, self) {
  return self.indexOf(value) === index;
}

class Standard {
  static getStandard(name, type = null) {
    const standard = isNullOrUndefined(type) || type.length === 0
      ? standards.find(s => s.name === name)
      : standards.find(s => s.name === name && s.type === type);
    if (isNullOrUndefined(standard) && !isNullOrUndefined(type)) {
      return Standard.getStandard(name);
    }
    return standard;
  }

  static getStandardEnergy(name, type = null) {
    const standard = Standard.getStandard(name, type);
    if (isNullOrUndefined(standard)) {
      return null;
    }
    return standard.energy;
  }

  static getStandardNames() {
    return standards.map(s => s.name).filter(unique).sort();
  }

  static getHighestStandard(names, type = null) {
    if (!isArray(names) || names.length === 0) {
      return null;
    }
    const highest = names.map(n => Standard.getStandard(n, type))
      .filter(s => !isNullOrUndefined(s))
      .sort((a, b) => {
        if (isNullOrUndefined(a.energy)) {
          return -1;
        }
        if (isNullOrUndefined(b.energy)) {
          return 1;
        }
        return a.energy - b.energy;
      });
    console.log(highest);
    return highest[highest.length - 1];
  }
}

export default Standard;