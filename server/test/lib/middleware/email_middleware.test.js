const { checkEmailInHeader } = require('./../../../lib/middleware/email_middleware')
const sinon = require('sinon')

describe('Email middleware tests', () => {
  let validRequestHeaders
  let nextFn
  let nextSpy
  let sandbox
  before(() => {
    nextFn = () => {
      return true
    }
    const headers = {}
    headers['x-user'] = '1@1.com'
    validRequestHeaders = { headers: headers }
    sandbox = sinon.createSandbox()
  })
  beforeEach(() => {
    nextSpy = sandbox.spy(nextFn)
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('Should fail if there is no x-user header in the request', async () => {
    sinon.assert.callCount(nextSpy, 0)
  })
  it('Should fail if an invalid email is given in the x-user header in the request', async () => {
    const invalidHeaders = {}
    invalidHeaders['x-user'] = '1@1.com'
    await checkEmailInHeader({ headers: invalidHeaders }, {}, nextFn)
    sinon.assert.callCount(nextSpy, 0)
  })
  it('Should pass in a sunny day scenario', async () => {
    await checkEmailInHeader(validRequestHeaders, {}, nextSpy)
    sinon.assert.callCount(nextSpy, 1)
  })
})
