describe('timers', () => {
  it('should work before calling resetAllMocks', () => {
    const f = jest.fn();
    jest.useFakeTimers();
    setImmediate(() => f());
    jest.runAllImmediates();
    expect(f.mock.calls.length).toBe(1);
  });
});
