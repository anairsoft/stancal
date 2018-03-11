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
import {
  Col,
  Label,
  Row,
} from 'react-bootstrap';
import { isNullOrUndefined } from 'util';

class RowValueUnit extends Component {
  render() {
    if(isNullOrUndefined(this.props.value) || isNaN(this.props.value) || this.props.value.length === 0) {
      return <Row />
    }
    const comment = isNullOrUndefined(this.props.comment) ? null : ' (' + this.props.comment + ')';
    const labelSm = isNullOrUndefined(this.props.labelSm) ? 3 : this.props.labelSm;
    const labelXs = isNullOrUndefined(this.props.labelXs) ? 3 : this.props.labelXs;
    return (
      <Row>
        <Col sm={2} xsHidden></Col>
        <Col sm={labelSm} xs={labelXs}>{this.props.label}</Col>
        <Col sm={3} xs={6}><Label bsStyle={this.props.bsStyle}>{this.props.value} {this.props.unit}{comment}</Label></Col>
      </Row>
    );
  }
}

export default RowValueUnit;