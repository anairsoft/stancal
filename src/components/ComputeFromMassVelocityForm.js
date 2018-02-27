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
  Button,
  Col,
  ControlLabel,
  Form, 
  FormControl, 
  FormGroup,
  InputGroup
} from 'react-bootstrap';

class ComputeFromMassVelocityForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      massRatio: '0.001',
      massUnit: 'g',
      massValue: '0.20',
      velocityRatio: '0.3048',
      velocityUnit: 'fps',
      velocityValue: '350',
    };
  }

  getDisabledState() {
    return this.getValidationState(this.state.massValue)
      + this.getValidationState(this.state.velocityValue)
      !== '';
  }

  getValidationState(value) {
    const number = parseFloat(value);
    return (isFinite(number) && number > 0) ? '' : 'error';
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if(event.target.type === 'select-one') {
      switch(event.target.value) {
        // massRatio & massUnit
        case 'mg' : this.setState({massRatio: 0.000001}); break;
        case 'g' : this.setState({massRatio: 0.001}); break;
        case 'kg' : this.setState({massRatio: 1}); break;
        case 'gr' : this.setState({massRatio: 0.0000647989}); break;
        case 'lb' : this.setState({massRatio: 0.453592}); break; 
        case 'oz' : this.setState({massRatio: 0.0283495}); break; 
        // velocityRatio & velocityUnit
        case 'm/s' : this.setState({velocityRatio: 1}); break;
        case 'km/h' : this.setState({velocityRatio: 0.277778}); break;
        case 'fps' : this.setState({velocityRatio: 0.3048}); break;
        case 'mph' : this.setState({velocityRatio: 0.44704}); break;
        default: console.log('Unknown unit: {event.target.name}={event.target.value} !'); break;
      }
    }
  }

  handleClick(event) {
    alert(0.5 
      * this.state.massValue * this.state.massRatio 
      * Math.pow(this.state.velocityValue * this.state.velocityRatio, 2));
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup>
          <Col sm={2} />
          <Col sm={8}>
            Please enter the measured mass and velocity of the projectile. You may change the units used.
          </Col>
        </FormGroup>
        <FormGroup controlId="mass"
          validationState={this.getValidationState(this.state.massValue)}>
          <Col componentClass={ControlLabel} sm={2}>
            Mass
          </Col>
          <Col sm={6}>
            <InputGroup>
              <FormControl name="massValue" type="text" placeholder="Mass"
                value={this.state.massValue}
                onChange={this.handleChange} />
              <InputGroup.Addon>{this.state.massUnit}</InputGroup.Addon>
            </InputGroup>
          </Col>
          <Col sm={2}>
            <FormControl name="massUnit" componentClass="select" placeholder="Unit"
              onChange={this.handleChange}>
              <option value="g">Select unit ...</option>
              <option value="mg">milligrams (mg)</option>
              <option value="g">grams (g)</option>
              <option value="kg">kilograms (kg)</option>
              <option value="gr">grains (gr)</option>
              <option value="oz">ounces (oz)</option>
              <option value="lb">pounds (lb)</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="velocity"
          validationState={this.getValidationState(this.state.velocityValue)}>
          <Col componentClass={ControlLabel} sm={2}>
            Velocity
          </Col>
          <Col sm={6}>
            <InputGroup>
              <FormControl name="velocityValue" type="text" placeholder="Velocity"
                value={this.state.velocityValue}
                onChange={this.handleChange} />
              <InputGroup.Addon>{this.state.velocityUnit}</InputGroup.Addon>
            </InputGroup>
          </Col>
          <Col sm={2}>
            <FormControl name="velocityUnit" componentClass="select" placeholder="Unit"
              onChange={this.handleChange}>
              <option value="fps">Select unit ...</option>
              <option value="m/s">meters per second (m/s)</option>
              <option value="km/h">kilometers per hour (km/h)</option>
              <option value="fps">feet per second (fps)</option>
              <option value="mph">miles per hour (mph)</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="validate">
          <Col sm={2} />
          <Col sm={8}>
            <Button
              disabled={this.getDisabledState()}
              bsStyle="primary"
              block="true"
              onClick={this.handleClick}>
              Compute
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default ComputeFromMassVelocityForm;