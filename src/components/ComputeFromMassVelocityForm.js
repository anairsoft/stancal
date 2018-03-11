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
import ComputationResult from './ComputationResult';
import InputValueUnit from './InputValueUnit';
import Unit from '../core/Unit.js';
import { isNullOrUndefined, isString } from 'util';

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
    defaultMessage: 'Unit ...',
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
    defaultMessage: 'Unit ...',
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
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      massRatio: Unit.getUnitRatio('g', 'mass'),
      massUnit: 'g',
      massValue: '0.20',
      velocityRatio: Unit.getUnitRatio('fps', 'velocity'),
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
      switch(event.target.name) {
        // massRatio & massUnit
        case 'massUnit' : this.setState({massRatio: Unit.getUnitRatio(event.target.value, 'mass')}); break;
        // velocityRatio & velocityUnit
        case 'velocityUnit' : this.setState({velocityRatio: Unit.getUnitRatio(event.target.value, 'velocity')}); break;
        default: console.log('Unknown unit: {event.target.name}={event.target.value} !'); break;
      }
    }
  }

  handleClick(event) {
    const name = event.target.value;
    const valueRaw = String(this.state[name]);
    console.log('handleClick: "' + name + '" = "' + valueRaw + '"');
    if (isNullOrUndefined(valueRaw) || !isString(valueRaw)) {
      return;
    }
    const value = parseFloat(valueRaw);
    const precision = (valueRaw.split('.')[1] || []).length;
    if (isNaN(value) || !isFinite(value)) {
      return;
    }
    var increment = Math.pow(10, -precision);
    if(event.target.name === 'minus') {
      increment = -increment;
    } else if (event.target.name !== 'plus') {
      return;
    }
    this.setState({
      [name]: (value + increment).toFixed(precision),
    });
  }

  computeYx(x, m, h, a, v0, k) {
    // See: https://fr.wikipedia.org/wiki/Trajectoire_d%27un_projectile#Trajectoire_soumise_%C3%A0_la_r%C3%A9sistance_de_l'air
    const g = 9.81;
    return (m / k) * Math.log(
        Math.cos(Math.sqrt(g * k * m) / (k * v0 * Math.cos(a)) * (Math.exp(k / m * x) - 1))
        - Math.atan(v0 * Math.sin(a) * Math.sqrt(k / (g * m))))
      + m / (2 * k) * Math.log((k * Math.pow(v0, 2) * Math.pow(Math.sin(a), 2)) / (g * m) + 1)
      + h;
  }

  computeRangeMax(m, h, a, v0, k) {
    if(v0 < 1 || v0 > 272) {
      return NaN;
    }
    var max = NaN;
    for(var x = 0; x < 1000; x = x + 0.1) {
      var y = this.computeYx(x, m, 2, 0, v0, k);
      if(y <= 0) {
        max = x;
        break;
      }
    }
    return max;
  }

  computeStanag2920v50(e) {
    return Math.sqrt(e / (0.5 * 1.102 * 0.001)) + 40;
  }

  render() {
    const {formatMessage} = this.props.intl;
    const m = this.state.massValue * this.state.massRatio;
    const v0 = this.state.velocityValue * this.state.velocityRatio;
    const energy = this.getDisabledState() ? NaN : 0.5 * m * Math.pow(v0, 2);
    const k = 0.5 * 1.82 * 0.00001
            * 0.47
            * 0.5 * 4 * Math.PI * 0.5 * 0.006;
    const rangeMax0 = this.computeRangeMax(m, 2, 0, v0, k);
    const stanag2920v50ms = this.computeStanag2920v50(energy);
    const stanag2920v50kmh = this.computeStanag2920v50(energy) * 3.6;
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
          onClick={this.handleClick}
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
          onClick={this.handleClick}
          unit={this.state.velocityUnit}
          units={[
            ["fps", formatMessage(messages.velocityUnitSelect)],
            ["m/s", formatMessage(messages.velocityUnitMs)],
            ["km/h", formatMessage(messages.velocityUnitKmh)],
            ["fps", formatMessage(messages.velocityUnitFps)],
            ["mph", formatMessage(messages.velocityUnitMph)],
          ]}
          value={this.state.velocityValue} />
        <ComputationResult
          massValue={this.state.massValue} massUnit={this.state.massUnit} massComment={m.toFixed(6) + ' kg'}
          velocityValue={this.state.velocityValue} velocityUnit={this.state.velocityUnit} velocityComment={v0.toFixed(3) + ' m/s'}
          energyValue={energy} energyUnit="J"
          rangeMax0Value={rangeMax0} rangeMax0Unit="m"
          stanag2920v50msValue={stanag2920v50ms} stanag2920v50msUnit="m/s" stanag2920v50msComment={stanag2920v50kmh.toFixed(3) + ' km/h'} />
      </Form>
    );
  }
}

ComputeFromMassVelocityForm.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ComputeFromMassVelocityForm);