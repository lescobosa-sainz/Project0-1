select * from reim r 
left join a_view d on  (r.author = d.a_id)

SELECT user_id as a_id, 
username as a_username, 
pass as a_pass, 
first_name as a_first, 
last_name as a_last, 
phone as a_phone, 
email as a_email, 
role as a_role
FROM app_user

SELECT user_id as r_id, 
username as r_username, 
pass as r_pass, 
first_name as r_first, 
last_name as r_last, 
phone as r_phone, 
email as r_email, 
role as r_role_id
FROM app_user
