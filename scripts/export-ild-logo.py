#!/usr/bin/env python3
"""Export the original burgundy/tan ILD lockup and oval from the Illustrator raster."""

from pathlib import Path

from PIL import Image, ImageDraw

SRC = Path("/tmp/new logo 2022.ai.png")
OUT_DIR = Path(__file__).resolve().parents[1] / "public" / "images"

WHITE = (255.0, 255.0, 255.0)


def dist2(p, q):
    return (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2


def knockout_white(src: Image.Image) -> Image.Image:
    """Keep original burgundy/tan; make near-white pixels transparent."""
    src = src.convert("RGBA")
    pixels = src.load()
    w, h = src.size
    out = Image.new("RGBA", (w, h))
    dest = out.load()

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            d_w = dist2((r, g, b), WHITE) ** 0.5
            alpha = int(a * (d_w / 18.0)) if d_w < 18 else a
            dest[x, y] = (r, g, b, max(0, min(255, alpha)))
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
    # Tan fill lives in the top medallion. Ignore the main oval's tan
    # stroke, which is much wider once the two shapes meet.
    scan_bottom = int(h * 0.36)
    max_span = int(w * 0.40)
    for y in range(scan_bottom):
        cream_xs = []
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 40:
                continue
            if r > 190 and g > 165 and b > 140 and (r + g + b) > 540:
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
        raise SystemExit("Could not locate tan ILD oval")

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
    canvas = Image.new("RGBA", (size, size), (227, 204, 176, 255))
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
    print("exporting original burgundy lockup…")
    lockup = trim_transparent(knockout_white(Image.open(SRC)), pad=16)
    lockup.save(lockup_path, "PNG", optimize=True)
    print("lockup", lockup.size, lockup_path)

    mark = crop_ild_oval(lockup)
    mark_path = OUT_DIR / "logo-ild-mark.png"
    mark.save(mark_path, "PNG", optimize=True)
    print("mark", mark.size, mark_path)
    oval_path = OUT_DIR / "logo-ild-oval.png"
    mark.save(oval_path, "PNG", optimize=True)
    print("oval", mark.size, oval_path)

    icon = square_icon(mark)
    icon_path = OUT_DIR / "logo-ild-icon.png"
    icon.save(icon_path, "PNG", optimize=True)
    print("icon", icon.size, icon_path)


if __name__ == "__main__":
    main()
