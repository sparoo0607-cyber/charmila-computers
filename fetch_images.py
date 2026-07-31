import urllib.request, re, urllib.parse

def get_img(q):
    try:
        url = 'https://www.google.com/search?tbm=isch&q=' + urllib.parse.quote(q)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'})
        html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
        # Google images returns raw URLs in the page source usually near 'http' or 'https' inside script tags.
        # Alternatively, we can find standard img src tags.
        imgs = re.findall(r'<img[^>]+src="([^"]+)"', html)
        for img in imgs:
            if img.startswith('http') and 'gstatic' not in img and 'nav_logo' not in img:
                return img
        
        # Fallback to any http URL that looks like an image in the html
        matches = re.findall(r'(https?://[^\s"\'<>]+(?:png|jpg|jpeg))', html)
        for m in matches:
            if 'gstatic' not in m:
                return m

    except Exception as e:
        return f"Error: {e}"
    return 'None'

print('RTX 4070: ' + get_img('MSI GeForce RTX 4070 Super Gaming X Slim site:amazon.in'))
print('Intel i5: ' + get_img('Intel Core i5-14600K Processor site:amazon.in'))
print('ASUS TUF: ' + get_img('ASUS TUF Gaming B760-PLUS site:amazon.in'))
print('Corsair: ' + get_img('Corsair Vengeance 16GB DDR5 5200MHz site:amazon.in'))
print('Ryzen: ' + get_img('AMD Ryzen 7 7800X3D Processor site:amazon.in'))
print('RTX 4090: ' + get_img('Zotac Gaming GeForce RTX 4090 Trinity OC site:amazon.in'))
print('DeathAdder: ' + get_img('Razer DeathAdder V3 Pro Wireless site:amazon.in'))
print('HyperX: ' + get_img('HyperX Cloud III Wireless site:amazon.in'))
print('Logitech: ' + get_img('Logitech G915 TKL Tenkeyless site:amazon.in'))
print('Sony Inzone: ' + get_img('Sony INZONE M9 27 Monitor site:amazon.in'))
