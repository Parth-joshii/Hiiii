const languageTests = [
  { code: "gu", pattern: /[\u0A80-\u0AFF]/ },
  { code: "bn", pattern: /[\u0980-\u09FF]/ },
  { code: "ta", pattern: /[\u0B80-\u0BFF]/ },
  { code: "te", pattern: /[\u0C00-\u0C7F]/ },
  { code: "kn", pattern: /[\u0C80-\u0CFF]/ },
  { code: "ml", pattern: /[\u0D00-\u0D7F]/ },
];

const romanHindiPattern = /\b(kya|kaun|kon|koun|hai|he|ho|ka|ke|ki|ko|batao|parth joshi ko|parth joshi kon|parth joshi kaun)\b/i;
const marathiPattern = /(काय|आहे|आहेत|सांगा|चे|ची|चा|च्या|मध्ये|किती|चॅट|पार्थ जोशीचे)/;

function detectAssistantLanguage(input) {
  for (const test of languageTests) {
    if (test.pattern.test(input)) return test.code;
  }

  if (/[\u0900-\u097F]/.test(input)) {
    if (marathiPattern.test(input)) return "mr";
    return "hi";
  }

  if (romanHindiPattern.test(input)) return "hi";

  return "en";
}

function list(items) {
  return items.join(", ");
}

function projectStack(project) {
  return list(project.highlights);
}

const localizedFlows = {
  en: ["Query", "Embedding", "Qdrant", "Answer"],
  hi: ["प्रश्न", "Embedding", "Qdrant", "उत्तर"],
  gu: ["પ્રશ્ન", "Embedding", "Qdrant", "જવાબ"],
  mr: ["प्रश्न", "Embedding", "Qdrant", "उत्तर"],
  bn: ["প্রশ্ন", "Embedding", "Qdrant", "উত্তর"],
  ta: ["கேள்வி", "Embedding", "Qdrant", "பதில்"],
  te: ["ప్రశ్న", "Embedding", "Qdrant", "సమాధానం"],
  kn: ["ಪ್ರಶ್ನೆ", "Embedding", "Qdrant", "ಉತ್ತರ"],
  ml: ["ചോദ്യം", "Embedding", "Qdrant", "ഉത്തരം"],
};

function projectFlow(project, language = "en") {
  if (project.architecture.join("|") === "Query|Embedding|Qdrant|Answer") {
    return localizedFlows[language].join(" -> ");
  }

  return project.architecture.join(" -> ");
}

const replyCopy = {
  en: {
    about: ({ profile }) =>
      `${profile.name} is an ${profile.title} from ${profile.location}. ${profile.summary}`,
    skills: ({ skills }) =>
      `Parth's stack includes ${list(skills.slice(0, 12))}, plus AI workflow tools like ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, and Codex.`,
    projects: ({ projects }) =>
      `Featured projects: ${projects.map((project) => project.title).join("; ")}. The strongest themes are RAG, automation, NLP, computer vision, and production-ready APIs.`,
    rag: ({ projects }) =>
      `${projects[0].title}: a multilingual educational RAG chatbot for 8+ Indian languages. Stack: ${projectStack(projects[0])}. Flow: ${projectFlow(projects[0])}.`,
    whatsapp: ({ projects }) =>
      `${projects[1].title}: an AI-powered WhatsApp automation workflow using n8n and WhatsApp Cloud API. Stack: ${projectStack(projects[1])}.`,
    medical: ({ projects }) =>
      `${projects[2].title}: a disease prediction and recommendation system using ${projectStack(projects[2])}. Result: ${projects[2].metric}.`,
    image: ({ projects }) =>
      `${projects[3].title}: an OpenCV and Streamlit dashboard for sharpness, noise, and clarity analysis. Focus: ${projects[3].metric}.`,
    experience: ({ experiences }) =>
      experiences.map((item) => `${item.role} at ${item.company}: ${item.bullets[0]}`).join(" "),
    education: ({ profile }) =>
      `${profile.name} is pursuing ${profile.graduation}. His focus is applied AI/ML engineering, RAG, NLP, computer vision, and automation workflows.`,
    certifications: ({ certifications }) =>
      `Certifications include ${certifications.map((item) => `${item.provider} - ${item.name}`).join("; ")}.`,
    contact: ({ profile }) =>
      `You can reach Parth by email at ${profile.email}, or through GitHub and LinkedIn from the contact section. He is open to AI/ML roles, internships, and AI product work.`,
    fallback:
      "I can answer best about Parth's AI/ML skills, RAG work, WhatsApp automation, medical ML system, image quality analyzer, internships, certifications, and contact details.",
  },
  hi: {
    about: ({ profile }) =>
      `पार्थ जोशी ${profile.location} से एक AI/ML Engineer हैं। वे RAG systems, NLP, computer vision और intelligent automation में काम करते हैं।`,
    skills: ({ skills }) =>
      `पार्थ के मुख्य कौशल हैं: ${list(skills.slice(0, 12))}. वे ChatGPT, Claude, Cursor, GitHub Copilot, Gemini और Codex जैसे AI tools भी उपयोग करते हैं।`,
    projects: ({ projects }) =>
      `पार्थ के प्रमुख प्रोजेक्ट हैं: ${projects.map((project) => project.title).join("; ")}. उनका फोकस RAG, automation, NLP, computer vision और production-ready APIs पर है।`,
    rag: ({ projects }) =>
      `${projects[0].title}: यह 8+ भारतीय भाषाओं के लिए शैक्षणिक multilingual RAG chatbot है। तकनीकी स्टैक: ${projectStack(projects[0])}. प्रवाह: ${projectFlow(projects[0], "hi")}.`,
    whatsapp: ({ projects }) =>
      `${projects[1].title}: यह n8n और WhatsApp Cloud API से बना AI-powered WhatsApp automation workflow है। तकनीकी स्टैक: ${projectStack(projects[1])}.`,
    medical: ({ projects }) =>
      `${projects[2].title}: यह ${projectStack(projects[2])} से बना disease prediction और recommendation system है। परिणाम: ${projects[2].metric}.`,
    image: ({ projects }) =>
      `${projects[3].title}: यह OpenCV और Streamlit dashboard है जो sharpness, noise और clarity analyze करता है। मुख्य फोकस: ${projects[3].metric}.`,
    experience: ({ experiences }) =>
      `अनुभव: ${experiences[0].company} में RAG pipelines, LangChain, Qdrant और OpenAI embeddings पर काम; ${experiences[1].company} में ML classification और preprocessing pipelines पर काम।`,
    education: ({ profile }) =>
      `पार्थ ${profile.graduation} कर रहे हैं। उनका फोकस applied AI/ML engineering, RAG, NLP, computer vision और automation workflows पर है।`,
    certifications: ({ certifications }) =>
      `प्रमाणपत्रों में ${certifications.map((item) => `${item.provider} - ${item.name}`).join("; ")} शामिल हैं।`,
    contact: ({ profile }) =>
      `आप पार्थ से email ${profile.email} पर संपर्क कर सकते हैं, या contact section से GitHub और LinkedIn पर जा सकते हैं। वे AI/ML roles, internships और AI product work के लिए open हैं।`,
    fallback:
      "मैं पार्थ के AI/ML skills, RAG work, WhatsApp automation, medical ML system, image quality analyzer, internships, certifications और contact details के बारे में सबसे अच्छा जवाब दे सकता हूँ।",
  },
  gu: {
    about: ({ profile }) =>
      `પાર્થ જોશી ${profile.location} ના AI/ML Engineer છે. તેઓ RAG systems, NLP, computer vision અને intelligent automation માં કામ કરે છે.`,
    skills: ({ skills }) =>
      `પાર્થના મુખ્ય કૌશલ્યો છે: ${list(skills.slice(0, 12))}. તેઓ ChatGPT, Claude, Cursor, GitHub Copilot, Gemini અને Codex જેવા AI tools પણ વાપરે છે.`,
    projects: ({ projects }) =>
      `પાર્થના મુખ્ય પ્રોજેક્ટ્સ છે: ${projects.map((project) => project.title).join("; ")}. તેમનો ફોકસ RAG, automation, NLP, computer vision અને production-ready APIs પર છે.`,
    rag: ({ projects }) =>
      `${projects[0].title}: આ 8+ ભારતીય ભાષાઓ માટેનું શૈક્ષણિક multilingual RAG chatbot છે. ટેક સ્ટેક: ${projectStack(projects[0])}. પ્રવાહ: ${projectFlow(projects[0], "gu")}.`,
    whatsapp: ({ projects }) =>
      `${projects[1].title}: આ n8n અને WhatsApp Cloud API વડે બનાવેલું AI-powered WhatsApp automation workflow છે. ટેક સ્ટેક: ${projectStack(projects[1])}.`,
    medical: ({ projects }) =>
      `${projects[2].title}: આ ${projectStack(projects[2])} વડે બનાવેલું disease prediction અને recommendation system છે. પરિણામ: ${projects[2].metric}.`,
    image: ({ projects }) =>
      `${projects[3].title}: આ OpenCV અને Streamlit dashboard છે, જે sharpness, noise અને clarity analyze કરે છે. મુખ્ય ફોકસ: ${projects[3].metric}.`,
    experience: ({ experiences }) =>
      `અનુભવ: ${experiences[0].company} માં RAG pipelines, LangChain, Qdrant અને OpenAI embeddings પર કામ; ${experiences[1].company} માં ML classification અને preprocessing pipelines પર કામ.`,
    education: ({ profile }) =>
      `પાર્થ ${profile.graduation} કરી રહ્યા છે. તેમનો ફોકસ applied AI/ML engineering, RAG, NLP, computer vision અને automation workflows પર છે.`,
    certifications: ({ certifications }) =>
      `પ્રમાણપત્રોમાં ${certifications.map((item) => `${item.provider} - ${item.name}`).join("; ")} સામેલ છે.`,
    contact: ({ profile }) =>
      `તમે પાર્થને email ${profile.email} પર સંપર્ક કરી શકો છો, અથવા contact section માંથી GitHub અને LinkedIn જોઈ શકો છો. તેઓ AI/ML roles, internships અને AI product work માટે તૈયાર છે.`,
    fallback:
      "હું પાર્થના AI/ML skills, RAG work, WhatsApp automation, medical ML system, image quality analyzer, internships, certifications અને contact details વિશે સારી રીતે જવાબ આપી શકું છું.",
  },
  mr: {
    about: ({ profile }) =>
      `पार्थ जोशी ${profile.location} मधील AI/ML Engineer आहेत. ते RAG systems, NLP, computer vision आणि intelligent automation वर काम करतात.`,
    skills: ({ skills }) =>
      `पार्थची मुख्य कौशल्ये आहेत: ${list(skills.slice(0, 12))}. ते ChatGPT, Claude, Cursor, GitHub Copilot, Gemini आणि Codex सारखी AI tools वापरतात.`,
    projects: ({ projects }) =>
      `पार्थचे प्रमुख प्रोजेक्ट्स आहेत: ${projects.map((project) => project.title).join("; ")}. त्यांचा फोकस RAG, automation, NLP, computer vision आणि production-ready APIs वर आहे.`,
    rag: ({ projects }) =>
      `${projects[0].title}: हा 8+ भारतीय भाषांसाठी शैक्षणिक multilingual RAG chatbot आहे. टेक स्टॅक: ${projectStack(projects[0])}. प्रवाह: ${projectFlow(projects[0], "mr")}.`,
    whatsapp: ({ projects }) =>
      `${projects[1].title}: हा n8n आणि WhatsApp Cloud API वापरून बनवलेला AI-powered WhatsApp automation workflow आहे. टेक स्टॅक: ${projectStack(projects[1])}.`,
    medical: ({ projects }) =>
      `${projects[2].title}: हा ${projectStack(projects[2])} वापरून बनवलेला disease prediction आणि recommendation system आहे. निकाल: ${projects[2].metric}.`,
    image: ({ projects }) =>
      `${projects[3].title}: हा OpenCV आणि Streamlit dashboard आहे, जो sharpness, noise आणि clarity analyze करतो. मुख्य फोकस: ${projects[3].metric}.`,
    experience: ({ experiences }) =>
      `अनुभव: ${experiences[0].company} मध्ये RAG pipelines, LangChain, Qdrant आणि OpenAI embeddings वर काम; ${experiences[1].company} मध्ये ML classification आणि preprocessing pipelines वर काम.`,
    education: ({ profile }) =>
      `पार्थ ${profile.graduation} करत आहेत. त्यांचा फोकस applied AI/ML engineering, RAG, NLP, computer vision आणि automation workflows वर आहे.`,
    certifications: ({ certifications }) =>
      `प्रमाणपत्रांमध्ये ${certifications.map((item) => `${item.provider} - ${item.name}`).join("; ")} समाविष्ट आहेत.`,
    contact: ({ profile }) =>
      `तुम्ही पार्थशी email ${profile.email} वर संपर्क करू शकता, किंवा contact section मधून GitHub आणि LinkedIn पाहू शकता. ते AI/ML roles, internships आणि AI product work साठी उपलब्ध आहेत.`,
    fallback:
      "मी पार्थचे AI/ML skills, RAG work, WhatsApp automation, medical ML system, image quality analyzer, internships, certifications आणि contact details याबद्दल चांगले उत्तर देऊ शकतो.",
  },
  bn: {
    about: ({ profile }) =>
      `পার্থ জোশী ${profile.location}-এর একজন AI/ML Engineer। তিনি RAG systems, NLP, computer vision এবং intelligent automation নিয়ে কাজ করেন।`,
    skills: ({ skills }) =>
      `পার্থের প্রধান দক্ষতা: ${list(skills.slice(0, 12))}. তিনি ChatGPT, Claude, Cursor, GitHub Copilot, Gemini এবং Codex-এর মতো AI tools ব্যবহার করেন।`,
    projects: ({ projects }) =>
      `পার্থের প্রধান প্রজেক্ট: ${projects.map((project) => project.title).join("; ")}. তাঁর মূল ফোকাস RAG, automation, NLP, computer vision এবং production-ready APIs.`,
    rag: ({ projects }) =>
      `${projects[0].title}: এটি 8+ ভারতীয় ভাষার জন্য educational multilingual RAG chatbot। টেক স্ট্যাক: ${projectStack(projects[0])}. প্রবাহ: ${projectFlow(projects[0], "bn")}.`,
    whatsapp: ({ projects }) =>
      `${projects[1].title}: এটি n8n এবং WhatsApp Cloud API দিয়ে তৈরি AI-powered WhatsApp automation workflow। টেক স্ট্যাক: ${projectStack(projects[1])}.`,
    medical: ({ projects }) =>
      `${projects[2].title}: এটি ${projectStack(projects[2])} দিয়ে তৈরি disease prediction এবং recommendation system। ফলাফল: ${projects[2].metric}.`,
    image: ({ projects }) =>
      `${projects[3].title}: এটি OpenCV এবং Streamlit dashboard, যা sharpness, noise এবং clarity analyze করে। মূল ফোকাস: ${projects[3].metric}.`,
    experience: ({ experiences }) =>
      `অভিজ্ঞতা: ${experiences[0].company}-এ RAG pipelines, LangChain, Qdrant এবং OpenAI embeddings নিয়ে কাজ; ${experiences[1].company}-এ ML classification এবং preprocessing pipelines নিয়ে কাজ।`,
    education: ({ profile }) =>
      `পার্থ ${profile.graduation} করছেন। তাঁর ফোকাস applied AI/ML engineering, RAG, NLP, computer vision এবং automation workflows.`,
    certifications: ({ certifications }) =>
      `সার্টিফিকেশন: ${certifications.map((item) => `${item.provider} - ${item.name}`).join("; ")}.`,
    contact: ({ profile }) =>
      `আপনি পার্থের সাথে email ${profile.email}-এ যোগাযোগ করতে পারেন, অথবা contact section থেকে GitHub ও LinkedIn দেখতে পারেন। তিনি AI/ML roles, internships এবং AI product work-এর জন্য প্রস্তুত।`,
    fallback:
      "আমি পার্থের AI/ML skills, RAG work, WhatsApp automation, medical ML system, image quality analyzer, internships, certifications এবং contact details নিয়ে ভালো উত্তর দিতে পারি।",
  },
  ta: {
    about: ({ profile }) =>
      `பார்த் ஜோஷி ${profile.location} சேர்ந்த AI/ML Engineer. அவர் RAG systems, NLP, computer vision மற்றும் intelligent automation மீது வேலை செய்கிறார்.`,
    skills: ({ skills }) =>
      `பார்தின் முக்கிய திறன்கள்: ${list(skills.slice(0, 12))}. அவர் ChatGPT, Claude, Cursor, GitHub Copilot, Gemini மற்றும் Codex போன்ற AI tools பயன்படுத்துகிறார்.`,
    projects: ({ projects }) =>
      `பார்தின் முக்கிய திட்டங்கள்: ${projects.map((project) => project.title).join("; ")}. முக்கிய கவனம் RAG, automation, NLP, computer vision மற்றும் production-ready APIs.`,
    rag: ({ projects }) =>
      `${projects[0].title}: இது 8+ இந்திய மொழிகளுக்கான கல்வி சார்ந்த multilingual RAG chatbot. தொழில்நுட்ப அடுக்கு: ${projectStack(projects[0])}. ஓட்டம்: ${projectFlow(projects[0], "ta")}.`,
    whatsapp: ({ projects }) =>
      `${projects[1].title}: இது n8n மற்றும் WhatsApp Cloud API கொண்டு உருவாக்கப்பட்ட AI-powered WhatsApp automation workflow. தொழில்நுட்ப அடுக்கு: ${projectStack(projects[1])}.`,
    medical: ({ projects }) =>
      `${projects[2].title}: இது ${projectStack(projects[2])} கொண்டு உருவாக்கப்பட்ட disease prediction மற்றும் recommendation system. முடிவு: ${projects[2].metric}.`,
    image: ({ projects }) =>
      `${projects[3].title}: இது OpenCV மற்றும் Streamlit dashboard; sharpness, noise, clarity ஆகியவற்றை analyze செய்கிறது. முக்கிய கவனம்: ${projects[3].metric}.`,
    experience: ({ experiences }) =>
      `அனுபவம்: ${experiences[0].company}-இல் RAG pipelines, LangChain, Qdrant மற்றும் OpenAI embeddings மீது வேலை; ${experiences[1].company}-இல் ML classification மற்றும் preprocessing pipelines மீது வேலை.`,
    education: ({ profile }) =>
      `பார்த் ${profile.graduation} படித்து வருகிறார். அவரது கவனம் applied AI/ML engineering, RAG, NLP, computer vision மற்றும் automation workflows.`,
    certifications: ({ certifications }) =>
      `சான்றிதழ்கள்: ${certifications.map((item) => `${item.provider} - ${item.name}`).join("; ")}.`,
    contact: ({ profile }) =>
      `பார்தை email ${profile.email} மூலம் தொடர்பு கொள்ளலாம், அல்லது contact section-ல் GitHub மற்றும் LinkedIn பார்க்கலாம். அவர் AI/ML roles, internships மற்றும் AI product work-க்கு தயாராக உள்ளார்.`,
    fallback:
      "பார்தின் AI/ML skills, RAG work, WhatsApp automation, medical ML system, image quality analyzer, internships, certifications மற்றும் contact details பற்றி நான் சிறப்பாக பதிலளிக்க முடியும்.",
  },
  te: {
    about: ({ profile }) =>
      `పార్థ్ జోషి ${profile.location} కు చెందిన AI/ML Engineer. ఆయన RAG systems, NLP, computer vision మరియు intelligent automation పై పని చేస్తున్నారు.`,
    skills: ({ skills }) =>
      `పార్థ్ ప్రధాన నైపుణ్యాలు: ${list(skills.slice(0, 12))}. ఆయన ChatGPT, Claude, Cursor, GitHub Copilot, Gemini మరియు Codex వంటి AI tools కూడా ఉపయోగిస్తారు.`,
    projects: ({ projects }) =>
      `పార్థ్ ముఖ్య ప్రాజెక్టులు: ${projects.map((project) => project.title).join("; ")}. ప్రధాన ఫోకస్ RAG, automation, NLP, computer vision మరియు production-ready APIs.`,
    rag: ({ projects }) =>
      `${projects[0].title}: ఇది 8+ భారతీయ భాషల కోసం విద్యా సంబంధిత multilingual RAG chatbot. టెక్ స్టాక్: ${projectStack(projects[0])}. ప్రవాహం: ${projectFlow(projects[0], "te")}.`,
    whatsapp: ({ projects }) =>
      `${projects[1].title}: ఇది n8n మరియు WhatsApp Cloud API తో చేసిన AI-powered WhatsApp automation workflow. టెక్ స్టాక్: ${projectStack(projects[1])}.`,
    medical: ({ projects }) =>
      `${projects[2].title}: ఇది ${projectStack(projects[2])} తో చేసిన disease prediction మరియు recommendation system. ఫలితం: ${projects[2].metric}.`,
    image: ({ projects }) =>
      `${projects[3].title}: ఇది OpenCV మరియు Streamlit dashboard; sharpness, noise, clarity ను analyze చేస్తుంది. ప్రధాన ఫోకస్: ${projects[3].metric}.`,
    experience: ({ experiences }) =>
      `అనుభవం: ${experiences[0].company} లో RAG pipelines, LangChain, Qdrant మరియు OpenAI embeddings పై పని; ${experiences[1].company} లో ML classification మరియు preprocessing pipelines పై పని.`,
    education: ({ profile }) =>
      `పార్థ్ ${profile.graduation} చేస్తున్నారు. ఆయన ఫోకస్ applied AI/ML engineering, RAG, NLP, computer vision మరియు automation workflows.`,
    certifications: ({ certifications }) =>
      `సర్టిఫికేషన్లు: ${certifications.map((item) => `${item.provider} - ${item.name}`).join("; ")}.`,
    contact: ({ profile }) =>
      `మీరు పార్థ్‌ను email ${profile.email} ద్వారా సంప్రదించవచ్చు, లేదా contact section లో GitHub మరియు LinkedIn చూడవచ్చు. ఆయన AI/ML roles, internships మరియు AI product work కోసం సిద్ధంగా ఉన్నారు.`,
    fallback:
      "నేను పార్థ్ యొక్క AI/ML skills, RAG work, WhatsApp automation, medical ML system, image quality analyzer, internships, certifications మరియు contact details గురించి బాగా సమాధానం ఇవ్వగలను.",
  },
  kn: {
    about: ({ profile }) =>
      `ಪಾರ್ಥ್ ಜೋಶಿ ${profile.location} ನ AI/ML Engineer. ಅವರು RAG systems, NLP, computer vision ಮತ್ತು intelligent automation ಮೇಲೆ ಕೆಲಸ ಮಾಡುತ್ತಾರೆ.`,
    skills: ({ skills }) =>
      `ಪಾರ್ಥ್ ಅವರ ಪ್ರಮುಖ ಕೌಶಲ್ಯಗಳು: ${list(skills.slice(0, 12))}. ಅವರು ChatGPT, Claude, Cursor, GitHub Copilot, Gemini ಮತ್ತು Codex ಮುಂತಾದ AI tools ಬಳಸುತ್ತಾರೆ.`,
    projects: ({ projects }) =>
      `ಪಾರ್ಥ್ ಅವರ ಪ್ರಮುಖ ಪ್ರಾಜೆಕ್ಟ್ಗಳು: ${projects.map((project) => project.title).join("; ")}. ಮುಖ್ಯ ಫೋಕಸ್ RAG, automation, NLP, computer vision ಮತ್ತು production-ready APIs.`,
    rag: ({ projects }) =>
      `${projects[0].title}: ಇದು 8+ ಭಾರತೀಯ ಭಾಷೆಗಳಿಗಾಗಿ ಶಿಕ್ಷಣಾಧಾರಿತ multilingual RAG chatbot. ಟೆಕ್ ಸ್ಟ್ಯಾಕ್: ${projectStack(projects[0])}. ಹರಿವು: ${projectFlow(projects[0], "kn")}.`,
    whatsapp: ({ projects }) =>
      `${projects[1].title}: ಇದು n8n ಮತ್ತು WhatsApp Cloud API ಬಳಸಿ ನಿರ್ಮಿಸಿದ AI-powered WhatsApp automation workflow. ಟೆಕ್ ಸ್ಟ್ಯಾಕ್: ${projectStack(projects[1])}.`,
    medical: ({ projects }) =>
      `${projects[2].title}: ಇದು ${projectStack(projects[2])} ಬಳಸಿ ನಿರ್ಮಿಸಿದ disease prediction ಮತ್ತು recommendation system. ಫಲಿತಾಂಶ: ${projects[2].metric}.`,
    image: ({ projects }) =>
      `${projects[3].title}: ಇದು OpenCV ಮತ್ತು Streamlit dashboard; sharpness, noise, clarity analyze ಮಾಡುತ್ತದೆ. ಮುಖ್ಯ ಫೋಕಸ್: ${projects[3].metric}.`,
    experience: ({ experiences }) =>
      `ಅನುಭವ: ${experiences[0].company} ನಲ್ಲಿ RAG pipelines, LangChain, Qdrant ಮತ್ತು OpenAI embeddings ಮೇಲೆ ಕೆಲಸ; ${experiences[1].company} ನಲ್ಲಿ ML classification ಮತ್ತು preprocessing pipelines ಮೇಲೆ ಕೆಲಸ.`,
    education: ({ profile }) =>
      `ಪಾರ್ಥ್ ${profile.graduation} ಮಾಡುತ್ತಿದ್ದಾರೆ. ಅವರ focus applied AI/ML engineering, RAG, NLP, computer vision ಮತ್ತು automation workflows.`,
    certifications: ({ certifications }) =>
      `ಪ್ರಮಾಣಪತ್ರಗಳು: ${certifications.map((item) => `${item.provider} - ${item.name}`).join("; ")}.`,
    contact: ({ profile }) =>
      `ನೀವು ಪಾರ್ಥ್ ಅವರನ್ನು email ${profile.email} ಮೂಲಕ ಸಂಪರ್ಕಿಸಬಹುದು, ಅಥವಾ contact section ನಲ್ಲಿ GitHub ಮತ್ತು LinkedIn ನೋಡಬಹುದು. ಅವರು AI/ML roles, internships ಮತ್ತು AI product work ಗೆ ಸಿದ್ಧರಾಗಿದ್ದಾರೆ.`,
    fallback:
      "ನಾನು ಪಾರ್ಥ್ ಅವರ AI/ML skills, RAG work, WhatsApp automation, medical ML system, image quality analyzer, internships, certifications ಮತ್ತು contact details ಬಗ್ಗೆ ಚೆನ್ನಾಗಿ ಉತ್ತರಿಸಬಹುದು.",
  },
  ml: {
    about: ({ profile }) =>
      `പാർത്ഥ് ജോഷി ${profile.location} സ്വദേശിയായ AI/ML Engineer ആണ്. അദ്ദേഹം RAG systems, NLP, computer vision, intelligent automation എന്നിവയിൽ പ്രവർത്തിക്കുന്നു.`,
    skills: ({ skills }) =>
      `പാർത്ഥിന്റെ പ്രധാന കഴിവുകൾ: ${list(skills.slice(0, 12))}. അദ്ദേഹം ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, Codex പോലുള്ള AI tools ഉപയോഗിക്കുന്നു.`,
    projects: ({ projects }) =>
      `പാർത്ഥിന്റെ പ്രധാന പ്രോജക്ടുകൾ: ${projects.map((project) => project.title).join("; ")}. പ്രധാന ശ്രദ്ധ RAG, automation, NLP, computer vision, production-ready APIs എന്നിവയിലാണ്.`,
    rag: ({ projects }) =>
      `${projects[0].title}: ഇത് 8+ ഇന്ത്യൻ ഭാഷകൾക്കായുള്ള വിദ്യാഭ്യാസ multilingual RAG chatbot ആണ്. ടെക് സ്റ്റാക്ക്: ${projectStack(projects[0])}. പ്രവാഹം: ${projectFlow(projects[0], "ml")}.`,
    whatsapp: ({ projects }) =>
      `${projects[1].title}: ഇത് n8n, WhatsApp Cloud API എന്നിവ ഉപയോഗിച്ച് നിർമിച്ച AI-powered WhatsApp automation workflow ആണ്. ടെക് സ്റ്റാക്ക്: ${projectStack(projects[1])}.`,
    medical: ({ projects }) =>
      `${projects[2].title}: ഇത് ${projectStack(projects[2])} ഉപയോഗിച്ച് നിർമിച്ച disease prediction, recommendation system ആണ്. ഫലം: ${projects[2].metric}.`,
    image: ({ projects }) =>
      `${projects[3].title}: ഇത് OpenCV, Streamlit dashboard ആണ്; sharpness, noise, clarity analyze ചെയ്യുന്നു. പ്രധാന ശ്രദ്ധ: ${projects[3].metric}.`,
    experience: ({ experiences }) =>
      `അനുഭവം: ${experiences[0].company}-ൽ RAG pipelines, LangChain, Qdrant, OpenAI embeddings എന്നിവയിൽ ജോലി; ${experiences[1].company}-ൽ ML classification, preprocessing pipelines എന്നിവയിൽ ജോലി.`,
    education: ({ profile }) =>
      `പാർത്ഥ് ${profile.graduation} ചെയ്യുകയാണ്. അദ്ദേഹത്തിന്റെ focus applied AI/ML engineering, RAG, NLP, computer vision, automation workflows എന്നിവയിലാണ്.`,
    certifications: ({ certifications }) =>
      `സർട്ടിഫിക്കേഷനുകൾ: ${certifications.map((item) => `${item.provider} - ${item.name}`).join("; ")}.`,
    contact: ({ profile }) =>
      `പാർത്ഥുമായി email ${profile.email} വഴി ബന്ധപ്പെടാം, അല്ലെങ്കിൽ contact section-ൽ GitHub, LinkedIn കാണാം. അദ്ദേഹം AI/ML roles, internships, AI product work എന്നിവയ്ക്ക് തയ്യാറാണ്.`,
    fallback:
      "പാർത്ഥിന്റെ AI/ML skills, RAG work, WhatsApp automation, medical ML system, image quality analyzer, internships, certifications, contact details എന്നിവയെക്കുറിച്ച് എനിക്ക് നല്ല മറുപടി നൽകാം.",
  },
};

const fallbackKeywordIntents = [
  ["contact", ["contact", "email", "phone", "hire", "github", "linkedin"]],
  ["rag", ["rag", "retrieval", "chatbot", "qdrant", "embedding"]],
  ["whatsapp", ["whatsapp", "automation", "agent", "n8n"]],
  ["medical", ["medical", "disease", "cnn", "lstm", "accuracy"]],
  ["image", ["image", "opencv", "vision", "quality", "sharpness", "noise"]],
  ["experience", ["experience", "intern", "work", "codiotic", "launchspring"]],
  ["education", ["education", "degree", "b.tech", "college"]],
  ["certifications", ["certification", "certificate", "nvidia", "microsoft", "accenture"]],
  ["skills", ["skill", "tech", "stack", "tool", "python", "react", "fastapi", "langchain"]],
  ["projects", ["project", "build", "portfolio"]],
  ["about", ["about", "who", "profile", "background", "strength", "location"]],
];

function inferIntent(input) {
  const query = input.toLocaleLowerCase();
  return fallbackKeywordIntents.find(([, keywords]) => keywords.some((keyword) => query.includes(keyword)))?.[0] ?? null;
}

export function buildAssistantReply({ input, intent, profile, skills, projects, experiences, certifications }) {
  const language = detectAssistantLanguage(input);
  const copy = replyCopy[language] ?? replyCopy.en;
  const resolvedIntent = intent || inferIntent(input);
  const context = { profile, skills, projects, experiences, certifications };
  const reply = copy[resolvedIntent];

  if (typeof reply === "function") {
    return reply(context);
  }

  return copy.fallback;
}
