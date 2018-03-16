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

import React, { Component } from 'react';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import { isNullOrUndefined } from 'util';
import RowCarousel from './RowCarousel';
import RowFooter from './RowFooter';
import RowStandards from './RowStandards';
import RowText from './RowText';
import RowValueUnit from './RowValueUnit';
import Standard from '../core/Standard';

const messages = defineMessages({
  brandLabel: {
    id: 'check.protectiveeyewear.brand.label',
    defaultMessage: 'Brand',
  },
  dataWarning: {
    id: 'check.protectiveeyewear.data.warning',
    defaultMessage: 'Product information is provided by {brand}. ANA is not responsible for any error.',
  },
  highestEnergyLabel: {
    id: 'check.protectiveeyewear.highest.energy.label',
    defaultMessage: 'Maximal energy:',
  },
  highestStandardLabel: {
    id: 'check.protectiveeyewear.highest.standard.label',
    defaultMessage: 'Highest standard:',
  },
  picturesWarning: {
    id: 'check.protectiveeyewear.pictures.warning',
    defaultMessage: 'Product pictures are copyrighted by {brand} and are used by ANA StanCal with their graceful courtesie.',
  },
  productLabel: {
    id: 'check.protectiveeyewear.product.label',
    defaultMessage: 'Product',
  },
  typeLabel: {
    id: 'check.protectiveeyewear.type.label',
    defaultMessage: 'Type',
  },
  typeSpectacles: {
    id: 'check.protectiveeyewear.type.spectacles',
    defaultMessage: 'Spectacles',
  },
  typeGoggles: {
    id: 'check.protectiveeyewear.type.goggles',
    defaultMessage: 'Goggles',
  },
  typeFaceshield: {
    id: 'check.protectiveeyewear.type.faceshield',
    defaultMessage: 'Faceshield',
  },
  typeUnknown: {
    id: 'check.protectiveeyewear.type.unknown',
    defaultMessage: 'Unknown',
  }
});

class CheckResult extends Component {
  render() {
    const {formatMessage} = this.props.intl;
    if(isNullOrUndefined(this.props.product)) {
      return <div />;
    }
    var type = null;
    switch(this.props.product.type) {
      case "spectacles": type = messages.typeSpectacles; break;
      case "goggles": type = messages.typeGoggles; break;
      case "faceshield": type = messages.typeFaceshield; break;
      default: type = messages.typeUnknown; break;
    }
    const highestStandard = Standard.getHighestStandard(this.props.product.standards, this.props.product.type);
    const highestStandardText = isNullOrUndefined(highestStandard) ? null : highestStandard.name;
    const highestStandardEnergy = isNullOrUndefined(highestStandard) || isNullOrUndefined(highestStandard.energy) ? NaN : highestStandard.energy.toFixed(3);
    return (
      <div>
        <RowText label={formatMessage(messages.brandLabel)} text={this.props.product.brand} />
        <RowText label={formatMessage(messages.productLabel)} text={this.props.product.name} link={this.props.product.links[0].value} />
        <RowText label={formatMessage(messages.typeLabel)} text={formatMessage(type)} />
        <RowText label={formatMessage(messages.highestStandardLabel)} text={highestStandardText} />
        <RowValueUnit label={formatMessage(messages.highestEnergyLabel)} value={highestStandardEnergy} unit="J" labelSm={2} labelXs={5} bsStyle="primary" />
        <RowStandards standards={this.props.product.standards} type={this.props.product.type} />
        <RowCarousel images={this.props.product.pictures} />
        <RowFooter glyph="alert" text={formatMessage(messages.dataWarning, {brand: this.props.product.brand})} />
        <RowFooter glyph="copyright-mark" text={formatMessage(messages.picturesWarning, {brand: this.props.product.brand})} />
      </div>
    );
  }
}

CheckResult.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CheckResult);