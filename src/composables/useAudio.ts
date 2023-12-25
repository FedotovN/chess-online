type AudioElement = {
  name: string;
  audio: HTMLAudioElement;
};
const sounds = ref([]) as Ref<Array<AudioElement>>;
const currAudio = ref(null) as Ref<null | HTMLAudioElement>;
export default function useAudio() {
  async function add(path: string, name: string) {
    const sound = (await import(path)).default;
    const audio = new Audio(sound);
    sounds.value.push({ name, audio });
  }
  function play(name: string) {
    const toPlay = sounds.value.find((a) => a.name === name);
    if (!toPlay) {
      throw new Error(`Sound with name ${name} not found!`);
    }
    toPlay.audio.play();
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
