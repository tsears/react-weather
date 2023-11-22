import * as convert from './convert'

describe('utils/convert', () => {
  describe('metersToMiles', () => {
    it('returns a distance given in meters as miles', () => {
      // we're going to do some rounding shenanigans to limit the precision,
      // no need to get in to floating point nonsense
      const miles =
        Math.round(convert.metersToMiles(1500) * 10000) / 10000

      // actual value, 0.932056i799999....
      expect(miles).toBe(0.9321)
    })
  })

  describe('mmToIn', () => {
    it('returns a distance given in millimeters as inches', () => {
      // we're going to do some rounding shenanigans to limit the precision,
      // no need to get in to floating point nonsense
      const inches =
        Math.round(convert.mmToIn(150) * 10000) / 10000

      // actual value, 5.905512
      expect(inches).toBe(5.9055)
    })
  })

  describe('hPaToinHg', () => {
    it('returns a pressure given in hectopascals as inches-mercury', () => {
      // we're going to do some rounding shenanigans to limit the precision,
      // no need to get in to floating point nonsense
      const inHg =
        Math.round(convert.hPaToinHg(1013.25) * 10000) / 10000

      // actual value, 29.9212725
      expect(inHg).toBe(29.9213)
    })
  })

  describe('apiToFriendlyKeys', () => {
    // no reason to test all of these...
    it('returns a mapped value if present', () => {
      const mappedKey = convert.apiToFriendlyKeys('temp')

      expect(mappedKey).toBe('Temperature')
    })

    it('returns the passed key if a mapping does not exist', () => {
      const mappedKey = convert.apiToFriendlyKeys('someNonsense')

      expect(mappedKey).toBe('someNonsense')
    })
  })

  describe('conditionCodeToIconClass', () => {
    it('returns a class name based on a condition code', () => {
      const cssClass = convert.conditionCodeToIconClass('200')

      expect(cssClass).toBe('owf-200')
    })
  })
})
