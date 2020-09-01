module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coverageReporters: [
    [
      "clover",
      {
        "file": "coverage.xml"
      }
    ]
  ],
  coverageDirectory: "../../../test-reports/aws-api-client-core",
  reporters: [
    [
      "jest-junit",
      {
        outputDirectory: "../../../test-reports/aws-api-client-core",
        outputName: "test-results.xml"
      }
    ]
  ]
};