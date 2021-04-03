module.exports = {
	testMatch: [ "<rootDir>/integ/**/*.spec.ts?(x)" ],
	testPathIgnorePatterns: ['/node_modules/', 'dist'], // 
	setupFilesAfterEnv: ['<rootDir>/config/jest.setup.ts'],
	transform: {
		"^.+\\.ts?$": "babel-jest"
	},
	globalSetup: '<rootDir>/config/jest.global-setup.ts',
	globalTeardown: '<rootDir>/config/jest_teardown.ts',
  testEnvironment: '<rootDir>/config/puppeteer_environment.ts',
};