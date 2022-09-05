const fs = require('fs');

const forecastTemplate = fs.readFileSync(
  `${__dirname}/../templates/forecastTemplate.html`,
  'utf-8'
);

const forecastCardsTemplate = fs.readFileSync(
  `${__dirname}/../templates/forecastCards.html`,
  'utf-8'
);

const hourlyCardsTemplate = fs.readFileSync(
  `${__dirname}/../templates/hourlyCards.html`,
  'utf-8'
);

let c = [];
let output1 = forecastTemplate;

module.exports = (data) => {
  console.log(data);
  output1 = output1.replace(/%COUNTRY_NAME%/g, data.location.country);
  output1 = output1.replace(/%CITY_NAME%/g, data.location.name);

  for (let i = 0; i < 3; i++) {
    let output2 = forecastCardsTemplate.replace(
      /%CONDITION%/g,
      i === 0
        ? data.current.condition.text
        : data.forecast.forecastday[i].day.condition.text
    );

    output2 = output2.replace(/%DATE%/g, data.forecast.forecastday[i].date);

    output2 = output2.replace(
      /%ICON%/g,
      i === 0
        ? data.current.condition.icon
        : data.forecast.forecastday[i].day.condition.icon
    );
    output2 = output2.replace(
      /%COR%/g,
      data.forecast.forecastday[i].day.daily_chance_of_rain
    );
    output2 = output2.replace(
      /%TEMP%/g,
      i === 0
        ? Math.floor(data.current.temp_c)
        : Math.floor(data.forecast.forecastday[i].day.avgtemp_c)
    );
    output2 = output2.replace(
      /%MINTEMP%/g,
      data.forecast.forecastday[i].day.mintemp_c
    );
    output2 = output2.replace(
      /%WIND_SPEED%/g,
      i === 0
        ? `Wind: </span>${data.current.wind_mph}`
        : `Max wind: </span>${data.forecast.forecastday[i].day.maxwind_mph}`
    );
    output2 = output2.replace(
      /%MAXTEMP%/g,
      data.forecast.forecastday[i].day.maxtemp_c
    );

    const hourlyCardsHTML = data.forecast.forecastday[i].hour
      .map((el) => {
        let output4 = hourlyCardsTemplate.replace(
          /%TIME%/,
          el.time.split(' ')[1]
        );
        output4 = output4.replace(/%TEMP%/, el.temp_c);
        output4 = output4.replace(/%ICON%/, el.condition.icon);
        return output4;
      })
      .join('');

    output2 = output2.replace(/%HOURLY%/g, hourlyCardsHTML);

    c.push(output2);
  }

  output1 = output1.replace(/%FORECASTCARDS%/g, c.join(''));

  return output1;
};
