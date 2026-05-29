const QUESTION_PATTERNS_PER_LANGUAGE = 500;

export const supportedQuestionLanguages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "gu", name: "Gujarati" },
  { code: "mr", name: "Marathi" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "kn", name: "Kannada" },
  { code: "ml", name: "Malayalam" },
];

const personName = {
  en: "Parth Joshi",
  hi: "पार्थ जोशी",
  gu: "પાર્થ જોશી",
  mr: "पार्थ जोशी",
  bn: "পার্থ জোশী",
  ta: "பார்த் ஜோஷி",
  te: "పార్థ్ జోషి",
  kn: "ಪಾರ್ಥ್ ಜೋಶಿ",
  ml: "പാർത്ഥ് ജോഷി",
};

const topics = [
  {
    intent: "about",
    labels: {
      en: "profile",
      hi: "प्रोफाइल",
      gu: "પ્રોફાઇલ",
      mr: "प्रोफाइल",
      bn: "প্রোফাইল",
      ta: "சுயவிவரம்",
      te: "ప్రొఫైల్",
      kn: "ಪ್ರೊಫೈಲ್",
      ml: "പ്രൊഫൈൽ",
    },
  },
  {
    intent: "about",
    labels: {
      en: "background",
      hi: "पृष्ठभूमि",
      gu: "પૃષ્ઠભૂમિ",
      mr: "पार्श्वभूमी",
      bn: "পটভূমি",
      ta: "பின்னணி",
      te: "నేపథ్యం",
      kn: "ಹಿನ್ನೆಲೆ",
      ml: "പശ്ചാത്തലം",
    },
  },
  {
    intent: "about",
    labels: {
      en: "strengths",
      hi: "मजबूतियां",
      gu: "મજબૂતીઓ",
      mr: "ताकद",
      bn: "শক্তি",
      ta: "வலிமைகள்",
      te: "బలాలు",
      kn: "ಶಕ್ತಿಗಳು",
      ml: "ശക്തികൾ",
    },
  },
  {
    intent: "skills",
    labels: {
      en: "skills",
      hi: "कौशल",
      gu: "કૌશલ્ય",
      mr: "कौशल्य",
      bn: "দক্ষতা",
      ta: "திறன்கள்",
      te: "నైపుణ్యాలు",
      kn: "ಕೌಶಲ್ಯಗಳು",
      ml: "കഴിവുകൾ",
    },
  },
  {
    intent: "skills",
    labels: {
      en: "technology stack",
      hi: "टेक्नोलॉजी स्टैक",
      gu: "ટેકનોલોજી સ્ટેક",
      mr: "टेक्नॉलॉजी स्टॅक",
      bn: "টেকনোলজি স্ট্যাক",
      ta: "டெக்னாலஜி ஸ்டாக்",
      te: "టెక్నాలజీ స్టాక్",
      kn: "ಟೆಕ್ನಾಲಜಿ ಸ್ಟ್ಯಾಕ್",
      ml: "ടെക്നോളജി സ്റ്റാക്ക്",
    },
  },
  {
    intent: "skills",
    labels: {
      en: "AI ML skills",
      hi: "AI ML कौशल",
      gu: "AI ML કૌશલ્ય",
      mr: "AI ML कौशल्य",
      bn: "AI ML দক্ষতা",
      ta: "AI ML திறன்கள்",
      te: "AI ML నైపుణ్యాలు",
      kn: "AI ML ಕೌಶಲ್ಯಗಳು",
      ml: "AI ML കഴിവുകൾ",
    },
  },
  {
    intent: "projects",
    labels: {
      en: "projects",
      hi: "प्रोजेक्ट्स",
      gu: "પ્રોજેક્ટ્સ",
      mr: "प्रोजेक्ट्स",
      bn: "প্রজেক্ট",
      ta: "திட்டங்கள்",
      te: "ప్రాజెక్టులు",
      kn: "ಪ್ರಾಜೆಕ್ಟ್ಗಳು",
      ml: "പ്രോജക്ടുകൾ",
    },
  },
  {
    intent: "rag",
    labels: {
      en: "RAG chatbot",
      hi: "RAG चैटबॉट",
      gu: "RAG ચેટબોટ",
      mr: "RAG चॅटबॉट",
      bn: "RAG চ্যাটবট",
      ta: "RAG சாட்பாட்",
      te: "RAG చాట్‌బాట్",
      kn: "RAG ಚಾಟ್‌ಬಾಟ್",
      ml: "RAG ചാറ്റ്ബോട്ട്",
    },
  },
  {
    intent: "rag",
    labels: {
      en: "multilingual chatbot",
      hi: "बहुभाषी चैटबॉट",
      gu: "બહુભાષી ચેટબોટ",
      mr: "बहुभाषिक चॅटबॉट",
      bn: "বহুভাষিক চ্যাটবট",
      ta: "பன்மொழி சாட்பாட்",
      te: "బహుభాషా చాట్‌బాట్",
      kn: "ಬಹುಭಾಷಾ ಚಾಟ್‌ಬಾಟ್",
      ml: "ബഹുഭാഷാ ചാറ്റ്ബോട്ട്",
    },
  },
  {
    intent: "whatsapp",
    labels: {
      en: "WhatsApp automation",
      hi: "WhatsApp ऑटोमेशन",
      gu: "WhatsApp ઓટોમેશન",
      mr: "WhatsApp ऑटोमेशन",
      bn: "WhatsApp অটোমেশন",
      ta: "WhatsApp ஆட்டோமேஷன்",
      te: "WhatsApp ఆటోమేషన్",
      kn: "WhatsApp ಆಟೊಮೇಶನ್",
      ml: "WhatsApp ഓട്ടോമേഷൻ",
    },
  },
  {
    intent: "whatsapp",
    labels: {
      en: "AI agent workflow",
      hi: "AI एजेंट वर्कफ्लो",
      gu: "AI એજન્ટ વર્કફ્લો",
      mr: "AI एजंट वर्कफ्लो",
      bn: "AI এজেন্ট ওয়ার্কফ্লো",
      ta: "AI ஏஜென்ட் பணிச்சுற்று",
      te: "AI ఏజెంట్ వర్క్‌ఫ్లో",
      kn: "AI ಏಜೆಂಟ್ ವರ್ಕ್‌ಫ್ಲೋ",
      ml: "AI ഏജന്റ് വർക്ക്‌ഫ്ലോ",
    },
  },
  {
    intent: "medical",
    labels: {
      en: "medical recommendation system",
      hi: "मेडिकल रिकमेंडेशन सिस्टम",
      gu: "મેડિકલ રેકમેન્ડેશન સિસ્ટમ",
      mr: "मेडिकल रिकमेंडेशन सिस्टम",
      bn: "মেডিক্যাল রেকমেন্ডেশন সিস্টেম",
      ta: "மெடிக்கல் பரிந்துரை அமைப்பு",
      te: "మెడికల్ రికమెండేషన్ సిస్టమ్",
      kn: "ಮೆಡಿಕಲ್ ಶಿಫಾರಸು ವ್ಯವಸ್ಥೆ",
      ml: "മെഡിക്കൽ റെക്കമെൻഡേഷൻ സിസ്റ്റം",
    },
  },
  {
    intent: "medical",
    labels: {
      en: "disease prediction",
      hi: "बीमारी prediction",
      gu: "રોગ prediction",
      mr: "रोग prediction",
      bn: "রোগ prediction",
      ta: "நோய் prediction",
      te: "వ్యాధి prediction",
      kn: "ರೋಗ prediction",
      ml: "രോഗ prediction",
    },
  },
  {
    intent: "image",
    labels: {
      en: "image quality analyzer",
      hi: "इमेज क्वालिटी एनालाइजर",
      gu: "ઇમેજ ક્વોલિટી એનાલાઇઝર",
      mr: "इमेज क्वालिटी अ‍ॅनालायझर",
      bn: "ইমেজ কোয়ালিটি অ্যানালাইজার",
      ta: "பட தர பகுப்பாய்வி",
      te: "ఇమేజ్ క్వాలిటీ అనలైజర్",
      kn: "ಇಮೇಜ್ ಕ್ವಾಲಿಟಿ ಅನಾಲೈಸರ್",
      ml: "ഇമേജ് ക്വാളിറ്റി അനലൈസർ",
    },
  },
  {
    intent: "image",
    labels: {
      en: "computer vision work",
      hi: "कंप्यूटर विजन काम",
      gu: "કમ્પ્યુટર વિઝન કામ",
      mr: "कॉम्प्युटर व्हिजन काम",
      bn: "কম্পিউটার ভিশন কাজ",
      ta: "கம்ப்யூட்டர் விஷன் வேலை",
      te: "కంప్యూటర్ విజన్ పని",
      kn: "ಕಂಪ್ಯೂಟರ್ ವಿಷನ್ ಕೆಲಸ",
      ml: "കമ്പ്യൂട്ടർ വിഷൻ ജോലി",
    },
  },
  {
    intent: "experience",
    labels: {
      en: "experience",
      hi: "अनुभव",
      gu: "અનુભવ",
      mr: "अनुभव",
      bn: "অভিজ্ঞতা",
      ta: "அனுபவம்",
      te: "అనుభవం",
      kn: "ಅನುಭವ",
      ml: "അനുഭവം",
    },
  },
  {
    intent: "experience",
    labels: {
      en: "internships",
      hi: "इंटर्नशिप",
      gu: "ઇન્ટર્નશિપ",
      mr: "इंटर्नशिप",
      bn: "ইন্টার্নশিপ",
      ta: "இன்டர்ன்ஷிப்",
      te: "ఇంటర్న్షిప్స్",
      kn: "ಇಂಟರ್ನ್‌ಶಿಪ್",
      ml: "ഇന്റേൺഷിപ്പ്",
    },
  },
  {
    intent: "education",
    labels: {
      en: "education",
      hi: "शिक्षा",
      gu: "શિક્ષણ",
      mr: "शिक्षण",
      bn: "শিক্ষা",
      ta: "கல்வி",
      te: "విద్య",
      kn: "ಶಿಕ್ಷಣ",
      ml: "വിദ്യാഭ്യാസം",
    },
  },
  {
    intent: "certifications",
    labels: {
      en: "certifications",
      hi: "सर्टिफिकेशन्स",
      gu: "સર્ટિફિકેશન્સ",
      mr: "सर्टिफिकेशन्स",
      bn: "সার্টিফিকেশন",
      ta: "சான்றிதழ்கள்",
      te: "సర్టిఫికేషన్స్",
      kn: "ಸರ್ಟಿಫಿಕೇಶನ್ಸ್",
      ml: "സർട്ടിഫിക്കേഷനുകൾ",
    },
  },
  {
    intent: "contact",
    labels: {
      en: "contact details",
      hi: "संपर्क जानकारी",
      gu: "સંપર્ક માહિતી",
      mr: "संपर्क माहिती",
      bn: "যোগাযোগ তথ্য",
      ta: "தொடர்பு விவரம்",
      te: "సంప్రదింపు వివరాలు",
      kn: "ಸಂಪರ್ಕ ವಿವರಗಳು",
      ml: "ബന്ധപ്പെടാനുള്ള വിവരം",
    },
  },
  {
    intent: "contact",
    labels: {
      en: "email",
      hi: "ईमेल",
      gu: "ઈમેલ",
      mr: "ईमेल",
      bn: "ইমেল",
      ta: "மின்னஞ்சல்",
      te: "ఈమెయిల్",
      kn: "ಇಮೇಲ್",
      ml: "ഇമെയിൽ",
    },
  },
  {
    intent: "contact",
    labels: {
      en: "GitHub",
      hi: "GitHub",
      gu: "GitHub",
      mr: "GitHub",
      bn: "GitHub",
      ta: "GitHub",
      te: "GitHub",
      kn: "GitHub",
      ml: "GitHub",
    },
  },
  {
    intent: "contact",
    labels: {
      en: "LinkedIn",
      hi: "LinkedIn",
      gu: "LinkedIn",
      mr: "LinkedIn",
      bn: "LinkedIn",
      ta: "LinkedIn",
      te: "LinkedIn",
      kn: "LinkedIn",
      ml: "LinkedIn",
    },
  },
  {
    intent: "about",
    labels: {
      en: "location",
      hi: "लोकेशन",
      gu: "લોકેશન",
      mr: "लोकेशन",
      bn: "লোকেশন",
      ta: "இடம்",
      te: "లోకేషన్",
      kn: "ಸ್ಥಳ",
      ml: "സ്ഥലം",
    },
  },
  {
    intent: "skills",
    labels: {
      en: "AI tools",
      hi: "AI टूल्स",
      gu: "AI ટૂલ્સ",
      mr: "AI टूल्स",
      bn: "AI টুলস",
      ta: "AI கருவிகள்",
      te: "AI టూల్స్",
      kn: "AI ಟೂಲ್ಸ್",
      ml: "AI ടൂളുകൾ",
    },
  },
];

const templates = {
  en: [
    "What is {person}'s {topic}?",
    "Tell me about {person}'s {topic}.",
    "Can you explain {person}'s {topic}?",
    "What should I know about {person}'s {topic}?",
    "Give me details about {person}'s {topic}.",
    "How strong is {person} in {topic}?",
    "Show me {person}'s {topic}.",
    "Why is {person}'s {topic} important?",
    "Summarize {person}'s {topic}.",
    "What has {person} done in {topic}?",
    "Does {person} have experience with {topic}?",
    "Can {person} work on {topic}?",
    "What proof does {person} have for {topic}?",
    "How can I contact {person} about {topic}?",
    "What is the best example of {person}'s {topic}?",
    "Is {person} good at {topic}?",
    "Where can I see {person}'s {topic}?",
    "What tools does {person} use for {topic}?",
    "How does {person} approach {topic}?",
    "Tell me quickly about {person} and {topic}.",
  ],
  hi: [
    "{person} का {topic} क्या है?",
    "{person} के {topic} के बारे में बताओ।",
    "क्या आप {person} का {topic} समझा सकते हैं?",
    "{person} के {topic} के बारे में मुझे क्या जानना चाहिए?",
    "{person} के {topic} की जानकारी दो।",
    "{topic} में {person} कितना मजबूत है?",
    "{person} का {topic} दिखाओ।",
    "{person} का {topic} क्यों महत्वपूर्ण है?",
    "{person} के {topic} का सार बताओ।",
    "{person} ने {topic} में क्या किया है?",
    "क्या {person} को {topic} का अनुभव है?",
    "क्या {person} {topic} पर काम कर सकता है?",
    "{topic} के लिए {person} के पास क्या proof है?",
    "{topic} के बारे में {person} से कैसे संपर्क करें?",
    "{person} के {topic} का best example क्या है?",
    "क्या {person} {topic} में अच्छा है?",
    "{person} का {topic} कहाँ देख सकता हूँ?",
    "{topic} के लिए {person} कौन से tools use करता है?",
    "{person} {topic} को कैसे approach करता है?",
    "{person} और {topic} के बारे में जल्दी बताओ।",
  ],
  gu: [
    "{person}નું {topic} શું છે?",
    "{person}ના {topic} વિશે કહો.",
    "શું તમે {person}નું {topic} સમજાવી શકો?",
    "{person}ના {topic} વિશે મને શું જાણવું જોઈએ?",
    "{person}ના {topic}ની માહિતી આપો.",
    "{topic}માં {person} કેટલા મજબૂત છે?",
    "{person}નું {topic} બતાવો.",
    "{person}નું {topic} કેમ મહત્વનું છે?",
    "{person}ના {topic}નો સાર આપો.",
    "{person}એ {topic}માં શું કર્યું છે?",
    "શું {person}ને {topic}નો અનુભવ છે?",
    "શું {person} {topic} પર કામ કરી શકે?",
    "{topic} માટે {person} પાસે શું proof છે?",
    "{topic} વિશે {person}નો સંપર્ક કેવી રીતે કરવો?",
    "{person}ના {topic}નું best example શું છે?",
    "શું {person} {topic}માં સારા છે?",
    "{person}નું {topic} ક્યાં જોઈ શકું?",
    "{topic} માટે {person} કયા tools વાપરે છે?",
    "{person} {topic}ને કેવી રીતે approach કરે છે?",
    "{person} અને {topic} વિશે ઝડપથી કહો.",
  ],
  mr: [
    "{person}चे {topic} काय आहे?",
    "{person}च्या {topic}बद्दल सांगा.",
    "{person}चे {topic} समजावू शकता का?",
    "{person}च्या {topic}बद्दल मला काय माहित असावे?",
    "{person}च्या {topic}ची माहिती द्या.",
    "{topic}मध्ये {person} किती मजबूत आहे?",
    "{person}चे {topic} दाखवा.",
    "{person}चे {topic} का महत्त्वाचे आहे?",
    "{person}च्या {topic}चा सारांश सांगा.",
    "{person}ने {topic}मध्ये काय केले आहे?",
    "{person}ला {topic}चा अनुभव आहे का?",
    "{person} {topic}वर काम करू शकतो का?",
    "{topic}साठी {person}कडे काय proof आहे?",
    "{topic}बद्दल {person}शी संपर्क कसा करावा?",
    "{person}च्या {topic}चे best example काय आहे?",
    "{person} {topic}मध्ये चांगला आहे का?",
    "{person}चे {topic} कुठे पाहू शकतो?",
    "{topic}साठी {person} कोणते tools वापरतो?",
    "{person} {topic}कडे कसा approach करतो?",
    "{person} आणि {topic}बद्दल पटकन सांगा.",
  ],
  bn: [
    "{person}-এর {topic} কী?",
    "{person}-এর {topic} সম্পর্কে বলুন।",
    "আপনি কি {person}-এর {topic} ব্যাখ্যা করতে পারেন?",
    "{person}-এর {topic} সম্পর্কে আমার কী জানা উচিত?",
    "{person}-এর {topic} এর বিস্তারিত দিন।",
    "{topic} এ {person} কতটা শক্তিশালী?",
    "{person}-এর {topic} দেখান।",
    "{person}-এর {topic} কেন গুরুত্বপূর্ণ?",
    "{person}-এর {topic} সংক্ষেপে বলুন।",
    "{person} {topic} এ কী করেছে?",
    "{person}-এর কি {topic} অভিজ্ঞতা আছে?",
    "{person} কি {topic} নিয়ে কাজ করতে পারে?",
    "{topic} এর জন্য {person}-এর কী proof আছে?",
    "{topic} নিয়ে {person}-এর সাথে কীভাবে যোগাযোগ করব?",
    "{person}-এর {topic} এর best example কী?",
    "{person} কি {topic} এ ভালো?",
    "{person}-এর {topic} কোথায় দেখতে পারি?",
    "{topic} এর জন্য {person} কোন tools ব্যবহার করে?",
    "{person} কীভাবে {topic} approach করে?",
    "{person} এবং {topic} সম্পর্কে দ্রুত বলুন।",
  ],
  ta: [
    "{person}ன் {topic} என்ன?",
    "{person}ன் {topic} பற்றி சொல்லுங்கள்.",
    "{person}ன் {topic} விளக்க முடியுமா?",
    "{person}ன் {topic} பற்றி நான் என்ன தெரிந்துகொள்ள வேண்டும்?",
    "{person}ன் {topic} விவரங்களை கொடுங்கள்.",
    "{topic} இல் {person} எவ்வளவு வலுவானவர்?",
    "{person}ன் {topic} காட்டுங்கள்.",
    "{person}ன் {topic} ஏன் முக்கியம்?",
    "{person}ன் {topic} சுருக்கமாக சொல்லுங்கள்.",
    "{person} {topic} இல் என்ன செய்துள்ளார்?",
    "{person}க்கு {topic} அனுபவம் உள்ளதா?",
    "{person} {topic} மீது வேலை செய்ய முடியுமா?",
    "{topic}க்கு {person}ிடம் என்ன proof உள்ளது?",
    "{topic} பற்றி {person}ஐ எப்படி தொடர்பு கொள்வது?",
    "{person}ன் {topic}க்கு best example என்ன?",
    "{person} {topic} இல் நல்லவரா?",
    "{person}ன் {topic} எங்கே பார்க்கலாம்?",
    "{topic}க்கு {person} எந்த tools பயன்படுத்துகிறார்?",
    "{person} {topic}ஐ எப்படி approach செய்கிறார்?",
    "{person} மற்றும் {topic} பற்றி விரைவாக சொல்லுங்கள்.",
  ],
  te: [
    "{person} యొక్క {topic} ఏమిటి?",
    "{person} యొక్క {topic} గురించి చెప్పండి.",
    "{person} యొక్క {topic}ను వివరించగలరా?",
    "{person} యొక్క {topic} గురించి నేను ఏమి తెలుసుకోవాలి?",
    "{person} యొక్క {topic} వివరాలు ఇవ్వండి.",
    "{topic}లో {person} ఎంత బలంగా ఉన్నారు?",
    "{person} యొక్క {topic} చూపించండి.",
    "{person} యొక్క {topic} ఎందుకు ముఖ్యం?",
    "{person} యొక్క {topic}ను సంక్షిప్తంగా చెప్పండి.",
    "{person} {topic}లో ఏమి చేశారు?",
    "{person}కి {topic} అనుభవం ఉందా?",
    "{person} {topic}పై పని చేయగలరా?",
    "{topic} కోసం {person} దగ్గర ఏ proof ఉంది?",
    "{topic} గురించి {person}ని ఎలా సంప్రదించాలి?",
    "{person} యొక్క {topic}కి best example ఏమిటి?",
    "{person} {topic}లో బాగున్నారా?",
    "{person} యొక్క {topic} ఎక్కడ చూడగలను?",
    "{topic} కోసం {person} ఏ tools వాడతారు?",
    "{person} {topic}ని ఎలా approach చేస్తారు?",
    "{person} మరియు {topic} గురించి త్వరగా చెప్పండి.",
  ],
  kn: [
    "{person} ಅವರ {topic} ಏನು?",
    "{person} ಅವರ {topic} ಬಗ್ಗೆ ಹೇಳಿ.",
    "{person} ಅವರ {topic} ವಿವರಿಸಬಹುದೇ?",
    "{person} ಅವರ {topic} ಬಗ್ಗೆ ನನಗೆ ಏನು ತಿಳಿಯಬೇಕು?",
    "{person} ಅವರ {topic} ವಿವರಗಳನ್ನು ನೀಡಿ.",
    "{topic}ನಲ್ಲಿ {person} ಎಷ್ಟು ಬಲವಾಗಿದ್ದಾರೆ?",
    "{person} ಅವರ {topic} ತೋರಿಸಿ.",
    "{person} ಅವರ {topic} ಏಕೆ ಮುಖ್ಯ?",
    "{person} ಅವರ {topic} ಸಂಕ್ಷಿಪ್ತವಾಗಿ ಹೇಳಿ.",
    "{person} {topic}ನಲ್ಲಿ ಏನು ಮಾಡಿದ್ದಾರೆ?",
    "{person} ಅವರಿಗೆ {topic} ಅನುಭವ ಇದೆಯೇ?",
    "{person} {topic} ಮೇಲೆ ಕೆಲಸ ಮಾಡಬಹುದೇ?",
    "{topic}ಗಾಗಿ {person} ಬಳಿ ಯಾವ proof ಇದೆ?",
    "{topic} ಬಗ್ಗೆ {person}ರನ್ನು ಹೇಗೆ ಸಂಪರ್ಕಿಸಬೇಕು?",
    "{person} ಅವರ {topic}ಗೆ best example ಏನು?",
    "{person} {topic}ನಲ್ಲಿ ಒಳ್ಳೆಯವರೇ?",
    "{person} ಅವರ {topic} ಎಲ್ಲಿ ನೋಡಬಹುದು?",
    "{topic}ಗಾಗಿ {person} ಯಾವ tools ಬಳಸುತ್ತಾರೆ?",
    "{person} {topic} ಅನ್ನು ಹೇಗೆ approach ಮಾಡುತ್ತಾರೆ?",
    "{person} ಮತ್ತು {topic} ಬಗ್ಗೆ ಬೇಗ ಹೇಳಿ.",
  ],
  ml: [
    "{person}ന്റെ {topic} എന്താണ്?",
    "{person}ന്റെ {topic} കുറിച്ച് പറയൂ.",
    "{person}ന്റെ {topic} വിശദീകരിക്കാമോ?",
    "{person}ന്റെ {topic} കുറിച്ച് ഞാൻ എന്ത് അറിയണം?",
    "{person}ന്റെ {topic} വിവരങ്ങൾ തരൂ.",
    "{topic}യിൽ {person} എത്ര ശക്തനാണ്?",
    "{person}ന്റെ {topic} കാണിക്കൂ.",
    "{person}ന്റെ {topic} എന്തുകൊണ്ട് പ്രധാനമാണ്?",
    "{person}ന്റെ {topic} ചുരുക്കി പറയൂ.",
    "{person} {topic}യിൽ എന്ത് ചെയ്തു?",
    "{person}ക്ക് {topic} അനുഭവമുണ്ടോ?",
    "{person} {topic}ൽ ജോലി ചെയ്യുമോ?",
    "{topic}ക്കായി {person}ക്ക് എന്ത് proof ഉണ്ട്?",
    "{topic} കുറിച്ച് {person}നെ എങ്ങനെ ബന്ധപ്പെടാം?",
    "{person}ന്റെ {topic}ക്ക് best example എന്താണ്?",
    "{person} {topic}യിൽ നല്ലവനാണോ?",
    "{person}ന്റെ {topic} എവിടെ കാണാം?",
    "{topic}ക്കായി {person} ഏത് tools ഉപയോഗിക്കുന്നു?",
    "{person} {topic} എങ്ങനെ approach ചെയ്യുന്നു?",
    "{person}യും {topic}യും കുറിച്ച് വേഗം പറയൂ.",
  ],
};

const directIntentKeywords = {
  about: [
    "about",
    "who",
    "profile",
    "background",
    "strength",
    "location",
    "प्रोफाइल",
    "कौन",
    "कोण",
    "কে",
    "யார்",
    "ఎవరు",
    "ಯಾರು",
    "ആര്",
  ],
  skills: [
    "skill",
    "tech",
    "stack",
    "tool",
    "python",
    "react",
    "fastapi",
    "langchain",
    "कौशल",
    "કૌશલ્ય",
    "कौशल्य",
    "দক্ষতা",
    "திறன்",
    "నైపుణ్య",
    "ಕೌಶಲ್ಯ",
    "കഴിവ",
  ],
  projects: ["project", "build", "portfolio", "प्रोजेक्ट", "પ્રોજેક્ટ", "প্রজেক্ট", "திட்ட", "ప్రాజెక్ట", "ಪ್ರಾಜೆಕ್ಟ", "പ്രോജക്ട"],
  rag: ["rag", "retrieval", "chatbot", "qdrant", "embedding", "चैटबॉट", "ચેટબોટ", "চ্যাটবট", "சாட்பாட்", "చాట్", "ಚಾಟ್", "ചാറ്റ്"],
  whatsapp: ["whatsapp", "automation", "agent", "n8n", "ऑटोमेशन", "ઓટોમેશન", "অটোমেশন", "ஆட்டோமேஷன்", "ఆటోమేషన్", "ಆಟೊಮೇಶನ್", "ഓട്ടോമേഷൻ"],
  medical: ["medical", "disease", "cnn", "lstm", "accuracy", "मेडिकल", "रोग", "মেডিক্যাল", "நோய்", "వ్యాధి", "ರೋಗ", "രോഗ"],
  image: ["image", "opencv", "vision", "quality", "sharpness", "noise", "इमेज", "વિઝન", "ছবি", "பட", "ఇమేజ్", "ಚಿತ್ರ", "ഇമേജ്"],
  experience: ["experience", "intern", "work", "codiotic", "launchspring", "अनुभव", "ઇન્ટર્ન", "অভিজ্ঞতা", "அனுபவ", "అనుభవ", "ಅನುಭವ", "അനുഭവ"],
  education: ["education", "degree", "b.tech", "college", "शिक्षा", "શિક્ષણ", "शिक्षण", "শিক্ষা", "கல்வி", "విద్య", "ಶಿಕ್ಷಣ", "വിദ്യ"],
  certifications: ["certification", "certificate", "nvidia", "microsoft", "accenture", "सर्टिफ", "સર્ટિફ", "সার্টিফ", "சான்ற", "సర్టిఫ", "ಸರ್ಟಿಫ", "സർട്ടിഫ"],
  contact: ["contact", "email", "phone", "hire", "github", "linkedin", "संपर्क", "ईमेल", "સંપર્ક", "যোগাযোগ", "தொடர்பு", "సంప్రద", "ಸಂಪರ್ಕ", "ബന്ധപ്പെട"],
};

const intentPriority = [
  "contact",
  "rag",
  "whatsapp",
  "medical",
  "image",
  "experience",
  "education",
  "certifications",
  "skills",
  "projects",
  "about",
];

function fillTemplate(template, languageCode, topic) {
  return template.replaceAll("{person}", personName[languageCode]).replaceAll("{topic}", topic.labels[languageCode]);
}

function generateQuestions(languageCode) {
  const languageTemplates = templates[languageCode];
  const questions = [];

  for (const template of languageTemplates) {
    for (const topic of topics) {
      questions.push({
        language: languageCode,
        intent: topic.intent,
        question: fillTemplate(template, languageCode, topic),
      });
    }
  }

  return questions.slice(0, QUESTION_PATTERNS_PER_LANGUAGE);
}

export const multilingualQuestionBank = Object.fromEntries(
  supportedQuestionLanguages.map((language) => [language.code, generateQuestions(language.code)]),
);

export const questionBankStats = {
  languages: supportedQuestionLanguages.length,
  perLanguage: QUESTION_PATTERNS_PER_LANGUAGE,
  total: supportedQuestionLanguages.length * QUESTION_PATTERNS_PER_LANGUAGE,
};

export function getSuggestedQuestions() {
  return [
    multilingualQuestionBank.en[3].question,
    multilingualQuestionBank.hi[26].question,
    multilingualQuestionBank.gu[51].question,
    multilingualQuestionBank.ta[176].question,
  ];
}

function normalize(value) {
  return value
    .toLocaleLowerCase()
    .replace(/[؟?.,!;:()[\]{}"']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const identityQuestionPhrases = [
  "ko hai",
  "kon hai",
  "kaun hai",
  "koun hai",
  "kon he",
  "kaun he",
  "who is",
  "who are",
  "about parth",
  "parth profile",
];

function looksLikeParthIdentityQuestion(query) {
  const mentionsParth = /\bparth\b/.test(query) || /\bparth joshi\b/.test(query);
  if (!mentionsParth) return false;

  return identityQuestionPhrases.some((phrase) => query.includes(phrase)) || query === "parth" || query === "parth joshi";
}

export function detectPortfolioIntent(input) {
  const query = normalize(input);
  if (!query) return null;

  for (const intent of intentPriority) {
    const keywords = directIntentKeywords[intent];
    if (keywords.some((keyword) => query.includes(normalize(keyword)))) {
      return intent;
    }
  }

  if (looksLikeParthIdentityQuestion(query)) {
    return "about";
  }

  for (const topic of topics) {
    if (Object.values(topic.labels).some((label) => query.includes(normalize(label)))) {
      return topic.intent;
    }
  }

  if (query.length >= 8) {
    for (const questions of Object.values(multilingualQuestionBank)) {
      const match = questions.find((item) => {
        const question = normalize(item.question);
        return question.includes(query) || query.includes(question);
      });
      if (match) return match.intent;
    }
  }

  return null;
}
