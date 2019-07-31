import User from '../models/user';
import Role from '../models/role';

export function convertSqlUser(row: any) {
    return new User(row.user_id, row.username, '', row.email, row.first_name, row.last_name, row.phone, new Role (row.role_id, row.role_name));
} 


// export function convertSqlUser(row: any) {
//     console.log("convert");
//     return new User(row.user_id, row.username, '', row.email, row.first_name, row.last_name, row.phone, row.role_id);
// } 
