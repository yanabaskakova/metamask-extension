import { satisfies as satisfiesSemver } from 'semver';

/**
 * Checks if provided snaps are on the block list.
 *
 * @param snapsToCheck - An object containing snap ids and other information.
 * @param blocklist - An object containing snap ids, version or shasum of the blocked snaps.
 * @returns An object structure containing snaps block information.
 */
async function checkSnapsBlockList(snapsToCheck, blocklist) {
  return Object.entries(snapsToCheck).reduce((acc, [snapId, snapInfo]) => {
    const blockInfo = blocklist.find(
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
