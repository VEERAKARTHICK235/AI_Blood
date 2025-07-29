# --- 1. All imports at the top ---
import os
from datetime import datetime
from dotenv import load_dotenv
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from .models import User, UserCreate, DonationRequest

# --- 2. Load environment variables right after imports ---
load_dotenv()

# Read the variables using os.getenv()
db_url = os.getenv("DATABASE_URL")
maps_api_key = os.getenv("MAPS_API_KEY")

# You can print them to verify they are loaded correctly when the server starts
print("--- Configuration Loaded ---")
print(f"Database URL status: {'Loaded' if db_url else 'Not found'}")
print(f"Maps API Key status: {'Loaded' if maps_api_key else 'Not found'}")
print("----------------------------")


# --- 3. Initialize the FastAPI app ---
app = FastAPI(title="Project Sanjeevani API")

# --- 4. In-memory database for hackathon MVP ---
fake_users_db: List[User] = []
fake_requests_db: List[DonationRequest] = []
USER_ID_COUNTER = 0
REQUEST_ID_COUNTER = 0
# ----------------------------------------------------


# --- 5. API Route Definitions ---
@app.get("/")
def read_root():
    return {"Project": "Sanjeevani", "Status": "API is running"}

# --- User Management ---
@app.post("/users/", response_model=User, status_code=201)
def create_user(user_in: UserCreate):
    """Register a new patient or donor."""
    global USER_ID_COUNTER
    USER_ID_COUNTER += 1
    
    for u in fake_users_db:
        if u.email == user_in.email:
            raise HTTPException(status_code=400, detail="Email already registered")

    # In a real app, you would hash the password before saving
    # FIX: Changed .dict() to .model_dump() for newer Pydantic versions
    new_user = User(
        id=USER_ID_COUNTER,
        **user_in.model_dump(exclude={"password"}) 
    )
    fake_users_db.append(new_user)
    return new_user

@app.get("/users/", response_model=List[User])
def get_users(user_type: Optional[str] = None):
    """Get all users, optionally filter by type (patient/donor)."""
    if user_type:
        return [user for user in fake_users_db if user.user_type == user_type]
    return fake_users_db

# --- Donation Request & Matching ---
@app.post("/requests/", response_model=DonationRequest, status_code=201)
def create_donation_request(patient_id: int, blood_type: str):
    """A patient creates a request for blood."""
    global REQUEST_ID_COUNTER
    if not any(u.id == patient_id and u.user_type == "patient" for u in fake_users_db):
        raise HTTPException(status_code=404, detail="Patient not found")
        
    REQUEST_ID_COUNTER += 1
    new_request = DonationRequest(
        id=REQUEST_ID_COUNTER,
        patient_id=patient_id,
        blood_type=blood_type,
        request_date=datetime.now() # Added datetime import
    )
    fake_requests_db.append(new_request)
    return new_request

@app.get("/requests/open", response_model=List[DonationRequest])
def get_open_requests():
    """Get all active donation requests."""
    return [req for req in fake_requests_db if req.status == 'open']

@app.get("/match/{request_id}", response_model=List[User])
def find_donors_for_request(request_id: int):
    """MVP Matching Logic: Find compatible donors for a request."""
    try:
        request = next(req for req in fake_requests_db if req.id == request_id)
    except StopIteration:
        raise HTTPException(status_code=404, detail="Request not found")

    compatible_donors = [
        donor for donor in fake_users_db 
        if donor.user_type == "donor" and donor.blood_type == request.blood_type
    ]
    
    if not compatible_donors:
        raise HTTPException(status_code=404, detail="No compatible donors found at this time.")

    return compatible_donors