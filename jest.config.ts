import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.jsx?$': [
      'babel-jest',
      {
        presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!(axios)/)'],
};

export default config;
