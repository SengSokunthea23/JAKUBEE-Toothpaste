"""Generates the original music bed + sound effects for the JAKUBEE commercial.
Requires: pip install numpy scipy   ·   Run: npm run soundtrack
"""
import numpy as np
from scipy.signal import butter, sosfilt
from scipy.io import wavfile
# Same timeline as src/timeline.ts: (id, seconds, transition)
TIMELINE=[('intro',4.6,None),('lemon',5.2,'ripple'),('herbal',5.2,'wave'),('benefits',7.0,'fade'),
          ('fresh',4.6,'fade'),('choose',4.4,'split'),('price',4.2,'ripple'),('bundle',6.0,'wipe'),
          ('wholesale',4.2,'fade'),('guarantee',3.4,'ripple'),('end',6.4,'wave')]
SCENES=[(n,None,d,tr) for n,d,tr in TIMELINE]
STARTS=[]; _f=0
for n,d,tr in TIMELINE: STARTS.append(_f); _f+=round(d*30)
TOTAL=_f
import os
SR=48000; DUR=TOTAL/30+0.3; N=int(SR*DUR)
L=np.zeros(N); Rr=np.zeros(N)
rng=np.random.default_rng(3)
def mtof(m): return 440*2**((m-69)/12)
def add(sig, t0, gain=1.0, pan=0.0):
    i=int(t0*SR); j=min(N,i+len(sig))
    if j<=i: return
    s=sig[:j-i]*gain
    L[i:j]+=s*np.sqrt((1-pan)/2); Rr[i:j]+=s*np.sqrt((1+pan)/2)
def bp(x,lo,hi): return sosfilt(butter(2,[lo,hi],'bandpass',fs=SR,output='sos'),x)
def lp(x,f): return sosfilt(butter(2,f,'low',fs=SR,output='sos'),x)
def hp(x,f): return sosfilt(butter(2,f,'high',fs=SR,output='sos'),x)
# ---- music: 96 bpm, bar = 2.5 s
bar=2.5; beat=bar/4
chords=[[53,57,60,64,67],[57,60,64,67,71],[50,53,57,60,64],[46,50,53,57,62]]  # Fmaj9, Am7(9), Dm9, Bbmaj7
nb=int(DUR/bar)+1
for b in range(nb):
    ch=chords[b%4]; t0=b*bar
    n=int(bar*SR*1.15); t=np.arange(n)/SR
    env=np.minimum(1,t/0.6)*np.minimum(1,(bar*1.15-t)/0.5)
    pad=np.zeros(n)
    for m in ch:
        f=mtof(m)
        for det in (-0.12,0.12):
            ff=f*2**(det/12/8)
            pad+=np.sin(2*np.pi*ff*t)+0.3*np.sin(2*np.pi*2*ff*t)+0.1*np.sin(2*np.pi*3*ff*t)
    add(lp(pad*env,2200),t0,0.012, pan=-0.2)
    add(lp(pad*env,2200),t0+0.01,0.012, pan=0.2)
    # sub bass
    f=mtof(ch[0]-12); bs=np.sin(2*np.pi*f*t)*np.minimum(1,t/0.05)*np.exp(-t*0.8)
    add(bs,t0,0.10)
    # arpeggio eighths
    arp=[ch[0]+12,ch[2]+12,ch[1]+12,ch[3]+12,ch[2]+12,ch[4]+12,ch[3]+12,ch[2]+12]
    for k,m in enumerate(arp):
        tt=t0+k*beat/2
        if tt<4.4: continue
        nn=int(0.6*SR); u=np.arange(nn)/SR; f=mtof(m)
        pl=(np.sin(2*np.pi*f*u)+0.25*np.sin(2*np.pi*2*f*u))*np.exp(-u*7)*np.minimum(1,u/0.004)
        add(pl,tt,0.035,pan=0.35 if k%2 else -0.35)
    # soft hats & kick from scene 2
    for k in range(8):
        tt=t0+k*beat/2
        if tt<4.6 or tt>DUR-1.0: continue
        nn=int(0.05*SR); h=hp(rng.standard_normal(nn),7000)*np.exp(-np.arange(nn)/SR*90)
        add(h,tt,0.025 if k%2 else 0.012,pan=0.3)
    for k in (0,2):
        tt=t0+k*beat
        if tt<4.6 or tt>DUR-1.0: continue
        nn=int(0.35*SR); u=np.arange(nn)/SR
        kk=np.sin(2*np.pi*(45*u+60*(1-np.exp(-u*30))/30))*np.exp(-u*9)
        add(kk,tt,0.16)
# master fade in/out
env=np.ones(N); fi=int(0.8*SR); env[:fi]=np.linspace(0,1,fi); fo=int(1.2*SR); env[-fo:]=np.linspace(1,0,fo)
L*=env; Rr*=env
# ---- sfx
def whoosh(d=0.7, up=True):
    n=int(d*SR); u=np.arange(n)/SR; x=rng.standard_normal(n)
    out=np.zeros(n); seg=1024
    for s in range(0,n,seg):
        p=s/n; fc=(400+3000*p) if up else (3400-3000*p)
        out[s:s+seg]=bp(x[s:s+seg+0],fc*0.7,min(fc*1.4,20000))[:len(out[s:s+seg])]
    env=np.sin(np.pi*np.clip(u/d,0,1))**2
    return out*env
def drop():
    n=int(0.35*SR); u=np.arange(n)/SR
    f=500+1400*(1-np.exp(-u*25)); ph=2*np.pi*np.cumsum(f)/SR
    return np.sin(ph)*np.exp(-u*16)*np.minimum(1,u/0.003)
def impact():
    n=int(1.2*SR); u=np.arange(n)/SR
    b=np.sin(2*np.pi*(38*u+80*(1-np.exp(-u*20))/20))*np.exp(-u*4)
    nz=lp(rng.standard_normal(n),900)*np.exp(-u*10)*0.4
    return b+nz
def pop():
    n=int(0.12*SR); u=np.arange(n)/SR
    return np.sin(2*np.pi*(900-500*u/0.12)*u)*np.exp(-u*40)
def chime(ms=(84,88,91,96)):
    n=int(2.0*SR); u=np.arange(n)/SR; out=np.zeros(n)
    for k,m in enumerate(ms):
        o=int(k*0.06*SR); f=mtof(m)
        out[o:]+= (np.sin(2*np.pi*f*u[:n-o])+0.3*np.sin(2*np.pi*2.76*f*u[:n-o]))*np.exp(-u[:n-o]*3)
    return out
def fizz(d=1.6):
    n=int(d*SR); x=np.zeros(n); idx=rng.integers(0,n,900); x[idx]=rng.uniform(-1,1,900)
    return hp(x,3000)*np.sin(np.pi*np.arange(n)/n)
st=lambda name:[STARTS[i] for i,s in enumerate(SCENES) if s[0]==name][0]/30
for i,s in enumerate(SCENES):
    t0=STARTS[i]/30
    if i>0: add(whoosh(0.8), t0-0.25, 0.10, pan=-0.3 if i%2 else 0.3)
    if s[3]=='ripple': add(drop(), t0+0.05, 0.22); add(drop(), t0+0.32, 0.1)
add(whoosh(0.6),0.25,0.06,-0.6); add(whoosh(0.6),0.45,0.06,0.6)
add(drop(), st('herbal')+0.4, 0.14)
for k in range(4): add(pop(), st('benefits')+0.8+k*0.45, 0.12)
add(fizz(), st('fresh')+0.2, 0.08)
add(impact(), st('price')+0.42, 0.32)
add(impact(), st('bundle')+0.52, 0.28)
add(whoosh(0.5,False), st('bundle')+2.4, 0.08)
for k in range(25): add(pop(), st('bundle')+3.0+k*0.1, 0.03)
add(impact(), st('wholesale')+0.52, 0.28)
add(chime(), st('guarantee')+0.72, 0.07)
for k in range(3): add(pop(), st('end')+1.2+k*0.15, 0.09)
add(chime((79,83,86,91)), st('end')+2.15, 0.06)
mix=np.stack([L,Rr],1)
mix=mix/np.max(np.abs(mix))*0.89
OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','public','audio','soundtrack.wav')
wavfile.write(OUT,SR,(mix*32767).astype(np.int16))
print('ok', DUR)
