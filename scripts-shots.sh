#!/usr/bin/env bash
# Headless Chrome screenshots of the static build served on :4173 (python3 -m http.server -d out 4173)
set -e
B=${BASE:-http://localhost:4173}
O=screenshots; mkdir -p $O
shot(){ google-chrome --headless=new --disable-gpu --hide-scrollbars --no-sandbox --virtual-time-budget=7000 --window-size=$2 --screenshot=$O/$1 "$B$3" 2>/dev/null; }
shot home-desktop-1440.png 1440,3300 /
shot home-mobile-390.png 390,4600 /
shot watch-episode-1.png 1440,1500 /watch/s1e1-welcome-to-neon-city/
shot read-chapter-1.png 1440,3000 /read/chapter-1-static-signal/
shot play.png 1440,1500 /play/
shot play-neon-drift.png 1440,1500 /play/neon-drift/
shot play-blade-rush-coming-soon.png 1440,1500 /play/blade-rush/
shot squad.png 1440,1500 /squad/
shot squad-zuggi.png 1440,1500 /squad/zuggi/
shot shop.png 1440,1300 /shop/
shot about.png 1440,1500 /about/
shot mobile-play-neon-drift.png 390,1800 /play/neon-drift/
python3 - <<'PY'
from PIL import Image
import glob
for f in glob.glob('screenshots/*.png'):
    im=Image.open(f).convert('RGB'); w,h=im.size; px=im.load(); y=h-1
    while y>200 and all(abs(px[x,y][0]-13)<4 and abs(px[x,y][2]-23)<5 for x in range(0,w,37)): y-=1
    if y<h-1: im.crop((0,0,w,min(h,y+2))).save(f)
PY
