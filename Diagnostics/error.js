export class Report {
    static error(line, column, msg) {
        if (line === undefined || column === undefined) {
            return msg;
        }
        return `${line + 1}:${column + 1}: ${message}`;
    }
}