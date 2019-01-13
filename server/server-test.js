let server = require('./server.js')
const chai = require("chai");
const chaiHTTP = require("chai-http");
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
chai.use(chaiHTTP);

describe('Data endpoints', () => {
  describe('/data/lat', () => {
    it('get a response', () => {
      chai.request(server)
      .get('/data/lat')
      .end((err,res) => {
        res.should.have.status(200)
      })
    })
  })
})

