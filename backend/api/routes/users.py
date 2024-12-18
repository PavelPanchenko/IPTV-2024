from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.deps import get_db, get_current_user
from db import models
from schemas.user import UserUpdate, UserOut
from core.security import get_password_hash
from nanoid import generate

router = APIRouter()

@router.get("/me", response_model=UserOut)
def read_current_user(current_user: models.User = Depends(get_current_user)):
    return current_user

@router.patch("/me", response_model=UserOut)
def update_user(
    user_update: UserUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    for field, value in user_update.dict(exclude_unset=True).items():
        if field == "password":
            setattr(current_user, "hashed_password", get_password_hash(value))
        else:
            setattr(current_user, field, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.post("/balance", response_model=UserOut)
def add_balance(
    amount: float,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if amount <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Amount must be positive"
        )
    
    current_user.balance += amount

    # Process referral bonus if user was referred
    if current_user.referred_by:
        referrer = db.query(models.User).filter(
            models.User.referral_code == current_user.referred_by
        ).first()
        if referrer:
            bonus = amount * 0.1  # 10% referral bonus
            referrer.referral_earnings += bonus
            referrer.balance += bonus
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.get("/referral-code")
def generate_referral_code(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user.referral_code:
        current_user.referral_code = generate(size=8)
        db.commit()
        db.refresh(current_user)
    
    return {"referral_code": current_user.referral_code}