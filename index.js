/*
 * mDoc skill to communicate with patients
 */

'use strict';

const Alexa = require('alexa-sdk');
const moment = require('moment');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var predefinedValues = {
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

var colectedData = {};

var languageStrings = {
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
};

const handlers = {
    /*
     *  LaunchRequest is the first fired when we start the skill with "Alxa open the doctor""
     */
    'LaunchRequest': function () {
        this.emit(':ask', this.t('WELCOME_MESSAGE'));
    },
    /*
     *  PatientDefinedIntent is firing when we say our name
     */
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
    /*
     *
     */
    'MedicineIntent': function () {
        var attributes = this.event.session.attributes;
        var patientMedicineTime = moment(this.event.request.intent.slots.medicineTime.value, 'HH:mm');
        if (typeof patientMedicineTime == 'undefined') {
            colectedData['medicineTime'] = false;
            this.emit(':ask', this.t('NOT_TAKEN_MEDICINE'));
        }
        var medicineTime = moment(predefinedValues['medicineTime'], 'HH:mm');
        var diff = Math.abs(medicineTime.diff(patientMedicineTime, 'seconds'));
        colectedData['medicineTime'] = medicineTime;
        if (diff <= 3600) {
            this.emit(':ask', this.t('MEDICINE_TAKEN') , this.t('MEDICINE_TAKEN'));
        } else {
            this.emit(':ask', this.t('NOT_TAKEN_MEDICINE') , this.t('NOT_TAKEN_MEDICINE'));
        }

    },
    /*
     *
     */
    'VisitDoneIntent': function () {
        var visitTime = this.event.request.intent.slots.visitTime.value;
        colectedData['visitTime'] = visitTime;
        this.emit(':ask', visitTime);
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
    'PainDefinedIntent': function () {
        var bodyPart = this.event.request.intent.slots.bodyPart.value;
        colectedData['pain'] = bodyPart;
        var message = this.t('PAIN_DEFINED').replace('BODY_PART' , bodyPart);
        this.emit(':ask', message , message);

    },
    /*
     *
     */
    'PainNotDefinedIntent': function () {
        this.emit(':ask', this.t('PAIN_NOT_DEFINED') , this.t('PAIN_NOT_DEFINED'));

    },
    /*
     *
     */
    'PainIntesityIntent': function () {
        var painIntesity = this.event.request.intent.slots.painIntesity.value;
        var lightPain = predefinedValues.painIntensityLight;
        var heavyPain = predefinedValues.painIntensityHeavy;
        if(lightPain.indexOf(painIntesity) >= 0){
            colectedData['painIntensity'] = painIntesity;
            this.emit(':ask', this.t('LIGHT_PAIN_MESSAGE') , this.t('LIGHT_PAIN_MESSAGE'));
        }
        if(heavyPain.indexOf(painIntesity) >= 0){
            colectedData['painIntensity'] = painIntesity;
            this.emit(':tell', this.t('HEAVY_PAIN_MESSAGE'));
        }
        this.emit(':ask', this.t('UNHANDLED'));
    },
    /*
     *
     */
    'PainFrequencyIntent': function () {
        var painFrequency = this.event.request.intent.slots.painFrequency.value;
        var frequent = predefinedValues.painFrequent;
        var notFrequent = predefinedValues.painNotFrequent;
        if(frequent.indexOf(painFrequency) >= 0){
            colectedData['painFrequency'] = painFrequency;
            this.emit(':ask', this.t('PAIN_FREQUENT_MESSAGE') , this.t('PAIN_FREQUENT_MESSAGE'));
        }
        if(notFrequent.indexOf(painFrequency) >= 0){
            colectedData['painFrequency'] = painFrequency;
            this.emit(':tell', this.t('PAIN_NOT_FREQUENT_MESSAGE'));
        }
        this.emit(':ask', this.t('UNHANDLED') , this.t('UNHANDLED'));
    },
    /*
     *
     */
    'ToiletTypeIntent': function () {
        var stoodType = this.event.request.intent.slots.stoodType.value;
        this.emit(':ask', stoodType);

    },
    /*
     *
     */
    'EatIntent': function () {
        this.emit(':ask', 'EatIntent');

    },
    /*
     *
     */
    'FeelGoodIntent': function () {
        this.emit(':ask', 'FeelGoodIntent');

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
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};