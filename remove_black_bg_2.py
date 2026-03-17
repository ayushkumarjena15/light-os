import sys
from PIL import Image

def process(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    # Removing completely black background.
    # The image is an AT logo. We want to convert black to transparent.
    for item in datas:
        # Check if the pixel is black or very close to black
        if item[0] < 20 and item[1] < 20 and item[2] < 20: 
            # Make the black background transparent
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        process("public/autometra_logo.png", "public/autometra_logo_transparent.png")
    else:
        process(sys.argv[1], sys.argv[2])
