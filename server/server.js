const http = require('http');

http.createServer((request, response) => {
  console.log(`Request url: ${request.url}`);

  const eventHistory = [];

  request.on('close', () => {
    closeConnection(response);
  });

  if (request.url.toLowerCase() === '/events') {
    response.writeHead(200, {
      'Connection': 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    checkConnectionToRestore(request, response, eventHistory);

    sendEvents(response, eventHistory);
  } else {
    response.writeHead(404);
    response.end();  
  }
}).listen(5000, () => {
  console.log('Server running at http://127.0.0.1:5000/');
});

function sendEvents(response, eventHistory) {
  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 1\nevent: monitorDataUpdate\ndata: {"datatype": "SAPS","arrival":"'+ new Date().toLocaleTimeString()+ '", "state": "Good"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 3000);

  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 1\nevent: monitorDataUpdate\ndata: {"datatype": "SAPH","arrival":"'+ new Date().toLocaleTimeString()+ '", "state": "Good"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 4000);

  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 1\nevent: monitorDataUpdate\ndata: {"datatype": "SAPF","arrival":"'+ new Date().toLocaleTimeString()+ '","state": "bad"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 5000);

  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 1\nevent: monitorDataUpdate\ndata: {"datatype": "CRMO", "arrival":"'+ new Date().toLocaleTimeString()+ '","state": "Good"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 6000);

  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 1\nevent: monitorDataUpdate\ndata: {"datatype": "CRMG","arrival":"'+ new Date().toLocaleTimeString() + '", "state": "bad"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 7000);

  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 1\nevent: monitorDataUpdate\ndata: {"datatype": "CRMG", "arrival":"'+ new Date().toLocaleTimeString()+ '","state": "bad"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 8000);


  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 1\nevent: monitorDataUpdate\ndata: {"datatype": "SAPF", "arrival":"'+ new Date().toLocaleTimeString()+ '","state": "Good"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 9000);

  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 1\nevent: monitorDataUpdate\ndata: {"datatype": "CRMG", "arrival":"'+ new Date().toLocaleTimeString() + '","state": "bad"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 10000);


  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 1\nevent: monitorDataUpdate\ndata: {"datatype": "SAPF", "arrival":"'+ new Date().toLocaleTimeString()+ '","state": "Good"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 11000);

  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 1\nevent: monitorDataUpdate\ndata: {"flight": "CRMG", "arrival":"'+ new Date().toLocaleTimeString()+ '","state": "Good"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 12000);

  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 1\nevent: monitorDataUpdate\ndata: {"datatype": "CRMB", "arrival":"'+ new Date().toLocaleTimeString()+ '","state": "Good"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 13000);


  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 2\nevent: monitorDataUpdate\ndata: {"datatype": "SAPS", "arrival":"'+ new Date().toLocaleTimeString()+ '","state": "Good"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 14000);

  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 3\nevent: monitorDataRemoval\ndata: {"datatype": "SAPS"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 15000);

  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 3\nevent: monitorDataRemoval\ndata: {"datatype": "CRMG"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 16000);
  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 3\nevent: monitorDataRemoval\ndata: {"datatype": "CRMO"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 17000);
  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 3\nevent: monitorDataRemoval\ndata: {"datatype": "SAPF"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 18000);

  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 4\nevent: closedConnection\ndata: \n\n';
      eventHistory.push(eventString);
    }
  }, 19000);
}

function closeConnection(response) {
  if (!response.finished) {
    response.end();
    console.log('Stopped sending events.');
  }
}

function checkConnectionToRestore(request, response, eventHistory) {
  if (request.headers['last-event-id']) {
    const eventId = parseInt(request.headers['last-event-id']);

    eventsToReSend = eventHistory.filter((e) => e.id > eventId);

    eventsToReSend.forEach((e) => {
      if (!response.finished) {
        response.write(e);
      }
    });
  }
}
