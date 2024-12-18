from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    subscription_plan = Column(String, nullable=True)
    subscription_end_date = Column(DateTime, nullable=True)
    balance = Column(Float, default=0.0)
    referral_code = Column(String, unique=True, nullable=False)
    referred_by = Column(String, ForeignKey('users.referral_code'), nullable=True)
    referral_earnings = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())