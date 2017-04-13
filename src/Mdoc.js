fs = require('fs');

function Mdoc() {
  this.predefinedValues = {
      'medicineTime': '09:00',
      'painIntensityLight' : [
          'light'
      ],
      'painIntensityHeavy' : [
          'heavy'
      ],
      'painFrequent' : [
          'frequent'
      ],
      'painNotFrequent' : [
          'frequent'
      ]
  };

  this.collectedData = {
      'firstName' : null,
      'lastName' : null,
      'medicineTime' : null,
      'visitTime' : null,
      'pain' : null,
      'painIntensity' : null,
      'painFrequency' : null,
  };

  this.languageStrings = JSON.parse(fs.readFileSync('./lang/translations.json', 'utf8'));
}
// class methods
Mdoc.prototype.fooBar = function() {

};
// export the class
module.exports = Mdoc;
