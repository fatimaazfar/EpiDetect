import sys
import torch
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image

# Define the image transformation
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Load the model architecture
model = models.resnet50(weights=None)

# Modify the final fully connected layer to match the number of classes
num_classes = 10
model.fc = torch.nn.Linear(model.fc.in_features, num_classes)

# Load the model weights
model_path = 'model/resnet50_custom.pth'
model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
model.eval()

# Function to predict disease
def predict(image_path):
    image = Image.open(image_path)
    image = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)
    
    labels = ["Normal", "acne", "bullous", "chickenpox", "dermatitis", "eczema", "hives", "measles", "monkeypox", "psoriasis"]
    predicted_label = labels[predicted.item()]
    
    return predicted_label

if __name__ == "__main__":
    image_path = sys.argv[1]
    result = predict(image_path)
    print(result)
