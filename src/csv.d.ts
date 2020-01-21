export default class CSV {
    /**
     * Takes a string of CSV data and converts it to a 2 dimensional array
     *
     * options
     * - typed - type coercion [false]
     *
     * @static
     * @param {string} csv the CSV string to parse
     * @param {Object} [options] an object containing the options
     * @param {Function} [reviver] a custom function to modify the values
     * @returns {Array} a 2 dimensional array of `[entries][values]`
     */
    static parse(csv: string, options?: any, reviver?: Function): any[];
    /**
     * Takes a 2 dimensional array of `[entries][values]` and converts them to CSV
     *
     * options
     * - eof - add a trailing newline at the end [true]
     *
     * @static
     * @param {Array} array the input array to stringify
     * @param {Object} [options] an object containing the options
     * @param {Function} [replacer] a custom function to modify the values
     * @returns {string} the CSV string
     */
    static stringify(array: any[], options?: any, replacer?: Function): string;
    /** @private */
    static valueEnd(ctx: any): void;
    /** @private */
    static entryEnd(ctx: any): void;
    /** @private */
    static inferType(value: any): any;
}
