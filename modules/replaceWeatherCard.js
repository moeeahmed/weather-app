const fs = require('fs');
const weatherCard = fs.readFileSync(
  `${__dirname}/../templates/weatherCard.html`,
  'utf-8'
);

module.exports = (data) => {
  const direction = {
    N: '↑',
    NE: '↗',
    E: '→',
    SE: '↘',
    S: '↓',
    SW: '↙',
    W: '←',
    NW: '↖',
    undefined: '',
  };

  let output = weatherCard.replace(/%COUNTRY_NAME%/g, data.location.country);
  output = output.replace(/%CITY_NAME%/g, data.location.name);
  output = output.replace(/%CONDITION%/g, data.current.condition.text);
  output = output.replace(/%WIND_SPEED%/g, data.current.wind_mph);
  output = output.replace(
    /%WIND_DIR%/g,
    `${data.current.wind_dir} ${
      direction[data.current?.wind_dir] === undefined
        ? ''
        : direction[data.current?.wind_dir]
    }`
  );
  output = output.replace(/%PRECIP%/g, data.current.precip_mm);
  output = output.replace(/%IMG_SRC%/g, data.current.condition.icon);
  output = output.replace(/%TEMPERATURE%/g, Math.round(data.current.temp_c));

  return output;
};
