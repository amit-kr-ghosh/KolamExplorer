# server.py

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware # Import CORS Middleware
import torch
from torchvision import transforms
from PIL import Image
import io

app = FastAPI()

# --- CORS MIDDLEWARE SETUP ---
# This is the crucial part that was missing.
# It allows your React app (running on a different port) to make requests to this API.
origins = [
    "http://localhost",
    "http://localhost:3000", # Add the default create-react-app port
    "http://localhost:5173", # Add the default Vite port
    # Add any other origins you might use for development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)
# -----------------------------


# Load your TorchScript model
# Make sure the 'kolam_model_server.pt' file is in the same directory
try:
    model = torch.jit.load("kolam_model_server.pt", map_location="cpu")
    model.eval()
except FileNotFoundError:
    print("ERROR: 'kolam_model_server.pt' not found. Please place the model file in the same directory as server.py")
    exit()


# Same transforms as validation
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# Use your real dataset class names from your training notebook
class_names =["bird", "dot", "floral",]

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read file into PIL image
    image_bytes = await file.read()
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    # Preprocess
    img_tensor = transform(img).unsqueeze(0)

    # Inference
    with torch.no_grad():
        outputs = model(img_tensor)
        probs = torch.softmax(outputs, dim=1)
        confidence, pred_index = torch.max(probs, 1)
        predicted_class = class_names[pred_index.item()]

    return {
        "prediction": predicted_class,
        "confidence": float(confidence.item())
    }