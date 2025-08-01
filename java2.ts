// ✅ This makes the file a module, required for "declare global"
export {};

// ✅ Add browser speech APIs to TypeScript’s global scope
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }
}

// 🔤 Phrase-to-GenZ replacements
const phraseMap: Record<string, string> = {
  "good morning": "rise n slay 🌞💅",
  "i don't know": "idk bro 🤷",
  "what are you doing": "wyd 👀",
  "be right back": "brb 🏃💨",
  "i'm tired": "i’m literally done 😮‍💨",
  "let's go": "we up 🔥🙌",
  "how are you": "u vibin'?",
  "i'm fine": "chillin 😌",
  "nothing": "nahh just vibes 🌊"
};

// 🔤 Word-to-GenZ replacements
const wordMap: Record<string, string> = {
  "work": "the grind 😩",
  "working": "grinding fr 😤",
  "tired": "dead inside 💀",
  "busy": "booked n busy 💅",
  "meeting": "linkup",
  "study": "brain gym 🧠",
  "problem": "it's giving drama 🧃",
  "amazing": "iconic 🔥",
  "congratulations": "slayyy 👑🔥",
  "friend": "bestie 💅",
  "friends": "besties 💅",
  "sad": "in my feels 😔",
  "happy": "vibin ✨",
  "angry": "pressed 💢",
  "okay": "okok slay",
  "ok": "slay",
  "sorry": "my bad 😭",
  "can’t": "nah fam 🙅",
  "cannot": "can’t fr",
  "love": "mad respect ❤️",
  "cool": "drippy 🧊",
  "funny": "i'm dead 💀",
  "late": "running on vibe time ⏰✨",
  "good": "fire 🔥",
  "bad": "sus 😬",
  "yes": "yuhhh",
  "no": "nah",
  "really": "frfr",
  "understand": "gotchu fam ✅",
  "hello": "yo",
  "hi": "heyoo",
  "thanks": "tysm 🙏",
  "homework": "academic pain 📚😩",
  "teacher": "big boss 👩‍🏫",
  "parents": "the ops 🕵️‍♂️",
  "school": "stress camp 🏫"
};

// 🔁 Main Gen Z translator
function translateToGenZ(): void {
  const inputElement = document.getElementById("inputText") as HTMLTextAreaElement | null;
  const outputElement = document.getElementById("outputText") as HTMLElement | null;

  if (!inputElement || !outputElement) return;

  let input = inputElement.value.toLowerCase();

  // 1️⃣ Replace full phrases
  for (const phrase in phraseMap) {
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    input = input.replace(regex, phraseMap[phrase]);
  }

  // 2️⃣ Replace individual words
  const words = input.split(/\s+/);
  const translatedWords = words.map(word => {
    const punctuation = word.match(/[.,!?]$/);
    const cleanWord = word.replace(/[.,!?]/g, "");

    let translated = cleanWord;

    if (wordMap[cleanWord]) {
      translated = wordMap[cleanWord];
    }

    if (punctuation) {
      translated += punctuation[0];
    }

    return translated;
  });

  outputElement.innerText = translatedWords.join(" ");
}

// 🎤 Voice input
function startListening(): void {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice recognition not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0][0].transcript;
    const inputBox = document.getElementById("inputText") as HTMLTextAreaElement | null;
    if (inputBox) {
      inputBox.value = transcript;
      translateToGenZ();
    }
  };

  recognition.onerror = (event: any) => {
    alert("Voice input error: " + event.error);
  };

  recognition.start();
}

// 🔊 Voice output
function speakOutput(): void {
  const outputElement = document.getElementById("outputText") as HTMLElement | null;
  if (!outputElement || !outputElement.innerText) return;

  const utterance = new SpeechSynthesisUtterance(outputElement.innerText);
  utterance.lang = 'en-US';
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
}

// Make functions available globally if needed in HTML onclick
(window as any).translateToGenZ = translateToGenZ;
(window as any).startListening = startListening;
(window as any).speakOutput = speakOutput;
