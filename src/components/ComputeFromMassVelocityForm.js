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
  Form, 
  FormGroup,
} from 'react-bootstrap';
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl';
import InputValueUnit from './InputValueUnit';
import RowStandard from './RowStandard';
import RowValueUnit from './RowValueUnit';

const messages = defineMessages({
  massLabel: {
    id: 'compute.massvelocity.mass.label',
    defaultMessage: 'Mass',
  },
  massPlaceholder: {
    id: 'compute.massvelocity.mass.placeholder',
    defaultMessage: 'Mass',
  },
  massUnitSelect: {
    id: 'compute.massvelocity.mass.unit.select',
    defaultMessage: 'Select unit ...',
  },
  massUnitMg: {
    id: 'compute.massvelocity.mass.unit.mg',
    defaultMessage: 'milligrams (mg)',
  },
  massUnitG: {
    id: 'compute.massvelocity.mass.unit.g',
    defaultMessage: 'grams (g)',
  },
  massUnitKg: {
    id: 'compute.massvelocity.mass.unit.kg',
    defaultMessage: 'kilograms (kg)',
  },
  massUnitGr: {
    id: 'compute.massvelocity.mass.unit.gr',
    defaultMessage: 'grains (gr)',
  },
  massUnitOz: {
    id: 'compute.massvelocity.mass.unit.oz',
    defaultMessage: 'ounces (oz)',
  },
  massUnitLb: {
    id: 'compute.massvelocity.mass.unit.lb',
    defaultMessage: 'pounds (lb)',
  },
  resultEnergyLabel: {
    id: 'compute.result.energy.label',
    defaultMessage: 'Energy of projectile:',
  },
  resultMassLabel: {
    id: 'compute.result.mass.label',
    defaultMessage: 'Mass of projectile:',
  },
  resultVelocityLabel: {
    id: 'compute.result.velocity.label',
    defaultMessage: 'Velocity of projectile:',
  },
  velocityLabel: {
    id: 'compute.massvelocity.velocity.label',
    defaultMessage: 'Velocity',
  },
  velocityPlaceholder: {
    id: 'compute.massvelocity.velocity.placeholder',
    defaultMessage: 'Velocity',
  },
  velocityUnitSelect: {
    id: 'compute.massvelocity.velocity.unit.select',
    defaultMessage: 'Select unit ...',
  },
  velocityUnitMs: {
    id: 'compute.massvelocity.velocity.unit.m/s',
    defaultMessage: 'meters per second (m/s)',
  },
  velocityUnitKmh: {
    id: 'compute.massvelocity.velocity.unit.km/h',
    defaultMessage: 'kilometers per hour (km/h)',
  },
  velocityUnitFps: {
    id: 'compute.massvelocity.velocity.unit.fps',
    defaultMessage: 'feet per second (fps)',
  },
  velocityUnitMph: {
    id: 'compute.massvelocity.velocity.unit.mph',
    defaultMessage: 'miles per hour (mph)',
  },
});

class ComputeFromMassVelocityForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
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

  render() {
    const {formatMessage} = this.props.intl;
    const energy = this.getDisabledState() ? NaN : 0.5 
      * this.state.massValue * this.state.massRatio 
      * Math.pow(this.state.velocityValue * this.state.velocityRatio, 2);
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
        <InputValueUnit
          label={formatMessage(messages.massLabel)}
          name="mass"
          placeholder={formatMessage(messages.massPlaceholder)}
          onChange={this.handleChange}
          unit={this.state.massUnit}
          units={[
            ["g", formatMessage(messages.massUnitSelect)],
            ["mg", formatMessage(messages.massUnitMg)],
            ["g", formatMessage(messages.massUnitG)],
            ["kg", formatMessage(messages.massUnitKg)],
            ["gr", formatMessage(messages.massUnitGr)],
            ["oz", formatMessage(messages.massUnitOz)],
            ["lb", formatMessage(messages.massUnitLb)],
          ]}
          value={this.state.massValue} />
        <InputValueUnit
          label={formatMessage(messages.velocityLabel)}
          name="velocity"
          placeholder={formatMessage(messages.velocityPlaceholder)}
          onChange={this.handleChange}
          unit={this.state.velocityUnit}
          units={[
            ["fps", formatMessage(messages.velocityUnitSelect)],
            ["m/s", formatMessage(messages.velocityUnitMs)],
            ["km/h", formatMessage(messages.velocityUnitKmh)],
            ["fps", formatMessage(messages.velocityUnitFps)],
            ["mph", formatMessage(messages.velocityUnitMph)],
          ]}
          value={this.state.velocityValue} />
        <RowValueUnit label={formatMessage(messages.resultMassLabel)} 
          value={this.state.massValue} unit={this.state.massUnit} />
        <RowValueUnit label={formatMessage(messages.resultVelocityLabel)}
          value={this.state.velocityValue} unit={this.state.velocityUnit} />
        <RowValueUnit label={formatMessage(messages.resultEnergyLabel)} value={energy} unit="J" />
        <RowStandard value={energy} max={0.87075} label="EN 166 F (Spectacles)" />
        <RowStandard value={energy} max={6.192} label="EN 166 B (Goggles)" />
        <RowStandard value={energy} max={15.523} label="EN 166 A (Faceshields)" />
        <RowStandard value={energy} max={7.51} label="STANAG 4296" />
        <RowStandard value={energy} max={1.107868752} label="ANSI Z87.1+ (Spectacles)" />
        <RowStandard value={energy} max={3.0774132} label="ANSI Z87.1+ (Goggles)" />
        <RowStandard value={energy} max={7.150814378435543} label="MIL-PRF-31013" />
        <RowStandard value={energy} max={15.02369943189588} label="MIL-DTL-43511D" />
      </Form>
    );
  }
}

ComputeFromMassVelocityForm.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ComputeFromMassVelocityForm);