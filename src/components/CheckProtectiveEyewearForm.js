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
import Product from '../core/Product';

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

class CheckProtectiveEyewearForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      brandName: '',
      productName: '',
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if(event.target.name === 'brandName') {
      this.setState({
        productName: '',
      });
    }
  }

  render() {
    const {formatMessage} = this.props.intl;
    const brandName = this.state.brandName;
    const brands = Product.getBrandNames();
    const productName = this.state.productName;
    const products = Product.getProductNames(brandName);
    const product = Product.getProduct(productName, brandName);
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
          name="brandName"
          onChange={this.handleChange}
          options={brands.map(x => [x, x])} />
        <InputSelect
          label="Product"
          name="productName"
          onChange={this.handleChange}
          options={products.map(x => [x, x])} />
        <CheckResult
          product={product} />
      </Form>
    );
  }
}

CheckProtectiveEyewearForm.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CheckProtectiveEyewearForm);