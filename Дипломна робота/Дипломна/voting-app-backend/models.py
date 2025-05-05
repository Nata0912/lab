from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text, TIMESTAMP
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(150), unique=True)
    role = Column(String(50), default='user')
    password_hash = Column(String(255))

class Poll(Base):
    __tablename__ = 'polls'
    id = Column(Integer, primary_key=True)
    title = Column(String(200))
    description = Column(Text)
    created_by = Column(Integer, ForeignKey('users.id'))
    created_at = Column(TIMESTAMP, default=datetime.utcnow)

class Question(Base):
    __tablename__ = 'questions'
    id = Column(Integer, primary_key=True)
    poll_id = Column(Integer, ForeignKey('polls.id'))
    type = Column(String(20))
    text = Column(Text)

class Answer(Base):
    __tablename__ = 'answers'
    id = Column(Integer, primary_key=True)
    question_id = Column(Integer, ForeignKey('questions.id'))
    text = Column(Text)

class Vote(Base):
    __tablename__ = 'votes'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    question_id = Column(Integer, ForeignKey('questions.id'))
    answer_id = Column(Integer, ForeignKey('answers.id'))

class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    poll_id = Column(Integer, ForeignKey('polls.id'))
    text = Column(Text)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
