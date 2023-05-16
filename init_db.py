from app import db, Game, Comment

post1 = Game(title='Game The First', name="G1")
post2 = Game(title='Game The Second', name="G1")
post3 = Game(title='Game The Third', name="G1")

comment1 = Comment(content='Comment for the first post', game=post1)
comment2 = Comment(content='Comment for the second post', game=post2)
comment3 = Comment(content='Another comment for the second post', game_id=2)
comment4 = Comment(content='Another comment for the first post', game_id=1)


db.session.add_all([post1, post2, post3])
db.session.add_all([comment1, comment2, comment3, comment4])

db.session.commit()