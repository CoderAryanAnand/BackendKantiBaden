from flask import Blueprint, flash, g, redirect, render_template, request
from werkzeug.exceptions import abort

from flaskr.auth import login_required
from flaskr.db import get_db, init_db

bp = Blueprint("blog", __name__)


@bp.route("/")
def home():
    return render_template("Games/Home.html")


@bp.route("/<game>", methods=("GET", "POST"))
def index(game):
    db = get_db()
    games = db.execute(
        "SELECT p.id, link, created, author_id, uname, game"
        " FROM game p JOIN user u ON p.author_id = u.id"
        " WHERE game = ?",
        (game,),
    ).fetchall()
    return render_template("Games/" + game + ".html", games=games)


@bp.route("/<game>/create", methods=("GET", "POST"))
@login_required
def create(game):
    if request.method == "POST":
        uname = request.form["uname"]
        link = request.form["link"]
        code = request.form["code"]
        error = None

        if not uname:
            error = "Title is required."

        if error is not None:
            print(error)
        else:
            print(uname)
            print(link)
            print(code)
            db = get_db()
            db.execute(
                "INSERT INTO game (uname, link, author_id, game)"
                " VALUES (?, ?, ?, ?)",
                (uname, link, g.user["id"], game),
            )
            db.commit()
            return redirect("/" + game)

    return render_template("Games/create.html")


def get_game(id, check_author=True):
    game = (
        get_db()
        .execute(
            "SELECT p.id, link, created, author_id, uname"
            " FROM game p JOIN user u ON p.author_id = u.id"
            " WHERE p.id = ?",
            (id,),
        )
        .fetchone()
    )

    if game is None:
        abort(404, f"Game id {id} doesn't exist.")

    if check_author and game["author_id"] != g.user["id"]:
        abort(403)

    return game


@bp.route("/<game>/<int:id>/update", methods=("GET", "POST"))
@login_required
def update(game, id):
    game = get_game(id)

    if request.method == "POST":
        title = request.form["title"]
        body = request.form["body"]
        error = None

        if not title:
            error = "Title is required."

        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                "UPDATE game SET title = ?, body = ?" " WHERE id = ?", (title, body, id)
            )
            db.commit()
            return redirect("/G" + game)

    return render_template("blog/update.html", game=game)


@bp.route("/<int:id>/delete", methods=("POST",))
@login_required
def delete(id):
    get_game(id)
    db = get_db()
    db.execute("DELETE FROM game WHERE id = ?", (id,))
    db.commit()
    return redirect("/G" + id)
