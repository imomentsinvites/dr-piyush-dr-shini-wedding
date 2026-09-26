import React from "react";

export function MusicControl({
  audioRef,
  playing,
  setPlaying,
  isVideoPlaying,
  onStartPlayback,
  className = "",
  style = {},
}) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (!isVideoPlaying && onStartPlayback) {
      onStartPlayback();
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={!isVideoPlaying ? "Play Invitation" : playing ? "Mute audio" : "Play music"}
      className={className}
      style={style}
    >
      {!isVideoPlaying ? (
        // Play icon before opening/playing
        <svg className="w-4 h-4 ml-0.5 text-amber-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      ) : playing ? (
        // Sound wave / Speaker active icon
        <svg className="w-4 h-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
      ) : (
        // Mute speaker icon
        <svg className="w-4 h-4 text-amber-200/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>
      )}
    </button>
  );
}
