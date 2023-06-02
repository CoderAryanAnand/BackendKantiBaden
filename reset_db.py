from app import db
import os

db.drop_all()
db.create_all()
if os.name == "nt":
    os.system('python init_db.py')
else:
    os.system("python3 init_db.py")