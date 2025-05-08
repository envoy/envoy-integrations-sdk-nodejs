import axios, { AxiosError } from 'axios';
import { createAxiosClient } from '../../src/util/axiosConstructor';

describe('axios', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });

  it('should be defined', () => {
    expect(createAxiosClient).toBeDefined();
  });

  it('default client leaks credentials in AxiosError', async () => {
    const client = axios.create({
      headers: {
        Authorization: 'Bearer 1234',
      },
      proxy: {
        host: 'localhost',
        port: 80,
        auth: {
          username: 'myWhackyUsername',
          password: 'myWhackyPassword',
        },
      },
    });
    try {
      await client.get('http://localhost:3000/axios-error');
    } catch (error) {
      expect(error.config).toBeDefined();
      const errorStr = JSON.stringify(error);
      expect(errorStr).toContain('Bearer 1234');
      expect(errorStr).toContain('myWhackyUsername');
      expect(errorStr).toContain('myWhackyPassword');
    }
  });

  it('sanitizes AxiosError response', async () => {
    const client = createAxiosClient({
      headers: {
        Authorization: 'Bearer 1234',
      },
      proxy: {
        host: 'localhost',
        port: 80,
        auth: {
          username: 'myWhackyUsername',
          password: 'myWhackyPassword',
        },
      },
    });
    try {
      await client.get('http://localhost:3000/axios-error');
    } catch (error) {
      expect(error).toBeInstanceOf(AxiosError);
      expect(error.message).toBe('connect ECONNREFUSED 127.0.0.1:80');
      expect(error.code).toBe('ECONNREFUSED');
      expect(error.stack).toBeDefined();
      expect(error.config.url).toBe('http://localhost:3000/axios-error');

      const errorStr = JSON.stringify(error);
      expect(errorStr).not.toContain('Bearer 1234');
      expect(errorStr).not.toContain('myWhackyUsername');
      expect(errorStr).not.toContain('myWhackyPassword');
    }
  });
});
