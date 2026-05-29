import { useCallback, useEffect, useRef } from "react";
import introSoundUrl from "@/assets/intro-sound.mp3";

const unlockEvents = ["pointerdown", "touchstart", "keydown", "click", "wheel"];
const boostedGain = 4.2;
const resumeTimeoutMs = 360;

function createAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  return AudioContext ? new AudioContext() : null;
}

function withTimeout(promise, timeoutMs) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error("Audio start timeout")), timeoutMs);
    }),
  ]);
}

export function IntroSoundGate() {
  const contextRef = useRef(null);
  const bufferRef = useRef(null);
  const bufferPromiseRef = useRef(null);
  const playedRef = useRef(false);
  const playInFlightRef = useRef(false);
  const removeUnlockListenersRef = useRef(() => {});

  const getContext = useCallback(() => {
    if (!contextRef.current) {
      contextRef.current = createAudioContext();
    }
    return contextRef.current;
  }, []);

  const loadBuffer = useCallback(async () => {
    if (bufferRef.current) return bufferRef.current;
    if (bufferPromiseRef.current) return bufferPromiseRef.current;

    const context = getContext();
    if (!context) return null;

    bufferPromiseRef.current = fetch(introSoundUrl, { cache: "force-cache" })
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => context.decodeAudioData(arrayBuffer.slice(0)))
      .then((buffer) => {
        bufferRef.current = buffer;
        return buffer;
      })
      .catch(() => null);

    return bufferPromiseRef.current;
  }, [getContext]);

  const playIntro = useCallback(async () => {
    if (playedRef.current || playInFlightRef.current) return;

    playInFlightRef.current = true;

    try {
      const context = getContext();
      if (!context) {
        const fallbackAudio = new Audio(introSoundUrl);
        fallbackAudio.volume = 1;
        await fallbackAudio.play();
        playedRef.current = true;
        removeUnlockListenersRef.current();
        return;
      }

      if (context.state !== "running") {
        await withTimeout(context.resume(), resumeTimeoutMs);
      }

      if (context.state !== "running") {
        throw new Error("Sound needs a user gesture");
      }

      const buffer = await loadBuffer();
      if (!buffer) {
        throw new Error("Sound asset could not be decoded");
      }

      const source = context.createBufferSource();
      const gain = context.createGain();
      source.buffer = buffer;
      gain.gain.value = boostedGain;
      source.connect(gain);
      gain.connect(context.destination);
      source.start(0);

      playedRef.current = true;
      removeUnlockListenersRef.current();
    } catch {
      // Autoplay may be blocked; the same function is retried invisibly on the first user gesture.
    } finally {
      playInFlightRef.current = false;
    }
  }, [getContext, loadBuffer]);

  useEffect(() => {
    loadBuffer();

    const removeUnlockListeners = () => {
      unlockEvents.forEach((eventName) => {
        window.removeEventListener(eventName, playIntro, true);
      });
    };

    removeUnlockListenersRef.current = removeUnlockListeners;

    unlockEvents.forEach((eventName) => {
      window.addEventListener(eventName, playIntro, { capture: true, passive: true });
    });

    const loadTimer = window.setTimeout(playIntro, 320);

    return () => {
      window.clearTimeout(loadTimer);
      removeUnlockListeners();
      contextRef.current?.close?.();
    };
  }, [loadBuffer, playIntro]);

  return null;
}
