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
  Grid,
  Jumbotron,
  Navbar, 
  Panel, 
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
  energyTag: {
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
                <a href="/">
                  <FormattedMessage
                    id="app.title.short"
                    defaultMessage="ANA StanCal" />
                </a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Jumbotron>
          <Grid>
            <h1>
              <FormattedMessage
                id="app.title.full"
                defaultMessage="ANA StanCal" />
            </h1>
            <p>
              <Button
                bsStyle="info"
                bsSize="large"
                href={formatMessage(messages.viewDocsLink)}
                target="_blank"> 
                <FormattedMessage
                  id="app.docs.view.label"
                  defaultMessage="View ANA StanCal Docs" />
              </Button>
            </p>
          </Grid>
        </Jumbotron>
        <Grid>
          <Panel>
            <Panel.Heading>
              <Panel.Title>
                <FormattedMessage
                  id="app.compute.from"
                  defaultMessage="Compute from ..." />
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Tabs defaultActiveKey={1}>
                <Tab eventKey={1} title={formatMessage(messages.massvelocityTab)}>
                  <ComputeFromMassVelocityForm />
                </Tab>
                <Tab eventKey={2} title={formatMessage(messages.energyTag)}>
                </Tab>
              </Tabs>
            </Panel.Body>
          </Panel>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(App);