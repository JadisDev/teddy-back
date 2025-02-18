module.exports = {
    collectCoverage: true,
    coverageDirectory: './coverage',
    coveragePathIgnorePatterns: [
      '/src/main.ts',
      '/src/modules/.*module\\.ts$',
      '/src/strategy/.*strategy\\.ts$',
      '/src/dto/.*dto\\.ts$',
    ],
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    testEnvironment: 'node',
    transformIgnorePatterns: [
      'node_modules/(?!.*\\.ts$)',
    ],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    preset: 'ts-jest',
};
  