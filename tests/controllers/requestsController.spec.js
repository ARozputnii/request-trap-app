import mongoose from 'mongoose'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../app.js'
import factory from '../factories/requests.js'

const should = chai.should()
const expect = chai.expect

chai.use(chaiHttp)

describe('Requests', function () {
  after(function () {
    server.close()
    mongoose.connection.close()
  })

  let request

  const buildRequest = async () => {
    request = await factory.build('Request')
  }
  const createRequest = async () => {
    request = await factory.create('Request')
  }
  const removeRequest = async () => {
    await request.remove()
  }

  describe('/GET Index', function () {
    it('it should GET all requests as text/htm', function (done) {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200)
          res.headers['content-type'].should.be.eql('text/html; charset=utf-8')
          done()
        })
    })
  })

  describe('/GET Show', function () {
    describe('when success', function () {
      beforeEach(async function () {
        await createRequest()
      })

      afterEach(async function () {
        await removeRequest()
      })

      it('it should GET one request as text/htm', function (done) {
        const requestID = request._id
        chai.request(server)
          .get(`/${requestID}/requests`)
          .end((err, res) => {
            res.should.have.status(200)
            res.headers['content-type'].should.be.eql('text/html; charset=utf-8')
            done()
          })
      })
    })
  })

  describe('Create', function () {
    beforeEach(async function () {
      await buildRequest()
    })

    afterEach(async function () {
      await removeRequest()
    })

    describe('/POST Create', function () {
      describe('when success', function () {
        it('it should create one request', function (done) {
          chai.request(server)
            .post(`/${request.query_params}`)
            .end((err, res) => {
              res.should.have.status(201)
              res.body.should.be.a('object')
              res.body.query_params.should.be.eql(request.query_params)
              done()
            })
        })
      })

      describe('when errors', function () {
        describe('when empty params or query', function () {
          it('it should create one request', function (done) {
            request.request_date = null

            chai.request(server)
              .post('/')
              .end((err, res) => {
                res.should.have.status(404)
                done()
              })
          })
        })
      })
    })

    describe('/PUT Create', function () {
      describe('when success', function () {
        it('it should create one request', function (done) {
          chai.request(server)
            .put(`/${request.query_params}`)
            .end((err, res) => {
              res.should.have.status(201)
              res.body.should.be.a('object')
              res.body.query_params.should.be.eql(request.query_params)
              done()
            })
        })
      })
    })

    describe('/PATCH Create', function () {
      describe('when success', function () {
        it('it should create one request', function (done) {
          chai.request(server)
            .patch(`/${request.query_params}`)
            .end((err, res) => {
              res.should.have.status(201)
              res.body.should.be.a('object')
              res.body.query_params.should.be.eql(request.query_params)
              done()
            })
        })
      })
    })

    describe('/DELETE Create', function () {
      describe('when success', function () {
        it('it should create one request', function (done) {
          chai.request(server)
            .delete(`/${request.query_params}`)
            .end((err, res) => {
              res.should.have.status(201)
              res.body.should.be.a('object')
              res.body.query_params.should.be.eql(request.query_params)
              done()
            })
        })
      })
    })
  })
})
