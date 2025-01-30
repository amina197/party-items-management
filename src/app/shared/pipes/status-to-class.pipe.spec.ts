import { StatusToClassPipe } from './status-to-class.pipe';

describe('StatusToClassPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusToClassPipe();
    expect(pipe).toBeTruthy();
  });
});
