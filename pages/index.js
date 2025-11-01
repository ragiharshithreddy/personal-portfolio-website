import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Folder, Mail, Book, Rocket, Globe, Github, Linkedin, Code, Cpu, Zap } from 'lucide-react';

const RagiOS = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef(null);

  const translations = {
    en: {
      greeting: "Welcome to RagiOS v1.0",
      subtitle: "Systems Architect | AI Builder | Student Empowerer",
      bootMsg: "Initializing builder terminal...",
      ready: "System ready. Type 'help' for available commands.",
      name: "Ragi Harshith Reddy",
      location: "Jangaon, Telangana, IN"
    },
    hi: {
      greeting: "RagiOS v1.0 में आपका स्वागत है",
      subtitle: "सिस्टम आर्किटेक्ट | AI बिल्डर | छात्र सशक्तिकरण",
      bootMsg: "बिल्डर टर्मिनल शुरू हो रहा है...",
      ready: "सिस्टम तैयार। उपलब्ध कमांड के लिए 'help' टाइप करें।",
      name: "रागि हर्षित रेड्डी",
      location: "जंगांव, तेलंगाना, भारत"
    },
    te: {
      greeting: "RagiOS v1.0 కు స్వాగతం",
      subtitle: "సిస్టమ్స్ ఆర్కిటెక్ట్ | AI బిల్డర్ | విద్యార్థి శక్తివంతం",
      bootMsg: "బిల్డర్ టెర్మినల్ ప్రారంభమవుతోంది...",
      ready: "సిస్టమ్ సిద్ధంగా ఉంది. అందుబాటులో ఉన్న ఆదేశాల కోసం 'help' టైప్ చేయండి.",
      name: "రాగి హర్షిత్ రెడ్డి",
      location: "జంగావ్, తెలంగాణ, భారతదేశం"
    }
  };

  const projects = [
    {
      id: 'agrihelper',
      name: 'AgriHelper: Farmer\'s ML Companion',
      tagline: 'Crop disease detection that works offline',
      tech: 'Python, TensorFlow Lite, Flask',
      demo: '# Replace with actual link: https://your-agrihelper-demo.vercel.app',
      story: 'Built to help farmers identify crop diseases without internet. Reduced diagnosis time from days to seconds.'
    },
    {
      id: 'mldb',
      name: 'ML Dashboard with Email Alerts',
      tagline: 'Real-time model monitoring + automated insights',
      tech: 'React, Python, FastAPI, EmailJS',
      demo: '# Replace with actual link: https://your-ml-dashboard.netlify.app',
      story: 'Created automated ML pipeline monitoring. Sends email alerts when model accuracy drops below threshold.'
    },
    {
      id: 'emotion',
      name: 'Emotion Analyzer',
      tagline: 'Real-time facial emotion detection',
      tech: 'OpenCV, Keras, WebSocket',
      demo: '# Replace with actual link: https://emotion-analyzer-demo.vercel.app',
      story: 'Built during a hackathon. Achieved 87% accuracy on FER2013 dataset with custom CNN architecture.'
    }
  ];

  const toolkit = [
    { name: 'Resume Builder', link: '# Add your resume builder link', icon: '📝' },
    { name: 'ATS Checker', link: '# Add your ATS checker link', icon: '🎯' },
    { name: 'Storyboard Templates', link: '# Add templates link', icon: '🎨' },
    { name: 'Interview Prep Guide', link: '# Add guide link', icon: '💡' }
  ];

  const commands = {
    help: () => `Available commands:
  boot --intro     : About Ragi
  run --projects   : View project lab
  exec --demos     : Launch live demos
  open --toolkit   : Access student resources
  scan --books     : Open book vault
  ping --contact   : Send message
  switch --lang    : Change language (en/hi/te)
  sudo inspire     : Get motivated
  whoami           : Fun fact about Ragi
  clear            : Clear terminal`,
    
    'boot --intro': () => `
╔════════════════════════════════════════╗
║  ${translations[currentLang].name}  ║
║  ${translations[currentLang].location}     ║
╚════════════════════════════════════════╝

${translations[currentLang].subtitle}

I build AI-powered tools that solve real problems.
From helping farmers detect crop diseases to creating
student toolkits that democratize tech education.

Currently: Final year CS student obsessed with
Docker, WebSockets, and making AI accessible.

Contact: ragiharshithreddy@gmail.com
GitHub: github.com/ragiharshith
LinkedIn: linkedin.com/in/ragiharshithreddy`,

    'run --projects': () => projects.map((p, i) => `
[${i + 1}] ${p.name}
    ${p.tagline}
    Tech: ${p.tech}
    Demo: ${p.demo}
    Story: ${p.story}
`).join('\n'),

    'exec --demos': () => `
🚀 Live Demos:
${projects.map((p, i) => `  ${i + 1}. ${p.name}\n     → ${p.demo}`).join('\n\n')}

Note: Replace demo links in the code with your actual URLs!`,

    'open --toolkit': () => `
🛠️ Student Toolkit:
${toolkit.map((t, i) => `  ${t.icon} ${t.name}\n     → ${t.link}`).join('\n\n')}

Free resources to help you level up!`,

    'scan --books': () => `
📚 Book Vault:
  → Motivational PDFs
  → Interview Prep Guides
  → Tech Career Roadmaps
  
  Link: # Add your book vault site link here
  
Built to make quality resources accessible to everyone.`,

    'ping --contact': () => `
📧 Contact Terminal:
  Email: ragiharshithreddy@gmail.com
  GitHub: github.com/ragiharshith
  LinkedIn: linkedin.com/in/ragiharshithreddy
  
  Response time: Usually within 24h
  Timezone: IST (UTC+5:30)`,

    'switch --lang': () => {
      const langs = ['en', 'hi', 'te'];
      const nextLang = langs[(langs.indexOf(currentLang) + 1) % langs.length];
      setCurrentLang(nextLang);
      return `Language switched to: ${nextLang === 'en' ? 'English' : nextLang === 'hi' ? 'हिंदी' : 'తెలుగు'}`;
    },

    'sudo inspire': () => {
      const quotes = [
        '"The best way to predict the future is to invent it." - Alan Kay',
        '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
        '"First, solve the problem. Then, write the code." - John Johnson',
        '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
        '"The only way to do great work is to love what you do." - Steve Jobs'
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    },

    whoami: () => `
🎯 Quick Facts:
  • Obsessed with making AI accessible to non-tech users
  • Spent a weekend installing 5 different OS just for fun
  • Built a WebSocket app at 3 AM because I couldn't sleep
  • Believes the best code is the code that solves real problems
  • Tea > Coffee (fight me)`,

    clear: () => {
      setCommandHistory([]);
      return '';
    }
  };

  useEffect(() => {
    const bootSequence = async () => {
      await new Promise(r => setTimeout(r, 500));
      setTerminalText(translations[currentLang].bootMsg);
      await new Promise(r => setTimeout(r, 1000));
      setTerminalText(prev => prev + '\n' + translations[currentLang].ready);
    };
    bootSequence();
  }, [currentLang]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const output = commands[trimmedCmd] ? commands[trimmedCmd]() : `Command not found: ${cmd}. Type 'help' for available commands.`;
    
    setCommandHistory(prev => [...prev, { cmd, output }]);
    setCurrentCommand('');
    
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 0);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 overflow-hidden">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center justify-between border-b border-green-400 pb-2 mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6" />
            <h1 className="text-xl font-bold">{translations[currentLang].greeting}</h1>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/ragiharshith" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/ragiharshithreddy" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
              <Linkedin className="w-5 h-5" />
            </a>
            <button onClick={() => {
              const langs = ['en', 'hi', 'te'];
              const nextLang = langs[(langs.indexOf(currentLang) + 1) % langs.length];
              setCurrentLang(nextLang);
            }} className="hover:text-green-300">
              <Globe className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* ASCII Art */}
        <pre className="text-xs leading-tight text-green-500 opacity-70 mb-4">
{`
██████╗  █████╗  ██████╗ ██╗ ██████╗ ███████╗
██╔══██╗██╔══██╗██╔════╝ ██║██╔═══██╗██╔════╝
██████╔╝███████║██║  ███╗██║██║   ██║███████╗
██╔══██╗██╔══██║██║   ██║██║██║   ██║╚════██║
██║  ██║██║  ██║╚██████╔╝██║╚██████╔╝███████║
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝ ╚═════╝ ╚══════╝
`}
        </pre>
      </div>

      {/* Terminal Window */}
      <div className="max-w-6xl mx-auto bg-gray-900 rounded-lg border-2 border-green-400 shadow-lg shadow-green-400/20">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-green-400">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-4 text-sm text-green-400">ragios@terminal ~ {translations[currentLang].subtitle}</span>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="p-4 h-96 overflow-y-auto font-mono text-sm"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="whitespace-pre-wrap">{terminalText}</div>
          
          {commandHistory.map((item, idx) => (
            <div key={idx} className="mt-2">
              <div className="text-blue-400">
                <span className="text-green-400">ragios@terminal</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">$ </span>
                {item.cmd}
              </div>
              <div className="mt-1 text-green-300 whitespace-pre-wrap">{item.output}</div>
            </div>
          ))}

          {/* Command Input */}
          <div className="flex items-center mt-2">
            <span className="text-green-400">ragios@terminal</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$ </span>
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && currentCommand.trim()) {
                  handleCommand(currentCommand);
                }
              }}
              className="flex-1 bg-transparent outline-none text-green-400 ml-1"
              placeholder="Type 'help' for commands..."
              autoFocus
            />
            {showCursor && <span className="text-green-400 animate-pulse">▊</span>}
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Rocket, label: 'Projects', cmd: 'run --projects' },
          { icon: Code, label: 'Demos', cmd: 'exec --demos' },
          { icon: Book, label: 'Toolkit', cmd: 'open --toolkit' }
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleCommand(item.cmd)}
            className="bg-gray-900 border-2 border-green-400 rounded p-4 hover:bg-gray-800 hover:shadow-lg hover:shadow-green-400/30 transition-all"
          >
            <item.icon className="w-8 h-8 mx-auto mb-2" />
            <div className="text-center font-bold">{item.label}</div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-8 text-center text-green-600 text-sm">
        <p>Built with ❤️ in {translations[currentLang].location}</p>
        <p className="mt-1">© 2024 Ragi Harshith Reddy | ragiharshithreddy@gmail.com</p>
      </div>
    </div>
  );
};

export default RagiOS;
