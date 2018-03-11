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
  Glyphicon,
  Label,
  Row,
} from 'react-bootstrap';

class RowStandards extends Component {
  render() {
    const standards = this.props.standards.map(standard => {
      return (
        <span><Label bsStyle="success"><Glyphicon glyph="ok" /> &nbsp; {standard.name}</Label> &nbsp; </span>
      );
    });
    return (
      <Row>
        <Col sm={2} xsHidden></Col>
        <Col sm={6} xs={12}>{standards}</Col>
      </Row>
    );
  }
}

export default RowStandards;