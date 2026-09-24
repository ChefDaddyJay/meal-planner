import os

def generate_icons_ts(image_folder, output_ts_file):
    # Supported image extensions
    valid_extensions = ('.png', '.jpg', '.jpeg', '.svg', '.webp')
    
    # Check if directory exists
    if not os.path.exists(image_folder):
        print(f"Error: The folder '{image_folder}' does not exist.")
        return

    # Scan and filter target images
    try:
        files = os.listdir(image_folder)
        image_files = [f for f in files if f.lower().endswith(valid_extensions)]
    except Exception as e:
        print(f"Error reading directory: {e}")
        return

    if not image_files:
        print(f"No valid images found in '{image_folder}'.")
        return

    # Build the TypeScript object content
    ts_lines = ["const icons = {"]
    
    for filename in sorted(image_files):
        # Strip extension to use as the key (e.g., 'home.png' -> 'home')
        icon_name, _ = os.path.splitext(filename)
        
        # Format the entry string
        ts_lines.append(f"  {icon_name}: require('@/assets/images/category_icons/{filename}'),")
        
    ts_lines.append("};")
    ts_lines.append("\nexport default icons;")

    # Write out to the file
    with open(output_ts_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(ts_lines))
        
    print(f"✅ Successfully generated {output_ts_file} with {len(image_files)} icons.")

if __name__ == "__main__":
    # 1. Update this to where your icons live on your local machine
    IMAGE_DIR = "../assets/images/category_icons" 
    
    # 2. Update this to where you want the .ts file to drop
    OUTPUT_FILE = "./icons.ts"       

    generate_icons_ts(IMAGE_DIR, OUTPUT_FILE)
