const hbs = require('hbs');
const moment = require('moment');

hbs.registerHelper('duration', function (startDate, endDate) {
  const start = moment(startDate);
  const end = moment(endDate);

  if (!start.isValid() || !end.isValid()) {
    return 'Invalid dates';
  }

  const duration = moment.duration(end.diff(start));
  return `${Math.floor(duration.asDays())} days`;
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

hbs.registerHelper('checkTechnologies', function (technologies, value, options) {
  if (Array.isArray(technologies) && technologies.includes(value)) {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper('formatDate', function (date, format) {
  if (!format || typeof format !== 'string') {
    format = 'DD MMMM YYYY';
  }

  if (!moment(date).isValid()) {
    return 'Invalid date';
  }

  return moment(date).format(format);
});
