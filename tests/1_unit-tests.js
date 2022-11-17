const { expect } = require('chai');
const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
    suite("Number Input Tests", function() {
        test("#wholeNumberInput", function() {
            assert.strictEqual(convertHandler.getNum("4gal"), 4);
            assert.strictEqual(convertHandler.getNum("123Kg"), 123);
        });
        test("#decimalNumberInput", function() {
            assert.strictEqual(convertHandler.getNum("4.5L"), 4.5);
            assert.strictEqual(convertHandler.getNum("0.1201lbs"), 0.1201);
        });
        test("#fractionInput", function() {
            assert.strictEqual(convertHandler.getNum("1/2mI"), 0.5);
            assert.strictEqual(convertHandler.getNum("2/3KM"), 2 / 3);
        });
        test("#decimalFractionInput", function() {
            assert.strictEqual(convertHandler.getNum("1.5/2gal"), 0.75);
            assert.strictEqual(convertHandler.getNum("2.5/1.25kg"), 2);
        });
        test("#incorrectFractionInput", function() {
            assert.throws(() => convertHandler.getNum("3/2/3L"), /invalid number/);
            assert.throws(() => convertHandler.getNum("0.1/0.2/0.3/0.4lbs"), /invalid number/);
        });
        test("#noNumericalInput", function() {
            assert.strictEqual(convertHandler.getNum("mi"), 1);
            assert.strictEqual(convertHandler.getNum("km"), 1);
        });
    });
    suite("Unit Input Tests", function() {
        test("#correctUnitInput", function() {
            assert.strictEqual(convertHandler.getUnit("1.2/3gal"), "gal");
            assert.strictEqual(convertHandler.getUnit("1.2/3l"), "L");
            assert.strictEqual(convertHandler.getUnit("1.2/3Mi"), "mi");
            assert.strictEqual(convertHandler.getUnit("1.2/3kM"), "km");
            assert.strictEqual(convertHandler.getUnit("1.2/3LbS"), "lbs");
            assert.strictEqual(convertHandler.getUnit("1.2/3KG"), "kg");
        });
        test("#incorrectUnitInput", function() {
            assert.throws(() => convertHandler.getUnit("1.2/3gall"), /invalid unit/);
            assert.throws(() => convertHandler.getUnit("1.2/3lL"), /invalid unit/);
            assert.throws(() => convertHandler.getUnit("1.2/3MimI"), /invalid unit/);
            assert.throws(() => convertHandler.getUnit("1.2/3"), /invalid unit/);
            assert.throws(() => convertHandler.getUnit("1.2/3Slbs"), /invalid unit/);
            assert.throws(() => convertHandler.getUnit("1.2/3kggkKgkg"), /invalid unit/);
        });
        test("#convert/returnUnit", function() {
            assert.strictEqual(convertHandler.getReturnUnit("gal"), "L");
            assert.strictEqual(convertHandler.getReturnUnit("L"), "gal");
            assert.strictEqual(convertHandler.getReturnUnit("mi"), "km");
            assert.strictEqual(convertHandler.getReturnUnit("km"), "mi");
            assert.strictEqual(convertHandler.getReturnUnit("lbs"), "kg");
            assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs");
        });
        test("#spelledOutUnit", function() {
            assert.strictEqual(convertHandler.spellOutUnit("gal"), "gallons");
            assert.strictEqual(convertHandler.spellOutUnit("L"), "liters");
            assert.strictEqual(convertHandler.spellOutUnit("mi"), "miles");
            assert.strictEqual(convertHandler.spellOutUnit("km"), "kilometers");
            assert.strictEqual(convertHandler.spellOutUnit("lbs"), "pounds");
            assert.strictEqual(convertHandler.spellOutUnit("kg"), "kilograms");
        });
    });
});