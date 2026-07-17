from PIL import Image

def get_bg_color(image_path):
    img = Image.open(image_path).convert("RGBA")
    w, h = img.size
    print(f"Top-mid: {img.getpixel((w//2, 0))}")
    print(f"Left-mid: {img.getpixel((0, h//2))}")
    print(f"Right-mid: {img.getpixel((w-1, h//2))}")
    print(f"Bottom-mid: {img.getpixel((w//2, h-1))}")

get_bg_color("/tmp/file_attachments/1784313035737.png")
