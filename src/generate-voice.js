
const generateVoice = (array, pageIndex, msg) => {
    msg.text = array[pageIndex].paragraph + array[pageIndex + 1].paragraph;

    window.speechSynthesis.speak(msg);

}

export {generateVoice};
