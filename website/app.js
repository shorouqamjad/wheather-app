const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'b52536b5f3882dfdd05d198416e21034&units=imperial';

let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  e.preventDefault(); // Prevent default form submission

  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  getWeather(baseUrl, zip, apiKey)
    .then(function (data) {
      // Send data to the server
      return postData('/add', {
        temperature: data.main.temp,
        date: newDate,
        userResponse: feelings
      });
    })
    .then(() => {
      // Fetch data from the server
      return fetch('/all');
    })
    .then(response => response.json())
    .then(data => {
      // Open a new window and display the results
      const newWindow = window.open('', '_blank', 'width=600,height=400');
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Weather Journal Results</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: linear-gradient(135deg, #ff9a9e, #fad0c4);
              margin: 0;
              padding: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              overflow: hidden;
            }
            #results {
              background: #ffffff;
              padding: 20px;
              border-radius: 12px;
              box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
              width: 100%;
              max-width: 600px;
              animation: slideIn 1s ease-out;
            }
            @keyframes slideIn {
              from {
                transform: translateY(-20px);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
            h1 {
              color: #ff6f61;
              text-align: center;
              margin-bottom: 20px;
            }
            p {
              font-size: 18px;
              margin: 10px 0;
            }
            strong {
              color: #ff6f61;
            }
          </style>
        </head>
        <body>
          <div id="results">
            <h1>Weather Journal Results</h1>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Temperature:</strong> ${data.temperature} F</p>
            <p><strong>Feelings:</strong> ${data.userResponse}</p>
          </div>
        </body>
        </html>
      `);
      newWindow.document.close();
    })
    .catch(error => console.log('error', error));
}

const getWeather = async (baseUrl, zip, apiKey) => {
  try {
    const res = await fetch(`${baseUrl}${zip}&appid=${apiKey}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

const postData = async (url = '', data = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};
