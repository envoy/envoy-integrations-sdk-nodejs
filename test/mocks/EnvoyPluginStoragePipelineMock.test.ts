import EnvoyPluginStoragePipelineMock from '../../src/mocks/EnvoyPluginStoragePipelineMock';
import EnvoyPluginAPI from '../../src/sdk/EnvoyPluginAPI';

// execute() is overridden in the mock and never touches the API, so a bare stub is enough.
const fakeApi = {} as EnvoyPluginAPI;
const pipeline = () => new EnvoyPluginStoragePipelineMock(fakeApi, 'install-1');

describe('EnvoyPluginStoragePipelineMock setIfAbsent', () => {
  beforeEach(() => EnvoyPluginStoragePipelineMock.reset());

  it('writes and returns the item when the key is absent (claim won)', async () => {
    const result = await pipeline().setIfAbsent('lock:a', { at: 1 }).executeSingle();
    expect(result).toEqual({ key: 'lock:a', value: { at: 1 } });
  });

  it('returns null when the key already exists (claim lost)', async () => {
    await pipeline().setIfAbsent('lock:a', { at: 1 }).executeSingle();
    const second = await pipeline().setIfAbsent('lock:a', { at: 2 }).executeSingle();
    expect(second).toBeNull();
  });

  it('does not overwrite the existing value on a lost claim', async () => {
    await pipeline().setIfAbsent('lock:a', { at: 1 }).executeSingle();
    await pipeline().setIfAbsent('lock:a', { at: 2 }).executeSingle();
    const current = await pipeline().get('lock:a').executeSingle();
    expect(current).toEqual({ key: 'lock:a', value: { at: 1 } });
  });

  it('lets the key be reclaimed after it is unset (lock release)', async () => {
    await pipeline().setIfAbsent('lock:a', { at: 1 }).executeSingle();
    await pipeline().unset('lock:a').executeSingle();
    const reclaim = await pipeline().setIfAbsent('lock:a', { at: 3 }).executeSingle();
    expect(reclaim).toEqual({ key: 'lock:a', value: { at: 3 } });
  });
});
