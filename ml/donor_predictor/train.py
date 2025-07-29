import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib # To save the trained model

# 1. Load Data (This would come from your production database)
# You need features like: days_since_last_donation, total_donations,
# city, age, opened_app_in_last_7_days, etc.
df = pd.read_csv('sample_data.csv')

# 2. Feature Engineering & Preprocessing
# (Convert categorical data to numbers, handle missing values, etc.)
# For simplicity, we assume data is clean for this example.
features = ['days_since_last_donation', 'total_donations', 'age']
target = 'donated_when_asked' # This is what we want to predict (1 or 0)

X = df[features]
y = df[target]

# 3. Split data for training and testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Train the Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 5. Evaluate the Model
y_pred = model.predict(X_test)
print(f"Model Accuracy: {accuracy_score(y_test, y_pred):.2f}")

# 6. Save the Model to be used by the FastAPI backend
joblib.dump(model, 'donor_predictor_model.pkl')

print("Model trained and saved successfully!")