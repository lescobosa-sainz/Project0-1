import Reim from '../models/reim';
// import Status from '../models/status';
// import Type from '../models/type';
//  import User from '../models/user';

export function convertSqlReim(row) {
 console.log('convert');
  return new Reim(row.reimbursement_id, row.username , row.amount, row.date_submited, row.date_resolved, row.description, row.r_username, row.status, row.type);
}







//  export function convertSqlReim1(row) {
//    return new Reim(row.reimbursement_id, 
//       new User(row.user_id, row.username, '', row.email, row.first_name, row.last_name, row.phone, row.role),
//       row.amount, row.date_submited, row.date_resolved, row.description, 
//       new User(row.user_id, row.username, '', row.email, row.first_name, row.last_name, row.phone, row.role_id), 
//       new Status(row.status_id,row.status), 
//       new Type(row.type_id,row.type));
// }