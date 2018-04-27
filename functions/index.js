
const functions = require('firebase-functions');

exports.webhook = functions.https.onRequest((request, response) => {

  var params = request.body['queryResult'];

  console.info('action and parameters ', params.action, params.parameters);

  // check missing value for arithmetic operation,
  // means it should be other then square (e.g; +, -, /, *);
  if(params.action !== 'squareValue' && !params.parameters['number1'] && !params.parameters['number2']) {
    var msgs = [
      'If you want something like ' + params.parameters.operation + ' then please write proper statement',
      'Its Incomplete statement to ' + params.parameters.operation + ' values',
      'Please try a proper statement to get the result!',
      'Missing values to perform ' + params.parameters.operation + ' operation'
    ];
    // generate random message for every request;
    sendResponse( Math.floor(Math.random() * msgs.length) + 0 );
    return;
  }

  var result;
  switch (true) {

    case (params.action === 'calculateValue') && (params.parameters.operation === 'add'): {
      result = params.parameters['number1'] + params.parameters['number2'];
      sendResponse(result);
      break;
    }
    case (params.action === 'calculateValue') && (params.parameters.operation === 'subtract'): {
      result = params.parameters['number1'] - params.parameters['number2'];
      sendResponse(result);
      break;
    }
    case (params.action === 'calculateValue') && (params.parameters.operation === 'multiply'): {
      result = params.parameters['number1'] * params.parameters['number2'];
      sendResponse(result);
      break;
    }
    case (params.action === 'calculateValue') && (params.parameters.operation === 'divide'): {
      result = params.parameters['number1'] / params.parameters['number2'];
      sendResponse(result);
      break;
    }

    case (params.action === 'squareValue'): {
      if(!params.parameters.number) {
        sendResponse('Need value to get the Square!');
        return;
      }
      result = Math.pow(params.parameters.number, 2);
      sendResponse(result);
      break;
    }

    default: {
      console.log('Sorry i\'m out of response');
      console.log(params.action);
      console.log(params.parameters);
    }
  }

  function sendResponse(value) {
    response.send({
      fulfillmentText: value
    });
  }

});
