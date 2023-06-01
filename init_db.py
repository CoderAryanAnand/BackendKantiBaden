from app import db, Game, Comment

post1 = Game(
    title="Color By Number", name="210", authors="Anisha and Freja", description="..."
)
post2 = Game(
    title="209 Game 1", name="209", authors="Nino,Vineet,Maxime", description="Mein Gott"
)

post3 = Game(
    title="Relax",
    name="208",
    authors="Serafino",
    description="This polyrhythmic (definition below) spiral effect was inspired by the awesome work of @project_jdm on YouTube.It was created from scratch with plain old js on the canvas. I basically just reverse engineered the one in his video here (https://youtu.be/4GaGnU8Ij2Y) to the best of my ability and then kinda morphed it into my own thing. It took a long freakin time.I didn't know what polyrhythms were before seeing his content so I had to ask ChatGPT. I then had to ask ChatGPT again, but this time to explain like I'm 5 years old. Here is what it said: You know when you're on a swing? Imagine there are two swings side by side. Your friend is swinging three times for every two times you swing. So, sometimes you're at the top together, but other times, you're not. When you're both at the top at the same time, that's like a polyrhythm in music. Two different beats, syncing up at special moments.Anyways, in the settings object below I have outlined a few different parameters to make it easier to modify some of the core features i.e. start time, total duration, number of cycles, etc.I didn't know a good way to get instrument sound effects, in particular multiple octaves worth, so I made my own on SoundTrap using the vibraphone. A couple other options are also listed below.",
)
post4 = Game(
    title="Minesweeper", name="203", authors="Tim", description="Unter 20 der 100 Felder sind Bomben auf die man nicht klicken darf. MB um Feld aufzudecken, RMB um Feld mit Flagge zu markieren Sobald ein Feld aufgedeckt ist, wird angezeigt, wieviele bomben an den 8 anliegenden Feldern sich befinden. Um das Spiel zu gewinnen entweder alle Bomben mit Flaggen markieren oder alle Felder ohne Bombe aufdecken."
)
post5 = Game(
    title="Pacman", name="pacman/index", authors="Manuel und Iva", description="..."
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
    description="Chess2",
)
post9 = Game(
    title="Crypto Miner",
    name="websitestart-main/cookie-index",
    authors="Cédric, Rafael, Andrei",
    description="Cookie Clicker but Bitcoin themed. Man kann klicken est gibt Autoclicker und Upgrades für deine Klicks.",
)

db.session.add_all([post1, post2, post3, post4,post5,post6,post7,post8, post9])

db.session.commit()
