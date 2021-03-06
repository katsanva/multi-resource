const http = require('http');

const app = require('../examples/server');
const users = require('../examples/users');
const customer = require('../examples/customer');

const url =
  'http://localhost:3000/api/resources?users=api/users&customer=api/customers/23&countries=api/countries&foo=bla&dogs=https://dog.ceo/api/breed/african/images';

describe('e2e', () => {
  let server;

  beforeAll(done => {
    server = app(done);
  });

  afterAll(done => {
    server.close(done);
  });

  it('should respond with required data', done => {
    const expected = {
      users,
      customer,
      countries: {
        error: true,
        reason:
          "Invalid content-type. Expected 'application/json' but received ''",
      },
      foo: {
        error: true,
        reason: 'Request Failed. Status Code: 404',
      },
      dogs: {
        status: 'success',
        message: [
          'https://images.dog.ceo/breeds/african/n02116738_10024.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_10038.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_10081.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_10169.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_10215.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_10469.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_10476.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_10493.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_10575.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_10614.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_10640.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_10872.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_10895.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_1097.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_1105.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_1180.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_124.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_1398.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_1591.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_1627.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_1739.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_1815.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_1849.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_1927.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_1948.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2005.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2020.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_204.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2083.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2139.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_219.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2192.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2327.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2329.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_233.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2344.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2435.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_246.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2482.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2503.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2514.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2515.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2557.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2599.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2600.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2614.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2675.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2757.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2770.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2802.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_288.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_291.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2942.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_2988.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_3024.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_308.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_3160.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_328.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_3365.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_3422.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_3589.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_3635.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_3692.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_3720.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_3819.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_385.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4019.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4098.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4102.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4115.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4138.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_431.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4323.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4335.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4367.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4382.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4461.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4508.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4641.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4720.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4732.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4734.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4742.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4758.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4796.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4834.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_4991.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_500.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_5068.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_5241.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_5312.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_5338.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_5519.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_5635.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_5661.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_5683.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_5697.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_5932.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_5936.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_5953.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_5956.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_5993.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_6038.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_6044.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_607.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_6076.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_6092.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_6117.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_6283.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_6297.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_6330.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_634.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_6563.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_662.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_6746.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_6748.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_6754.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_678.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_6790.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_6813.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_684.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_7008.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_7026.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_7060.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_7105.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_7122.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_7170.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_7340.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_7506.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_7537.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_7578.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_7580.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_7590.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_7601.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_7657.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_7753.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_7988.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_8037.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_806.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_8095.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_8226.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_8341.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_8403.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_8489.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_849.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_8512.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_8579.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_8653.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_8662.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_8669.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_8696.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_8719.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_8734.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_8738.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_8749.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_8945.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_9164.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_9232.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_9282.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_9333.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_9603.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_9748.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_9762.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_9769.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_9798.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_9818.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_9829.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_9844.jpg',
          'https://images.dog.ceo/breeds/african/n02116738_9924.jpg',
        ],
      },
    };

    http.get(url, res => {
      expect(res.statusCode).toEqual(200);
      expect(res.headers['content-type']).toEqual(
        'application/json; charset=utf-8',
      );

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', chunk => {
        rawData += chunk;
      });

      res.on('end', () => {
        const parsedData = JSON.parse(rawData);

        expect(parsedData).toEqual(expected);

        done();
      });
    });
  });
});
