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

var dummyValues = {
    'medicineTime': '09:00'
}

var languageStrings = {
    'en-GB': {
        'translation': {
            'MEDICINE_OFFER': 'You need to take your medicine. When did you take your medicine?',
            'WELCOME_MESSAGE': 'Good morning, who is my pacient today?',
            'NOT_TAKEN_MEDICINE': 'This is not good. You need to take your medicine every day at 9 AM.You have to attend doctors visit. When did you attend the visit?',
            'MEDICINE_TAKEN': 'Good to hear. You have to attend doctors visit. When did you attend the visit?',
            'HELP_MESSAGE': 'Help!',
            'GOOD_BYE': 'Good bye!'
        }
    },
    'en-US': {
        'translation': {
            'MEDICINE_OFFER': 'You need to take your medicine. When did you take your medicine?',
            'WELCOME_MESSAGE': 'Good morning, who is my pacient today?',
            'NOT_TAKEN_MEDICINE': 'This is not good. You need to take your medicine every day at 9 AM.You have to attend doctors visit. When did you attend the visit?',
            'MEDICINE_TAKEN': 'Good to hear. You have to attend doctors visit. When did you attend the visit?',
            'HELP_MESSAGE': 'Help!',
            'GOOD_BYE': 'Good bye!'
        }
    },
    'de-DE': {
        'translation': {
            'MEDICINE_OFFER': 'You need to take your medicine. When did you take your medicine?',
            'WELCOME_MESSAGE': 'Good morning, who is my pacient today?',
            'NOT_TAKEN_MEDICINE': 'This is not good. You need to take your medicine every day at 9 AM.You have to attend doctors visit. When did you attend the visit?',
            'MEDICINE_TAKEN': 'Good to hear. You have to attend doctors visit. When did you attend the visit?',
            'HELP_MESSAGE': 'Help!',
            'GOOD_BYE': 'Good bye!'
        }
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', this.t('WELCOME_MESSAGE'));
    },
    'PatientDefineIntent': function () {
        if (typeof this.attributes['mdoc'] == 'undefined') {
            var attributes = this.attributes['mdoc'];
        } else {
            var attributes = {};
        }
        var firstName = this.event.request.intent.slots.firstName.value;
        var lastName = this.event.request.intent.slots.lastName.value;
        attributes = {
            'firstName': firstName,
            'lastName': lastName
        }
        this.attributes['mdoc'] = attributes;
        this.emit(':ask', "Hello " + firstName + " " + lastName + ". " + this.t('MEDICINE_OFFER'), this.t('MEDICINE_OFFER'));
    },
    'MedicineIntent': function () {
        var attributes = this.event.session.attributes;
        var patientMedicineTime = moment(this.event.request.intent.slots.medicineTime.value, 'HH:mm');
        if (typeof patientMedicineTime == 'undefined') {
            this.emit(':ask', this.t('NOT_TAKEN_MEDICINE'));
        }
        var medicineTime = moment(dummyValues['medicineTime'], 'HH:mm');
        var diff = Math.abs(medicineTime.diff(patientMedicineTime, 'seconds'));
        if (diff <= 3600) {
            this.emit(':ask', this.t('MEDICINE_TAKEN'));
        } else {
            this.emit(':ask', this.t('NOT_TAKEN_MEDICINE'));
        }

    },
    'VisitDoneIntent': function () {
        var visitTime = this.event.request.intent.slots.visitTime.value;
        this.emit(':ask', visitTime);

    },
    'VisitStartIntent': function () {
        this.emit(':ask', 'VisitStartIntent');

    },
    'PainDefinedIntent': function () {
        var bodyPart = this.event.request.intent.slots.bodyPart.value;
        this.emit(':ask', bodyPart);

    },
    'PainNotDefinedIntent': function () {
        this.emit(':ask', 'PainNotDefinedIntent');

    },
    'PainIntesityIntent': function () {
        var painIntesity = this.event.request.intent.slots.painIntesity.value;
        this.emit(':ask', painIntesity);

    },
    'PainFrequencyIntent': function () {
        var painFrequency = this.event.request.intent.slots.painFrequency.value;
        this.emit(':ask', painFrequency);

    },
    'ToiletTypeIntent': function () {
        var stoodType = this.event.request.intent.slots.stoodType.value;
        this.emit(':ask', stoodType);

    },
    'EatIntent': function () {
        this.emit(':ask', 'EatIntent');

    },
    'FeelGoodIntent': function () {
        this.emit(':ask', 'FeelGoodIntent');

    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', this.t('HELP_MESSAGE'), this.t('HELP_MESSAGE'));
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('GOOD_BYE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('GOOD_BYE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('GOOD_BYE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};