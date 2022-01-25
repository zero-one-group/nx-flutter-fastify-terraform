import { migrationCli } from './migration-cli';

describe('migrationCli', () => {
  it('should work', () => {
    expect(migrationCli()).toEqual('migration-cli');
  });
});
