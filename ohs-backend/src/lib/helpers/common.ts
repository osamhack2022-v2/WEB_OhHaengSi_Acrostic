import moment from 'moment';

export function dateToString(date: Date | string) {
  return moment(date).format('YYYY-MM-DD');
}
