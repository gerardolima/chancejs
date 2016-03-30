/// <reference path="../chance.js" />
/// <reference path="../node_modules/underscore/underscore-min.js" />

var expect = chai.expect;

describe("Regional", function () {
    var chance = new Chance();

    describe("Polish Specific", function () {
        var pesel, nip, regon;

        it("checks if generated PESEL numbers are correct", function () {
            _(1000).times(function () {
                pesel = chance.pl_pesel();
                expect(pesel).to.be.a('string');
                expect(pesel).to.have.length(11);
            });
        });

        it("checks if generated NIP numbers are correct", function () {
            _(1000).times(function () {
                nip = chance.pl_nip();
                expect(nip).to.be.a("string");
                expect(nip).to.have.length(10);
            });
        });

        it("checks if generated REGON numbers are correct", function () {
            _(1000).times(function () {
                regon = chance.pl_regon();
                expect(regon).to.be.a("string");
                expect(regon).to.have.length(9);
            });
        });
    });

    describe("Italian Specific", function (){
        var vat;

        describe("Luhn Check on Italian VAT number", function () {
            it("checks if number passes Luhn algorithm", function () {
                expect(chance.luhn_check(11203700015)).to.be.true;
                expect(chance.luhn_check('10384030010')).to.be.true;
                expect(chance.luhn_check(11401610016)).to.be.true;
                expect(chance.luhn_check(09105080015)).to.be.true;
                expect(chance.luhn_check(11203700011)).to.be.false;
                expect(chance.luhn_check(09105080010)).to.be.false;
            });
        });


        describe("Check on Italian VAT number", function () {
            it("checks if VAT code is 11 numbers", function () {
                _(1000).times(function () {
                    vat = chance.vat( { country: 'it' });
                    expect(vat).to.be.a("string");
                    expect(vat).to.have.length(11);
                    expect(vat[0]).to.be.within(0,1);
                });
            });
        });
    });
});
