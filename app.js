'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const {App} = require('jovo-framework');
const {Alexa} = require('jovo-platform-alexa');
const {GoogleAssistant} = require('jovo-platform-googleassistant');
const {JovoDebugger} = require('jovo-plugin-debugger');
const {FileDb} = require('jovo-db-filedb');

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        this.toIntent('StartIntent');
    },

    StartIntent() {
        let speech = "Welcome! What's your name?";
        let reprompt = "Hello, what's your name?";
        this.ask(speech, reprompt);
    },

    MyNameIsIntent() {
        this.followUpState('DoorIntent').ask("Hey " + this.$inputs.name.value + "! Are you ready?");
    },

    DoorIntent() {
        let speech = 'Do you want to go through the blue door, or through the red door?';
        let reprompt = 'You have two options, the blue door, or the red door.';
        this.followUpState('EnterDoorIntent').ask(speech, reprompt);
    },

    EnterDoorIntent() {
        this.tell("You chose the " + this.$inputs.color.value + " door! You died!");
    },

    HelpIntent() {
        this.tell("Wassup!");
    },

    EndIntent() {
        this.tell("okay bye!");
    }
});

module.exports.app = app;
