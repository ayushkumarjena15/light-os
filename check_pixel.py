import sys
from PIL import Image

try:
    img = Image.open('public/LightOS-Logo.png')
    pixel = img.getpixel((0, 0))
    print(f"Top-left pixel: {pixel}")
except Exception as e:
    print(f"Error: {e}")
