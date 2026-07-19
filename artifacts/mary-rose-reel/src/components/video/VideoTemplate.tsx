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

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  hook: SceneHook,
  scene2: Scene2,
  scene3: Scene3,
  scene4: Scene4,
  scene5: Scene5,
  scene6: Scene6,
};

const SCENE_START_SEC: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let cumulativeMs = 0;
  for (const [key, ms] of Object.entries(SCENE_DURATIONS)) {
    out[key] = cumulativeMs / 1000;
    cumulativeMs += ms;
  }
  return out;
})();

const AUDIO_SEEK_EPSILON_SEC = 0.18;

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

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    const targetTime = SCENE_START_SEC[baseSceneKey] ?? 0;
    if (Math.abs(audio.currentTime - targetTime) > AUDIO_SEEK_EPSILON_SEC) {
      audio.currentTime = targetTime;
    }
    audio.play().catch(() => {});
  }, [currentSceneKey, baseSceneKey, muted]);

  return (
    <div className="w-full h-[100dvh] flex items-center justify-center bg-black">
      <div
        className="relative overflow-hidden bg-brand-navy shadow-2xl"
        style={{
          width: '100%',
          maxWidth: '450px',
          aspectRatio: '9/16',
          maxHeight: '100dvh',
        }}
      >
        {/* Persistent background layers */}
        <div className="absolute inset-0 z-0">
          <video
            src={`${import.meta.env.BASE_URL}videos/gold-particles.mp4`}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-30 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-brand-navy/60" />
        </div>

        {/* Foreground scenes */}
        <div className="relative z-10 w-full h-full">
          <AnimatePresence mode="popLayout">
            {SceneComponent && <SceneComponent key={currentSceneKey} />}
          </AnimatePresence>
        </div>

        {/* Audio */}
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
