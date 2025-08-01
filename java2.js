// ✅ Clean Phrase and Word Replacements for Gen Z Translator

const phraseMap = {
  "good morning": "rise n slay 🌞💅",
  "what are you doing": "wyd 👀",
  "be right back": "brb 🏃💨",
  "i'm tired": "i’m literally done 🚮🌥️",
  "let's go": "we up 🔥🙌",
  "just kidding": "jk lol 😹",
  "i am very busy": "i’m booked n busy 💅📅",
  "that's not fair": "that’s sus 😤",
  "i'm not interested": "miss me with that 🙅",
  "i'm feeling sad": "i'm in my feels 😥",
  "that's so funny": "i'm dead 💀😂",
  "wait a second": "hold up ⏳",
  "i agree": "big facts 🧡",
  "you're right": "frfr 💯",
  "i'm excited": "let’s goo 🔥🔥",
  "that's boring": "lowkey lame 😔",
  "i'm bored": "need some drama fr 😩",
  "talk to you later": "ttyl 🧡",
  "i'm hungry": "need a vibe snack 🍕",
  "i need help": "send backup 🚨",
  "i made a mistake": "my bad fr 😬",
  "this is amazing": "this slaps 🔥"
};

const wordMap = {
  "work": "the grind 😩",
  "working": "grinding fr 😤",
  "meeting": "linkup",
  "study": "brain gym 🧠",
  "problem": "it's giving drama 🧃",
  "congratulations": "slayyy 👑🔥",
  "friend": "bestie 💅",
  "friends": "besties 💅",
  "angry": "pressed 💫",
  "sorry": "my bad 😭",
  "can’t": "nah fam 🙅",
  "love": "mad respect ❤️",
  "cool": "drippy 🧣",
  "late": "running on vibe time ⏰✨",
  "bad": "sus 😬",
  "yes": "yuhhh",
  "no": "nah",
  "hello": "yo",
  "hi": "heyoo",
  "thanks": "tysm 🙏",
  "homework": "academic pain 📚😩",
  "teacher": "big boss 👩‍🏫",
  "parents": "the ops 👵",
  "school": "stress camp 🏫"
};

function translateToGenZ() {
  const inputElement = document.getElementById("inputText");
  const outputElement = document.getElementById("outputText");
  if (!(inputElement instanceof HTMLTextAreaElement) || !outputElement) return;

  let input = inputElement.value.toLowerCase();

  for (const phrase in phraseMap) {
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    input = input.replace(regex, phraseMap[phrase]);
  }

  const words = input.split(/\s+/);
  const translatedWords = words.map(word => {
    const punctuation = word.match(/[.,!?]$/);
    const cleanWord = word.replace(/[.,!?]/g, "");

    let translated = wordMap[cleanWord] || cleanWord;
    if (punctuation) translated += punctuation[0];
    return translated;
  });

  outputElement.innerText = translatedWords.join(" ");
}

function startListening() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Voice recognition not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const inputBox = document.getElementById("inputText");
    if (inputBox instanceof HTMLTextAreaElement) {
      inputBox.value = transcript;
      translateToGenZ();
    }
  };

  recognition.onerror = (event) => {
    alert("Voice input error: " + event.error);
  };

  recognition.start();
}

// Fun offline replies for random inputs
function getGenZReply(input) {
  const lower = input.toLowerCase();
  if (lower.includes("how are you")) return "vibin as always ✨ you?";
  if (lower.includes("what's up") || lower.includes("whats up")) return "sky, vibes, and maybe ur crush 🤭";
  if (lower.includes("who are you")) return "i'm just a chill code entity bestie 🚀";
  if (lower.includes("bye")) return "stay slayin, ttyl 🚀";
  return "lowkey not sure what u mean but it's def a vibe 😅";
}

window.translateToGenZ = translateToGenZ;
window.startListening = startListening;
window.getGenZReply = getGenZReply;
