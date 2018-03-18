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
    if (isNullOrUndefined(this.props.text)) {
      return <div />;
    }
    const glyph = isNullOrUndefined(this.props.glyph) 
      ? null
      : <span><Glyphicon glyph={this.props.glyph} /> &nbsp; </span>;
    const link = isNullOrUndefined(this.props.link)
      ? null
      : <a href={this.props.link} target="_blank" rel="noopener noreferrer"><Glyphicon glyph="info-sign" /></a>
    return (
      <Row>
        <Col sm={2} xsHidden></Col>
        <Col sm={2} xs={5}>{this.props.label}</Col>
        <Col sm={3} xs={5}><Label bsStyle={this.props.bsStyle}>{glyph}{this.props.text}</Label></Col>
        <Col sm={1} xs={2} className="right">
          {link}
        </Col>
      </Row>
    );
  }
}

export default RowText;