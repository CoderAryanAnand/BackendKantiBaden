from app import db, Game, Comment, User
from werkzeug.security import generate_password_hash

post1 = Game(
    title="Color By Number",
    name="210",
    authors="Anisha and Freja",
    description="..."
)
post2 = Game(
    title="Cookie clicker",
    name="209",
    authors="Nino,Vineet,Maxime",
    description="[8:00 am]click auf cookie, kaufe upgrades und auto klicker und mache weiter bis du infinity erreichts"
)

post3 = Game(
    title="Relax",
    name="208",
    authors="Serafino",
    description="This polyrhythmic spiral effect was inspired by @project_jdm on YouTube. I created it from scratch using JavaScript on the canvas. It took a long time to make. Polyrhythms are like when you and your friend are swinging on swings. Your friend swings three times for every two swings you take. Sometimes you're at the top together, but other times you're not. In music, when two different beats sync up at special moments, it's like a polyrhythm. The settings below help modify the core features of the effect. I made my own instrument sound effects on SoundTrap using the vibraphone.",
)
post4 = Game(
    title="Minesweeper",
    name="203", authors="Tim",
    description="Unter 20 der 100 Felder sind Bomben auf die man nicht klicken darf. MB um Feld aufzudecken, RMB um Feld mit Flagge zu markieren Sobald ein Feld aufgedeckt ist, wird angezeigt, wieviele bomben an den 8 anliegenden Feldern sich befinden. Um das Spiel zu gewinnen entweder alle Bomben mit Flaggen markieren oder alle Felder ohne Bombe aufdecken."
)
post5 = Game(
    title="Pacman",
    name="pacman/index",
    authors="Manuel und Iva",
    description="..."
)
post6 = Game(
    title="PacMan",
    name="Abgabe GitHub/src/205",
    authors="Celine und Zuzanna",
    description="Pacman",
)
post7 = Game(
    title="Snake",
    name="206",
    authors="Meret und Bhavatarini",
    description="Snake ist ein Klassiker der Arcade-Spiele, den es seit den frühen 1970er Jahren gibt. Bei diesem Spiel geht es darum, eine Schlange zu steuern und sie zu füttern, so dass sie länger und länger wird. Der Spieler steuert die Schlange, indem er sie in verschiedene Richtungen bewegt, um herumliegendes Futter zu fressen. Pass auf, dass du nicht die Wände oder deinen eigenen Körper triffst!",
)
post8 = Game(
    title="Chess2",
    name="Chess2/201",
    authors="Jan,Ramona,Paula",
    description="Neue Charaktere die Verschiedenstes können; erklärt in 'Characters' im Spiel.",
)
post9 = Game(
    title="Crypto Miner",
    name="websitestart-main/cookie-index",
    authors="Cédric, Rafael, Andrei",
    description="Cookie Clicker but Bitcoin themed. Man kann klicken est gibt Autoclicker und Upgrades für deine Klicks.",
)
user1 = User(
    username="admin",
    password='pbkdf2:sha256:260000$wCAHKn1N2aEpnOFl$7538f442d24b45bbfa53768ca8b69621b75628b1c454b83372899d389e01e3ab',
)
user2 = User(
    username="SirCraft007",
    password=generate_password_hash("1234"),
)

#post_ = Game(
#    title="",
#    name="",
#    authors="",
#    description="",
#)

db.session.add_all([post1, post2, post3, post4,post5,post6,post7,post8, post9, user1, user2])


db.session.commit()
