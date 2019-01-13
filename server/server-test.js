let server = require('./server.js')
const chai = require("chai");
const chaiHTTP = require("chai-http");
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
chai.use(chaiHTTP);

describe('Data endpoints', () => {
  describe('/data/lat', () => {
    it('get a response with data', () => {
      chai.request(server)
      .get('/me/data?userID=1')
      .end((err,res) => {
        res.should.have.status(200)
        res.body.should.be.an('array')
      })
    })
    it('should not return data for an invalid ID', () => {
      chai.request(server)
      .get('/me/data?userID=NOTAUSER')
      .end((err,res) => {
        res.body.should.be.an('array');
        res.body.should.have.length(0);
        res.status.should.be(200)
      })
    })
  })
})

