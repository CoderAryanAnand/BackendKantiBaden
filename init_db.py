from app import db, Game, Comment

game1 = Game(game="G1")
game2 = Game(game="G2")
game3 = Game(game="G3")

comment1 = Comment(content='Comment for the first game', game=game1)
comment2 = Comment(content='Comment for the second game', game=game2)
comment3 = Comment(content='Another comment for the second game', game_id=2)
comment4 = Comment(content='Another comment for the first game', game_id=1)


db.session.add_all([game1, game2, game3])
db.session.add_all([comment1, comment2, comment3, comment4])

db.session.commit()