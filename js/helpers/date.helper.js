export default class DateHelper {
    static formatDate(date, separator = null, reverse = false) {
        let formattedDate = date.toLocaleDateString('es-MX', {
            day   : '2-digit',
            month : '2-digit',
            year  : 'numeric'
        });

        if (separator) {
            formattedDate = formattedDate.split('/');
            if (reverse)
                formattedDate.reverse();
            
            formattedDate = formattedDate.join(separator)
        }

        return formattedDate;
    }
}