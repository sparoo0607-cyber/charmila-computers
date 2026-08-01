import os
import requests
from duckduckgo_search import DDGS
from rembg import remove
from PIL import Image
from io import BytesIO

queries = {
    "keyboard_isolated": "logitech g pro keyboard white background high res",
    "gaming_mouse_isolated": "razer deathadder mouse white background high res",
    "gaming_headset_isolated": "hyperx cloud headset white background high res",
    "mousepad_isolated": "corsair mm700 rgb mousepad white background high res",
    "webcam_isolated": "logitech c920 webcam white background high res",
    "ups_isolated": "apc back ups pro white background high res",
    "router_isolated": "asus rog rapture wifi router white background high res",
    "intel_cpu_isolated": "intel core i9 box white background high res",
    "gaming_motherboard_isolated": "asus rog maximus motherboard white background high res",
    "rtx_4090_isolated": "rtx 4090 graphics card front view white background high res",
    "ddr5_ram_isolated": "corsair dominator ddr5 ram stick white background high res",
    "aio_cooler_isolated": "nzxt kraken elite aio cooler white background high res",
    "pc_cabinet_isolated": "lian li o11 dynamic evo case white background high res"
}

output_dir = "public/images/products"
os.makedirs(output_dir, exist_ok=True)

def download_and_process(name, query):
    try:
        print(f"Searching for {name} ({query})...")
        with DDGS() as ddgs:
            results = list(ddgs.images(query, max_results=5))
            for res in results:
                url = res.get("image")
                if not url: continue
                try:
                    response = requests.get(url, timeout=10)
                    if response.status_code == 200:
                        print(f"Downloaded from {url}")
                        input_image = Image.open(BytesIO(response.content)).convert("RGB")
                        output_image = remove(input_image)
                        
                        output_path = os.path.join(output_dir, f"{name}.png")
                        output_image.save(output_path)
                        print(f"Successfully saved {name} to {output_path}")
                        return True
                except Exception as e:
                    print(f"Failed to download or process {url}: {e}")
        print(f"Could not find or process a valid image for {name}")
    except Exception as e:
        print(f"Search failed for {name}: {e}")

if __name__ == "__main__":
    for name, query in queries.items():
        download_and_process(name, query)
    print("All done!")
