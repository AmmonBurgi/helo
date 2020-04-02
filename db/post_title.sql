select posts.id, author_id, title, username, img from users
join posts on users.id = posts.author_id where not title = $1 and not users.id = $2;