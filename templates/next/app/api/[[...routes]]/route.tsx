/** @jsxImportSource frog/jsx */
import { Button, Frog } from 'frog'
import { handle } from 'frog/next'

const app = new Frog({
  basePath: '/api',
  title: 'Roast My Wallet',
})

// --- 🗄️ THE ROAST DATABASE (180+ Jokes) ---
// Şakaları kategorilere ayırdık. Sistem duruma göre buradan seçecek.
const ROAST_DB = {
  // 1. FAKİRLER İÇİN (Low Balance / Dust)
  broke: [
    "Your wallet has more dust than an abandoned house.",
    "I've seen piggy banks with more liquidity than this.",
    "Gas fees cost more than your entire net worth.",
    "Are you holding or just too broke to pay the transaction fee?",
    "Your portfolio value is a rounding error on Ethereum.",
    "McDonald's is hiring, just saying.",
    "This wallet screams 'I started crypto last week'.",
    "You're not a whale, you're not even a shrimp. You're plankton.",
    "Your balance is so low, even the scammers blocked you.",
    "Proof of Work? No, you need Proof of Wealth.",
    "If this wallet was a car, it would be a bicycle with no wheels.",
    "You provide liquidity to the market by donating your last $5.",
    "Is this a burner wallet or is your main wallet also this sad?",
    "Holding cash would have been a better investment strategy.",
    "This wallet is the financial equivalent of a participation trophy.",
    "I bet you check the charts every 5 minutes to see if you made $0.02.",
    "Your assets are frozen. Not by the SEC, but by poverty.",
    "Stop refreshing the page, the zero isn't going away.",
    "You call it 'HODLing', we call it 'Can't afford to sell'.",
    "Your seed phrase should just be 'broke broke broke broke'.",
    // ... (Listeyi uzatabiliriz, mantık anlaşıldı)
    "Looking at this balance gives me anxiety.",
    "Did you get hacked or were you always this poor?",
    "Your portfolio is stablecoin. Stable at zero.",
    "This wallet is cleaner than a hospital operating room. Empty.",
    "You are the reason faucets exist."
  ],

  // 2. KAYBEDENLER İÇİN (High Loss / Rekt / Red Charts)
  rekt: [
    "Buy High, Sell Low is a joke, not a financial roadmap.",
    "Your portfolio looks like a crime scene.",
    "I've seen better returns in a Ponzi scheme.",
    "You have a unique talent for picking the exact top.",
    "Are you allergic to profit?",
    "This isn't investing, it's financial masochism.",
    "Your graph looks like a water slide to hell.",
    "Exit liquidity for the whales. Thank you for your service.",
    "You turned a Lambo into a bicycle. Impressive.",
    "Diamonds hands? More like holding onto dust.",
    "Stop checking the price, it's already dead.",
    "Your strategy is 'Hope and Pray'. It's not working.",
    "If losing money was an Olympic sport, you'd have Gold.",
    "You managed to lose money in a bull market. How?",
    "The market goes up, you go down. It's defying physics.",
    "Your PnL is redder than a baboon's ass.",
    "Every token you touch turns to stone.",
    "You should charge people to do the opposite of your trades.",
    "I didn't know it was possible to be this bad at crypto.",
    "Your wallet is bleeding out. Call a medic.",
    "HODLing down 99% is not brave, it's stupid.",
    "You are the reason the devs bought a new Porsche.",
    "Rug pulls love you.",
    "Your investment strategy is basically 'Catch the falling knife'.",
    "Have you considered just burning your money? It's faster."
  ],

  // 3. BAĞIMLILAR İÇİN (High TX Count / Overtrading)
  addict: [
    "Touch grass. Seriously.",
    "You've paid enough gas fees to power a small village.",
    "Do you sleep, or do you just sign transactions?",
    "28,000 transactions and you're still not rich?",
    "You're trading 24/7 just to break even.",
    "Your ISP called, they want their bandwidth back.",
    "This isn't a wallet, it's a gambling addiction log.",
    "Step away from the keyboard and call your family.",
    "You trade like you're on a caffeine IV drip.",
    "Overtrading is a disease. You are patient zero.",
    "You have more transactions than a heavy metal drummer has beats.",
    "Base network basically runs on your gas fees alone.",
    "Stop clicking buttons, you're hurting yourself.",
    "Quantity over quality, the story of your life.",
    "You're churning more volume than a washing machine.",
    "Are you a bot? Be honest.",
    "Your tax report is going to be 5,000 pages long.",
    "Relax, the blockchain will still be here tomorrow.",
    "You treat Etherscan like it's social media.",
    "Making 50 trades a day to lose $10. Genius.",
    "You need a detox. Digital and financial.",
    "Your mouse clicker must be broken by now.",
    "Slow down, flash. The market isn't running away.",
    "You are single-handedly congesting the network."
  ],

  // 4. NFT KOLEKSİYONCULARI (Hoarders / JPEGs)
  nft: [
    "Nice JPEG collection. Worth approximately $0.00.",
    "Right-click save would have been cheaper.",
    "You own 500 NFTs and nobody wants a single one.",
    "Your wallet looks like a digital garage sale.",
    "Stop trying to make 'utility' happen. It's dead.",
    "You bought the top on every PFP project, didn't you?",
    "Illiquid JPEGs are not a retirement plan.",
    "You have a museum of dead projects.",
    "Did you mint every rug pull on the chain?",
    "Your NFT folder is a graveyard of broken dreams.",
    "Holding the floor... all the way to zero.",
    "You're not a collector, you're a hoarder.",
    "I bet you explain your NFTs to people at parties.",
    "That roadmap isn't happening, buddy.",
    "You traded ETH for pixels. Bad deal.",
    "Community is great, but profit is better.",
    "Diamond handing a JPEG to the grave.",
    "Your 'Blue Chips' turned into potato chips.",
    "Gas fees to mint: 0.05 ETH. Current Value: 0 ETH.",
    "You are the exit liquidity for the influencers.",
    "Nice art. Can you eat it?",
    "Your wallet is an art gallery where everything is free.",
    "Stop minting garbage.",
    "The metadata on your NFTs is worth more than the image."
  ],

  // 5. GENEL / VAHŞİ KARTLAR (Savage / Random)
  generic: [
    "I've seen better wallets created by bots.",
    "This wallet sparks zero joy. Delete it.",
    "Financial advice: Do the opposite of whatever you're doing.",
    "Your wallet history is a tragedy written in code.",
    "Even the blockchain is embarrassed to store this data.",
    "Error 404: Profit not found.",
    "You define 'Dumb Money'.",
    "I asked AI to analyze this and it crashed.",
    "This is why we can't have nice things.",
    "Have you tried turning your wallet off and on again?",
    "Your private key should be public, nobody wants this.",
    "Ledger called, they want their device back.",
    "You are the reason the bear market started.",
    "Just close the wallet and walk away.",
    "This wallet is a masterclass in losing money.",
    "I'd roast you, but your balance already did.",
    "Keep this wallet away from children.",
    "You're making the banks look good.",
    "Satoshi did not die for this.",
    "WAGMI? No, You Are Not Going To Make It.",
    "This is financial advice: Stop.",
    "Your wallet has bad vibes.",
    "Delete the app.",
    "Go get a job at McDonald's, it's safer.",
    "Your alpha is omega."
  ]
};

// --- 🧠 ANALİZ MANTIĞI ---
function getRoast(stats: any) {
  let category = 'generic'; // Varsayılan kategori
  
  // Basit Kural Motoru
  if (stats.netWorth < 10) {
    category = 'broke';
  } else if (stats.worstLossPercentage > 80) {
    category = 'rekt';
  } else if (stats.totalTx > 1000) {
    category = 'addict';
  } else if (stats.nftCount > 50) {
    category = 'nft';
  }

  // O kategoriden rastgele şaka seç
  const roasts = ROAST_DB[category as keyof typeof ROAST_DB] || ROAST_DB.generic;
  const randomIndex = Math.floor(Math.random() * roasts.length);
  return roasts[randomIndex];
}

// --- 🌐 SIMULASYON VERİSİ ---
// Not: Buraya gerçek Covalent API entegre edildiğinde gerçek veri gelecek.
async function getWalletData(address: string) {
  // Şimdilik test için rastgele senaryolar döndürüyoruz
  const scenarios = [
    { netWorth: 5, worstLossPercentage: 10, totalTx: 50, nftCount: 2 }, // Fakir
    { netWorth: 5000, worstLossPercentage: 95, totalTx: 200, nftCount: 10 }, // Rekt
    { netWorth: 2000, worstLossPercentage: 20, totalTx: 5000, nftCount: 5 }, // Bağımlı
    { netWorth: 1000, worstLossPercentage: 30, totalTx: 100, nftCount: 200 }, // NFTci
  ];
  return scenarios[Math.floor(Math.random() * scenarios.length)];
}

// --- 🎨 FRAME TASARIMI ---
app.frame('/', (c) => {
  return c.res({
    image: (
      <div style={{ 
        color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
        width: '100%', height: '100%', 
        background: 'linear-gradient(to right, #000000, #434343)', textAlign: 'center' 
      }}>
        <div style={{ fontSize: 80 }}>🔥</div>
        <h1 style={{ fontSize: 60, fontWeight: 'bold', margin: 0 }}>ROAST MY WALLET</h1>
        <p style={{ fontSize: 30, opacity: 0.8 }}>No Mercy. No Refunds.</p>
      </div>
    ),
    intents: [
      <Button action="/roast">🔥 Roast Me</Button>,
    ],
  })
})

app.frame('/roast', async (c) => {
  // 1. Veriyi Al (Simülasyon)
  const stats = await getWalletData("0x123...");
  
  // 2. Şakayı Seç (API YOK, Veritabanından)
  const roastText = getRoast(stats);

  return c.res({
    image: (
      <div style={{ 
        color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
        width: '100%', height: '100%', 
        background: 'linear-gradient(to bottom, #1a0b0b, #000000)', padding: '40px', textAlign: 'center' 
      }}>
        <h2 style={{ fontSize: 40, color: '#ff5e00', marginBottom: 20 }}>THE VERDICT</h2>
        <div style={{ 
          fontSize: 32, fontStyle: 'italic', lineHeight: 1.4,
          background: 'rgba(255, 69, 0, 0.15)', border: '2px solid #ff5e00', borderRadius: '20px', padding: '30px'
        }}>
          "{roastText}"
        </div>
      </div>
    ),
    intents: [
      <Button.Reset>💀 Another One</Button.Reset>,
      <Button.Link href="https://warpcast.com/~/compose?text=I%20just%20got%20destroyed%20by%20RoastMyWallet.%20Try%20it%20if%20you%20dare.">📢 Share the Pain</Button.Link>
    ],
  })
})

export const GET = handle(app)
export const POST = handle(app)
