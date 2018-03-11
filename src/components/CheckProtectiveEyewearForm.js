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
import CheckResult from './CheckResult';
import InputSelect from './InputSelect';
import data from '../data/protectiveEyewear.json';

const messages = defineMessages({
  brandLabel: {
    id: 'check.protectiveeyewear.brand.label',
    defaultMessage: 'Brand',
  },
  brandSelect: {
    id: 'check.protectiveeyewear.brand.select',
    defaultMessage: 'Please select a brand ...',
  },
  productLabel: {
    id: 'check.protectiveeyewear.product.label',
    defaultMessage: 'Product',
  },
  productSelect: {
    id: 'check.protectiveeyewear.product.select',
    defaultMessage: 'Please select a product ...',
  },
});

function unique(value, index, self) {
  return self.indexOf(value) === index;
}

class CheckProtectiveEyewearForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      brand: "",
      product: "",
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const {formatMessage} = this.props.intl;
    const brand = this.state.brand;
    const brands = data.products.map(p => p.brand).filter(unique).sort();
    const product = this.state.product;
    const products = data.products.filter(p => p.brand === brand).map(p => p.name).filter(unique).sort();
    const productSelected = data.products.find(p => p.brand === brand && p.name === product);
    return (
      <Form horizontal>
        <FormGroup>
          <Col sm={2} />
          <Col sm={8}>
            <FormattedMessage
              id="check.protectiveeyewear.description"
              defaultMessage="Please choose the protective eyewear to check." />
          </Col>
        </FormGroup>
        <InputSelect
          label={formatMessage(messages.brandLabel)}
          name="brand"
          onChange={this.handleChange}
          options={brands.map(x => [x, x])} />
        <InputSelect
          label="Product"
          name="product"
          onChange={this.handleChange}
          options={products.map(x => [x, x])} />
        <CheckResult
          product={productSelected} />
      </Form>
    );
  }
}

CheckProtectiveEyewearForm.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CheckProtectiveEyewearForm);