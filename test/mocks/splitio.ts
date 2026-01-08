export const SplitFactory = jest.fn(() => {
  return {
    client: jest.fn(() => {
      return {
        destroy: jest.fn().mockResolvedValue(undefined),
        on: jest.fn(),
        getTreatment: jest.fn().mockReturnValue('off'),
      };
    }),
  };
});
