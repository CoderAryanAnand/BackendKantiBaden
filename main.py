from flask import Flask, redirect, url_for, request

def create_app():
    app = Flask(__name__)

    return app


@app.route('/success/<name>')
def success(name):
    return 'welcome %s' % name


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        user = request.form['Name']
        password = request.form['Password']
        print(password)
        return redirect(url_for('success', name=user))
    else:
        user = request.args.get('Name')
        return redirect(url_for('success', name=user))
