import argparse
import json
import os
import sys
from ultralytics import YOLO
import contextlib

# Resolve model path relative to this script file
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(SCRIPT_DIR, 'model', 'best.pt')

def load_model():
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model not found at: {MODEL_PATH}")
    return YOLO(MODEL_PATH)

def detect_objects(model, image_path):
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found at: {image_path}")

    results = model(image_path, verbose=False)
    detections = []

    for result in results:
        boxes = result.boxes
        for box in boxes:
            detection = {
                # Access class names from model.model.names, not result.names
                'class': model.model.names[int(box.cls)],
                'confidence': float(box.conf),
                'bbox': box.xyxy[0].tolist()  # [x1, y1, x2, y2]
            }
            detections.append(detection)

    return detections

def main():
    parser = argparse.ArgumentParser(description='YOLOv8 Underwater Object Detection')
    parser.add_argument('--image', required=True, help='Path to input image')
    args = parser.parse_args()

    try:
        with open(os.devnull, 'w') as devnull:
            # Suppress verbose output from YOLO
            with contextlib.redirect_stdout(devnull), contextlib.redirect_stderr(devnull):
                model = load_model()
                detections = detect_objects(model, args.image)

        print(json.dumps(detections))

    except Exception as e:
        error_json = json.dumps({'error': str(e)})
        print(error_json, file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
