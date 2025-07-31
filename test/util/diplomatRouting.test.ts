import { isPluginSupported } from '../../src/util/diplomatRouting';

describe('diplomatRouting', () => {
  describe('isPluginSupported', () => {
    it('returns false when no plugins loaded', () => {
      expect(isPluginSupported('any-plugin')).toBe(false);
    });
  });
});