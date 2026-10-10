# Cola a logo verdadeira (referencias/marca/francal_broche.png) na lapela do Comandante nas cenas O3 a O9.
# A IA não desenha logos pequenas de forma confiável, então o broche entra depois, por código.
# Uso: python scripts/colar-broche.py  (requer Pillow: pip install pillow). Grava a cena em alta (referencias/missao0/) e a do player (assets/img/m0_O*.jpg). Coordenadas em P: centro x, centro y, lado em px, rotação.
# A O8 usa a versão com o broche da IA apagado (O8_juramento_sem_broche.jpg).
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageStat, ImageOps
logo=Image.open('referencias/marca/francal_broche.png').convert('RGB')
# crop to the black border
g=ImageOps.invert(logo.convert('L')).point(lambda v:255 if v>100 else 0)
logo=logo.crop(g.getbbox())
P={ # nome: (cx, cy, lado px, rotação)
 'O3_boas_vindas':(1426,560,17,0),
 'O4_viloes_painel':(2228,569,22,-6),
 'O5_susto_camaleao':(2179,605,21,-12),   # lapela esquerda (antes estava na capa, em 2379,617)
 'O6_galeria':(539,561,22,-4),
 'O7_mapa':(1816,681,20,0),
 'O8_juramento_sem_broche':(624,628,34,4),
 'O9_alarme':(1977,649,24,0),
}
for n,(cx,cy,s,rot) in P.items():
    im=Image.open(f'referencias/missao0/cenas-originais/{n}.jpg').convert('RGB')
    area=im.crop((cx-3*s,cy-3*s,cx+3*s,cy+3*s))
    luz=tuple(int(v) for v in ImageStat.Stat(area).mean)
    pin=logo.resize((s*4,s*4),Image.LANCZOS)
    # tingir com a luz da cena (leve)
    tint=Image.new('RGB',pin.size,luz)
    pin=Image.blend(pin,Image.composite(tint,pin,Image.new('L',pin.size,0)),0)
    pin=Image.blend(pin,Image.eval(Image.merge('RGB',[Image.eval(c,lambda v:v) for c in pin.split()]),lambda v:v),0)
    pin=Image.blend(pin, Image.new('RGB',pin.size,luz), 0.40 if n.startswith('O9') else 0.18)
    mask=Image.new('L',pin.size,255)
    pin=pin.rotate(rot,Image.BICUBIC,expand=True,fillcolor=luz); mask=mask.rotate(rot,Image.BICUBIC,expand=True)
    pin=pin.resize((pin.width//4,pin.height//4),Image.LANCZOS); mask=mask.resize(pin.size,Image.LANCZOS)
    # sombra
    sh=Image.new('L',(pin.width+8,pin.height+8),0); sh.paste(mask,(5,6)); sh=sh.filter(ImageFilter.GaussianBlur(2)).point(lambda v:int(v*.55))
    x,y=cx-pin.width//2,cy-pin.height//2
    im.paste((10,12,20),(x-3,y-3),sh)
    im.paste(pin,(x,y),mask)
    im.save(f'referencias/missao0/{n.replace("_sem_broche", "")}.jpg',quality=93)
    # versão do player: 1600 px de largura em assets/img/m0_<cena>.jpg
    im.resize((1600,round(im.height*1600/im.width)),Image.LANCZOS).save(f'assets/img/m0_{n.split("_")[0]}.jpg',quality=82,optimize=True)
print('ok')
