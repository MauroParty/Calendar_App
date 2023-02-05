const moment = require('moment');

const isDate = (val) => {
  if(!val) return false;

  const date = moment(val,true);
  if(date.isValid()) return true;
  else return false;
};

const isDateAfter = (end,start) => {
  if(moment(start).isSameOrAfter(moment(end))) return false;
  return true;
};

module.exports = { isDate,isDateAfter };