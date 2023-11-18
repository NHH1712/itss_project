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

# User crud
@app.get('/users/')
async def get_users():
    user = db.session.query(ModelUsers).all()
    return user
@app.get('/users/{user_id}')   
async def get_user(user_id: int):
    user = db.session.query(ModelUsers).filter(ModelUsers.id == user_id).first()
    return user
@app.post('/users/', response_model=SchemaUsers)
async def user(user: SchemaUsers):
    db_user = ModelUsers(name=user.name, username=user.username, password=user.password, classname=user.classname, grade=user.grade, avatar_url=user.avatar_url, cover_image_url=user.cover_image_url)
    db.session.add(db_user)
    db.session.commit()
    return db_user
@app.put('/users/{user_id}', response_model=SchemaUsers)
async def update_user(user_id: int, user: SchemaUsers):
    db_user = db.session.query(ModelUsers).filter(ModelUsers.id == user_id).first()
    db_user.name = user.name
    db_user.username = user.username
    db_user.password = user.password
    db_user.classname = user.classname
    db_user.grade = user.grade
    db_user.avatar_url = user.avatar_url
    db_user.cover_image_url = user.cover_image_url
    db.session.commit()
    return db_user
@app.delete('/users/{user_id}')
async def delete_user(user_id: int):
    db_user = db.session.query(ModelUsers).filter(ModelUsers.id == user_id).first()
    db.session.delete(db_user)
    db.session.commit()
    return {'message': 'User has been deleted successfully'}

# Tags crud 
@app.get('/tags/')
async def get_tags():
    tag = db.session.query(ModelTags).all()
    return tag
@app.get('/tags/{tag_id}')
async def get_tag(tag_id: int):
    tag = db.session.query(ModelTags).filter(ModelTags.id == tag_id).first()
    return tag
@app.post('/tags/', response_model=SchemaTags)
async def tag(tag: SchemaTags):
    db_tag = ModelTags(name=tag.name)
    db.session.add(db_tag)
    db.session.commit()
    return db_tag
@app.put('/tags/{tag_id}', response_model=SchemaTags)
async def update_tag(tag_id: int, tag: SchemaTags):
    db_tag = db.session.query(ModelTags).filter(ModelTags.id == tag_id).first()
    db_tag.name = tag.name
    db.session.commit()
    return db_tag
@app.delete('/tags/{tag_id}')
async def delete_tag(tag_id: int):
    db_tag = db.session.query(ModelTags).filter(ModelTags.id == tag_id).first()
    db.session.delete(db_tag)
    db.session.commit()
    return {'message': 'Tag has been deleted successfully'}

# Posts crud
@app.get('/posts/')
async def get_posts():
    post = db.session.query(ModelPosts).all()
    return post
@app.get('/posts/{post_id}')
async def get_post(post_id: int):
    post = db.session.query(ModelPosts).filter(ModelPosts.id == post_id).first()
    return post
@app.post('/posts/', response_model=SchemaPosts)
async def post(post: SchemaPosts):
    db_post = ModelPosts(user_id=post.user_id, title=post.title, description=post.description, image_url=post.image_url)
    db.session.add(db_post)
    db.session.commit()
    return db_post
@app.put('/posts/{post_id}', response_model=SchemaPosts)
async def update_post(post_id: int, post: SchemaPosts):
    db_post = db.session.query(ModelPosts).filter(ModelPosts.id == post_id).first()
    db_post.user_id = post.user_id
    db_post.title = post.title
    db_post.description = post.description
    db_post.image_url = post.image_url
    db.session.commit()
    return db_post
@app.delete('/posts/{post_id}')
async def delete_post(post_id: int):
    db_post = db.session.query(ModelPosts).filter(ModelPosts.id == post_id).first()
    db.session.delete(db_post)
    db.session.commit()
    return {'message': 'Post has been deleted successfully'}

# Post tag crud
@app.get('/post_tag/')
async def get_all_post_tag():
    post_tag = db.session.query(ModelPostTag).all()
    return post_tag
@app.get('/post_tag/{post_tag_id}')
async def get_post_tag(post_tag_id: int):
    post_tag = db.session.query(ModelPostTag).filter(ModelPostTag.id == post_tag_id).first()
    return post_tag
@app.post('/post_tag/', response_model=SchemaPostTag)
async def post_tag(post_tag: SchemaPostTag):
    db_post_tag = ModelPostTag(post_id=post_tag.post_id, tag_id=post_tag.tag_id)
    db.session.add(db_post_tag)
    db.session.commit()
    return db_post_tag
@app.put('/post_tag/{post_tag_id}', response_model=SchemaPostTag)
async def update_post_tag(post_tag_id: int, post_tag: SchemaPostTag):
    db_post_tag = db.session.query(ModelPostTag).filter(ModelPostTag.id == post_tag_id).first()
    db_post_tag.post_id = post_tag.post_id
    db_post_tag.tag_id = post_tag.tag_id
    db.session.commit()
    return db_post_tag
@app.delete('/post_tag/{post_tag_id}')
async def delete_post_tag(post_tag_id: int):
    db_post_tag = db.session.query(ModelPostTag).filter(ModelPostTag.id == post_tag_id).first()
    db.session.delete(db_post_tag)
    db.session.commit()
    return {'message': 'Post tag has been deleted successfully'}

# Comment vote crud
@app.get('/comment_vote/')
async def get_all_comment_vote():
    comment_vote = db.session.query(ModelCommentVote).all()
    return comment_vote
@app.get('/comment_vote/{comment_vote_id}')
async def get_comment_vote(comment_vote_id: int):
    comment_vote = db.session.query(ModelCommentVote).filter(ModelCommentVote.id == comment_vote_id).first()
    return comment_vote
@app.post('/comment_vote/', response_model=SchemaCommentVote)
async def comment_vote(comment_vote: SchemaCommentVote):
    db_comment_vote = ModelCommentVote(user_id=comment_vote.user_id, comment_id=comment_vote.comment_id)
    db.session.add(db_comment_vote)
    db.session.commit()
    return db_comment_vote
@app.put('/comment_vote/{comment_vote_id}', response_model=SchemaCommentVote)
async def update_comment_vote(comment_vote_id: int, comment_vote: SchemaCommentVote):
    db_comment_vote = db.session.query(ModelCommentVote).filter(ModelCommentVote.id == comment_vote_id).first()
    db_comment_vote.user_id = comment_vote.user_id
    db_comment_vote.comment_id = comment_vote.comment_id
    db.session.commit()
    return db_comment_vote
@app.delete('/comment_vote/{comment_vote_id}')
async def delete_comment_vote(comment_vote_id: int):
    db_comment_vote = db.session.query(ModelCommentVote).filter(ModelCommentVote.id == comment_vote_id).first()
    db.session.delete(db_comment_vote)
    db.session.commit()
    return {'message': 'Comment vote has been deleted successfully'}
# Comments
@app.get('/comments/')
async def get_comments():
    comment = db.session.query(ModelComments).all()
    return comment
@app.get('/comments/{comment_id}')
async def get_comment(comment_id: int):
    comment = db.session.query(ModelComments).filter(ModelComments.id == comment_id).first()
    return comment
@app.post('/comments/', response_model=SchemaComments)
async def comment(comment: SchemaComments):
    db_comment = ModelComments(user_id=comment.user_id, post_id=comment.post_id, content=comment.content)
    db.session.add(db_comment)
    db.session.commit()
    return db_comment
@app.put('/comments/{comment_id}', response_model=SchemaComments)
async def update_comment(comment_id: int, comment: SchemaComments):
    db_comment = db.session.query(ModelComments).filter(ModelComments.id == comment_id).first()
    db_comment.user_id = comment.user_id
    db_comment.post_id = comment.post_id
    db_comment.content = comment.content
    db.session.commit()
    return db_comment
@app.delete('/comments/{comment_id}')
async def delete_comment(comment_id: int):
    db_comment = db.session.query(ModelComments).filter(ModelComments.id == comment_id).first()
    db.session.delete(db_comment)
    db.session.commit()
    return {'message': 'Comment has been deleted successfully'}
# Post vote crud
@app.get('/post_vote/')
async def get_post_vote():
    post_vote = db.session.query(ModelPostVote).all()
    return post_vote
@app.get('/post_vote/{post_vote_id}')
async def get_post_vote(post_vote_id: int):
    post_vote = db.session.query(ModelPostVote).filter(ModelPostVote.id == post_vote_id).first()
    return post_vote
@app.post('/post_vote/', response_model=SchemaPostVote)
async def post_vote(post_vote: SchemaPostVote):
    db_post_vote = ModelPostVote(user_id=post_vote.user_id, post_id=post_vote.post_id)
    db.session.add(db_post_vote)
    db.session.commit()
    return db_post_vote
@app.put('/post_vote/{post_vote_id}', response_model=SchemaPostVote)
async def update_post_vote(post_vote_id: int, post_vote: SchemaPostVote):
    db_post_vote = db.session.query(ModelPostVote).filter(ModelPostVote.id == post_vote_id).first()
    db_post_vote.user_id = post_vote.user_id
    db_post_vote.post_id = post_vote.post_id
    db.session.commit()
    return db_post_vote
@app.delete('/post_vote/{post_vote_id}')
async def delete_post_vote(post_vote_id: int):
    db_post_vote = db.session.query(ModelPostVote).filter(ModelPostVote.id == post_vote_id).first()
    db.session.delete(db_post_vote)
    db.session.commit()
    return {'message': 'Post vote has been deleted successfully'}

# To run locally
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)