type AudioElement = {
  name: string;
  audio: HTMLAudioElement;
};

const sounds = ref([]) as Ref<Array<AudioElement>>;
const currAudio = ref(null) as Ref<null | HTMLAudioElement>;
export default function useAudio() {
  async function add(audioName: string, name: string) {
    if (process.client) {
      const { default: sound } = await import(`~/assets/audio/${audioName}.mp3`);
      const audio = new Audio(sound);
      sounds.value.push({ name, audio });
    }
  }
  function play(name: string) {
    if (process.client) {
      const toPlay = sounds.value.find((a) => a.name === name);
      if (!toPlay) {
        throw new Error(`Sound with name ${name} not found!`);
      }
      toPlay.audio.play();
      currAudio.value = toPlay.audio;
    }
  }
  function pause() {
    if (currAudio.value) {
      currAudio.value.pause();
    }
  }
  function stop() {
    if (currAudio.value) {
      currAudio.value.pause();
      currAudio.value.currentTime = 0;
    }
  }
  return { add, play, stop, pause };
}
