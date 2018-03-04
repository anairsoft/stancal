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
  ButtonGroup,
  Col,
  ControlLabel,
  FormControl, 
  FormGroup,
  Glyphicon,
  InputGroup,
} from 'react-bootstrap';

class InputValueUnit extends Component {
  getValidationState() {
    const number = parseFloat(this.props.value);
    return (isFinite(number) && number > 0) ? '' : 'error';
  }

  getDisabledState() {
    return this.getValidationState() !== '';
  }

  render() {
    const options = this.props.units.map((unit) => {
      return (
        <option value={unit[0]}>{unit[1]}</option>
      );
    });
    return (
      <FormGroup
        validationState={this.getValidationState()}>
        <Col componentClass={ControlLabel} sm={2}>
          {this.props.label}
        </Col>
        <Col sm={3}>
          <InputGroup>
            <FormControl type="text" name={this.props.name + 'Value'} placeholder={this.props.placeholder}
              value={this.props.value}
              onChange={this.props.onChange}
              ref={(input) => {this.valueInput = input;}} />
            <InputGroup.Addon>{this.props.unit}</InputGroup.Addon>
          </InputGroup>
        </Col>
        <Col sm={3}>
          <FormControl componentClass="select" name={this.props.name + 'Unit'}
            onChange={this.props.onChange}>
            {options}
          </FormControl>
        </Col>
        <Col sm={2}>
          <ButtonGroup>
            <Button
              disabled={this.getDisabledState()}
              name="minus"
              onClick={this.props.onClick}
              value={this.props.name + 'Value'}>
              <Glyphicon glyph="minus" />
            </Button>
            <Button 
              disabled={this.getDisabledState()}
              name="plus"
              onClick={this.props.onClick}
              value={this.props.name + 'Value'}>
              <Glyphicon glyph="plus" />
            </Button>
          </ButtonGroup>
        </Col>
      </FormGroup>
    );
  }
}

export default InputValueUnit;