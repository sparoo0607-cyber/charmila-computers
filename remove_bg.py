import os
from rembg import remove
from PIL import Image

image_dir = 'public/images/products'
print(f"Scanning directory: {image_dir}")

for filename in os.listdir(image_dir):
    if filename.endswith(".png"):
        filepath = os.path.join(image_dir, filename)
        print(f"Processing {filepath}...")
        try:
            input_image = Image.open(filepath)
            output_image = remove(input_image)
            output_image.save(filepath)
            print(f"Successfully removed background from {filename}")
        except Exception as e:
            print(f"Failed to process {filename}: {e}")

print("Background removal complete!")
