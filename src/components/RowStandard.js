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
  ProgressBar,
  Row,
} from 'react-bootstrap';

class RowStandard extends Component {
  render() {
    const progress = 100 * this.props.value / this.props.max;
    var style = "danger", glyph = "remove";
    if (progress < 90) {
      style = "success";
      glyph = "ok";
    } else if (progress < 100) {
      style = "warning";
      glyph = "alert";
    }
    return (
      <Row>
        <Col sm={2}></Col>
        <Col sm={3}><ProgressBar bsStyle={style} now={progress} /></Col>
        <Col sm={3}><Label bsStyle={style}><Glyphicon glyph={glyph} /> &nbsp; {this.props.label}</Label></Col>
        <Col sm={2}>
          <Glyphicon glyph="question-sign" /> &nbsp; 
          <Glyphicon glyph="new-window" />
        </Col>
      </Row>
    );
  }
}

export default RowStandard;