import argparse
import json
import os
import sys
import cv2
from ultralytics import YOLO
import contextlib

# === Paths ===
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
                'class': model.model.names[int(box.cls)],
                'confidence': float(box.conf),
                'bbox': box.xyxy[0].tolist()  # [x1, y1, x2, y2]
            }
            detections.append(detection)

    return detections


def draw_bounding_boxes(image_path, detections, output_path):
    image = cv2.imread(image_path)

    for det in detections:
        x1, y1, x2, y2 = map(int, det["bbox"])
        label = f'{det["class"]} ({det["confidence"]:.2f})'

        cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(image, label, (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    cv2.imwrite(output_path, image)


def main():
    parser = argparse.ArgumentParser(description='YOLOv8 Underwater Object Detection')
    parser.add_argument('--image', required=True, help='Path to input image')
    args = parser.parse_args()

    try:
        with open(os.devnull, 'w') as devnull:
            with contextlib.redirect_stdout(devnull), contextlib.redirect_stderr(devnull):
                model = load_model()
                detections = detect_objects(model, args.image)

        # Prepare output path
        annotated_path = args.image.replace("uploads", "annotated")
        draw_bounding_boxes(args.image, detections, annotated_path)

        result = {
            "detections": detections,
            "annotated_image_path": annotated_path
        }
        print(json.dumps(result))

    except Exception as e:
        error_json = json.dumps({'error': str(e)})
        print(error_json, file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
