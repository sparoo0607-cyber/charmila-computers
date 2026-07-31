import os
from rembg import remove
from PIL import Image

def process_images(image_paths, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    for path in image_paths:
        filename = os.path.basename(path)
        print(f"Processing {filename}...")
        try:
            input_image = Image.open(path)
            output_image = remove(input_image)
            output_path = os.path.join(output_dir, filename)
            output_image.save(output_path)
            print(f"Saved transparent image to {output_path}")
        except Exception as e:
            print(f"Failed to process {filename}: {e}")

if __name__ == "__main__":
    paths = [
        r"C:\Users\nr166\.gemini\antigravity-ide\brain\a0f5720d-31e0-4ac7-b306-12a1afd059f5\star_icon_1785528596709.png",
        r"C:\Users\nr166\.gemini\antigravity-ide\brain\a0f5720d-31e0-4ac7-b306-12a1afd059f5\zap_icon_1785528634168.png",
        r"C:\Users\nr166\.gemini\antigravity-ide\brain\a0f5720d-31e0-4ac7-b306-12a1afd059f5\wrench_icon_1785528677018.png",
        r"C:\Users\nr166\.gemini\antigravity-ide\brain\a0f5720d-31e0-4ac7-b306-12a1afd059f5\hammer_icon_1785528723496.png",
        r"C:\Users\nr166\.gemini\antigravity-ide\brain\a0f5720d-31e0-4ac7-b306-12a1afd059f5\chat_icon_1785528796689.png",
        r"C:\Users\nr166\.gemini\antigravity-ide\brain\a0f5720d-31e0-4ac7-b306-12a1afd059f5\gamepad_icon_1785528831391.png",
        r"C:\Users\nr166\.gemini\antigravity-ide\brain\a0f5720d-31e0-4ac7-b306-12a1afd059f5\camera_icon_1785528871316.png"
    ]
    output_directory = "public/images/icons"
    process_images(paths, output_directory)
    print("All done!")
