const hbs = require('hbs');
const moment = require('moment');

hbs.registerHelper('duration', function (start_date, end_date) {
  const startDate = moment(start_date);
  const endDate = moment(end_date);
  const duration = moment.duration(endDate.diff(startDate)).asDays();
  return `${Math.floor(duration)} days`;
});

hbs.registerHelper('eq', function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper('ifCond', function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
