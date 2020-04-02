select posts.id, author_id, title, username, img from users
join posts on users.id = posts.author_id where title = $1;