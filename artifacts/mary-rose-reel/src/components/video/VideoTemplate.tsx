import { useEffect, useRef } from 'react';
import { useVideoPlayer } from '@/lib/video';
import { AnimatePresence } from 'framer-motion';

import { SceneHook } from './video_scenes/SceneHook';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';

export const SCENE_DURATIONS: Record<string, number> = {
  hook: 4000,
  scene2: 4500,
  scene3: 4500,
  scene4: 5500,
  scene5: 4500,
  scene6: 4000,
};

const SCENE_START_SEC: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let ms = 0;
  for (const [key, dur] of Object.entries(SCENE_DURATIONS)) {
    out[key] = ms / 1000;
    ms += dur;
  }
  return out;
})();

const AUDIO_SEEK_EPSILON = 0.18;

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });
  const baseKey = currentSceneKey.replace(/_r[12]$/, '');

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    const t = SCENE_START_SEC[baseKey] ?? 0;
    if (Math.abs(audio.currentTime - t) > AUDIO_SEEK_EPSILON) {
      audio.currentTime = t;
    }
    audio.play().catch(() => {});
  }, [currentSceneKey, baseKey, muted]);

  return (
    <div style={{ width: '100%', height: '100vh', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '450px',
          aspectRatio: '9/16',
          maxHeight: '100dvh',
          overflow: 'hidden',
          backgroundColor: '#0B132B',
        }}
      >
        {/* Persistent particle video background */}
        <video
          src={`${import.meta.env.BASE_URL}videos/gold-particles.mp4`}
          autoPlay
          muted
          loop
          playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, mixBlendMode: 'screen', zIndex: 0 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent, rgba(11,19,43,0.6))', zIndex: 1 }} />

        {/* Scenes */}
        <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
          <AnimatePresence mode="popLayout">
            {currentScene === 0 && <SceneHook key={currentSceneKey} />}
            {currentScene === 1 && <Scene2 key={currentSceneKey} />}
            {currentScene === 2 && <Scene3 key={currentSceneKey} />}
            {currentScene === 3 && <Scene4 key={currentSceneKey} />}
            {currentScene === 4 && <Scene5 key={currentSceneKey} />}
            {currentScene === 5 && <Scene6 key={currentSceneKey} />}
          </AnimatePresence>
        </div>

        <audio
          ref={audioRef}
          src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`}
          preload="auto"
          autoPlay
          muted={muted}
        />
      </div>
    </div>
  );
}
