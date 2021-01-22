export default abstract class Base {
    constructor();
    static toString(): `[class ${string}]`;
    static valueOf(): `[class ${string}]`;
    toString(): `class ${string} { [native code] }`;
    toJSON(): string;
}
