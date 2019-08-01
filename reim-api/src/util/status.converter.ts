//import Status from "../models/status";


export function convertSqlStatus(row: any) {
    console.log('convert-status');
    // console.log(row.status && new Status(row.status_id,row.status_name));
    // console.log('convert1');
    // console.log(new Status(row.status_id,row.status_name));
    // console.log('convert2');
    // console.log(row.status_id,row.status_name);
    // console.log('convert3');
    return (row.status_id,row.status_name);

} 
