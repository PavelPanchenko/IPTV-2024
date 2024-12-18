from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.deps import get_db, get_current_user
from db import models
from schemas.user import UserOut

router = APIRouter()

SUBSCRIPTION_PRICES = {
    "basic": {
        "monthly": 7.47,
        "quarterly": 19.99,
        "yearly": 79.99
    },
    "adult": {
        "monthly": 14.99,
        "quarterly": 39.99,
        "yearly": 149.99
    },
    "sport": {
        "monthly": 19.99,
        "quarterly": 49.99,
        "yearly": 189.99
    },
    "vip": {
        "monthly": 24.99,
        "quarterly": 64.99,
        "yearly": 239.99
    }
}

@router.post("", response_model=UserOut)
def update_subscription(
    plan: str,
    duration: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if plan not in SUBSCRIPTION_PRICES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid subscription plan"
        )
    
    if duration not in ["monthly", "quarterly", "yearly"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid subscription duration"
        )
    
    price = SUBSCRIPTION_PRICES[plan][duration]
    
    if current_user.balance < price:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Insufficient balance"
        )
    
    # Calculate subscription end date
    duration_days = {
        "monthly": 30,
        "quarterly": 90,
        "yearly": 365
    }
    
    current_user.balance -= price
    current_user.subscription_plan = plan
    current_user.subscription_end_date = datetime.utcnow() + timedelta(
        days=duration_days[duration]
    )
    
    db.commit()
    db.refresh(current_user)
    return current_user