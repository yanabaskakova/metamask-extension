import EventEmitter from 'events';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../components/ui/button';
import {
  INITIALIZE_CREATE_PASSWORD_ROUTE,
  INITIALIZE_SELECT_ACTION_ROUTE,
  // INITIALIZE_METAMETRICS_OPT_IN_ROUTE,
} from '../../../helpers/constants/routes';
import { isBeta } from '../../../helpers/utils/build-types';
import WelcomeFooter from './welcome-footer.component';
import BetaWelcomeFooter from './beta-welcome-footer.component';

export default class Welcome extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
    participateInMetaMetrics: PropTypes.bool,
    welcomeScreenSeen: PropTypes.bool,
    isInitialized: PropTypes.bool,
  };

  static contextTypes = {
    t: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.animationEventEmitter = new EventEmitter();
  }

  componentDidMount() {
    const {
      history,
      participateInMetaMetrics,
      welcomeScreenSeen,
      isInitialized,
    } = this.props;

    if (
      welcomeScreenSeen &&
      isInitialized &&
      participateInMetaMetrics !== null
    ) {
      history.push(INITIALIZE_CREATE_PASSWORD_ROUTE);
    } else if (welcomeScreenSeen && participateInMetaMetrics !== null) {
      history.push(INITIALIZE_SELECT_ACTION_ROUTE);
    } else if (welcomeScreenSeen) {
      history.push(INITIALIZE_SELECT_ACTION_ROUTE);
    }
  }

  handleContinue = () => {
    this.props.history.push(INITIALIZE_SELECT_ACTION_ROUTE);
  };

  render() {
    const { t } = this.context;

    return (
      <div className="welcome-page__wrapper">
        <div className="welcome-page">
          {isBeta() ? <BetaWelcomeFooter /> : <WelcomeFooter />}
          <Button
            type="primary"
            className="first-time-flow__button"
            onClick={this.handleContinue}
            data-testid="first-time-flow__button"
          >
            {t('getStarted')}
          </Button>
        </div>
      </div>
    );
  }
}
