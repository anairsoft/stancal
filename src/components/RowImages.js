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
  Image,
  Row,
} from 'react-bootstrap';
import { isNullOrUndefined } from 'util';

class RowImages extends Component {
  render() {
    if(isNullOrUndefined(this.props.images) || this.props.images.length === 0) {
      return <div />;
    }
    const images = this.props.images.map((image, index) => {
      return (
        <Col sm={2} xs={12} key={index}><Image src={image} rounded responsive /></Col>
      );
    });
    return (
      <Row>
        <Col sm={2} xsHidden></Col>
        {images}
      </Row>
    );
  }
}

export default RowImages;