import React from 'react';
import { Composition, Folder, Still } from 'remotion';
import { Commercial, CommercialProps } from './Commercial';
import { Cinematic, CinematicProps } from './cinematic/Cinematic';
import { CINE_SCENES, CINE_TOTAL_FRAMES } from './cinematic/timeline';
import { Editorial, EditorialProps } from './editorial/Editorial';
import { ED_SCENES, ED_TOTAL_FRAMES } from './editorial/timeline';
import { Futuristic, FuturisticProps } from './futuristic/Futuristic';
import { FUT_SCENES, FUT_TOTAL_FRAMES } from './futuristic/timeline';
import { Lavender, LavenderProps } from './lavender/Lavender';
import { LAV_SCENES, LAV_TOTAL_FRAMES } from './lavender/timeline';
import { loadBrandFonts } from './lib/fonts';
import { FPS, HEIGHT, WIDTH } from './lib/theme';
import { SCENES, TOTAL_FRAMES } from './timeline';
import { frames } from './lib/anim';

loadBrandFonts();

const defaults: CommercialProps = { voiceover: undefined, musicVolume: undefined };
const cineDefaults: CinematicProps = { voiceover: undefined, musicVolume: undefined };
const edDefaults: EditorialProps = { voiceover: undefined, musicVolume: undefined };
const futDefaults: FuturisticProps = { voiceover: undefined, musicVolume: undefined };
const lavDefaults: LavenderProps = { voiceover: undefined, musicVolume: undefined };

export const RemotionRoot: React.FC = () => (
  <>
    {/* Main 9:16 commercial — 1080×1920, 60 fps, 39 s */}
    <Composition
      id="JakubeeCommercial"
      component={Commercial}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={defaults}
    />
    {/* Each scene on its own, handy while editing in Remotion Studio */}
    {SCENES.map((s) => (
      <Composition key={s.id} id={`Scene-${s.id}`} component={s.component} durationInFrames={frames(s.duration)} fps={FPS} width={WIDTH} height={HEIGHT} />
    ))}
    {/* Thumbnail / cover still */}
    <Still id="Thumbnail" component={SCENES[SCENES.length - 1].component} width={WIDTH} height={HEIGHT} />

    {/* ───── Cinematic theme ───── */}
    <Folder name="Cinematic">
      <Composition
        id="JakubeeCinematic"
        component={Cinematic}
        durationInFrames={CINE_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={cineDefaults}
      />
      {CINE_SCENES.map((s) => (
        <Composition key={s.id} id={`Cine-${s.id}`} component={s.component} durationInFrames={frames(s.duration)} fps={FPS} width={WIDTH} height={HEIGHT} />
      ))}
      <Still id="CinematicThumbnail" component={CINE_SCENES[CINE_SCENES.length - 1].component} width={WIDTH} height={HEIGHT} />
    </Folder>

    {/* ───── Theme 03 — Cinematic Editorial × Premium Digital (Zesty Lemon toothpaste) ───── */}
    <Folder name="Editorial">
      <Composition id="JakubeeEditorial" component={Editorial} durationInFrames={ED_TOTAL_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} defaultProps={edDefaults} />
      {ED_SCENES.map((s) => (
        <Composition key={s.id} id={`Ed-${s.id}`} component={s.component} durationInFrames={frames(s.duration)} fps={FPS} width={WIDTH} height={HEIGHT} />
      ))}
      <Still id="EditorialThumbnail" component={ED_SCENES[ED_SCENES.length - 1].component} width={WIDTH} height={HEIGHT} />
    </Folder>

    {/* ───── Theme 04 — Futuristic Dental Science × Cinematic Product Motion (Zesty Lemon + Herbal Mint) ───── */}
    <Folder name="Futuristic">
      <Composition id="JakubeeFuturistic" component={Futuristic} durationInFrames={FUT_TOTAL_FRAMES} fps={60} width={WIDTH} height={HEIGHT} defaultProps={futDefaults} />
      {FUT_SCENES.map((s) => (
        <Composition key={s.id} id={`Fut-${s.id}`} component={s.component} durationInFrames={frames(s.duration)} fps={FPS} width={WIDTH} height={HEIGHT} />
      ))}
      <Still id="FuturisticThumbnail" component={FUT_SCENES[FUT_SCENES.length - 1].component} width={WIDTH} height={HEIGHT} />
    </Folder>

    {/* ───── Theme 05 — Lavender Editorial × Symbolic 3D Storytelling (Zesty Lemon + Herbal Mint) ───── */}
    <Folder name="Lavender">
      <Composition id="JakubeeLavender" component={Lavender} durationInFrames={LAV_TOTAL_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} defaultProps={lavDefaults} />
      {LAV_SCENES.map((s) => (
        <Composition key={s.id} id={`Lav-${s.id}`} component={s.component} durationInFrames={frames(s.duration)} fps={FPS} width={WIDTH} height={HEIGHT} />
      ))}
      <Still id="LavenderThumbnail" component={LAV_SCENES[LAV_SCENES.length - 1].component} width={WIDTH} height={HEIGHT} />
    </Folder>
  </>
);
