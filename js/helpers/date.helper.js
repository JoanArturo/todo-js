export default class DateHelper {
    static formatDate(date) {
        return date.toLocaleDateString('es-MX', {
            day   : '2-digit',
            month : '2-digit',
            year  : 'numeric'
        });
    }
}