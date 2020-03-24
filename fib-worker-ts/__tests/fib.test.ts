import { fib } from '../src/utils';

describe('Fibonocci function tests', () => {
    test('Should return 1 for index less than 2', () => {
        expect(fib(1)).toBe(1);
    });

    test('Should return 1 for index less than 2', () => {
        expect(fib(0)).toBe(1);
    });

    test('Should return 1 for index less than 2', () => {
        expect(fib(-1)).toBe(1);
    });

    test('Should return 2 for index 2', () => {
        expect(fib(2)).toBe(2);
    });

    test('Should return 30 for index 32', () => {
        expect(fib(32)).toBe(3524578);
    });
});
