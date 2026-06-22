import axios from 'axios';
import { resetDiplomatFallbackWarnCacheForTesting, getDiplomatClientInstall } from '../../src/util/diplomat';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const MS_PER_MINUTE = 60 * 1000;
const FALLBACK_MESSAGE = 'Diplomat server check failed - falling back to direct routing';

type LoggedEntry = { level: string; message: string; install_id?: string };

function parseLogged(spy: jest.SpyInstance): LoggedEntry[] {
  return spy.mock.calls
    .map((args) => {
      try {
        return JSON.parse(args[0] as string) as LoggedEntry;
      } catch {
        return null;
      }
    })
    .filter((entry): entry is LoggedEntry => entry !== null);
}

describe('getDiplomatClientInstall — fallback log behavior', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let dateNowSpy: jest.SpyInstance;
  let now: number;

  beforeEach(() => {
    process.env.DIPLOMAT_SERVER_URL = 'https://diplomat.example.com';
    process.env.DIPLOMAT_SERVER_AUTH_USERNAME = 'user';
    process.env.DIPLOMAT_SERVER_AUTH_PASSWORD = 'pass';

    resetDiplomatFallbackWarnCacheForTesting();

    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    now = 1_000_000_000_000;
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => now);

    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockRejectedValue(Object.assign(new Error('boom'), { isAxiosError: true, code: 'ECONNREFUSED' })),
    } as unknown as ReturnType<typeof axios.create>);
    (mockedAxios.isAxiosError as unknown as jest.Mock).mockImplementation(
      (err: unknown) => !!(err && (err as { isAxiosError?: boolean }).isAxiosError),
    );
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    dateNowSpy.mockRestore();
  });

  it('logs debug on every fallback and warns only once per installId within 5 minutes', async () => {
    await getDiplomatClientInstall('install-1');
    await getDiplomatClientInstall('install-1');
    await getDiplomatClientInstall('install-1');

    const debugs = parseLogged(consoleLogSpy).filter((e) => e.message === FALLBACK_MESSAGE && e.level === 'debug');
    const warns = parseLogged(consoleWarnSpy).filter((e) => e.message === FALLBACK_MESSAGE);
    expect(debugs).toHaveLength(3);
    expect(warns).toHaveLength(1);
    expect(warns[0].install_id).toBe('install-1');
  });

  it('warns again for the same installId after the 5-minute window', async () => {
    await getDiplomatClientInstall('install-1');
    let warns = parseLogged(consoleWarnSpy).filter((e) => e.message === FALLBACK_MESSAGE);
    expect(warns).toHaveLength(1);

    now += 4 * MS_PER_MINUTE + 59_000;
    await getDiplomatClientInstall('install-1');
    warns = parseLogged(consoleWarnSpy).filter((e) => e.message === FALLBACK_MESSAGE);
    expect(warns).toHaveLength(1);

    now += 2_000;
    await getDiplomatClientInstall('install-1');
    warns = parseLogged(consoleWarnSpy).filter((e) => e.message === FALLBACK_MESSAGE);
    expect(warns).toHaveLength(2);
  });

  it('warns independently per installId', async () => {
    await getDiplomatClientInstall('install-1');
    await getDiplomatClientInstall('install-2');
    await getDiplomatClientInstall('install-1');
    await getDiplomatClientInstall('install-2');

    const warns = parseLogged(consoleWarnSpy).filter((e) => e.message === FALLBACK_MESSAGE);
    expect(warns).toHaveLength(2);
    expect(warns.map((w) => w.install_id).sort()).toEqual(['install-1', 'install-2']);
  });
});
