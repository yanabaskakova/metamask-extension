import { satisfies as satisfiesSemver } from 'semver';
import { SNAP_BLOCKLIST } from './snaps-blocklist';

/**
 * Checks if provided snaps are on the block list.
 *
 * @param snapsToCheck - An object containing snap ids and other information.
 * @returns An object structure containing snaps block information.
 */
async function checkSnapsBlockList(snapsToCheck) {
  return Object.entries(snapsToCheck).reduce((acc, [snapId, snapInfo]) => {
    const blockInfo = SNAP_BLOCKLIST.find(
      (blocked) =>
        (blocked.id === snapId &&
          satisfiesSemver(snapInfo.version, blocked.versionRange, {
            includePrerelease: true,
          })) ||
        (blocked.shasum ? blocked.shasum === snapInfo.shasum : false),
    );

    const cur = blockInfo
      ? {
          blocked: true,
          reason: blockInfo.reason,
          infoUrl: blockInfo.infoUrl,
        }
      : { blocked: false };
    return { ...acc, [snapId]: cur };
  }, {});
}

export { checkSnapsBlockList };
