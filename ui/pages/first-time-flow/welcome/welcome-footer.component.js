import React from 'react';
import { useI18nContext } from '../../../hooks/useI18nContext';

const WelcomeFooter = () => {
  const t = useI18nContext();

  return (
    <>
      <img
        src="./images/logo/metamask-fox.svg"
        className="info-tab__logo"
        alt="MetaMask Logo"
      />
      <div className="welcome-page__header">{t('welcome')}</div>
      <div className="welcome-page__description">
        <p>{t('metamaskDescription')}</p>
        <p>{t('happyToSeeYou')}</p>
      </div>
    </>
  );
};

export default WelcomeFooter;
