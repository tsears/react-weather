import * as format from './format'

describe('utils/format', () => {
  describe('date', () => {
    it('formats a date as a short us-based date/time string', () => {
      // 11/21/23 5:41 PM Pacific Standard
      // weird division by 1000 is because the weather api accessed by the
      // application has the timestamp precision reduced by a factor of 1000
      const randomDate = 1700617274438 / 1000

      const formattedDate = format.date(randomDate)

      expect(formattedDate).toBe('11/21/23, 5:41 PM')
    })
  })

  describe('asPercentage', () => {
    it('converts the provided number to a string percentage representation', () => {
      const decimalPercentage = 0.7

      const percentage = format.asPercentage(decimalPercentage)

      expect(percentage).toBe('70%')
    })
  })

  describe('capitalizeEveryWord', () => {
    it('capitalizes every word in a string', () => {
      const input = 'this is a test string'

      const converted = format.capitalizeEveryWord(input)

      expect(converted).toBe('This Is A Test String')
    })
  })

  describe('windData', () => {
    it('returns "No Wind" when wind speed is zero', () => {
      const windString = format.windData(0, '', 0)

      expect(windString).toBe('No Wind')
    })

    it('returns speed and direction without gust information if gust speed is 0', () => {
      const windString = format.windData(5, 'N', 0)

      expect(windString).toBe('5 mph N')
    })

    it('returns speed including gust information if gust info is available', () => {
      const windString = format.windData(5, 'N', 8)

      expect(windString).toBe('5 mph N, gusting to 8 mph')
    })

    it('rounds wind and gust speeds', () => {
      const windString = format.windData(5.3, 'ENE', 10.4)

      expect(windString).toBe('5 mph ENE, gusting to 10 mph')
    })
  })
})
