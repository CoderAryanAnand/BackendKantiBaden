from flask import Flask
from flask import request

app = Flask(__name__)


def html_drumherum(html_body):
    """Ergänzt den html_body und gibt ein vollständiges HTML-Dokument als str
    zurück. Eleganter sind Flask-Templates.
    """
    ret = """<!DOCTYPE html>\n<html lang="de">
    <head>
        <title>gamesg1b</title>
        <link href="https://inf.kanti-baden.ch/site-css/code-style.css"
              rel="stylesheet"/>
    </head>
    <body>"""
    ret += html_body + "\n    </body>\n</html>"
    return ret


# @app.route('/') bewirkt, dass beim Aufruf der Seite
# https://inf.kanti-baden.ch/gamesg1b
# die darauf folgende Funktion aufgerufen wird
@app.route("/")
def wie_index():
    """Reagiert wie der Aufruf der Seite
    https://inf.kanti-baden.ch/site-css/gamesg1b/index.html"""
    return index()


# @app.route('/index.html') bewirkt, dass bei Aufruf der Seite
# https://inf.kanti-baden.ch/gamesg1b/index.html
# die Funktion index() aufgerufen wird.
# Dieses @-Gebilde wird Dekorateur (engl. decorator) genannt.
@app.route("/index.html", methods=["GET", "POST"])
def index():
    """Es ist Konvetion, dass die Hauptseite index.html heisst
    """
    # Strings mit mehreren Zeilen kommen zwischen Dreifach-Anführungszeichen
    return html_drumherum(
        """
        <h1>Hautseite des Projekts gamesg1b</h1>
        <p>Dies ist ein Rahmen für Ihr Porjekt. Es soll Ihnen einen
            schnellen Einstieg in 5 Schritten ermöglichen.</p>
        <p>Versuchen Sie nachzuvollziehen wie das Aussehen Ihrer
            Webseite mit dem Programm <code>gamesg1b.py</code> zusammenhängt.
            Sie finden diese Datei in Ihrem Heimat-Ordner unter
            <code>projects/gamesg1b/</code>. Dies demonstriert eine statische
            HTML-Seite, d.h. der Text ist nicht variabel
            und es gibt keine Eingaben (Formulare).</p>
        <p><b>Aufgabe: </b>Ändern Sie die Hauptseite und machen Sie daraus
            eine ersten Entwurf Ihres Projekts. Beschränken Sie sich
            auf wenig Text und eine statische Seite.</p>
        <p>Weiter zu <a href="schritt2.html">Schritt 2</a></p>"""
    )


# Der Dekorateur @app.route('/schritt2.html') bewirkt, dass bei Aufruf der Seite
# https://inf.kanti-baden.ch/gamesg1b/schritt2.html
# die Funktion schritt2() aufgerufen wird
@app.route("/schritt2.html", methods=["GET", "POST"])
def schritt2():
    """Aktive Seite mit variablen Inhalten und einem Web-Formular.
    """
    import random

    hello = ["Hello", "Hallo", "Salut", "Ciao", "Hola", "Hi"]
    user = request.environ.get("REMOTE_USER", "User")  # Login Benutzername
    greeting = "<h2>" + hello[random.randrange(6)] + " " + user + "!</h2>"
    return html_drumherum(
        """
        <h1>Aktive Webseite</h1>"""
        + greeting
        + """
        <p>Wenn Sie die Webseite neu laden, dann werden Sie
            wahrscheinlich auf eine andere Weise gegrüsst, die Webseite
            kann also Inhalte von Variablen einbinden.</p>
        <p>Laden Sie diese Seite einige Male neu
            und beobachten Sie die Änderungen in der 2. Zeile.</p>
        <h2>Ein einfaches Formular mit einem Textfeld erstellen</h2>
        <p>Lösen Sie folgende Rechenaufgabe. Durch das klicken des Knopfes
            Senden (engl. submit) wird der Inhalt des Formulars an
            den Server geschickt und die nächste Seite (schritt3.html)
            aufgerufen. Suchen Sie diese Stelle im Quellcode und
            verleichen Sie sorgfältig!</p>
        <form action="schritt3.html" method="post">
            <label>17 + 4 =
            <input type="text" name="summe"/></label>
            <input type="submit" value="Senden"/>
        </form>"""
    )


# @app.route() stellt auch die Variable request zur Verfügung. Darin finden Sie
# beispielsweise Formular-Daten, die Request-Methode ("GET" bzw. "POST") und
# vieles mehr. @app.route erweitert (dekoriert) die Funktion schritt3.
@app.route("/schritt3.html", methods=["GET", "POST"])
def schritt3():
    """Aktive Seite, die die Eingaben in Schritt 2 bearbeitet.
    """
    # Antwort des letzten Formulars auswerten
    if request.method == "POST":
        antwort = request.form["summe"]
    else:
        antwort = "NICHTS"
    if antwort == "21":
        kommentar_zur_antwort = "Ihr Resultat ist korrekt."
    else:
        kommentar_zur_antwort = "Ihr Resultat ist nicht korrekt."

    return html_drumherum(
        '''
        <h2>Request -- eine Webseite anfordern</h2>
        <p>Üblicherweise sendet eine Webserver Daten (z.B. HTML) zum Browser.
            Dies nennt man einen "GET request". Wenn Sie ein Webformular
            ausfüllen, dann werden aber Daten vom Browser (client) zum
            Server geschickt. Dabei wird vom Browser ein so genannter
            "POST request" an den Server übermittelt.</p>
        <p>Als Ergebnis der letzten Rechenaufgabe haben Sie "'''
        + antwort
        + '" angegeben. '
        + kommentar_zur_antwort
        + '<p>Um diese Webseite zu sehen hat Ihr Browser einen HTTP "'
        + request.method
        + """" request angefordert.</p>
        <p>Weiter zu <a href="schritt4.html">Schritt 4</a>.</p>
        """
    )


@app.route("/schritt4.html", methods=["GET", "POST"])
def schritt4():
    """Je nach Eingabe, unterscheidet sich der Inhalt der Webseite.
    """
    formular = """
        <p>Dieses Formular illustiert das Feld "checkbox" und die Verwendung
        des Datentyps "ImmutableMultiDict", in welchem alle Formulardaten
        abespeichert sind. </p>
        <p>Beantworten Sie die Rechenaufgabe erst falsch.
        Nur mit der richtigen Antwort kommen Sie zum nächsten Schritt.</p>
        <!-- Mit sumbit wird dieselbe Python-Funktion aufgerufen. -->
        <form action="schritt4.html" method="post">
            <label for="name">Ihr Name: </label>
            <input type="text" id="name" name="name">
            <p>Ihre Hobbys:
                <label for="buch">Bücher lesen:</label>
                <input type="checkbox" id="buch"  name="hobby" value="Buch"/>
                <label for="musik">Musik hören:</label>
                <input type="checkbox" id="musik" name="hobby" value="Musik"/>
                <label for="film">Filme sehen:</label>
                <input type="checkbox" id="film"  name="hobby" value="Film"/>
            </p><label for="summe">Rechenaufgabe: 17 + 5 =
                <input type="text" size="4" id="summe" name="summe"></label>
            <input type="submit" value="Senden"/>
        </form>"""
    if request.method == "POST":
        # Antwort auswerten und HTML anpassen
        if request.form["summe"] == "22":
            kommentar_zur_antwort = """
                <p>Ihre Antwort ist richtig.</p>
                <p> Weiter zu <a href="schritt5.html">Schritt 5</a></p>
                """
        else:
            kommentar_zur_antwort = """
                <p>Ihre Antwort ist falsch. Versuchen Sie es nochmal.</p>"""

        return html_drumherum(
            """
            <h2>Hallo """
            + request.form["name"]
            + """ (POST-request)</h2>
            <p>Inhalt von <code>request.form</code>:</p>
            <pre><code>"""
            + str(request.form)
            + """
            </code></pre>
            <p> Beachten Sie folgende wesentliche Unterschiede zu Standard
                Python dictionaries:</p>
            <ul><li>Wenn Sie mehrere Hobbys ausgewählt haben, ist die
                    Variable <code>request.form["hobby"]</code> mehrfach
                    belegt.</li>
                <li>Wenn Sie kein Hobby ausgewählt haben, existiert die
                    Variable <code>request.form["hobby"]</code> nicht.</li>
            </ul>
            """
            + formular
            + "<h2>Zur Rechenaufgabe</h2>"
            + kommentar_zur_antwort
        )
    else:
        return html_drumherum(
            "<h2>Willkommen zu Schritt 4 (GET-request)</h2>" + formular
        )


# TODO: REMOVE
# if request.method == 'POST':
# return html.format(request.method,
# request.form.get('x', 'value if not defined'),
# str(request.form),
# request.form.getlist('check'),
#'')
# else:
# return html.format(request.method,
# request.args.get('x', 'value if not defined'),
# str(request.args),
# request.args.getlist('check'),
#'')


@app.route("/schritt5.html", methods=["GET", "POST"])
def schritt5():
    """Weiterführede Links
    """
    selfhtm = "https://wiki.selfhtml.org/wiki/HTML/Tutorials/Formulare/"
    inf = "https://inf.kanti-baden.ch/debug/gamesg1b/"
    return html_drumherum(
        '''
        <h2>Weiteres Vorgehen</h2>
        <p>Was Sie sonst noch brauchen könnten:</p>
        <ol><li>Die Debug-Version ihres Projekts ist
                (nur für Projekt-Mitglieder) mit
                <a href="'''
        + inf
        + """">"""
        + inf
        + '''</a> abrufbar.
                Sie gibt im Bedarfsfall ausführliche Fehlermeldungen aus.</li>
            <li>Weitere HTML-Formular-Felder:
                <a href="'''
        + selfhtm
        + '''input/Radio-Buttons_und_Checkboxen">
                    Radio-Buttons und Checkboxen</a>,
                <a href="'''
        + selfhtm
        + '''Auswahllisten">
                    Auswahllisten</a> und
                <a href="'''
        + selfhtm
        + """textarea">
                    textarea</a></li>
        </ol>"""
    )


## TODO: correct???????????????? -- see flask home page
# if __name__ == "__main__":
# app.secret_key = os.urandom(12)
# app.run(debug=True)
# import os
# HOST = os.environ.get('SERVER_HOST','localhost')
# try:
# PORT = int(os.environ.get ('SERVER_PORT', '5555'))
# except ValueError:
# PORT = 5555
# app.run(HOST, PORT)
# else:
# from werkzeug.debug import DebuggedApplication
# app.debug = True
# app.secret_key = os.urandom(12)
##app.debug = True  # Enable reloader and debugger
##from werkzeug.debug import DebuggedApplication
##app = DebuggedApplication(app, True)
