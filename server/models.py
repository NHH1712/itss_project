from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

Base  = declarative_base()

class PostTag(Base):
    __tablename__ = 'post_tag'
    id = Column(Integer, primary_key=True, autoincrement=True)
    post_id = Column(Integer, ForeignKey('posts.id'))
    tag_id = Column(Integer, ForeignKey('tags.id'))

    post = relationship('Posts', back_populates='post_tag')
    tag = relationship('Tags', back_populates='post_tag')

class CommentVote(Base):
    __tablename__ = 'comment_vote'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    comment_id = Column(Integer, ForeignKey('comments.id'))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship('Users', back_populates='comment_vote')
    comment = relationship('Comments', back_populates='comment_vote')

class Posts(Base):
    __tablename__ = 'posts'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    title = Column(String)
    description = Column(String)
    image_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship('Users', back_populates='posts')
    post_tag = relationship('PostTag', back_populates='post')
    post_vote = relationship('PostVote', back_populates='post')
    comments = relationship('Comments', back_populates='post')

class Tags(Base):
    __tablename__ = 'tags'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)

    post_tag = relationship('PostTag', back_populates='tag')

class PostVote(Base):
    __tablename__ = 'post_vote'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    post_id = Column(Integer, ForeignKey('posts.id'))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship('Users', back_populates='post_vote')
    post = relationship('Posts', back_populates='post_vote')

class Comments(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    post_id = Column(Integer, ForeignKey('posts.id'))
    content = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship('Users', back_populates='comments')
    post = relationship('Posts', back_populates='comments')
    comment_vote = relationship('CommentVote', back_populates='comment')

class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    username = Column(String)
    password = Column(String)
    classname = Column(String)
    grade = Column(String)
    avatar_url = Column(String)
    cover_image_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    posts = relationship('Posts', back_populates='user')
    post_vote = relationship('PostVote', back_populates='user')
    comments = relationship('Comments', back_populates='user')
    comment_vote = relationship('CommentVote', back_populates='user')