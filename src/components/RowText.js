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
import { isNullOrUndefined } from 'util';

class RowText extends Component {
  render() {
    const glyph = isNullOrUndefined(this.props.glyph) ? null : <span><Glyphicon glyph={this.props.glyph} /> &nbsp; </span>;
    return (
      <Row>
        <Col sm={2} xsHidden></Col>
        <Col sm={3} xs={6}>{this.props.label}</Col>
        <Col sm={3} xs={6}><Label bsStyle={this.props.style}>{glyph}{this.props.text}</Label></Col>
        <Col sm={2} xsHidden>
          <Glyphicon glyph="question-sign" /> &nbsp; 
          <Glyphicon glyph="new-window" />
        </Col>
      </Row>
    );
  }
}

export default RowText;