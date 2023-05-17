from flask import Flask, url_for, render_template, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
# TODO add authors to game table

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.app_context().push()
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))

    def __init__(self, username, password):
        self.username = username
        self.password = password


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    authors = db.Column(db.String(100))
    title = db.Column(db.String(100))
    description = db.Column(db.Text)
    comments = db.relationship('Comment', backref='game')

    def __repr__(self):
        return f'<Game "{self.title}">'


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(100))
    content = db.Column(db.Text)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'))

    def __repr__(self):
        return f'<Comment "{self.content[:20]}...">'


@app.route('/', methods=['GET'])
def index():
    if session.get('logged_in'):
        # return render_template('home.html', title='Home')
        games = Game.query.all()
        return render_template('home_new.html', title='Home', games=games)
    else:
        return render_template('index.html', message="Hello!", title="Login")


# @app.route("/Games/<game>", methods=("GET", "POST"))
# def game_1(game):
#     return render_template("Games/" + game + ".html", title="Game 1")
#
@app.route("/<int:game_id>", methods=("GET", "POST"))
def game_(game_id):
    game = Game.query.get_or_404(game_id)
    if request.method == 'POST':
        comment = Comment(content=request.form['content'], game=game, author=session["username"])
        db.session.add(comment)
        db.session.commit()
        return redirect(url_for('game_', game_id=game.id))
    name = game.name
    return render_template("Games/" + name + ".html", title=game.title, game=game)


@app.route('/register/', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        try:
            db.session.add(
                User(username=request.form['username'], password=generate_password_hash(request.form['password'])))
            db.session.commit()
            return redirect(url_for('login'))
        except:
            return render_template('index.html', message="User Already Exists")
    else:
        return render_template('register.html', title="Register")


@app.route('/login/', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        u = request.form['username']
        p = request.form['password']
        data = User.query.filter_by(username=u).first()
        print(data)
        if data is not None:
            if check_password_hash(data.password, p):
                session['logged_in'] = True
                session["username"] = u
                return redirect(url_for('index'))
        return render_template('index.html', message="Incorrect Details", title="Login")


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session['logged_in'] = False
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.secret_key = "ThisIsNotASecret:p"
    db.create_all()
    app.run(debug=True)