export default class DateHelper {
    static formatDate(date) {
        return date.toLocaleDateString('en-US', {
            day   : '2-digit',
            month : '2-digit',
            year  : 'numeric'
        });
    }
}