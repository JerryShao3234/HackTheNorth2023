
const generateVoice = (array, pageIndex) => {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 0.8; // 0.1 to 10
    msg.pitch = 2; //0 to 2
    msg.text = array[pageIndex].paragraph + array[pageIndex + 1].paragraph;
    msg.lang = 'en-US';

    window.speechSynthesis.speak(msg);

}

export {generateVoice};