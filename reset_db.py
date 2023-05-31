from app import db
import os

db.drop_all()
db.create_all()
os.system('python3 init_db.py')