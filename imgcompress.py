default_src = 'assets/big/'
default_tgt = 'assets/small/'
default_size = (600,600)

import argparse
parser = argparse.ArgumentParser(
    """ compress all files in source directory,
        by resizing them to the given shape, 
        and outputting outputting them to the target directory.
    """)
parser.add_argument('--src', type=str, default=default_src)
parser.add_argument('--tgt', type=str, default=default_tgt)
parser.add_argument('--size', type=int, nargs=2, default=default_size)
args = parser.parse_args()

import os
from PIL import Image, ImageOps
for fn in os.listdir(args.src):
    im = Image.open(os.path.join(args.src, fn))
    im_fixed = ImageOps.exif_transpose(im);
    im_fixed.thumbnail(args.size)
    im_fixed.save(os.path.join(args.tgt, fn), "jpeg")
