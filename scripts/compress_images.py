import os
from PIL import Image
import shutil

def compress_images(directory):
    total_original_size = 0
    total_compressed_size = 0
    count = 0

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                filepath = os.path.join(root, file)
                original_size = os.path.getsize(filepath)
                total_original_size += original_size
                
                try:
                    with Image.open(filepath) as img:
                        ext = file.split('.')[-1].lower()
                        if ext in ['jpg', 'jpeg']:
                            # Snížíme kvalitu na 80 pro další úsporu, pokud je to přijatelné
                            img.save(filepath, "JPEG", quality=80, optimize=True, progressive=True)
                        elif ext == 'png':
                            # Pro PNG bezeztrátová komprese
                            img.save(filepath, "PNG", optimize=True)
                    
                    compressed_size = os.path.getsize(filepath)
                    total_compressed_size += compressed_size
                    count += 1
                    # print(f"Compressed {file}: {original_size} -> {compressed_size}")
                except Exception as e:
                    print(f"Error compressing {file}: {e}")
                    total_compressed_size += original_size

    print(f"\nZpracováno {count} souborů.")
    print(f"Původní velikost: {total_original_size / (1024*1024):.2f} MB")
    print(f"Nová velikost: {total_compressed_size / (1024*1024):.2f} MB")
    print(f"Úspora: {(total_original_size - total_compressed_size) / (1024*1024):.2f} MB")

if __name__ == "__main__":
    assets_dir = 'public/assets'
    if os.path.exists(assets_dir):
        compress_images(assets_dir)
    else:
        print(f"Adresář {assets_dir} nebyl nalezen.")
