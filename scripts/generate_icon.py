from PIL import Image, ImageDraw, ImageFont
import os

COLORS = {
    'bg': (28, 92, 53),       # green #1C5C35
    'text': (245, 161, 0),    # amber/yellow #F5A100
}

SIZES = {
    'mdpi': 48,
    'hdpi': 72,
    'xhdpi': 96,
    'xxhdpi': 144,
    'xxxhdpi': 192,
}

IOS_LAUNCH_SIZES = {
    'LaunchImage.png': (168, 185),
    'LaunchImage@2x.png': (336, 370),
    'LaunchImage@3x.png': (504, 555),
}

def get_font(size, text):
    for font_size in range(int(size * 0.5), 0, -1):
        try:
            font = ImageFont.truetype("C:\\Windows\\Fonts\\arialbd.ttf", font_size)
        except:
            try:
                font = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", font_size)
            except:
                font = ImageFont.load_default()
                return font
        bbox = font.getbbox(text)
        if bbox is None:
            bbox = (0, 0, 0, 0)
        tw = bbox[2] - bbox[0]
        if tw <= size * 0.88:
            return font
    return font

def create_icon(size, out_path):
    img = Image.new('RGBA', (size, size), COLORS['bg'])
    draw = ImageDraw.Draw(img)
    text = "freshgo"
    font = get_font(size, text)
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (size - tw) / 2 - bbox[0]
    y = (size - th) / 2 - bbox[1]
    draw.text((x, y), text, font=font, fill=COLORS['text'])
    img.save(out_path, 'PNG')
    print(f"  Created {out_path} ({size}x{size})")

def create_launch_image(w, h, out_path):
    img = Image.new('RGB', (w, h), COLORS['bg'])
    draw = ImageDraw.Draw(img)
    text = "freshgo"
    font = get_font(min(w, h), text)
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (w - tw) / 2 - bbox[0]
    y = (h - th) / 2 - bbox[1]
    draw.text((x, y), text, font=font, fill=COLORS['text'])
    img.save(out_path, 'PNG')
    print(f"  Created {out_path} ({w}x{h})")

base = os.path.join(os.path.dirname(__file__), '..', 'android', 'app', 'src', 'main', 'res')

for density, size in SIZES.items():
    res_dir = os.path.join(base, f'mipmap-{density}')
    if not os.path.exists(res_dir):
        os.makedirs(res_dir)
    create_icon(size, os.path.join(res_dir, 'ic_launcher.png'))
    create_icon(size, os.path.join(res_dir, 'ic_launcher_foreground.png'))

# Generate for play store (512x512)
out_dir = os.path.join(os.path.dirname(__file__), '..', 'assets', 'images', 'icons')
if not os.path.exists(out_dir):
    os.makedirs(out_dir)
create_icon(512, os.path.join(out_dir, 'app_icon.png'))

# Generate iOS launch images
ios_dir = os.path.join(os.path.dirname(__file__), '..', 'ios', 'Runner', 'Assets.xcassets', 'LaunchImage.imageset')
for name, (w, h) in IOS_LAUNCH_SIZES.items():
    create_launch_image(w, h, os.path.join(ios_dir, name))

print("\nDone! All icons generated.")
