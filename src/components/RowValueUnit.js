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

class RowValueUnit extends Component {
  render() {
    return (
      <Row>
        <Col sm={2} xsHidden></Col>
        <Col sm={3} xs={6}>{this.props.label}</Col>
        <Col sm={3} xs={6}><Label>{this.props.value} {this.props.unit}</Label></Col>
      </Row>
    );
  }
}

export default RowValueUnit;