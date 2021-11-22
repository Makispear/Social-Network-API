const { format_date } = require('../utils/formatter')

test('format_date() return date with xx/xx/xxxx format', () => {
    const date1 = new Date('2020-03-20 16:12:03');
    const date2 = new Date('2020-03-1 16:12:03');
    const date3 = new Date('2020-03-2 16:12:03');
    const date4 = new Date('2020-03-3 16:12:03');
    const date5 = new Date('2020-03-21 16:12:03');

    expect(format_date(date1)).toBe('Mar 20th, 2020 at 4:12 pm');
    expect(format_date(date2)).toBe('Mar 1st, 2020 at 4:12 pm');
    expect(format_date(date3)).toBe('Mar 2nd, 2020 at 4:12 pm');
    expect(format_date(date4)).toBe('Mar 3rd, 2020 at 4:12 pm');
    expect(format_date(date5)).toBe('Mar 21st, 2020 at 4:12 pm');
})