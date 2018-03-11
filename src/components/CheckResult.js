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
import RowFooter from './RowFooter';
import RowImages from './RowImages';
import RowStandards from './RowStandards';
import RowText from './RowText';

const messages = defineMessages({
  brandLabel: {
    id: 'check.protectiveeyewear.brand.label',
    defaultMessage: 'Brand',
  },
  dataWarning: {
    id: 'check.protectiveeyewear.data.warning',
    defaultMessage: 'The ANA verify these data accordingly to information providen by manufacturers. ANA is not responsible for any error and you are encouraged to report them to the ANA.',
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
    return (
      <div>
        <RowText label={formatMessage(messages.brandLabel)} text={this.props.product.brand} />
        <RowText label={formatMessage(messages.productLabel)} text={this.props.product.name} />
        <RowText label={formatMessage(messages.typeLabel)} text={formatMessage(type)} />
        <RowStandards standards={this.props.product.standards} type={this.props.product.type} />
        <RowImages images={this.props.product.pictures} />
        <RowFooter glyph="alert" text={formatMessage(messages.dataWarning)} />
      </div>
    );
  }
}

CheckResult.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CheckResult);