import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
//import { convertSqlStatus } from '../util/status.converter';
import Status from '../models/status';



export async function findAll() {
    console.log('finding all status');
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const result = await client.query('SELECT * FROM status');
        // convert result from sql object to js object
        //console.log(result.rows.map(sqlStatus => new Status(sqlStatus.statusId, sqlStatus.status)));
        //console.log(result.rows.map(sqlStatus => new Status(sqlStatus.statusId, sqlStatus.statusName)));

        return result.rows.map(sqlStatus => new Status(sqlStatus.status_id, sqlStatus.status_name));
        // return result.rows.map(convertSqlStatus);

    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}