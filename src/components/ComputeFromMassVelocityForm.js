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
  InputGroup,
  Row,
} from 'react-bootstrap';
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl';
import StandardChecker from './StandardChecker';

const messages = defineMessages({
  massPlaceholder: {
    id: 'compute.massvelocity.mass.placeholder',
    defaultMessage: 'Mass',
  },
  velocityPlaceholder: {
    id: 'compute.massvelocity.velocity.placeholder',
    defaultMessage: 'Velocity',
  },
});

class ComputeFromMassVelocityForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      energy: 0,
      massRatio: 0.001,
      massUnit: 'g',
      massValue: '0.20',
      velocityRatio: 0.3048,
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
    const energy = 0.5 
      * this.state.massValue * this.state.massRatio 
      * Math.pow(this.state.velocityValue * this.state.velocityRatio, 2);
    this.setState({
      energy: energy
    });
  }

  render() {
    const {formatMessage} = this.props.intl;
    return (
      <Form horizontal>
        <FormGroup>
          <Col sm={2} />
          <Col sm={8}>
            <FormattedMessage
              id="compute.massvelocity.description"
              defaultMessage="Please enter the measured mass and velocity of the projectile. You may change the units used." />
          </Col>
        </FormGroup>
        <FormGroup controlId="mass"
          validationState={this.getValidationState(this.state.massValue)}>
          <Col componentClass={ControlLabel} sm={2}>
            <FormattedMessage
              id="compute.massvelocity.mass.label"
              defaultMessage="Mass" />
          </Col>
          <Col sm={5}>
            <InputGroup>
              <FormControl name="massValue" type="text" placeholder={formatMessage(messages.massPlaceholder)}
                value={this.state.massValue}
                onChange={this.handleChange} />
              <InputGroup.Addon>{this.state.massUnit}</InputGroup.Addon>
            </InputGroup>
          </Col>
          <Col sm={3}>
            <FormControl name="massUnit" componentClass="select"
              onChange={this.handleChange}>
              <option value="g"><FormattedMessage id="compute.massvelocity.mass.unit.select" defaultMessage="Select unit ..."/></option>
              <option value="mg"><FormattedMessage id="compute.massvelocity.mass.unit.mg" defaultMessage="milligrams (mg)"/></option>
              <option value="g"><FormattedMessage id="compute.massvelocity.mass.unit.g" defaultMessage="grams (g)"/></option>
              <option value="kg"><FormattedMessage id="compute.massvelocity.mass.unit.kg" defaultMessage="kilograms (kg)"/></option>
              <option value="gr"><FormattedMessage id="compute.massvelocity.mass.unit.gr" defaultMessage="grains (gr)"/></option>
              <option value="oz"><FormattedMessage id="compute.massvelocity.mass.unit.oz" defaultMessage="ounces (oz)"/></option>
              <option value="lb"><FormattedMessage id="compute.massvelocity.mass.unit.lb" defaultMessage="pounds (lb)"/></option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="velocity"
          validationState={this.getValidationState(this.state.velocityValue)}>
          <Col componentClass={ControlLabel} sm={2}>
            <FormattedMessage
              id="compute.massvelocity.velocity.label"
              defaultMessage="Velocity" />
          </Col>
          <Col sm={5}>
            <InputGroup>
              <FormControl name="velocityValue" type="text" placeholder={formatMessage(messages.velocityPlaceholder)}
                value={this.state.velocityValue}
                onChange={this.handleChange} />
              <InputGroup.Addon>{this.state.velocityUnit}</InputGroup.Addon>
            </InputGroup>
          </Col>
          <Col sm={3}>
            <FormControl name="velocityUnit" componentClass="select"
              onChange={this.handleChange}>
              <option value="fps"><FormattedMessage id="compute.massvelocity.velocity.unit.select" defaultMessage="Select unit ..."/></option>
              <option value="m/s"><FormattedMessage id="compute.massvelocity.velocity.unit.m/s" defaultMessage="meters per second (m/s)"/></option>
              <option value="km/h"><FormattedMessage id="compute.massvelocity.velocity.unit.km/h" defaultMessage="kilometers per hour (km/h)"/></option>
              <option value="fps"><FormattedMessage id="compute.massvelocity.velocity.unit.fps" defaultMessage="feet per second (fps)"/></option>
              <option value="mph"><FormattedMessage id="compute.massvelocity.velocity.unit.mph" defaultMessage="miles per hour (mph)"/></option>
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
              <FormattedMessage
                id="compute.massvelocity.button.compute"
                defaultMessage="Compute"
              />
            </Button>
          </Col>
        </FormGroup>
        <Row>
          <Col sm={2}></Col>
          <Col sm={3}>Mass of projectile:</Col>
          <Col sm={3}>{this.state.massValue}{this.state.massUnit}</Col>
        </Row>
        <Row>
          <Col sm={2}></Col>
          <Col sm={3}>Velocity of projectile:</Col>
          <Col sm={3}>{this.state.velocityValue}{this.state.velocityUnit}</Col>
        </Row>
        <Row>
          <Col sm={2}></Col>
          <Col sm={3}>Energy of projectile:</Col>
          <Col sm={3}>{this.state.energy}J</Col>
        </Row>
        <StandardChecker value={this.state.energy} max={0.87075} label="EN 166 F" />
        <StandardChecker value={this.state.energy} max={6.192} label="EN 166 B" />
        <StandardChecker value={this.state.energy} max={15.523} label="EN 166 A" />
        <StandardChecker value={this.state.energy} max={7.51} label="STANAG 4296" />
      </Form>
    );
  }
}

ComputeFromMassVelocityForm.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ComputeFromMassVelocityForm);