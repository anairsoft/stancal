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
  Navbar,
  Panel,
  Row,
  Tab, 
  Tabs
} from 'react-bootstrap';
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl';
import CheckProtectiveEyewearForm from './components/CheckProtectiveEyewearForm'
import ComputeFromMassVelocityForm from './components/ComputeFromMassVelocityForm'

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
    defaultMessage: 'Ballistics',
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
                <a href="/">
                  <img src="images/app/brand.png" alt="ANA" />
                </a>
              </Navbar.Brand>
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Grid>
          <Row>&nbsp;</Row><Row>&nbsp;</Row><Row>&nbsp;</Row>
          <Panel>
            <Panel.Heading>
              <Panel.Title>
                <FormattedMessage
                  id="app.title.long"
                  defaultMessage="ANA StanCal — Standards Calculator" />
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Tabs defaultActiveKey={1} id="computefrom">
                <Tab eventKey={1} title={formatMessage(messages.massvelocityTab)}>
                  <ComputeFromMassVelocityForm />
                </Tab>
                <Tab eventKey={2} title={formatMessage(messages.energyTab)}>
                  <CheckProtectiveEyewearForm />
                </Tab>
              </Tabs>
            </Panel.Body>
          </Panel>
          <div className="footer">
            <Row>
              <a href="https://github.com/anairsoft/stancal" target="_blank" rel="noopener noreferrer">
                <Glyphicon glyph="info-sign" />
                <FormattedMessage
                  id="app.info.text"
                  defaultMessage="ANA StanCal is an open source software aiming to helping people to determine
                  which protective eyewear to use during airsoft games." />
                </a>
            </Row>
            <Row>
              <a href={formatMessage(messages.viewAppDocsLink)} target="_blank" rel="noopener noreferrer">
                <Glyphicon glyph="info-sign" />
                <FormattedMessage
                      id="app.docs.view.label"
                      defaultMessage="View ANA StanCal documentation." />
              </a>
            </Row>
            <Row>
              <a href={formatMessage(messages.viewAnaDocsLink)} target="_blank" rel="noopener noreferrer">
                <Glyphicon glyph="info-sign" />
                <FormattedMessage
                    id="ana.protectiveeyewear.docs.view.label"
                    defaultMessage="View ANA protective eyewear and standards documentation." />
              </a>
            </Row>
            <Row>
              <a href={formatMessage(messages.issuesLink)} target="_blank" rel="noopener noreferrer">
                <Glyphicon glyph="exclamation-sign" />
                <FormattedMessage
                  id="app.issues.text"
                  defaultMessage="Report a bug or an issue, ask for a new feature." />
              </a>
            </Row>
            <Row>
              <Glyphicon glyph="alert" />
              <FormattedMessage
                id="app.legal.text"
                defaultMessage="This information is given for illustrative purposes and doesn't override the standards considered.
                Developers of ANA StanCal and the Association de Normalisation de l'Airsoft can't be held for responsible of any error or damage resulting of the use of this tool." />
            </Row>
            <Row>
              <Glyphicon glyph="copyright-mark" />
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