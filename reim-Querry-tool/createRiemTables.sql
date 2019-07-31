CREATE TABLE role(
	role_id SERIAL PRIMARY KEY,
	role TEXT NOT NULL
);

CREATE TABLE status(
	status_id SERIAL PRIMARY KEY,
	status TEXT NOT NULL
);

CREATE TABLE type(
	type_id SERIAL PRIMARY KEY,
	type TEXT NOT NULL
);

CREATE TABLE app_user (
	user_id SERIAL PRIMARY KEY,
	username TEXT UNIQUE NOT NULL,
	pass TEXT NOT NULL,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	phone TEXT,
	email TEXT UNIQUE NOT NULL,
	role INTEGER REFERENCES role(role_id)
);
	
CREATE TABLE reimbursement(
	reimbursement_id SERIAL PRIMARY KEY,
	author INTEGER REFERENCES app_user(user_id),
	amount NUMERIC NOT NULL,
	date_Submited TIMESTAMP NOT NULL,
	date_Resolved TIMESTAMP,
	description TEXT NOT NULL,
	resolver INTEGER REFERENCES app_user(user_id),
	status	INTEGER REFERENCES status(status_id),
	type INTEGER REFERENCES type(type_id)
	);
