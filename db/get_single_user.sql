select username, profile_pic, title, img, content, author_id from users
join posts on users.id = posts.author_id where posts.id = $1;