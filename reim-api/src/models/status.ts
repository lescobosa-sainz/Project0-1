export default class Status {
    constructor(
        public statusId: 0, // primary key
        public status: '', // not null, unique
    ) { }
}