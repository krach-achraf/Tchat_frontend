import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  BsPlayFill,
  BsPauseFill,
  BsFillVolumeMuteFill,
  BsFillVolumeOffFill,
  BsFillVolumeDownFill,
  BsFillVolumeUpFill,
} from "react-icons/bs";
import { MdFullscreen, MdOutlineFullscreenExit } from "react-icons/md";
import { CgMiniPlayer } from "react-icons/cg";
import { IoIosRepeat, IoMdPlay } from "react-icons/io";

import "./CustomVideo.css";

const CustomVideo = (props) => {
  const [playVideoClick, setPlayVideoClick] = useState(false);
  const [styleControls, setStyleControls] = useState();
  const [volumeVideo, setVolumeVideo] = useState(0);
  const [videoPaused, setVideoPaused] = useState(true);
  const [videoFullscreen, setVideoFullscreen] = useState(false);
  const [videoDuration, setVideoDuration] = useState();
  const [currentVideoDuration, setCurrentVideoDuration] = useState("0:00");
  const [isScrubbing, setIsScrubbing] = useState(false);

  const refVideo = useRef();
  const refCustomVideo = useRef();
  const refTimeLine = useRef();

  const zeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });

  useEffect(() => {
    document.addEventListener("mouseup", documentMouseUp);
    document.addEventListener("mousemove", documentMouseMove);

    return () => {
      document.removeEventListener("mouseup", documentMouseUp);
      document.removeEventListener("mousemove", documentMouseMove);
    };
  });

  const documentMouseUp = useCallback((e) => {
    if (isScrubbing) {
      refCustomVideo.current.classList.remove("scrubbing");
      playPauseVideo();
      setIsScrubbing(false);
    }
  });

  const documentMouseMove = useCallback((e) => {
    if (isScrubbing) toggleScrubbing(e);
  });

  const playPauseVideo = useCallback(() => {
    if (!playVideoClick) setPlayVideoClick(true);
    if (videoPaused) refVideo.current.play();
    else refVideo.current.pause();
    setVideoPaused(!videoPaused);
    refCustomVideo.current.classList.toggle("paused");
  });

  const toggleScrubbing = useCallback((e) => {
    setIsScrubbing((e.buttons & 1) === 1);
    let percent = calculatePercent(e);
    refVideo.current.currentTime = percent * refVideo.current.duration;
    setCurrentVideoDuration(formatDuration(refVideo.current.currentTime));
    refTimeLine.current.style.setProperty("--progress", percent);
    refCustomVideo.current.classList.add("scrubbing");
    setVideoPaused(true);
    refVideo.current.pause();
  });

  const formatDuration = useCallback((duration) => {
    let hours = Math.floor(duration / 3600);
    let minutes = Math.floor(duration / 60) % 60;
    let seconds = Math.floor(duration % 60);
    if (hours === 0) return `${minutes}:${zeroFormatter.format(seconds)}`;
    else return `${hours}:${zeroFormatter.format(minutes)}:${seconds}`;
  });

  const calculatePercent = useCallback((e) => {
    let rect = refTimeLine.current.getBoundingClientRect();
    return Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
  });
  return (
    <div className="customVideo paused" ref={refCustomVideo}>
      {!props.toEditPost ? (
        <>
          {playVideoClick ? (
            <div className="video-controls-container" style={styleControls}>
              <div
                className="timeLine-container"
                ref={refTimeLine}
                onMouseMove={(e) => {
                  let percent = calculatePercent(e);
                  refTimeLine.current.style.setProperty("--preview", percent);
                }}
                onMouseDown={toggleScrubbing}
              >
                <div className="timeLine"></div>
              </div>
              <div className="controls">
                <button className="playPauseBtn controlsButtons">
                  {videoPaused ? (
                    <BsPlayFill
                      className="play-icon"
                      onClick={playPauseVideo}
                    />
                  ) : currentVideoDuration == videoDuration ? (
                    <IoIosRepeat
                      onClick={() => {
                        setCurrentVideoDuration("0:00");
                        refVideo.current.currentTime = 0;
                        refVideo.current.play();
                      }}
                    />
                  ) : (
                    <BsPauseFill
                      className="pause-icon"
                      onClick={playPauseVideo}
                    />
                  )}
                </button>

                <div className="volume-container">
                  <button
                    className="muteBtn controlsButtons"
                    onClick={() => {
                      refVideo.current.muted = !refVideo.current.muted;
                    }}
                  >
                    {volumeVideo == 0 ? (
                      <BsFillVolumeMuteFill />
                    ) : volumeVideo > 0 && volumeVideo < 0.25 ? (
                      <BsFillVolumeOffFill />
                    ) : volumeVideo >= 0.25 && volumeVideo < 0.75 ? (
                      <BsFillVolumeDownFill />
                    ) : (
                      <BsFillVolumeUpFill />
                    )}
                  </button>
                  <input
                    type="range"
                    className="volume-slider"
                    min="0"
                    max="1"
                    step="any"
                    value={volumeVideo}
                    onChange={(e) => {
                      setVolumeVideo(e.target.value);
                      refVideo.current.volume = e.target.value;
                      refVideo.current.muted = e.target.value == 0;
                    }}
                  />
                </div>

                <div className="duration-container">
                  <div className="duration-current-time">
                    {currentVideoDuration}
                  </div>
                  &nbsp;/&nbsp;
                  <div className="duration-video-time">{videoDuration}</div>
                </div>

                <button
                  className="miniPlayerBtn controlsButtons"
                  onClick={() => refVideo.current.requestPictureInPicture()}
                >
                  <CgMiniPlayer className="miniPlayer-icon" />
                </button>

                <button
                  className="fullScreenBtn controlsButtons"
                  onClick={() => {
                    let video = refCustomVideo.current;
                    if (document.fullscreenElement == null) {
                      video.requestFullscreen();
                      let timeout = null;
                      video.addEventListener("mousemove", () => {
                        clearTimeout(timeout);
                        setStyleControls({ opacity: "1" });
                        refVideo.current.style.cursor = "pointer";
                        timeout = setTimeout(() => {
                          setStyleControls({ opacity: "0" });
                          refVideo.current.style.cursor = "none";
                        }, 5000);
                      });
                      video.addEventListener("keydown", (e) => {
                        if (e.key == "Escape")
                          video.classList.remove("fullScreen");
                      });
                    } else document.exitFullscreen();

                    video.classList.toggle("fullScreen");
                    setVideoFullscreen(!videoFullscreen);
                  }}
                >
                  {videoFullscreen ? (
                    <MdOutlineFullscreenExit className="fullScreen-exit-icon" />
                  ) : (
                    <MdFullscreen className="fullScreen-icon" />
                  )}
                </button>
              </div>
            </div>
          ) : null}
        </>
      ) : null}

      <video
        className="videoPost"
        src={props.src}
        type={props.type}
        ref={refVideo}
        onClick={props.toEditPost ? null : playPauseVideo}
        muted
        onVolumeChange={() => {
          setVolumeVideo(refVideo.current.volume);
          if (refVideo.current.muted) setVolumeVideo(0);
        }}
        onLoadedData={() => {
          setVideoDuration(formatDuration(refVideo.current.duration));
        }}
        onTimeUpdate={() => {
          setCurrentVideoDuration(formatDuration(refVideo.current.currentTime));
          let percent =
            refVideo.current.currentTime / refVideo.current.duration;
          refTimeLine.current.style.setProperty("--progress", percent);
        }}
      ></video>

      {!props.toEditPost ? (
        <>
          {!playVideoClick ? (
            <IoMdPlay
              className="playVideo"
              onClick={() => {
                playPauseVideo();
              }}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default CustomVideo;
