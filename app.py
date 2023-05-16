from flask import Flask, url_for, render_template, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

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


@app.route('/', methods=['GET'])
def index():
    if session.get('logged_in'):
        return render_template('home.html')
    else:
        return render_template('index.html', message="Hello!")

<<<<<<< HEAD
<<<<<<< HEAD
@app.route("/G1", methods=["GET", "POST"])
def game_1():
    username = session["username"]
    print(username, file=sys.stderr)
    return render_template("G1.html", username)

<<<<<<< HEAD
=======
>>>>>>> parent of 6c350bc (game database, game implementation)

=======
>>>>>>> parent of 5e23ebb (games can now be implemented)
=======

@app.route("/Games/<game>", methods=("GET", "POST"))
def game_1(game):
    return render_template("Games/" + game + ".html")


>>>>>>> 5e23ebbd2b1ce952ccb70ebfca13fea11ade2bac
@app.route('/register/', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        try:
<<<<<<< HEAD
            db.session.add(User(username=request.form['username'], password=generate_password_hash(request.form['password'])))
=======
            db.session.add(
                User(username=request.form['username'], password=generate_password_hash(request.form['password'])))
>>>>>>> 5e23ebbd2b1ce952ccb70ebfca13fea11ade2bac
            db.session.commit()
            return redirect(url_for('login'))
        except:
            return render_template('index.html', message="User Already Exists")
    else:
        return render_template('register.html')


@app.route('/login/', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        u = request.form['username']
        p = request.form['password']
        data = User.query.filter_by(username=u).first()
<<<<<<< HEAD
<<<<<<< HEAD
        print(data, sys.stderr)
=======
        print(data)
>>>>>>> parent of 6c350bc (game database, game implementation)
=======
        print(data)
>>>>>>> 5e23ebbd2b1ce952ccb70ebfca13fea11ade2bac
        if data is not None:
            if check_password_hash(data.password, p):
                session['logged_in'] = True
                return redirect(url_for('index'))
        return render_template('index.html', message="Incorrect Details")


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session['logged_in'] = False
    return redirect(url_for('index'))

<<<<<<< HEAD
if __name__ == '__main__':
    app.secret_key = "ThisIsNotASecret:p"
    db.create_all()
    app.run()
=======

if __name__ == '__main__':
    app.secret_key = "ThisIsNotASecret:p"
    db.create_all()
    app.run(debug=True)
>>>>>>> 5e23ebbd2b1ce952ccb70ebfca13fea11ade2bac
