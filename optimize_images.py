from pathlib import Path
from PIL import Image

src_dir = Path('website/img')
output_dirs = [Path('img-optimized'), Path('website/img-optimized')]
for out_dir in output_dirs:
    out_dir.mkdir(exist_ok=True)

for path in src_dir.iterdir():
    if not path.is_file():
        continue
    if path.suffix.lower() not in {'.jpg', '.jpeg', '.png', '.webp'}:
        continue

    img = Image.open(path)
    img.load()

    if img.mode in {'RGBA', 'LA', 'P'}:
        img = img.convert('RGBA')
    else:
        img = img.convert('RGB')

    if max(img.size) > 1600:
        img.thumbnail((1600, 1600), Image.Resampling.LANCZOS)

    out_name = f"{path.stem}.webp"
    for out_dir in output_dirs:
        img.save(out_dir / out_name, 'WEBP', quality=80, optimize=True)

    print(f'optimized {path.name} -> {out_name}')
