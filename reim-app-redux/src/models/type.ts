export default class type {
    constructor(
        public typeId: number, // primary key
        public type: string, // not null, unique
    ) { }
}