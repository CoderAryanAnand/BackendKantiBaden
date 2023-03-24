from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from flaskr.auth import login_required
from flaskr.db import get_db

bp = Blueprint('blog', __name__)

@bp.route('/')
def home():
    return render_template('games/Home.html')
@bp.route('/games/<game_id>')
def index(game_id):
    db = get_db()
    posts = db.execute(
        'SELECT p.id, title, body, created, author_id, username, game_id'
        ' FROM post p JOIN user u ON p.author_id = u.id'
        ' WHERE game_id = ?',
        (game_id,)).fetchall()
    return render_template('Games/G'+(game_id)+'.html', posts=posts)


@bp.route('/games/<game_id>/create', methods=('GET', 'POST'))
@login_required
def create(game_id):
    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None

        if not title:
            error = 'Title is required.'

        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'INSERT INTO post (title, body, author_id, game_id)'
                ' VALUES (?, ?, ?, ?)',
                (title, body, g.user['id'],game_id)
            )
            db.commit()
            return redirect("/games/"+game_id)

    return render_template('blog/create.html')


def get_post(id, check_author=True):
    post = get_db().execute(
        'SELECT p.id, title, body, created, author_id, username'
        ' FROM post p JOIN user u ON p.author_id = u.id'
        ' WHERE p.id = ?',
        (id,)
    ).fetchone()

    if post is None:
        abort(404, f"Post id {id} doesn't exist.")

    if check_author and post['author_id'] != g.user['id']:
        abort(403)

    return post


@bp.route('/games/<game_id>/<int:id>/update', methods=('GET', 'POST'))
@login_required
def update(game_id, id):
    post = get_post(id)

    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None

        if not title:
            error = 'Title is required.'

        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'UPDATE post SET title = ?, body = ?'
                ' WHERE id = ?',
                (title, body, id)
            )
            db.commit()
            return redirect("/games/"+game_id)

    return render_template('blog/update.html', post=post)


@bp.route('/<int:id>/delete', methods=('POST',))
@login_required
def delete(id):
    get_post(id)
    db = get_db()
    db.execute('DELETE FROM post WHERE id = ?', (id,))
    db.commit()
    return redirect("/games/"+game_id)
