'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  
  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    let result;

    try {
      result = {
        initNum: convertHandler.getNum(input),
        initUnit: convertHandler.getUnit(input)
      };
      result.returnNum = convertHandler.convert(result.initNum, result.initUnit);
      result.returnUnit = convertHandler.getReturnUnit(result.initUnit);
      result.string = convertHandler.getString(
        result.initNum, result.initUnit,
        result.returnNum, result.returnUnit
      );
    } catch (error) {
      result = error.message;
    }

    res.send(result);
  });
};
