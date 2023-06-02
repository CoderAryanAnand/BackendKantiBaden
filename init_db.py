from app import db, Game, Comment, User
from werkzeug.security import generate_password_hash

post1 = Game(
    title="Chess2",
    name="Chess2/201",
    authors="Jan,Ramona,Paula",
    description='Neue Charaktere die Verschiedenstes können; erklärt in "Characters" im Spiel.',
)



post3 = Game(
    title="Minesweeper",
    name="203",
    authors="Tim",
    description="Unter 20 der 100 Felder sind Bomben auf die man nicht klicken darf. MB um Feld aufzudecken, RMB um Feld mit Flagge zu markieren Sobald ein Feld aufgedeckt ist, wird angezeigt, wieviele bomben an den 8 anliegenden Feldern sich befinden. Um das Spiel zu gewinnen entweder alle Bomben mit Flaggen markieren oder alle Felder ohne Bombe aufdecken."
)

post4 = Game(
    title="Crypto Miner",
    name="websitestart-main/cookie-index",
    authors="Cédric, Rafael, Andrei",
    description="Cookie Clicker but Bitcoin themed. Man kann klicken est gibt Autoclicker und Upgrades für deine Klicks.",
)


post5 = Game(
    title="PacMan",
    name="Abgabe GitHub/src/205",
    authors="Celine und Zuzanna",
    description="Pacman",
)

post6 = Game(
    title="Snake",
    name="206",
    authors="Meret und Bhavatarini",
    description="Snake ist ein Klassiker der Arcade-Spiele, den es seit den frühen 1970er Jahren gibt. Bei diesem Spiel geht es darum, eine Schlange zu steuern und sie zu füttern, so dass sie länger und länger wird. Der Spieler steuert die Schlange, indem er sie in verschiedene Richtungen bewegt, um herumliegendes Futter zu fressen. Pass auf, dass du nicht die Wände oder deinen eigenen Körper triffst!",
)

post7 = Game(
    title="Pacman",
    name="pacman/index",
    authors="Manuel und Iva",
    description="In unserem vereinfachten Pacman Game begegnen Schüler*innen Geistern als ihren Gegner. Ziel: alle Pellets einzusammeln ohne von den Geistern gefressen zu werden!"
)


post9 = Game(
    title="209 Game 1",
    name="209",
    authors="Nino,Vineet,Maxime",
    description="Click auf cookie, kaufe upgrades und autoklicker und mache weiter, bis du infinity erreichts"
)
post10 = Game(
    title="Color By Number",
    name="210",
    authors="Anisha and Freja",
    description="Man kann auf die Farbe klickn und dann auf die einzelnen felder,welche mit einer Zahlbeschriftet sind. Es gibt ein Spiel PixelArt, welches wir oft spielen und das war unsere Inspiration."
)

user1 = User(
    username="admin",
    password=generate_password_hash("password"),
)

user2 = User(
    username="SirCraft007",
    password=generate_password_hash("1234"),
    )


db.session.add_all([post1, post3, post4,post5,post6,post7, post9,post10, user1, user2])

db.session.commit()
