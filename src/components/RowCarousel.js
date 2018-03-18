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
import Measure from 'react-measure';
import { isNullOrUndefined } from 'util';

class RowCarousel extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dimensions: {},
      heights: [],
      width: 0,
    };
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.images !== nextProps.images) {
      this.setState({
        heights: [],
      });
    }
  }

  handleLoad(event) {
    const naturalHeight = event.target.naturalHeight;
    const naturalWidth = event.target.naturalWidth;
    const width = this.state.dimensions.width;
    const ratio = naturalWidth > width ? width / naturalWidth : 1;
    const height = naturalHeight * ratio;
    this.setState((prevState) => {
      return {
        heights: prevState.heights.concat([height]),
        width: width,
      };
    });
  }

  render() {
    if(isNullOrUndefined(this.props.images) || this.props.images.length === 0) {
      return <div />;
    }
    const height = Math.max.apply(Math, this.state.heights)
      * this.state.dimensions.width
      / this.state.width;
    const style = !isNaN(height) && height !== 0
      ? {
        'height': height + 'px',
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
          <Measure
            bounds
            onResize={(contentRect) => {
              this.setState({ dimensions: contentRect.bounds })
            }}
          >
            {({ measureRef }) =>
              <div ref={measureRef}>
                <Carousel interval={NaN} style={style}>
                  {images}
                </Carousel>
              </div>
            }
          </Measure>
        </Col>
      </Row>
    );
  }
}

export default RowCarousel;