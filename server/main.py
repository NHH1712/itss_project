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


# To run locally
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)