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
import units from '../data/units.json';

class Unit {
  static getUnit(name, type = null) {
    const unit = isNullOrUndefined(type)
      ? units.find(u => u.name === name)
      : units.find(u => u.name === name && u.type === type);
    return unit;
  }

  static getUnitNames(type = null) {
    return isNullOrUndefined(type)
      ? units.map(u => u.name).sort()
      : units.filter(u => u.type === type).map(u => u.name).sort();
  }

  static getUnitRatio(name, type = null) {
    const unit = Unit.getUnit(name, type);
    if(isNullOrUndefined(unit)) {
      return null;
    }
    return unit.ratio;
  }
}

export default Unit;