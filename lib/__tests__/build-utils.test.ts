import { getVersionFromArtifact, getModuleIdFromArtifact, getCommitIdFromArtifact } from '../build-utils';

describe('build-utils', () => {
  test('getVersionFromArtifact returns correct version', () => {
    expect(getVersionFromArtifact('EssentialsX-2.20.1.jar')).toBe('2.20.1');
    expect(
      getVersionFromArtifact('EssentialsX-2.20.1-dev+123-abcdef.jar')
    ).toBe('2.20.1-dev+123-abcdef');
    expect(
      getVersionFromArtifact('EssentialsXChat-2.19.0-beta+5.jar')
    ).toBe('2.19.0-beta+5');
    expect(getVersionFromArtifact('EssentialsX.jar')).toBeUndefined();
  });

  test('getModuleIdFromArtifact parses module id', () => {
    expect(getModuleIdFromArtifact('EssentialsX-2.19.0.jar')).toBe('core');
    expect(getModuleIdFromArtifact('EssentialsXSpawn-2.19.0.jar')).toBe('spawn');
    expect(getModuleIdFromArtifact('EssentialsXProtect-2.19.0.jar')).toBe('protect');
    expect(getModuleIdFromArtifact('RandomPlugin-1.0.jar')).toBe('core');
  });

  test('getCommitIdFromArtifact extracts commit id', () => {
    expect(
      getCommitIdFromArtifact('EssentialsX-2.19.0-dev+12-abcdef.jar')
    ).toBe('abcdef');
    expect(
      getCommitIdFromArtifact('EssentialsXChat-2.19.0-rc+3-1234567.jar')
    ).toBe('1234567');
    expect(getCommitIdFromArtifact('EssentialsX-2.19.0.jar')).toBeUndefined();
  });
});
