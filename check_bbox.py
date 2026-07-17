from PIL import Image

def color_diff(c1, c2):
    return sum(abs(a - b) for a, b in zip(c1[:3], c2[:3]))

img = Image.open('/tmp/file_attachments/1784313035737.png').convert("RGBA")
bg_color = img.getpixel((0, 0))

bbox_left = img.width
bbox_right = 0
bbox_top = img.height
bbox_bottom = 0

for y in range(img.height):
    for x in range(img.width):
        pixel = img.getpixel((x, y))
        if color_diff(pixel, bg_color) > 30:
            if x < bbox_left: bbox_left = x
            if x > bbox_right: bbox_right = x
            if y < bbox_top: bbox_top = y
            if y > bbox_bottom: bbox_bottom = y

print(f"bbox: left={bbox_left}, top={bbox_top}, right={bbox_right}, bottom={bbox_bottom}")
