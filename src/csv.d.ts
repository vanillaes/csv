export default class CSV {
    /**
     * Takes a string of CSV data and converts it to a 2 dimensional array
     *
     * options
     * - typed - type coercion [false]
     *
     * @static
     * @param {*} csv the CSV string to parse
     * @param {*} [options] an object containing the options
     * @param {*} [reviver] a custom function to modify the values
     * @returns a 2 dimensional array of `[entries][values]`
     */
    static parse(csv: any, options?: any, reviver?: any): any;
    /**
     * Takes a 2 dimensional array of `[entries][values]` and converts them to CSV
     *
     * options
     * - eof - add a trailing newline at the end [true]
     *
     * @static
     * @param {*} array the input array to stringify
     * @param {*} [options] an object containing the options
     * @param {*} [replacer] a custom function to modify the values
     * @returns the CSV string
     */
    static stringify(array: any, options?: any, replacer?: any): string;
    /** @private */
    static valueEnd(ctx: any): void;
    /** @private */
    static entryEnd(ctx: any): void;
}
