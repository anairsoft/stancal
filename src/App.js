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
  energyTab: {
    id: 'compute.energy.tab',
    defaultMessage: 'Energy',
  },
  issuesLink: {
    id: 'app.issues.link',
    defaultMessage: 'https://github.com/anairsoft/stancal/issues',
  },
  massvelocityTab: {
    id: 'compute.massvelocity.tab',
    defaultMessage: 'Mass and velocity',
  },
  viewAppDocsLink: {
    id: 'app.docs.view.link',
    defaultMessage: 'https://github.com/anairsoft/stancal/wiki',
  },
  viewAnaDocsLink: {
    id: 'ana.protectiveeyewear.docs.view.link',
    defaultMessage: 'https://ana.asso.fr/en/recommendations/eyewear-protections/eyewear-protections-study/',
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
              <NavItem eventKey={1} href={formatMessage(messages.viewAppDocsLink)}>
                <FormattedMessage
                  id="app.docs.view.label"
                  defaultMessage="View ANA StanCal Docs" />
              </NavItem>
              <NavItem eventKey={1} href={formatMessage(messages.viewAnaDocsLink)}>
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
                <Tab eventKey={2} title={formatMessage(messages.energyTab)} disabled>
                </Tab>
              </Tabs>
            </Panel.Body>
          </Panel>
          <div class="footer">
            <Row>
              <Glyphicon glyph="info-sign" /> &nbsp; 
              <FormattedMessage
                id="app.info.text"
                defaultMessage="ANA StanCal is an open source software aiming to helping people to determine
                which protective eyewear to use during airsoft games." />
            </Row>
            <Row>
              <a href={formatMessage(messages.issuesLink)}>
                <Glyphicon glyph="exclamation-sign" /> &nbsp; 
                <FormattedMessage
                  id="app.issues.text"
                  defaultMessage="Report a bug or an issue, ask for a new feature." />
              </a>
            </Row>
            <Row>
              <Glyphicon glyph="alert" /> &nbsp; 
              <FormattedMessage
                id="app.legal.text"
                defaultMessage="This information is given for illustrative purposes and doesn't override the standards considered.
                Developers of ANA StanCal and the Association de Normalisation de l'Airsoft can't be held for responsible of any error or damage resulting of the use of this tool." />
            </Row>
            <Row>
              <Glyphicon glyph="copyright-mark" /> &nbsp; 
              <FormattedMessage
                id="app.copyright.text"
                defaultMessage="Copyright 2018 Association de Normalisation de l'Airsoft.
                Distributed under the terms of the GNU GPL v3 license." />
            </Row>
          </div>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(App);