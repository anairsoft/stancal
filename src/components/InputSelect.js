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
  ControlLabel,
  FormControl, 
  FormGroup,
} from 'react-bootstrap';
import { isNullOrUndefined } from 'util';

class InputValueUnit extends Component {
  render() {
    
    const options = this.props.options.map((option, pos) => {
      return (
        <option key={pos} value={option[0]}>{option[1]}</option>
      );
    });
    return (
      <FormGroup>
        <Col componentClass={ControlLabel} sm={2} xs={12}>
          {this.props.label}
        </Col>
        <Col sm={6} xs={12}>
          <FormControl componentClass="select" name={this.props.name}
            disabled={this.props.options.length === 0 || this.props.options.filter(o => !isNullOrUndefined(o[0]) && o[0].length !== 0).length === 0}
            onChange={this.props.onChange}>
            {options}
          </FormControl>
        </Col>
      </FormGroup>
    );
  }
}

export default InputValueUnit;