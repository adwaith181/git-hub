// Gen Z dictionary (you can add more words here!)
const wordMap = {
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
  "thanks": "tysm 🙏"
};

// Main function to translate to Gen Z
function translateToGenZ() {
  const inputElement = document.getElementById("inputText");
  const outputElement = document.getElementById("outputText");

  // Ensure the correct types
  if (!(inputElement instanceof HTMLTextAreaElement) || !outputElement) return;

  const input = inputElement.value.toLowerCase();
  const words = input.split(/\s+/); // Split by whitespace

  const translatedWords = words.map(word => {
    const punctuation = word.match(/[.,!?]$/);
    const cleanWord = word.replace(/[.,!?]/g, "");

    let translated = cleanWord;

    for (const key in wordMap) {
      if (cleanWord.includes(key)) {
        translated = wordMap[key];
        break;
      }
    }

    if (punctuation) {
      translated += punctuation[0];
    }

    return translated;
  });

  const output = translatedWords.join(" ");
  outputElement.innerText = output;
}

