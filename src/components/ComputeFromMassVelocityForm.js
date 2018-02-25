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
  render() {
    return (
      <Form horizontal>
        <FormGroup>
          <Col sm={2} />
          <Col sm={8}>
            Please enter the measured mass and velocity of the projectile. You may change the units used.
          </Col>
        </FormGroup>
        <FormGroup controlId="mass">
          <Col componentClass={ControlLabel} sm={2}>
            Mass
          </Col>
          <Col sm={6}>
            <InputGroup>
              <FormControl type="text" placeholder="Mass" />
              <InputGroup.Addon>g</InputGroup.Addon>
            </InputGroup>
          </Col>
          <Col sm={2}>
            <FormControl componentClass="select" placeholder="Unit">
              <option value="unit">Select unit ...</option>
              <option value="g">g</option>
              <option value="kg">kg</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="velocity">
          <Col componentClass={ControlLabel} sm={2}>
            Velocity
          </Col>
          <Col sm={6}>
            <InputGroup>
              <FormControl type="text" placeholder="Velocity" />
              <InputGroup.Addon>fps</InputGroup.Addon>
            </InputGroup>
          </Col>
          <Col sm={2}>
            <FormControl componentClass="select" placeholder="Unit">
              <option value="unit">Select unit ...</option>
              <option value="fps">feet per second (fps)</option>
              <option value="ms">meters per second (m/s)</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="validate">
          <Col sm={2} />
          <Col sm={8}>
            <Button
              disabled="true"
              bsStyle="primary"
              block="true">
              Compute
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default ComputeFromMassVelocityForm;