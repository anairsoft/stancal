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
      heights: [],
    };
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      heights: [],
    });
  }

  handleLoad(event) {
    const height = event.target.naturalHeight;
    // TODO: Refresh size after resize
    console.log(height, event.target.src);
    this.setState((prevState) => {
      return {heights: prevState.heights.concat([height])};
    });
  }

  render() {
    if(isNullOrUndefined(this.props.images) || this.props.images.length === 0) {
      return <div />;
    }
    const style = this.state.heights.length === this.props.images.length 
      ? {
        'height': Math.max.apply(Math, this.state.heights) + 'px',
      } : { };
    const images = this.props.images.map((image, index) => {
      return (
        <Carousel.Item key={index} style={style}>
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