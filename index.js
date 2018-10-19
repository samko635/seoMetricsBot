// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const
    express = require('express'),
    body_parser = require('body-parser'),
    app = express().use(body_parser.json());
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/webhook', (req, res) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}

  function keyMetricsTrack(agent) {
    let body = request.body;
    console.log(body.queryResult.parameters);
    switch(body.queryResult.parameters.KeyMetrics){
        case 'small team':
            agent.add('57% of our people are in teams of 6-12 in September. which is 2% improvement from August results');
            break;
        case 'showcase':
            agent.add('Showcase metric had significant improvement in September. Results moved from 37% to 63% over the last month');
            break;
        case 'test and deployment automation':
            agent.add('September result for Test and deployment automation metric were 54% which is 2% improvement from August results');
            break;
        case 'autonomous':
            agent.add('The result for the autonomy metric for September is 67%.');
            break;
    }
  }
  
  function keyMetricsCal(agent) {
    let body = request.body;
    console.log(body.queryResult.parameters);
    switch(body.queryResult.parameters.KeyMetrics){
        case 'small team':
            agent.add('57% of our people are in teams of 6-12 in September. which is 2% improvement from August results');
            break;
        case 'showcase':
            agent.add('Showcase metric had significant improvement in September. Results moved from 37% to 63% over the last month');
            break;
        case 'test and deployment automation':
            agent.add('September result for Test and deployment automation metric were 54% which is 2% improvement from August results');
            break;
        case 'autonomous':
            agent.add('The result for the autonomy metric for September is 67%.');
            break;
    }      
  }
  
  function deliveryMetricsTrack(agent) {
      
  }
  
  function deliveryMetricsCal(agent) {
      
  } 
  
  function operationsMetricsTrack(agent) {
      
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('SEO_delivery_metrics_followup_calculate', deliveryMetricsCal);
  intentMap.set('SEO_delivery_metrics_followup_track', deliveryMetricsTrack);
  intentMap.set('SEO_key_metrics_followup_calculate', keyMetricsCal);
  intentMap.set('SEO_key_metrics_followup_track', keyMetricsTrack);
  intentMap.set('SEO_operations_metrics_followup_track', operationsMetricsTrack);
  agent.handleRequest(intentMap);
});

