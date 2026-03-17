from PIL import Image

def convert_to_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    for r, g, b, a in datas:
        m = max(r, g, b)
        if m == 0:
            new_data.append((0, 0, 0, 0))
        else:
            # Scale colors up to reverse the black pre-multiplication
            # If the pixel was alpha-blended with black, its color was multiplied by alpha
            new_r = int(min(255, (r * 255) / m))
            new_g = int(min(255, (g * 255) / m))
            new_b = int(min(255, (b * 255) / m))
            new_data.append((new_r, new_g, new_b, m))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    convert_to_transparent("public/LightOS-Logo.png", "public/LightOS-Logo-Transparent.png")
