// @ts-nocheck
/* eslint-disable */
/** @jsxImportSource frog/jsx */
import { Button, Frog } from 'frog'
import { handle } from 'frog/next'

const app = new Frog({
  basePath: '/api',
  title: 'RoastMyWallet',
})

// --- 🗄️ ROAST DATABASE (The insults) ---
const ROAST_DB = {
  broke: [
    "Your wallet has more dust than an abandoned house.",
    "Gas fees cost more than your entire net worth.",
    "McDonald's is hiring, just saying. Web3 isn't for you.",
    "You are the reason crypto faucets exist.",
    "I've seen piggy banks with more liquidity than this.",
    "Your portfolio value is a rounding error on Ethereum.",
    "Stop refreshing the page, the zero isn't going away."
  ],
  rekt: [
    "Buy High, Sell Low is a joke, not a financial roadmap.",
    "Your portfolio looks like a crime scene. Red everywhere.",
    "Exit liquidity for the whales. Thank you for your service.",
    "Stop checking the price, it's already dead.",
    "If losing money was an Olympic sport, you'd have Gold.",
    "You turned a Lambo into a bicycle. Impressive.",
    "This isn't investing, it's financial masochism."
  ],
  addict: [
    "Touch grass. Seriously. The blockchain doesn't need you every second.",
    "Do you sleep, or do you just sign transactions?",
    "Your ISP called, they want their bandwidth back.",
    "Overtrading is a disease. You are patient zero.",
    "You've paid enough gas fees to power a small village.",
    "28,000 transactions and you're still not rich? How?"
  ],
  nft: [
    "Nice JPEG collection. Worth approximately $0.00.",
    "Right-click save would have been cheaper.",
    "Your wallet looks like a digital garage sale.",
    "You're not a collector, you're a hoarder.",
    "Diamond handing a JPEG to the grave. Respectfully, why?",
    "I bet you explain your NFTs to people at parties and they leave."
  ]
};

// --- 🧠 ANALYZER LOGIC ---
// Kullanıcının Farcaster ID'sine göre "Rastgele ama Tutarlı" bir sonuç üretir.
function analyzeWallet(fid: number) {
  // Basit bir modülo işlemi ile kullanıcıya bir kategori atıyoruz.
  const lastDigit = fid % 4;
  
  if (lastDigit === 0) return { type: 'broke', label: 'Dust Collector 🌪️' };
  if (lastDigit === 1) return { type: 'rekt', label: 'Professional Loser 📉' };
  if (lastDigit === 2) return { type: 'addict', label: 'Gas Guzzler ⛽' };
  return { type: 'nft', label: 'JPEG Hoarder 🖼️' };
}

function getRoastMessage(type: string) {
  const messages = ROAST_DB[type] || ROAST_DB.broke;
  return messages[Math.floor(Math.random() * messages.length)];
}

// --- 🏠 SCREEN 1: LANDING PAGE ---
app.frame('/', (c) => {
  return c.res({
    image: (
      <div style={{ 
        color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
        width: '100%', height: '100%', 
        background: 'linear-gradient(to right, #1a1a1a, #000000)', textAlign: 'center', fontFamily: 'sans-serif'
      }}>
        <div style={{ fontSize: 100, marginBottom: 20 }}>🔥</div>
        <h1 style={{ fontSize: 70, fontWeight: '900', margin: 0, textTransform: 'uppercase', letterSpacing: '-2px' }}>RoastMyWallet</h1>
        <p style={{ fontSize: 32, opacity: 0.7, maxWidth: '80%' }}>
          Connect your wallet. Let AI analyze your bad decisions. Get roasted.
        </p>
        <div style={{ marginTop: 30, fontSize: 20, color: '#ff5e00' }}>⚠️ Emotional Damage Guaranteed</div>
      </div>
    ),
    intents: [
      <Button action="/analyze">🔥 CONNECT & ROAST 🔥</Button>,
    ],
  })
})

// --- 🔥 SCREEN 2: THE ROAST & SHARE ---
app.frame('/analyze', (c) => {
  const { frameData } = c;
  // Kullanıcının ID'sini alıyoruz (Yoksa varsayılan 123)
  const fid = frameData?.fid || 123;
  
  // Analiz yap
  const result = analyzeWallet(fid);
  const roastText = getRoastMessage(result.type);

  // Paylaşım Metni (URL Encoded)
  const shareText = encodeURIComponent(`I just let AI analyze my wallet and... wow. 💀\n\nVerdict: ${result.label}\n"${roastText}"\n\nDare to try? 👇`);
  // Frame URL'nizi buraya yazacaksınız (Deploy sonrası)
  const appUrl = "https://roast-my-wallet.vercel.app/api"; 

  return c.res({
    image: (
      <div style={{ 
        color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
        width: '100%', height: '100%', 
        background: 'linear-gradient(to bottom, #2b0e0e, #000000)', padding: '50px', textAlign: 'center', fontFamily: 'sans-serif'
      }}>
        <div style={{ 
          display: 'flex', flexDirection: 'column', alignItems: 'center', 
          border: '4px solid #ff4500', borderRadius: '25px', padding: '40px', background: 'rgba(0,0,0,0.6)'
        }}>
          <h2 style={{ fontSize: 30, color: '#ff4500', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>Analysis Complete</h2>
          <h1 style={{ fontSize: 60, margin: '10px 0' }}>{result.label}</h1>
          
          <div style={{ width: '100%', height: '2px', background: '#ff4500', margin: '20px 0', opacity: 0.5 }}></div>
          
          <p style={{ fontSize: 38, fontStyle: 'italic', lineHeight: '1.3' }}>
            "{roastText}"
          </p>
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={`https://warpcast.com/~/compose?text=${shareText}&embeds[]=${appUrl}`}>📢 Share on Warpcast</Button.Link>,
      <Button.Link href={`https://twitter.com/intent/tweet?text=${shareText}&url=${appUrl}`}>🐦 Share on X</Button.Link>,
      <Button.Reset>💀 Try Again</Button.Reset>
    ],
  })
})

export const GET = handle(app)
export const POST = handle(app)
