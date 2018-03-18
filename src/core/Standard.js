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
  static getStandard(name, type = null, props = null) {
    var standard = isNullOrUndefined(type) || type.length === 0
      ? standards.find(s => s.name === name)
      : standards.find(s => s.name === name && s.type === type);
    if (isNullOrUndefined(standard)) {
      if (!isNullOrUndefined(type)) {
        return Standard.getStandard(name, null, props);
      }
      return null;
    }
    standard = JSON.parse(JSON.stringify(standard));
    if (!isNullOrUndefined(standard) && !isNullOrUndefined(props)) {
      if (isNullOrUndefined(standard.energy) && !isNullOrUndefined(props.mass) && !isNullOrUndefined(props.velocity)) {
        standard.energy = 0.5 * props.mass * Math.pow(props.velocity, 2);
      }
    }
    return standard;
  }

  static getStandardEnergy(name, type = null, props = null) {
    const standard = Standard.getStandard(name, type, props);
    if (isNullOrUndefined(standard)) {
      return null;
    }
    return standard.energy;
  }

  static getStandardNames() {
    return standards.map(s => s.name).filter(unique).sort();
  }

  static getHighestStandard(standards, type = null) {
    if (!isArray(standards) || standards.length === 0) {
      return null;
    }
    const highest = standards.map(n => Standard.getStandard(n.name, type, n))
      .filter(s => !isNullOrUndefined(s))
      .sort((a, b) => {
        if (isNullOrUndefined(a.energy)) {
          return -1;
        }
        if (isNullOrUndefined(b.energy)) {
          return -1;
        }
        return a.energy - b.energy;
      });
    return highest[highest.length - 1];
  }
}

export default Standard;