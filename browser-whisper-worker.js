
/*
 * PTE Practice — Browser Whisper Worker
 * Free, device-based English speech transcription.
 * Requires 16 kHz mono Float32 PCM audio.
 */

import {
  pipeline,
  env
} from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';

env.allowLocalModels = false;

const MODEL_ID = 'Xenova/whisper-base.en';
const SAMPLE_RATE = 16000;
const MAX_AUDIO_SECONDS = 120;

let transcriberPromise = null;

function notify(id, message) {
  self.postMessage({
    id,
    type: 'progress',
    message
  });
}

async function loadModel(id) {
  if (!transcriberPromise) {
    notify(id, 'Loading Whisper Base English model...');

    transcriberPromise = pipeline(
      'automatic-speech-recognition',
      MODEL_ID,
      {
        device: 'wasm',
        dtype: 'q8',

        progress_callback: (p) => {
          if (
            p.status === 'progress' &&
            Number.isFinite(p.progress)
          ) {
            notify(
              id,
              `Downloading Whisper: ${Math.round(p.progress)}%`
            );
          }
        }
      }
    ).catch((error) => {
      transcriberPromise = null;
      throw error;
    });
  }

  return transcriberPromise;
}

function prepareAudio(input) {
  if (!input) {
    throw new Error('No microphone audio received.');
  }

  const audio = input instanceof Float32Array
    ? input
    : new Float32Array(input);

  if (audio.length < SAMPLE_RATE * 0.3) {
    throw new Error('Recording too short. Please speak again.');
  }

  if (audio.length > SAMPLE_RATE * MAX_AUDIO_SECONDS) {
    throw new Error('Recording exceeds 120 seconds.');
  }

  let energy = 0;
  let peak = 0;

  for (let i = 0; i < audio.length; i++) {
    const value = audio[i];

    if (!Number.isFinite(value)) {
      throw new Error('Invalid microphone audio samples.');
    }

    energy += value * value;
    peak = Math.max(peak, Math.abs(value));
  }

  const rms = Math.sqrt(energy / audio.length);

  if (rms < 0.001 || peak < 0.005) {
    throw new Error(
      'Very low audio detected. Check microphone permission and volume.'
    );
  }

  return audio;
}

function cleanTranscript(text) {
  let result = String(text || '').trim();

  const unwanted = [
    /\[speaking in foreign language\]/gi,
    /\[music\]/gi,
    /\[silence\]/gi,
    /\[applause\]/gi,
    /\(music\)/gi
  ];

  for (const pattern of unwanted) {
    result = result.replace(pattern, ' ');
  }

  return result.replace(/\s+/g, ' ').trim();
}

self.onmessage = async ({ data }) => {
  if (!data || data.type !== 'transcribe') return;

  const { id, samples } = data;

  try {
    notify(id, 'Checking microphone audio...');

    const audio = prepareAudio(samples);

    const model = await loadModel(id);

    notify(id, 'Recognizing English speech...');

    const result = await model(audio, {
      chunk_length_s: 30,
      stride_length_s: 5,
      return_timestamps: false
    });

    const transcript = cleanTranscript(result?.text);

    if (!transcript) {
      throw new Error(
        'No recognizable English speech detected. Please record again.'
      );
    }

    self.postMessage({
      id,
      type: 'result',
      text: transcript
    });

  } catch (error) {
    self.postMessage({
      id,
      type: 'error',
      message: error?.message || String(error)
    });
  }
};
