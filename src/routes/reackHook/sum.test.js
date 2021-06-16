import sum from './sum';

describe('测试sum方法', () => {
    test('测试 1 +2 = 3', () => {
        expect(sum(1,2)).toBe(3)
    })
})
