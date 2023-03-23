from flask import Flask, redirect, url_for, request

app = Flask(__name__)

@app.route('/success/<name>')
def success(name):
   return 'welcome %s' % name

@app.route('/login',methods = ['POST', 'GET'])
def login():
   if request.method == 'POST':
      user = request.form['Name']
      password = request.form['Password']
      print(password)
      return redirect(url_for('success',name = user))
   else:
      user = request.args.get('Name')
      return redirect(url_for('success',name = user))
