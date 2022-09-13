import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getAccountLink } from '@metamask/etherscan-link';
import Box from '../../../ui/box';
import IconCopy from '../../../ui/icon/icon-copy';
import IconBlockExplorer from '../../../ui/icon/icon-block-explorer';
import Button from '../../../ui/button/button.component';
import Tooltip from '../../../ui/tooltip/tooltip';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import Identicon from '../../../ui/identicon';
import { ellipsify } from '../../../../pages/send/send.utils';
import Popover from '../../../ui/popover';
import Typography from '../../../ui/typography';
import {
  FONT_WEIGHT,
  TYPOGRAPHY,
  DISPLAY,
  COLORS,
  JUSTIFY_CONTENT,
  SIZES,
  BORDER_STYLE,
} from '../../../../helpers/constants/design-system';
import { useCopyToClipboard } from '../../../../hooks/useCopyToClipboard';
import { getTokenList } from '../../../../selectors';

export default function ContractDetailsModal({
  onClose,
  tokenSymbol,
  tokenAddress,
  toAddress,
  chainId,
  rpcPrefs,
  isSetApproveForAll,
}) {
  const t = useI18nContext();
  const [copied, handleCopy] = useCopyToClipboard();
  const tokenList = useSelector(getTokenList);

  let contractTitle;
  let contractRequesting;
  if (isSetApproveForAll) {
    contractTitle = t('contractNFT');
    contractRequesting = t('contractRequestingAccess');
  } else {
    contractTitle = t('contractToken');
    contractRequesting = t('contractRequestingSpendingCap');
  }

  return (
    <Popover className="contract-details-modal">
      <Box
        paddingTop={6}
        paddingRight={4}
        paddingBottom={8}
        paddingLeft={4}
        className="contract-details-modal__content"
      >
        <Typography
          fontWeight={FONT_WEIGHT.BOLD}
          variant={TYPOGRAPHY.H5}
          display={DISPLAY.FLEX}
          boxProps={{ marginTop: 0, marginBottom: 0 }}
        >
          {t('contractTitle')}
        </Typography>
        <Typography
          variant={TYPOGRAPHY.H7}
          display={DISPLAY.FLEX}
          color={COLORS.TEXT_ALTERNATIVE}
          boxProps={{ marginTop: 2, marginBottom: 0 }}
        >
          {t('contractDescription')}
        </Typography>
        <Typography
          variant={TYPOGRAPHY.H6}
          display={DISPLAY.FLEX}
          marginTop={4}
          marginBottom={2}
        >
          {contractTitle}
        </Typography>
        <Box
          display={DISPLAY.FLEX}
          borderRadius={SIZES.SM}
          borderStyle={BORDER_STYLE.SOLID}
          borderColor={COLORS.BORDER_DEFAULT}
          className="contract-details-modal__content__contract"
        >
          <Identicon
            className="contract-details-modal__content__contract__identicon"
            diameter={24}
            address={tokenAddress}
          />
          <Box data-testid="recipient">
            <Typography
              fontWeight={FONT_WEIGHT.BOLD}
              variant={TYPOGRAPHY.H5}
              marginTop={4}
            >
              {tokenSymbol || ellipsify(tokenAddress)}
            </Typography>
            {tokenSymbol && (
              <Typography
                variant={TYPOGRAPHY.H6}
                display={DISPLAY.FLEX}
                color={COLORS.TEXT_ALTERNATIVE}
                marginTop={0}
                marginBottom={4}
              >
                {ellipsify(tokenAddress)}
              </Typography>
            )}
          </Box>
          <Box
            justifyContent={JUSTIFY_CONTENT.FLEX_END}
            className="contract-details-modal__content__contract__buttons"
          >
            <Box marginTop={4} marginRight={5}>
              <Tooltip position="top" title={copied || t('copyToClipboard')}>
                <Button
                  className="contract-details-modal__content__contract__buttons__copy"
                  type="link"
                  onClick={() => {
                    handleCopy(tokenAddress);
                  }}
                >
                  <IconCopy color="var(--color-icon-muted)" />
                </Button>
              </Tooltip>
            </Box>
            <Box marginTop={5} marginRight={5}>
              <Tooltip position="top" title={t('openInBlockExplorer')}>
                <Button
                  className="contract-details-modal__content__contract__buttons__block-explorer"
                  type="link"
                  onClick={() => {
                    const blockExplorerTokenLink = getAccountLink(
                      tokenAddress,
                      chainId,
                      {
                        blockExplorerUrl: rpcPrefs?.blockExplorerUrl ?? null,
                      },
                      null,
                    );
                    global.platform.openTab({
                      url: blockExplorerTokenLink,
                    });
                  }}
                >
                  <IconBlockExplorer
                    size={16}
                    color="var(--color-icon-muted)"
                  />
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        <Typography
          variant={TYPOGRAPHY.H6}
          display={DISPLAY.FLEX}
          marginTop={4}
          marginBottom={2}
        >
          {contractRequesting}
        </Typography>
        <Box
          display={DISPLAY.FLEX}
          borderRadius={SIZES.SM}
          borderStyle={BORDER_STYLE.SOLID}
          borderColor={COLORS.BORDER_DEFAULT}
          className="contract-details-modal__content__contract"
        >
          <Identicon
            className="contract-details-modal__content__contract__identicon"
            diameter={24}
            address={toAddress}
          />
          <Box data-testid="recipient">
            <Typography
              fontWeight={FONT_WEIGHT.BOLD}
              variant={TYPOGRAPHY.H5}
              marginTop={4}
            >
              {tokenList[toAddress.toLowerCase()]?.symbol ||
                ellipsify(toAddress)}
            </Typography>
            {tokenList[toAddress.toLowerCase()]?.symbol && (
              <Typography
                variant={TYPOGRAPHY.H6}
                display={DISPLAY.FLEX}
                color={COLORS.TEXT_ALTERNATIVE}
                marginTop={0}
                marginBottom={4}
              >
                {ellipsify(toAddress)}
              </Typography>
            )}
          </Box>
          <Box
            justifyContent={JUSTIFY_CONTENT.FLEX_END}
            className="contract-details-modal__content__contract__buttons"
          >
            <Box marginTop={4} marginRight={5}>
              <Tooltip position="top" title={copied || t('copyToClipboard')}>
                <Button
                  className="contract-details-modal__content__contract__buttons__copy"
                  type="link"
                  onClick={() => {
                    handleCopy(toAddress);
                  }}
                >
                  <IconCopy color="var(--color-icon-muted)" />
                </Button>
              </Tooltip>
            </Box>
            <Box marginTop={5} marginRight={5}>
              <Tooltip position="top" title={t('openInBlockExplorer')}>
                <Button
                  className="contract-details-modal__content__contract__buttons__block-explorer"
                  type="link"
                  onClick={() => {
                    const blockExplorerToAddress = getAccountLink(
                      toAddress,
                      chainId,
                      {
                        blockExplorerUrl: rpcPrefs?.blockExplorerUrl ?? null,
                      },
                      null,
                    );
                    global.platform.openTab({
                      url: blockExplorerToAddress,
                    });
                  }}
                >
                  <IconBlockExplorer
                    size={16}
                    color="var(--color-icon-muted)"
                  />
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        display={DISPLAY.FLEX}
        paddingTop={6}
        paddingRight={4}
        paddingBottom={6}
        paddingLeft={4}
      >
        <Button
          type="primary"
          onClick={() => {
            onClose();
          }}
        >
          {t('gotItModal')}
        </Button>
      </Box>
    </Popover>
  );
}

ContractDetailsModal.propTypes = {
  onClose: PropTypes.func,
  tokenSymbol: PropTypes.string,
  tokenAddress: PropTypes.string,
  toAddress: PropTypes.string,
  chainId: PropTypes.string,
  rpcPrefs: PropTypes.object,
  isSetApproveForAll: PropTypes.bool,
};
