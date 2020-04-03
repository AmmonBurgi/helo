delete from posts
where id = $1;

select posts.id, author_id, title, username, img from users
join posts on users.id = posts.author_id;