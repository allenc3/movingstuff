// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
   logging: true,

   intentMap: {
      'AMAZON.StopIntent': 'EndIntent',
      'AMAZON.FallbackIntent': 'FallBackIntent',
      'AMAZON.CancelIntent': 'CancelIntent',
      'AMAZON.HelpIntent': 'HelpIntent',
      'AMAZON.NavigateHomeIntent': 'HomeIntent',
   },

   db: {
        FileDb: {
            pathToFile: '../db/db.json',
        }
    },
};
