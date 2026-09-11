#!/usr/bin/env python3
"""Recolor the ILD Illustrator lockup to site greens and export web assets."""

from pathlib import Path

from PIL import Image, ImageDraw

SRC = Path("/tmp/new logo 2022.ai.png")
OUT_DIR = Path(__file__).resolve().parents[1] / "public" / "images"

# Sampled from the raster
BURGUNDY = (96.0, 33.0, 29.0)
TAN = (227.0, 204.0, 176.0)
WHITE = (255.0, 255.0, 255.0)

# Site tokens: forest #0a3d10, gold-light #f1e5d9
FOREST = (10.0, 61.0, 16.0)
CREAM = (241.0, 229.0, 217.0)
EPS = 8.0


def dist2(p, q):
    return (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2


def recolor_image(src: Image.Image) -> Image.Image:
    src = src.convert("RGBA")
    pixels = src.load()
    w, h = src.size
    out = Image.new("RGBA", (w, h))
    dest = out.load()

    for y in range(h):
        for x in range(w):
            r, g, b, _a = pixels[x, y]
            p = (r, g, b)
            d_b = dist2(p, BURGUNDY) ** 0.5
            d_t = dist2(p, TAN) ** 0.5
            d_w = dist2(p, WHITE) ** 0.5
            w_b = 1.0 / (d_b + EPS)
            w_t = 1.0 / (d_t + EPS)
            w_w = 1.0 / (d_w + EPS)
            total = w_b + w_t + w_w
            nb, nt, nw = w_b / total, w_t / total, w_w / total
            nr = nb * FOREST[0] + nt * CREAM[0] + nw * WHITE[0]
            ng = nb * FOREST[1] + nt * CREAM[1] + nw * WHITE[1]
            nb_ = nb * FOREST[2] + nt * CREAM[2] + nw * WHITE[2]
            alpha = (1.0 - nw) * 255.0
            if d_w < 18:
                alpha *= d_w / 18.0
            dest[x, y] = (int(nr), int(ng), int(nb_), int(max(0, min(255, alpha))))
    return out


def trim_transparent(img: Image.Image, pad: int = 12) -> Image.Image:
    bbox = img.split()[-1].point(lambda p: 255 if p > 12 else 0).getbbox()
    if not bbox:
        return img
    left, top, right, bottom = bbox
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(img.width, right + pad)
    bottom = min(img.height, bottom + pad)
    return img.crop((left, top, right, bottom))


def crop_ild_oval(lockup: Image.Image) -> Image.Image:
    """Isolate the cream ILD medallion, not the main badge's top edge."""
    px = lockup.load()
    w, h = lockup.size
    minx, miny, maxx, maxy = w, h, 0, 0
    found = False
    # Cream fill lives in the top medallion. Ignore the main oval's cream
    # stroke, which is much wider once the two shapes meet.
    scan_bottom = int(h * 0.36)
    max_span = int(w * 0.40)
    for y in range(scan_bottom):
        cream_xs = []
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 40:
                continue
            if r > 200 and g > 188 and b > 165 and (r + g + b) > 590:
                cream_xs.append(x)
        if len(cream_xs) < 8:
            continue
        span = cream_xs[-1] - cream_xs[0]
        if span > max_span:
            continue
        found = True
        minx = min(minx, cream_xs[0])
        maxx = max(maxx, cream_xs[-1])
        miny = min(miny, y)
        maxy = max(maxy, y)
    if not found or maxx <= minx:
        raise SystemExit("Could not locate cream ILD oval")

    # Lower rows overlap the main badge, so cream-span filtering stops
    # at the letter midline. Extend to the full medallion height.
    oval_w = maxx - minx
    maxy = miny + int(oval_w * 0.52)

    pad_x = int(oval_w * 0.05)
    pad_y = int(oval_w * 0.04)
    oval = lockup.crop(
        (
            max(0, minx - pad_x),
            max(0, miny - pad_y),
            min(w, maxx + pad_x),
            min(h, maxy + pad_y),
        )
    )

    # Mask to an ellipse so leftover main-badge corners don't remain.
    mask = Image.new("L", oval.size, 0)
    inset_x = max(2, int(oval.width * 0.075))
    inset_y = max(2, int(oval.height * 0.03))
    ImageDraw.Draw(mask).ellipse(
        [inset_x, inset_y, oval.width - 1 - inset_x, oval.height - 1 - inset_y],
        fill=255,
    )
    masked = Image.new("RGBA", oval.size, (0, 0, 0, 0))
    masked.paste(oval, (0, 0), mask)
    return trim_transparent(masked, pad=4)


def square_icon(mark: Image.Image, size: int = 512) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (241, 229, 217, 255))
    pad = int(size * 0.08)
    inner = size - pad * 2
    ratio = mark.width / mark.height
    if ratio > 1:
        nw, nh = inner, max(1, int(inner / ratio))
    else:
        nh, nw = inner, max(1, int(inner * ratio))
    fitted = mark.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas.paste(fitted, ((size - nw) // 2, (size - nh) // 2), fitted)
    return canvas


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    lockup_path = OUT_DIR / "logo-lockup.png"
    if lockup_path.exists():
        print("using existing lockup")
        lockup = Image.open(lockup_path).convert("RGBA")
    else:
        print("recoloring…")
        lockup = trim_transparent(recolor_image(Image.open(SRC)), pad=16)
        lockup.save(lockup_path, "PNG", optimize=True)
    print("lockup", lockup.size, lockup_path)

    mark = crop_ild_oval(lockup)
    mark_path = OUT_DIR / "logo-ild-mark.png"
    mark.save(mark_path, "PNG", optimize=True)
    print("mark", mark.size, mark_path)

    icon = square_icon(mark)
    icon_path = OUT_DIR / "logo-ild-icon.png"
    icon.save(icon_path, "PNG", optimize=True)
    print("icon", icon.size, icon_path)


if __name__ == "__main__":
    main()
