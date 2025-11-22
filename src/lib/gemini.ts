interface Message {
    role: 'user' | 'assistant';
    text: string;
  }
  
  
  // --- GEMINI API HELPERS ---
  const generateContent = async (prompt: string, systemInstruction: string = ""): Promise<string> => {
    const apiKey = ""; // Provided by environment (process.env.NEXT_PUBLIC_GEMINI_API_KEY)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] }
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Service temporarily unavailable. Please try again.";
    }
  };