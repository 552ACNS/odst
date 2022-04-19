import { jsonTypeConverter } from './jwt';

describe('the jsonTypeConverter', () => {
  const arrOne = ['one', 'two', 'three'];
  const arrTwo = ['one', 'two', 'three'];
  const expected = [
    {
      value: 'one',
      questionId: 'one',
    },
    {
      value: 'two',
      questionId: 'two',
    },
    {
      value: 'three',
      questionId: 'three',
    },
  ];

  it('should return the correct result', () => {
    const actual = jsonTypeConverter(arrOne, arrTwo);

    expect(actual).toStrictEqual(expected);
  });
});
