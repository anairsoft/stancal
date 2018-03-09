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
  Row,
} from 'react-bootstrap';
import { isNullOrUndefined } from 'util';

class RowText extends Component {
  render() {
    const glyph = isNullOrUndefined(this.props.glyph) ? null : <Glyphicon glyph={this.props.glyph} />;
    return (
      <Row>
        <Col sm={2} xsHidden></Col>
        <Col sm={10} className="footer">{glyph}{this.props.text}</Col>
      </Row>
    );
  }
}

export default RowText;