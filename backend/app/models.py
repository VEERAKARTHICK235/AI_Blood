from pydantic import BaseModel, EmailStr
from typing import Literal, List, Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    phone_number: str
    city: str
    blood_type: Literal["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

class UserCreate(UserBase):
    password: str # In a real app, you'd hash this immediately
    user_type: Literal["patient", "donor"]

class User(UserBase):
    id: int
    user_type: Literal["patient", "donor"]
    
    class Config:
        orm_mode = True

class DonationRequest(BaseModel):
    id: int
    patient_id: int
    blood_type: str
    request_date: datetime
    status: Literal["open", "matched", "closed"] = "open"