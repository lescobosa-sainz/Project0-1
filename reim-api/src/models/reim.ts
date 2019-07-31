import type from "./type";
import status from "./status";
import User from "./user";


export default class Reim {

    constructor(
        public reimId = 0,
        public author: User, // foreign key -> User, not null 
        public amount = 0, // not null
        public dateSubmitted = '', // not null
        public dateResolved = '',
        public description = '', // not null
        public resolver : User,// foreign key -> User
        public status: status,// foreign ey -> ReimbursementStatus, not null
        public type: type // foreign key -> ReimbursementType
    ) { }
}