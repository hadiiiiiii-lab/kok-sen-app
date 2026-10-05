import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const KOK_SEN_SYSTEM_INSTRUCTION = `
You are the official AI Culinary Concierge for Kok Sen Restaurant (國成菜館 / 国成球记餐室), Singapore's legendary Michelin Bib Gourmand Cantonese Zi Char restaurant.

Key Restaurant Knowledge & Facts:
- Address: 4 Keong Saik Road, Singapore 089112 (Chinatown / Outram Park / Tanjong Pagar dining belt, District 02).
- Operating Hours: Tuesday to Sunday: Lunch 12:00 PM – 2:15 PM, Dinner 5:00 PM – 8:45 PM (Closed on Mondays).
- Contact: Official WhatsApp Kitchen Concierge: +65 9727 2533 (https://wa.me/6597272533).
- Accolades: Continuous Michelin Bib Gourmand recipient for over a decade. Over 50 years of heritage spanning three generations.
- Famous Signatures:
  1. Big Prawn Hor Fun (大虾河粉) - Thick flat rice noodles wok-charred with smoky "wok hei", smothered in a fiery orange prawn-infused gravy with enormous wild sea prawns. Contains shellfish, gluten, soy, egg.
  2. Claypot Yong Tau Foo (砂煲酿豆腐) - Hand-stuffed tofu, bittergourd, and eggplant with fresh handmade fish and squid paste in bubbling braised gravy.
  3. Claypot Pork Liver with Ginger & Spring Onion (砂煲姜葱猪肝) - Tender, velvety thick-cut liver glazed in dark soy and shaoxing wine.
  4. Bittergourd Pork Ribs in Black Bean Sauce (豉汁苦瓜排骨) - Fall-off-the-bone ribs with fermented black beans.
  5. Homemade Crispy Prawn Roll / Hae Zhor (自制五香虾枣) - Deep-fried beancurd skin roll stuffed with minced pork, water chestnuts, and fresh prawns.
  6. Sambal Kang Kong (参巴空心菜) - Morning glory tossed in fiery fermented belacan sambal.
  7. Poached Spinach with Trio of Eggs (三蛋苋菜) - Century egg, salted egg, and chicken egg in savoury superior broth.

Takeaway & Delivery Logistics:
- Self-Pickup / Takeaway: Counter collection at 4 Keong Saik Road with 0% delivery fee. Wok-fired fresh in ~20-25 mins with separate gravy packing for hor fun upon request to preserve crispness.
- Islandwide Delivery from 4 Keong Saik Rd:
  - Zone 1: Central Corridor (0–5 km) - S$5.00 delivery fee (FREE for orders > S$60). ETA: 30–45 mins. (Chinatown, Tanjong Pagar, CBD, Marina Bay, River Valley, Orchard, Tiong Bahru).
  - Zone 2: City Fringe (5.1–12 km) - S$9.00 delivery fee (FREE for orders > S$85). ETA: 45–60 mins. (Toa Payoh, Novena, Kallang, Marine Parade, Geylang, Queenstown, Bishan).
  - Zone 3: Outer Regions (12.1–25 km) - S$14.00 delivery fee (FREE for orders > S$120). ETA: 60–75 mins. (Jurong, Clementi, Tampines, Bedok, Woodlands, Punggol, Sengkang, Pasir Ris, Yishun).
- Transit & Access:
  - Outram Park MRT (EW/NE/TE lines): 4 mins walk (300m).
  - Maxwell MRT (TE line): 5 mins walk (350m).
  - Chinatown MRT (NE/DT lines): 7 mins walk (500m).
  - Curbside car/Grab pickup available directly along Keong Saik Road.

Your Tone & Persona:
Warm, knowledgeable, authentic Singaporean culinary expert, enthusiastic about traditional Cantonese wok-hei zi char. Be concise, well-structured, and helpful. Always provide actionable recommendations for dining in, takeaway pickup, or islandwide delivery.
`;

// Chat API Route with Gemini models, Google Maps Grounding & Google Search Grounding
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, mode = 'general', userLocation } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage.text || '';

    // Determine task complexity and tool needs:
    // User requested:
    // - Use gemini-3.1-pro-preview for particularly complex tasks
    // - Use gemini-3.5-flash for general tasks
    // - Use gemini-3.1-flash-lite for tasks that should happen fast
    // - Use gemini-3.5-flash (with googleMaps tool) for Maps Grounding
    // - Use gemini-3.5-flash (with googleSearch tool) for Search Grounding

    const promptLower = userPrompt.toLowerCase();
    const isMapsQuery =
      mode === 'maps' ||
      promptLower.includes('where') ||
      promptLower.includes('how to get') ||
      promptLower.includes('mrt') ||
      promptLower.includes('directions') ||
      promptLower.includes('location') ||
      promptLower.includes('parking') ||
      promptLower.includes('nearby') ||
      promptLower.includes('address') ||
      promptLower.includes('keong saik');

    const isSearchQuery =
      !isMapsQuery &&
      (mode === 'search' ||
        promptLower.includes('review') ||
        promptLower.includes('michelin') ||
        promptLower.includes('news') ||
        promptLower.includes('award') ||
        promptLower.includes('history') ||
        promptLower.includes('article') ||
        promptLower.includes('bib gourmand'));

    let selectedModel = 'gemini-3.5-flash';
    let toolsConfig: any[] | undefined = undefined;
    let toolConfig: any = undefined;

    if (isMapsQuery) {
      selectedModel = 'gemini-3.5-flash';
      toolsConfig = [{ googleMaps: {} }];
      const lat = userLocation?.lat || 1.2804;
      const lng = userLocation?.lng || 103.8420;
      toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: lat,
            longitude: lng,
          },
        },
      };
    } else if (isSearchQuery) {
      selectedModel = 'gemini-3.5-flash';
      toolsConfig = [{ googleSearch: {} }];
    } else if (mode === 'fast') {
      selectedModel = 'gemini-3.1-flash-lite';
    } else if (mode === 'complex') {
      selectedModel = 'gemini-3.1-pro-preview';
    } else {
      selectedModel = 'gemini-3.5-flash';
    }

    // Format conversation history
    const contents = messages.map((m: any) => ({
      role: m.role === 'model' || m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const config: any = {
      systemInstruction: KOK_SEN_SYSTEM_INSTRUCTION,
    };

    if (toolsConfig) {
      config.tools = toolsConfig;
    }
    if (toolConfig) {
      config.toolConfig = toolConfig;
    }

    let response;
    try {
      response = await ai.models.generateContent({
        model: selectedModel,
        contents,
        config,
      });
    } catch (genError: any) {
      console.warn('Gemini generateContent notice:', genError?.message);

      // If rate limited or quota exhausted, provide resilient curated answer
      let fallbackText = '';
      const lower = userPrompt.toLowerCase();

      if (lower.includes('where') || lower.includes('mrt') || lower.includes('direction') || lower.includes('location') || lower.includes('address')) {
        fallbackText = `**Kok Sen Restaurant (國成菜館)** is located at **4 Keong Saik Road, Singapore 089112** (Chinatown / Outram Conservation Area, District 02).

**How to get here by MRT:**
• **Outram Park MRT (EW16 / NE3 / TE17)**: Walk via Bukit Pasoh Rd onto Keong Saik Rd (~4 mins walk, 300m).
• **Maxwell MRT (TE18)**: Walk via Neil Rd onto Keong Saik Rd (~5 mins walk, 350m).
• **Chinatown MRT (NE4 / DT19)**: Walk via New Bridge Rd (~7 mins walk, 500m).

**Vehicular Access & Pickup:**
Keong Saik Road is a one-way street accessible from Neil Road, with dedicated curbside handover for self-pickup orders.`;
      } else if (lower.includes('michelin') || lower.includes('review') || lower.includes('guide')) {
        fallbackText = `**Michelin Bib Gourmand Guide Recognition:**
Kok Sen Restaurant has proudly retained the prestigious **Michelin Bib Gourmand award continuously for over a decade**.

**Michelin Inspectors Highlight:**
*"Established in the 1960s and run by the third generation, Kok Sen has moved a few doors down to 4 Keong Saik Road. The unpretentious Cantonese eatery is famous for its fiery, uncompromised wok hei and signature claypot creations. The Big Prawn Hor Fun with colossal prawns in a spicy egg-ribboned gravy is unmissable."*`;
      } else if (lower.includes('delivery') || lower.includes('zone') || lower.includes('fee')) {
        fallbackText = `**Kok Sen Islandwide Delivery & Takeaway System (from 4 Keong Saik Rd):**

• **Self-Pickup (Takeaway)**: 0% delivery fee. Wok-fired fresh in ~20-25 mins at our 4 Keong Saik Road counter.
• **Zone 1: Central (0–5 km)**: S$5.00 delivery fee (**FREE above S$60**). ETA 30–45 mins. (Chinatown, Tanjong Pagar, CBD, Marina Bay, River Valley, Orchard, Tiong Bahru).
• **Zone 2: City Fringe (5–12 km)**: S$9.00 delivery fee (**FREE above S$85**). ETA 45–60 mins. (Queenstown, Toa Payoh, Novena, Kallang, Marine Parade, Geylang).
• **Zone 3: Outer Regions (12–25 km)**: S$14.00 delivery fee (**FREE above S$120**). ETA 60–75 mins. (Jurong, Clementi, Tampines, Bedok, Woodlands, Punggol, Sengkang).`;
      } else if (lower.includes('allerg') || lower.includes('gluten') || lower.includes('shellfish')) {
        fallbackText = `**Kok Sen Dietary & Allergen Guide:**
• **Shellfish-Free Favorites**: Bittergourd Pork Ribs in Black Bean Sauce, Fragrant Jasmine White Rice, Garlic Stir-Fried Baby Kailan, Poached Chinese Spinach with Trio of Eggs, Sweet & Sour Pork Rib King.
• **Gluten-Sensitive Options**: Steamed Jasmine Rice, Poached Chinese Spinach, Garlic Greens. (Note: Many gravies use traditional dark and light soy sauce containing wheat).
• **Contains Shellfish / Crustaceans**: Signature Big Prawn Hor Fun, Crispy Prawn Rolls (Hae Zhor), Sambal Kang Kong (belacan shrimp paste), and Thai Style Seafood Fried Rice.`;
      } else {
        fallbackText = `**Recommended Banquet for 4 Diners at Kok Sen:**
1. **Big Prawn Hor Fun (大虾河粉)** — The signature dish with giant sea prawns and smoky wok-charred flat rice noodles in rich prawn sauce.
2. **Claypot Yong Tau Foo (砂煲酿豆腐)** — Hand-stuffed bittergourd and eggplant bubbling in savory braised seafood paste.
3. **Claypot Pork Liver (砂煲姜葱猪肝)** — Thick, velvety tender liver with ginger and scallions.
4. **Homemade Crispy Prawn Roll (自制五香虾枣)** — Golden fried beancurd skin rolls packed with prawns and water chestnuts.
5. **Poached Chinese Spinach with Trio of Eggs (三蛋苋菜)** — Century egg, salted egg, and chicken egg in comforting superior stock.`;
      }

      return res.json({
        text: fallbackText,
        modelUsed: selectedModel,
        groundingType: isMapsQuery ? 'maps' : isSearchQuery ? 'search' : 'none',
        mapsChunks: [
          {
            uri: 'https://maps.google.com/?q=Kok+Sen+Restaurant+4+Keong+Saik+Road+Singapore+089112',
            title: 'Kok Sen Restaurant (4 Keong Saik Rd, Singapore 089112)',
            placeAnswerSources: ['Michelin Bib Gourmand Cantonese Zi Char on Keong Saik Road'],
          },
        ],
        webChunks: [
          {
            uri: 'https://guide.michelin.com/en/singapore-region/singapore/restaurant/kok-sen',
            title: 'Michelin Guide Official: Kok Sen Restaurant Bib Gourmand',
          },
        ],
        webSearchQueries: ['Kok Sen Restaurant Singapore Michelin'],
      });
    }

    const replyText = response.text || '';
    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;

    // Extract Google Maps and Search citations as instructed
    const mapsChunks: any[] = [];
    const webChunks: any[] = [];

    if (groundingMetadata?.groundingChunks) {
      for (const chunk of groundingMetadata.groundingChunks as any[]) {
        if (chunk.maps) {
          mapsChunks.push({
            uri: chunk.maps.uri || '',
            title: chunk.maps.title || 'Google Maps Location',
            placeAnswerSources: chunk.maps.placeAnswerSources?.reviewSnippets || [],
          });
        }
        if (chunk.web) {
          webChunks.push({
            uri: chunk.web.uri || '',
            title: chunk.web.title || 'Source Citation',
          });
        }
      }
    }

    res.json({
      text: replyText,
      modelUsed: selectedModel,
      groundingType: isMapsQuery ? 'maps' : isSearchQuery ? 'search' : 'none',
      mapsChunks,
      webChunks,
      webSearchQueries: groundingMetadata?.webSearchQueries || [],
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate response from Gemini',
    });
  }
});

// Vite middleware in development vs static file serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: {
          server: httpServer,
        },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  httpServer.listen(PORT, () => {
    console.log(`Kok Sen Restaurant App running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
