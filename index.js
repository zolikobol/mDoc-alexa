    /* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');
const moment = require('moment');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var skillTexts = {
    'medicineOffer' : 'You need to take your medicine. When did you take your medicine?'
};

var dummyValues = {
    'medicineTime' : '09:00'
}

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask' , "Good morning, who is my pacient today?");
    },
    'PatientDefineIntent': function () {
        if(typeof this.attributes['mdoc'] == 'undefined'){
            var attributes = this.attributes['mdoc'];
        } else {
            var attributes = {};
        }
        var firstName = this.event.request.intent.slots.firstName.value;
        var lastName = this.event.request.intent.slots.lastName.value;
        attributes = {
            'firstName' : firstName,
            'lastName' : lastName
        }
        this.attributes['mdoc'] = attributes;
        this.emit(':ask' , "Hello " + firstName + " " + lastName + ". " + skillTexts['medicineOffer'] , skillTexts['medicineOffer']);
    },
    'MedicineIntent' : function () {
        var attributes = this.event.session.attributes;
        var patientMedicineTime = moment(this.event.request.intent.slots.medicineTime.value , 'HH:mm');
        if(typeof patientMedicineTime == 'undefined'){
            this.emit(':ask' , "This is not good. You need to take your medicine every day at 9 AM.You have to attend doctors visit. When did you attend the visit?");
        }
        var medicineTime = moment(dummyValues['medicineTime'] , 'HH:mm');
        var diff = Math.abs(medicineTime.diff(patientMedicineTime , 'seconds'));
        if(diff <= 3600){
            this.emit(':ask' , "Good to hear. You have to attend doctors visit. When did you attend the visit?");
        } else {
            this.emit(':ask' , "This is not good. You need to take your medicine every day at 9 AM.You have to attend doctors visit. When did you attend the visit?");
        }
        
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'Help', 'Help');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Okay, good bye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Okay, good bye!');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', 'Okay, good bye!');
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.registerHandlers(handlers);
    alexa.execute();
};
