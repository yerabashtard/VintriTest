const { AxiosError } = require('axios')
const dataRequests = require('./../../lib/data_requests')
const { Database } = require('./../../lib/database')
const { expect } = require('chai')
const nock = require('nock')
const sinon = require('sinon')

/**
 * Convenience function for detecting errors returned by Promises
 */
const expectAsyncThrow = async (promise, error, log) => {
  try {
    await promise
    expect(null).to.be.an.instanceof(error)
  } catch (err) {
    if (log) {
      console.log(err)
    }
    expect(err).to.be.an.instanceof(error)
  }
}

describe('getBeers tests', () => {
  const BEER_NAME = 'Berliner'
  let sandbox
  let databaseStub
  let getBeersScope
  before(() => {
    sandbox = sinon.createSandbox()
  })
  beforeEach(() => {
    getBeersScope = nock('https://api.punkapi.com')
    databaseStub = sandbox.stub(Database, 'insert').returns()
  })
  afterEach(() => {
    nock.cleanAll()
    sandbox.restore()
  })
  it('Should throw an error on a 404 response', async () => {
    getBeersScope
      .get('/v2/beers')
      .query({ beer_name: BEER_NAME })
      .reply(404)
    await expectAsyncThrow(dataRequests.getBeers(BEER_NAME), AxiosError)
  })
  it('Should throw an error on a 400 response', async () => {
    getBeersScope
      .get('/v2/beers')
      .query({ beer_name: BEER_NAME })
      .reply(400)
    await expectAsyncThrow(dataRequests.getBeers(BEER_NAME), AxiosError)
  })
  it('Should return a payload under sunny conditions', async () => {
    getBeersScope
      .get('/v2/beers')
      .query({ beer_name: BEER_NAME })
      .reply(200, FAKE_GET_BEER_RESPONSE)
    const result = await dataRequests.getBeers(BEER_NAME)
    sinon.assert.callCount(databaseStub, 2)
    expect(result.length).to.equal(3)
    expect(getBeersScope.isDone()).to.equal(true)
  })
})

const FAKE_GET_BEER_RESPONSE = [
  {
    id: 3,
    name: 'Berliner Weisse With Yuzu - B-Sides',
    tagline: 'Japanese Citrus Berliner Weisse.',
    first_brewed: '11/2015',
    description: 'Japanese citrus fruit intensifies the sour nature of this German classic.',
    image_url: 'https://images.punkapi.com/v2/keg.png',
    abv: 4.2,
    ibu: 8,
    target_fg: 1007,
    target_og: 1040,
    ebc: 8,
    srm: 4,
    ph: 3.2,
    attenuation_level: 83,
    volume: {
      value: 20,
      unit: 'litres'
    },
    boil_volume: {
      value: 25,
      unit: 'litres'
    },
    method: {
      mash_temp: [
        {
          temp: {
            value: 60,
            unit: 'celsius'
          },
          duration: 10
        },
        {
          temp: {
            value: 65,
            unit: 'celsius'
          },
          duration: 30
        },
        {
          temp: {
            value: 72,
            unit: 'celsius'
          },
          duration: 10
        },
        {
          temp: {
            value: 78,
            unit: 'celsius'
          },
          duration: 5
        }
      ],
      fermentation: {
        temp: {
          value: 21,
          unit: 'celsius'
        }
      },
      twist: 'Soured naturally using the kettle souring technique, Yuzu fruit: 50g at middle, Yuzu juice: 200ml at FV'
    },
    ingredients: {
      malt: [
        {
          name: 'Propino Pale Malt',
          amount: {
            value: 1.63,
            unit: 'kilograms'
          }
        },
        {
          name: 'Wheat Malt',
          amount: {
            value: 1.63,
            unit: 'kilograms'
          }
        },
        {
          name: 'Propino Pale Malt for kettle souring',
          amount: {
            value: 0.03,
            unit: 'kilograms'
          }
        },
        {
          name: 'Acidulated Malt for kettle souring',
          amount: {
            value: 0.03,
            unit: 'kilograms'
          }
        }
      ],
      hops: [
        {
          name: 'Bramling Cross',
          amount: {
            value: 10,
            unit: 'grams'
          },
          add: 'middle',
          attribute: 'bitter'
        }
      ],
      yeast: 'Wyeast 1056 - American Ale???'
    },
    food_pairing: [
      'Smoked chicken wings',
      'Miso ramen',
      'Yuzu cheesecake'
    ],
    brewers_tips: 'Clean everything twice. All you want is the clean sourness of lactobacillus.',
    contributed_by: 'Sam Mason <samjbmason>'
  },
  {
    id: 35,
    name: 'Berliner Weisse With Raspberries And Rhubarb - B-Sides',
    tagline: 'Fruity Berliner Weisse.',
    first_brewed: '11/2015',
    description: 'Tart, dry and acidic with a punch of summer berry as rhubarb crumble.',
    image_url: 'https://images.punkapi.com/v2/keg.png',
    abv: 3.6,
    ibu: 8,
    target_fg: 1007,
    target_og: 1040,
    ebc: null,
    srm: null,
    ph: 3.2,
    attenuation_level: 83,
    volume: {
      value: 20,
      unit: 'litres'
    },
    boil_volume: {
      value: 25,
      unit: 'litres'
    },
    method: {
      mash_temp: [
        {
          temp: {
            value: 60,
            unit: 'celsius'
          },
          duration: 10
        },
        {
          temp: {
            value: 65,
            unit: 'celsius'
          },
          duration: 30
        },
        {
          temp: {
            value: 72,
            unit: 'celsius'
          },
          duration: 10
        },
        {
          temp: {
            value: 78,
            unit: 'celsius'
          },
          duration: 5
        }
      ],
      fermentation: {
        temp: {
          value: 21,
          unit: 'celsius'
        }
      },
      twist: 'Raspberries in the boil, rhubarb at maturation. Soured naturally using the kettle souring technique, Raspberries at middle'
    },
    ingredients: {
      malt: [
        {
          name: 'Propino Pale Malt',
          amount: {
            value: 1.63,
            unit: 'kilograms'
          }
        },
        {
          name: 'Wheat Malt',
          amount: {
            value: 1.63,
            unit: 'kilograms'
          }
        },
        {
          name: 'Propino Pale Malt for kettle souring',
          amount: {
            value: 0.03,
            unit: 'kilograms'
          }
        },
        {
          name: 'Acidulated Malt for kettle souring',
          amount: {
            value: 0.03,
            unit: 'kilograms'
          }
        }
      ],
      hops: [
        {
          name: 'Bramling Cross',
          amount: {
            value: 10,
            unit: 'grams'
          },
          add: 'middle',
          attribute: 'bitter'
        }
      ],
      yeast: 'Wyeast 1056 - American Ale???'
    },
    food_pairing: [
      'Grilled salmon',
      'Mac and cheese fries',
      'Cheesecake with raspberry coulis'
    ],
    brewers_tips: 'Fruits added at the end of the boil for 10 mins and additional added in maturation. Boil for no more than 15 mins.',
    contributed_by: 'Sam Mason <samjbmason>'
  },
  {
    id: 193,
    name: 'Blitz Berliner Weisse',
    tagline: 'Berliner Fruit Beer.',
    first_brewed: '07/2013',
    description: 'Our sour recipe for all fruit Blitz beers uses a process called kettle souring. In this we steep a bag of malt in the wort to allow the bacteria to grow in it.',
    image_url: 'https://images.punkapi.com/v2/keg.png',
    abv: 3,
    ibu: 8,
    target_fg: 1040,
    target_og: 1007,
    ebc: 9,
    srm: 4.5,
    ph: 3.2,
    attenuation_level: 82.5,
    volume: {
      value: 20,
      unit: 'litres'
    },
    boil_volume: {
      value: 25,
      unit: 'litres'
    },
    method: {
      mash_temp: [
        {
          temp: {
            value: 65,
            unit: 'celsius'
          },
          duration: 60
        }
      ],
      fermentation: {
        temp: {
          value: 19,
          unit: 'celsius'
        }
      },
      twist: 'Before main fermentation steep a bag of malt in the wort for 48 hours. Re boil the wort before pitching in the yeast for the main fermentation.'
    },
    ingredients: {
      malt: [
        {
          name: 'Extra Pale',
          amount: {
            value: 1.88,
            unit: 'kilograms'
          }
        },
        {
          name: 'Wheat',
          amount: {
            value: 1.88,
            unit: 'kilograms'
          }
        }
      ],
      hops: [
        {
          name: 'Magnum',
          amount: {
            value: 8.5,
            unit: 'grams'
          },
          add: 'start',
          attribute: 'bitter'
        }
      ],
      yeast: 'Wyeast 1056 - American Ale???'
    },
    food_pairing: [
      'Grilled salmon with a light lemon sauce',
      'Lobster bisque',
      'Cheesecake with raspberry (or peach/passion fruit) sauce'
    ],
    brewers_tips: 'Making sour beers is an art, and is mostly related to trial and error with your process. Experiment with different temperatures for steeping the grain. 40 - 50??C willallow the lacto to grow and produce a clean profile.',
    contributed_by: 'Ali Skinner <AliSkinner>'
  }
]
