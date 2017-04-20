/*
 * mDoc skill to communicate with patients
 */

'use strict';

const Alexa = require('alexa-sdk');
const MdocClass = require('./src/Mdoc');
const moment = require('moment');
const Mdoc = new MdocClass();

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

/*var Mdoc.predefinedValues = {
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
}

var Mdoc.collectedData = {
    'firstName' : null,
    'lastName' : null,
    'medicineTime' : null,
    'visitTime' : null,
    'pain' : null,
    'painIntensity' : null,
    'painFrequency' : null,
};

var Mdoc.languageStrings = {
    'en-GB': {
        'translation': {
            'MEDICINE_OFFER': 'You need to take your medicine. When did you take your medicine?',
            'WELCOME_MESSAGE': 'Good morning, who is my pacient today?',
            'NOT_TAKEN_MEDICINE': 'This is not good. You need to take your medicine every day at 9 AM.You have to attend doctors visit. When did you attend the visit?',
            'MEDICINE_TAKEN': 'Good to hear. You have to attend doctors visit. When did you attend the visit?',
            'HELP_MESSAGE': 'Help!',
            'GOOD_BYE': 'Good bye!',
            'VISIT_START_MESSAGE' : 'Okay then. We will make today visit now. Do you feel good or you feel pain?',
            'PAIN_NOT_DEFINED' : 'That is not good. Where do you feel pain? In head, in arms, in legs or in stomach?',
            'PAIN_DEFINED' : 'Pain in BODY_PART is not good. Is it heavy pain or light pain?',
            'HEAVY_PAIN_MESSAGE' : 'Heavy pain is dangerous. I will allert your doctor.',
            'LIGHT_PAIN_MESSAGE' : 'Do you feel it on regular basis or just now?',
            'PAIN_FREQUENT_MESSAGE' : 'Frequent pain is not good. I will allert your doctor.',
            'PAIN_NOT_FREQUENT_MESSAGE' : 'Thank you for the information. I am going to send the information to your doctor. Take care. Good bye.',
            'UNHANDLED' : 'Sorry I didnt quite get that!'
        }
    },
    'en-US': {
        'translation': {
            'MEDICINE_OFFER': 'You need to take your medicine. When did you take your medicine?',
            'WELCOME_MESSAGE': 'Good morning, who is my pacient today?',
            'NOT_TAKEN_MEDICINE': 'This is not good. You need to take your medicine every day at 9 AM.You have to attend doctors visit. When did you attend the visit?',
            'MEDICINE_TAKEN': 'Good to hear. You have to attend doctors visit. When did you attend the visit?',
            'HELP_MESSAGE': 'Help!',
            'GOOD_BYE': 'Good bye!',
            'VISIT_START_MESSAGE' : 'Okay then. We will make today visit now. Do you feel good or you feel pain?',
            'PAIN_NOT_DEFINED' : 'That is not good. Where do you feel pain? In head, in arms, in legs or in stomach?',
            'PAIN_DEFINED' : 'Pain in BODY_PART is not good. Is it heavy pain or light pain?',
            'HEAVY_PAIN_MESSAGE' : 'Heavy pain is dangerous. I will allert your doctor.',
            'LIGHT_PAIN_MESSAGE' : 'Do you feel it on regular basis or just now?',
            'PAIN_FREQUENT_MESSAGE' : 'Frequent pain is not good. I will allert your doctor.',
            'PAIN_NOT_FREQUENT_MESSAGE' : 'Thank you for the information. I am going to send the information to your doctor. Take care. Good bye.',
            'UNHANDLED' : 'Sorry I didnt quite get that!'
        }
    },
    'de-DE': {
        'translation': {
            'MEDICINE_OFFER': 'You need to take your medicine. When did you take your medicine?',
            'WELCOME_MESSAGE': 'Good morning, who is my pacient today?',
            'NOT_TAKEN_MEDICINE': 'This is not good. You need to take your medicine every day at 9 AM.You have to attend doctors visit. When did you attend the visit?',
            'MEDICINE_TAKEN': 'Good to hear. You have to attend doctors visit. When did you attend the visit?',
            'HELP_MESSAGE': 'Help!',
            'GOOD_BYE': 'Good bye!',
            'VISIT_START_MESSAGE' : 'Okay then. We will make today visit now. Do you feel good or you feel pain?',
            'PAIN_NOT_DEFINED' : 'That is not good. Where do you feel pain? In head, in arms, in legs or in stomach?',
            'PAIN_DEFINED' : 'Pain in BODY_PART is not good. Is it heavy pain or light pain?',
            'HEAVY_PAIN_MESSAGE' : 'Heavy pain is dangerous. I will allert your doctor.',
            'LIGHT_PAIN_MESSAGE' : 'Do you feel it on regular basis or just now?',
            'PAIN_FREQUENT_MESSAGE' : 'Frequent pain is not good. I will allert your doctor.',
            'PAIN_NOT_FREQUENT_MESSAGE' : 'Thank you for the information. I am going to send the information to your doctor. Take care. Good bye.',
            'UNHANDLED' : 'Sorry I didnt quite get that!'
        }
    }
};*/

const handlers = {
    /*
     *  LaunchRequest is the first fired when we start the skill with "Alxa open the doctor""
     */
    'LaunchRequest': function () {
      console.log(__dirname);
        this.attributes['mdoc'] = Mdoc.collectedData;
        this.emit(':ask', this.t('WELCOME_MESSAGE'));
    },
    /*
     *  PatientDefinedIntent is firing when we say our name
     */
    'PatientDefineIntent': function () {
        this.emit(':ask', this.t('MEDICINE_OFFER'), this.t('MEDICINE_OFFER'));
    },
    /*
     *
     */
    'MedicineTakenIntent': function () {
        this.emit(':ask', this.t('MEDICINE_TAKEN') , this.t('MEDICINE_TAKEN'));
    },

    'MedicineNotTakenIntent': function () {
        this.emit(':ask', this.t('NOT_TAKEN_MEDICINE') , this.t('NOT_TAKEN_MEDICINE'));
    },
    /*
     *
     */
    'VisitStartIntent': function () {
        this.emit(':ask', this.t('VISIT_START_MESSAGE') , this.t('VISIT_START_MESSAGE'));

    },
    /*
     *
     */
    'FeelGoodIntent': function () {
        this.emit(':ask', this.t('FEEL_GOOD') , this.t('FEEL_GOOD'));

    },
    /*
     *
     */
    'FeelBadIntent': function () {
        this.emit(':ask', this.t('FEEL_BAD') , this.t('FEEL_BAD'));

    },
    /*
     *
     */
    'FeelNotWellIntent': function () {
        this.emit(':ask', this.t('FEEL_NOT_WELL') , this.t('FEEL_NOT_WELL'));

    },
    'HeavyPainIntent' : function() {
      this.emit(':ask', this.t('HEAVY_PAIN_MESSAGE') , this.t('HEAVY_PAIN_MESSAGE'));
    },
    'LightPainPainIntent' : function() {
      this.emit(':ask', this.t('LIGHT_PAIN_MESSAGE') , this.t('LIGHT_PAIN_MESSAGE'));
    },

    'LongTimePainIntent' : function() {
      this.emit(':ask', this.t('LONG_TIME_PAIN_MESSAGE') , this.t('LONG_TIME_PAIN_MESSAGE'));
    },
    'RecentlyPainIntent' : function() {
      this.emit(':ask', this.t('RECELNT_PAIN_MESSAGE') , this.t('RECELNT_PAIN_MESSAGE'));
    },
    'RegularStoodIntent' : function() {
      this.emit(':ask', this.t('REGULAR_STOOD_MESSAGE') , this.t('REGULAR_STOOD_MESSAGE'));
    },
    'MessyStoodIntent' : function() {
      this.emit(':ask', this.t('MESSY_STOOD_INTENT') , this.t('MESSY_STOOD_INTENT'));
    },
    'AMAZON.YesIntent' : function() {
      this.emit(':ask', this.t('YES_MESSAGE') , this.t('YES_MESSAGE'));
    },
    'AMAZON.NoIntent' : function() {
      this.emit(':ask', this.t('NO_MESSAGE') , this.t('NO_MESSAGE'));
    },
    /*
     *
     */
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', this.t('HELP_MESSAGE'), this.t('HELP_MESSAGE'));
    },
    /*
     *
     */
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('GOOD_BYE'));
    },
    /*
     *
     */
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('GOOD_BYE'));
    },
    /*
     *
     */
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('GOOD_BYE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.resources = Mdoc.languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
