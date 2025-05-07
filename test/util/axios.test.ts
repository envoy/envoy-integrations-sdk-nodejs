import { createAxiosClient } from '../../src/util/axiosConstructor';

describe('axios', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });

  it('should be defined', () => {
    expect(createAxiosClient).toBeDefined();
  });
});
