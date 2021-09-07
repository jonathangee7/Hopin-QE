let request = require('supertest');
const assert = require('chai').assert

request = request('http://localhost:3001');

describe('GET /', function () {
    it('responds with 404', function (done) {
        request.get('/')
            .set('Accept', 'application/json')
            .expect(404, done);
    });
});

describe('POST /', function () {
    it('responds with json', function (done) {
        request.post('/')
            .send('Jonathan Gee')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    it('has valid size logic', function (done) {
        request.post('/')
            .send('Jonathan Gee')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(customerSizeIsCorrect)
            .end(function (err) {
                if (err) return done(err);
                return done();
            });

    });
    it('responds with correct name', function (done) {
        request.post('/')
            .send({ name: 'Mr. John Doe' })
            .set('Accept', 'application/json')
            .expect(200)
            .expect(function (res) {
                assert.equal(res.body.name, "Mr. John Doe");
            })
            .end(function (err) {
                if (err) return done(err);
                return done();
            });
    });
    it('responds with no name if no name provided', function (done) {
        request.post('/')
            .send()
            .set('Accept', 'application/json')
            .expect(200)
            .expect(function (res) {
                assert.notProperty(res.body, "name");
            })
            .end(function (err) {
                if (err) return done(err);
                return done();
            });
    });
    it('responds with plain/text', function (done) {
        request.post('/')
            .send('Jonathan Gee')
            .set('Accept', 'plain/text')
            .expect(200)
            .expect(function (res) {
                assert.notProperty(res.body, "name");
            })
            .end(function (err) {
                if (err) return done(err);
                return done();
            });
    });
});

function customerSizeIsCorrect(res) {
    for (customer of res.body.customers) {
        if (customer.employees <= 10) {
            assert.equal(customer.size, "Small", `${customer.name} has ${customer.employees} employees - size should be Small`)
        } else if (customer.employees <= 1000) {
            assert.equal(customer.size, "Medium", `${customer.name} has ${customer.employees} employees - size should be Medium`)
        } else {
            assert.equal(customer.size, "Big", `${customer.name} has ${customer.employees} employees - size should be Big`)
        }
    }
}
