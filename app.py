from werkzeug.middleware.proxy_fix import ProxyFix
from flask import (
    Flask,
    url_for,
    render_template,
    request,
    redirect,
    session,
    flash,
    jsonify,
)
from flask_sqlalchemy import SQLAlchemy
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.app_context().push()
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    likes = db.relationship("Like", backref="user")

    def __init__(self, username, password):
        self.username = username
        self.password = password


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    authors = db.Column(db.String(100))
    title = db.Column(db.String(100))
    description = db.Column(db.Text)
    comments = db.relationship("Comment", backref="game")
    likes = db.relationship("Like", backref="game")

    def __repr__(self):
        return f'<Game "{self.title}">'


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(100))
    content = db.Column(db.Text)
    game_id = db.Column(db.Integer, db.ForeignKey("game.id"))

    def __repr__(self):
        return f'<Comment "{self.content[:20]}...">'


class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey("game.id"), nullable=False)
    author = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            if not session["logged_in"]:
                return redirect(url_for("login", next=request.url))
            return f(*args, **kwargs)
        except KeyError:
            return redirect(url_for("login", next=request.url))

    return decorated_function


@app.route("/", methods=["GET"])
def index():
    games = Game.query.all()
    return render_template("home_new.html", title="Home", games=games)


@app.route("/characters-chess2", methods=["GET"])
def characters_chess2():
    return render_template("Games/Chess2/Characters.html", title="Characters | Chess2")


@app.route("/<int:game_id>", methods=("GET", "POST"))
@login_required
def game_(game_id):
    game = Game.query.get_or_404(game_id)
    if request.method == "POST":
        comment = Comment(
            content=request.form["content"], game=game, author=session["username"]
        )
        db.session.add(comment)
        db.session.commit()
        return redirect(url_for("game_", game_id=game.id))
    name = game.name
    return render_template("Games/" + name + ".html", title=game.title, game=game)


@app.route("/like-game/<game_id>", methods=["POST"])
@login_required
def like(game_id):
    game = Game.query.filter_by(id=game_id).first()
    like = Like.query.filter_by(author=session["user_id"], game_id=game_id).first()

    if not game:
        return jsonify({"error": "Game does not exist"}, 400)
    elif like:
        db.session.delete(like)
        db.session.commit()
    else:
        like = Like(author=session["user_id"], game_id=game_id)
        db.session.add(like)
        db.session.commit()
    return jsonify(
        {
            "likes": len(game.likes),
            "liked": session["user_id"] in map(lambda x: x.author, game.likes),
        }
    )


@app.route("/register/", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        try:
            db.session.add(
                User(
                    username=request.form["username"],
                    password=generate_password_hash(request.form["password"]),
                )
            )
            db.session.commit()
            return redirect(url_for("login"))
        except:
            return render_template("index.html", message="User Already Exists")
    else:
        return render_template("register.html", title="Register")


@app.route("/login/", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("login.html")
    else:
        u = request.form["username"]
        p = request.form["password"]
        data = User.query.filter_by(username=u).first()
        if data is not None:
            if check_password_hash(data.password, p):
                session["logged_in"] = True
                session["username"] = u
                session["user_id"] = data.id
                return redirect(url_for("index"))
        return render_template("index.html", message="Incorrect Details", title="Login")


@app.route("/logout", methods=["GET", "POST"])
def logout():
    session["logged_in"] = False
    session["username"] = None
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.secret_key = "ThisIsNotASecret:p"
    db.create_all()
    app.run(debug=True)
