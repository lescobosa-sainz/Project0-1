select * from reim r
		inner join type using (type_id)
        inner join status using (status_id)
        inner join app_user w on (r.author = w.user_id)
		left join r_view v on (r.resolver = v.r_id)