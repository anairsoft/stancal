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
  Carousel,
  Col,
  Row,
} from 'react-bootstrap';
import { isNullOrUndefined } from 'util';

class RowCarousel extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      height: 0,
      loaded: 0,
    };
    this.handleLoad = this.handleLoad.bind(this);
  }

  handleLoad(event) {
    const height = event.target.offsetHeight;
    const loaded = this.state.loaded;
    console.log(this.state.loaded, this.state.height, height);
    if (height > this.state.height) {
      console.log(height);
      this.setState({
        height: height,
      });
    }
    this.setState({
      loaded: loaded + 1,
    })
    console.log(loaded);
  }

  render() {
    if(isNullOrUndefined(this.props.images) || this.props.images.length === 0) {
      return <div />;
    }
    const style = /*this.state.loaded === this.props.images.length 
      ? {
        'min-height': this.state.height + 'px',
      } :*/ { };
    const images = this.props.images.map((image, index) => {
      return (
        <Carousel.Item key={index}>
          <img src={image} alt="" onLoad={this.handleLoad} />
        </Carousel.Item>
      );
    });
    return (
      <Row>
        <Col sm={2} xsHidden></Col>
        <Col sm={6} xs={12}>
          <Carousel interval={NaN} style={style}>
            {images}
          </Carousel>
        </Col>
      </Row>
    );
  }
}

export default RowCarousel;