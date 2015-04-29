var request = require('supertest');

describe('GET /csrfToken', function() {
  it('should respond with json', function (done) {
    request(sails.hooks.http.app)
      .get('/csrfToken')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        console.log(res.body._csrf);
        done();
      });
  });
});

describe('login', function() {
  it('should login to the site', function (done) {
    request(sails.hooks.http.app)
      .post('/auth/local')
      .send({identifier: 'pat', password: 'patthecat' })
      .expect('location','/#/index')
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
