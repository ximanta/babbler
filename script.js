document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const speakButton = document.getElementById('speakButton');
    const clearButton = document.getElementById('clearButton');
    const voiceSelect = document.getElementById('voiceSelect');
    const rateRange = document.getElementById('rateRange');
    const rateValue = document.getElementById('rateValue');
    const statusIndicator = document.getElementById('statusIndicator');
    const stopButton = document.getElementById('stopButton');

    let voices = [];

    function populateVoiceList() {
        voices = speechSynthesis.getVoices();
        voiceSelect.innerHTML = '';
        voices.forEach((voice, index) => {
            const option = new Option(voice.name, index);
            voiceSelect.add(option);
        });
    }

    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    function speak() {
        if (speechSynthesis.speaking) {
            console.error('speechSynthesis.speaking');
            return;
        }
        if (textInput.value !== '') {
            const utterance = new SpeechSynthesisUtterance(textInput.value);
            utterance.voice = voices[voiceSelect.selectedIndex];
            utterance.rate = parseFloat(rateRange.value);

            statusIndicator.textContent = 'Speaking...';
            statusIndicator.style.display = 'block';

            utterance.onend = () => {
                statusIndicator.style.display = 'none';
            };

            speechSynthesis.speak(utterance);
        }
    }

    function stopSpeaking() {
        speechSynthesis.cancel();
        textInput.value = '';
        statusIndicator.style.display = 'none';
    }

    speakButton.addEventListener('click', speak);
    stopButton.addEventListener('click', stopSpeaking);

    clearButton.addEventListener('click', () => {
        textInput.value = '';
    });

    rateRange.addEventListener('input', () => {
        rateValue.textContent = rateRange.value;
    });
});