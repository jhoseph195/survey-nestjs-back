import { SessionValidatorGuard } from './session-validator.guard';

describe('SessionValidatorGuard', () => {
  it('should be defined', () => {
    expect(new SessionValidatorGuard()).toBeDefined();
  });
});
