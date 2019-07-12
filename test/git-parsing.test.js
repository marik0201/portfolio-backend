const gitParser = require('../services/git-parsing');

describe('parser-default-test', () => {
  it('should exist', () => {
    expect(typeof gitParser).toBe('function');
  });

  it('return error if empty user', () => {
    expect(gitParser()).resolves.toThrow('empty user');
  });

  it('return array with projects, check for array', () => {
    const user = 'mark-likhtar';
    expect(gitParser(user)).resolves.toBeInstanceOf(Array);
  });
});
