const { nameNormalizator } = require('../utils');

const nameNormalizatorData = [
    { input: 'John Doe', output: 'John Doe' },
    { input: 'John@Doe', output: 'John Doe' },
    { input: 'John-Doe', output: 'John Doe' },
    { input: 'john doe', output: 'John Doe' },
    { input: '   John Doe   ', output: 'John Doe' },
    { input: 'JOHN DOÈ', output: 'John Doe' },
    { input: 'John        .Doé.', output: 'John Doe' },
    { input: undefined, output: '' },
    { input: null, output: '' },
    { input: '', output: '' },
    { input: 'irinagol@gmail.com', output: 'Irinagol Gmail Com' },
    { input: '+3809566644', output: '3809566644' },
];

describe('Test util.js', () => {
    test('Should return normalizer name', () => {
        nameNormalizatorData.forEach((testObject) => {
            const name = nameNormalizator(testObject.input);

            expect(name).toBe(testObject.output);
        });
    });
});
