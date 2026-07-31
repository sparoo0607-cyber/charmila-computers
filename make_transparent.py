from PIL import Image
import os

image_dir = 'public/images/products'

def remove_white_bg(img_path):
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    # threshold for 'white'
    threshold = 240
    for item in datas:
        # If it's close to white
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            # Change to transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(img_path, "PNG")

for filename in os.listdir(image_dir):
    if filename.endswith(".png"):
        filepath = os.path.join(image_dir, filename)
        print(f"Processing {filepath}...")
        try:
            remove_white_bg(filepath)
            print(f"Made background transparent for {filename}")
        except Exception as e:
            print(f"Error processing {filename}: {e}")

print("Done making all images transparent!")
