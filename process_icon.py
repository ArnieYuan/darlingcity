from PIL import Image

def process_icon():
    source_path = '/tmp/file_attachments/1784313035737.png'
    dest_path = 'src/assets/icon.png'

    # Open original image
    img = Image.open(source_path).convert("RGBA")

    # Determine the background color from the top-left corner
    bg_color = img.getpixel((0, 0))
    print(f"Using background color: {bg_color}")

    # To remove the original background and keep only the artwork, we'll do an inner crop.
    # The image is 512x512. The logo seems to be roughly in the center.
    # Let's find the bounding box of non-background pixels.
    # But since the background isn't perfectly uniform, we'll calculate a difference.

    def color_diff(c1, c2):
        return sum(abs(a - b) for a, b in zip(c1[:3], c2[:3]))

    bbox_left = img.width
    bbox_right = 0
    bbox_top = img.height
    bbox_bottom = 0

    for y in range(img.height):
        for x in range(img.width):
            pixel = img.getpixel((x, y))
            if color_diff(pixel, bg_color) > 30: # Threshold for difference
                if x < bbox_left: bbox_left = x
                if x > bbox_right: bbox_right = x
                if y < bbox_top: bbox_top = y
                if y > bbox_bottom: bbox_bottom = y

    # If the threshold didn't work well, just fall back to a reasonable crop
    if bbox_left >= bbox_right or bbox_top >= bbox_bottom:
        bbox_left, bbox_top, bbox_right, bbox_bottom = 50, 50, img.width-50, img.height-50

    # Crop the inner artwork
    artwork = img.crop((bbox_left, bbox_top, bbox_right, bbox_bottom))

    # Scale to ~60% of 1024x1024. 1024 * 0.60 = 614.
    target_size = 1024
    artwork_target_size = int(target_size * 0.60)

    # Maintain aspect ratio
    aspect_ratio = artwork.width / artwork.height
    if aspect_ratio > 1:
        new_w = artwork_target_size
        new_h = int(artwork_target_size / aspect_ratio)
    else:
        new_h = artwork_target_size
        new_w = int(artwork_target_size * aspect_ratio)

    artwork_scaled = artwork.resize((new_w, new_h), Image.Resampling.LANCZOS)

    # Create new background
    new_icon = Image.new("RGBA", (target_size, target_size), bg_color)

    # Paste centered
    paste_x = (target_size - new_w) // 2
    paste_y = (target_size - new_h) // 2

    new_icon.paste(artwork_scaled, (paste_x, paste_y), artwork_scaled)

    new_icon.save(dest_path)
    print("New icon saved.")

process_icon()
