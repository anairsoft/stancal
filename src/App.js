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
  Glyphicon,
  Grid,
  Nav,
  Navbar,
  NavItem,
  Panel,
  Row,
  Tab, 
  Tabs
} from 'react-bootstrap';
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl';
import ComputeFromMassVelocityForm from './components/ComputeFromMassVelocityForm'
import './App.css';

const messages = defineMessages({
  viewDocsLink: {
    id: 'app.docs.view.link',
    defaultMessage: 'https://github.com/anairsoft/stancal/wiki',
  },
  massvelocityTab: {
    id: 'compute.massvelocity.tab',
    defaultMessage: 'Mass and velocity',
  },
  energyTab: {
    id: 'compute.energy.tab',
    defaultMessage: 'Energy',
  },
});

class App extends Component {
  render() {
    const {formatMessage} = this.props.intl;
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="https://github.com/anairsoft/stancal">
                  <FormattedMessage
                    id="app.title.short"
                    defaultMessage="ANA StanCal" />
                </a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={1} href={formatMessage(messages.viewDocsLink)}>
                <FormattedMessage
                  id="app.docs.view.label"
                  defaultMessage="View ANA StanCal Docs" />
              </NavItem>
              <NavItem eventKey={1} href={formatMessage(messages.viewDocsLink)}>
                <FormattedMessage
                  id="ana.protectiveeyewear.docs.view.label"
                  defaultMessage="View ANA Protective Eyewear and Standards Docs" />
              </NavItem>
            </Nav>
          </Grid>
        </Navbar>
        <Grid>
          <Row>&nbsp;</Row><Row>&nbsp;</Row><Row>&nbsp;</Row>
          <Panel>
            <Panel.Heading>
              <Panel.Title>
                <FormattedMessage
                  id="app.compute.from"
                  defaultMessage="Compute from ..." />
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Tabs defaultActiveKey={1} id="computefrom">
                <Tab eventKey={1} title={formatMessage(messages.massvelocityTab)}>
                  <ComputeFromMassVelocityForm />
                </Tab>
                <Tab eventKey={2} title={formatMessage(messages.energyTab)}>
                </Tab>
              </Tabs>
            </Panel.Body>
          </Panel>
          <Row>
            <Glyphicon glyph="info-sign" /> &nbsp; 
            <FormattedMessage
              id="app.info.text"
              defaultMessage="ANA StanCal is an open source software aiming to helping people to determine
              which protective eyewear to use during airsoft games. It is developed by the Association de
              Normalisation de l'Airsoft." />
          </Row>
          <Row>
            <Glyphicon glyph="copyright-mark" /> &nbsp; 
            <FormattedMessage
              id="app.copyright.text"
              defaultMessage="Copyright 2018 Association de Normalisation de l'Airsoft.
              Distributed under the terms of the GNU GPL v3 license." />
          </Row>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(App);