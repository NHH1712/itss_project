# build a schema using pydantic
from pydantic import BaseModel

# class Book(BaseModel):
#     title: str
#     rating: int
#     author_id: int

#     class Config:
#         orm_mode = True

# class Author(BaseModel):
#     name:str
#     age:int

#     class Config:
#         orm_mode = True

class PostTag(BaseModel):
    post_id:int
    tag_id:int

    class Config: 
        orm_mode = True

class CommentVote(BaseModel):
    user_id:int
    comment_id:int

    class Config:
        orm_mode = True

class Posts(BaseModel):
    user_id:int
    title:str
    description:str
    image_url:str

    class Config:
        orm_mode = True

class Tags(BaseModel):
    name:str

    class Config:
        orm_mode = True

class PostVote(BaseModel):
    user_id:int
    post_id:int

    class Config:
        orm_mode = True

class Comments(BaseModel):
    user_id:int
    post_id:int
    content:str

    class Config:
        orm_mode = True

class Users(BaseModel):
    name:str
    username:str
    password:str
    classname:str
    grade:str
    avatar_url:str
    cover_image_url:str

    class Config:
        orm_mode = True