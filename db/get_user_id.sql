select * from users
join posts on users.id = posts.author_id where not users.id = $1;