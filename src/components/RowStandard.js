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
import { isNullOrUndefined } from 'util';
import Standard from '../core/Standard';

class RowStandard extends Component {
  render() {
    const standard = Standard.getStandard(this.props.name, this.props.type);
    const progress = 100 * this.props.value / standard.energy;
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
        <Col sm={2} xsHidden></Col>
        <Col sm={3} xs={4}><ProgressBar bsStyle={style} now={progress} /></Col>
        <Col sm={3} xs={6}><Label bsStyle={style}><Glyphicon glyph={glyph} /> &nbsp; {this.props.label}</Label></Col>
        <Col sm={1} xs={2} className="right">
          <a href={standard.links[0].link} target="_blank" rel="noopener noreferrer"><Glyphicon glyph="info-sign" /></a>
        </Col>
      </Row>
    );
  }
}

export default RowStandard;