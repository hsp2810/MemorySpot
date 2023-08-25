import { Button, HStack, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import RecordRTC from 'recordrtc';
import '../../../assets/css/videorecorder.css';

const VideoRecorder = ({ setActiveTab, recordedVideo, setRecordedVideo }) => {
  const [recording, setRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const videoRef = useRef(null);
  const recorderRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [text, setText] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const enableStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setText('Current View. Click start to record your memory');
        }
      } catch (error) {
        console.log(error);
      }
    };
    enableStream();
  }, []);

  const handleStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const recorder = RecordRTC(stream, { type: 'video' });
      setRecorder(recorder);
      recorder.startRecording();
      setText('Recording started...');
      setRecording(true);
      recorderRef.current = recorder;
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const handleStop = () => {
    recorder.stopRecording(() => {
      const blob = recorderRef.current.getBlob();
      const url = URL.createObjectURL(blob);
      setText('Recording stopped...');
      setTimeout(() => {
        setText('Current View. Click start to record your memory');
      }, 3000);
      setRecordedVideo(url);
    });
    setRecording(false);
  };

  const togglePause = () => {
    if (isPaused) {
      setText('Recording started...');
      recorder.resumeRecording();
    } else {
      setText('Recording paused...');
      recorder.pauseRecording();
    }
    setIsPaused(!isPaused);
  };

  return (
    <div className="video-recorder">
      <Text className="video-text">{text}</Text>
      {stream && (
        <video ref={videoRef} autoPlay playsInline muted className="video" />
      )}

      {recording ? (
        <HStack>
          {!isPaused ? (
            <button onClick={togglePause} className={'recorder-button'}>
              <span className="material-symbols-outlined">pause</span>
              Pause
            </button>
          ) : (
            <button onClick={togglePause} className={'recorder-button'}>
              <span className="material-symbols-outlined">resume</span>
              Resume
            </button>
          )}
          <button onClick={handleStop} className={'recorder-button'}>
            <span className="material-symbols-outlined">stop</span>
            Stop
          </button>
        </HStack>
      ) : (
        <button onClick={handleStart} className={'recorder-button'}>
          <span className="material-symbols-outlined">
            radio_button_checked
          </span>
          <Text ml={'2px'}>Start</Text>
        </button>
      )}

      {console.log('Recorded Video: ' + recordedVideo)}
      {recordedVideo && (
        <div>
          <Text className="video-text">
            {'Recorded Video. Record again to update this one'}
          </Text>
          <video src={recordedVideo} controls className="video" />
        </div>
      )}
      <HStack m={'1rem 0rem'}>
        <Button
          isDisabled={!recordedVideo}
          onClick={() => {
            setRecordedVideo(null);
          }}
          colorScheme={'red'}
        >
          Delete<span className="material-symbols-outlined">delete</span>
        </Button>
        <Button
          isDisabled={!recordedVideo}
          onClick={() => {
            setActiveTab(tab => tab + 1);
          }}
          colorScheme={'blackAlpha'}
        >
          Next<span className="material-symbols-outlined">chevron_right</span>
        </Button>
      </HStack>
    </div>
  );
};

export default VideoRecorder;
