module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json"],
  moduleDirectories: ["node_modules", "src"],
  testMatch: ["**/tests/**/*.test.ts"],
  coveragePathIgnorePatterns: ["/node_modules/"],
};
