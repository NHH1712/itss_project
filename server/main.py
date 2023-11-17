import uvicorn
from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware, db

from schema import PostTag as SchemaPostTag
from schema import CommentVote as SchemaCommentVote
from schema import Posts as SchemaPosts
from schema import Tags as SchemaTags
from schema import PostVote as SchemaPostVote
from schema import Comments as SchemaComments
from schema import Users as SchemaUsers

from models import PostTag as ModelPostTag
from models import CommentVote as ModelCommentVote
from models import Posts as ModelPosts
from models import Tags as ModelTags
from models import PostVote as ModelPostVote
from models import Comments as ModelComments
from models import Users as ModelUsers

import os
from dotenv import load_dotenv

load_dotenv('.env')


app = FastAPI()

# to avoid csrftokenError
app.add_middleware(DBSessionMiddleware, db_url=os.environ['DATABASE_URL'])

@app.get("/")
async def root():
    return {"message": "hello world"}

@app.get('/posts/')
async def post():
    post = db.session.query(ModelPosts).all()
    return post

@app.post('/posts/', response_model=SchemaPosts)
async def post(book: SchemaPosts):
    db_post = ModelPosts(user_id=book.user_id, title=book.title, description=book.description, image_url=book.image_url)
    db.session.add(db_post)
    db.session.commit()
    return db_post

@app.post('/users/', response_model=SchemaUsers)
async def user(user: SchemaUsers):
    db_user = ModelUsers(name=user.name, username=user.username, password=user.password, classname=user.classname, grade=user.grade, avatar_url=user.avatar_url, cover_image_url=user.cover_image_url)
    db.session.add(db_user)
    db.session.commit()
    return db_user

# To run locally
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)