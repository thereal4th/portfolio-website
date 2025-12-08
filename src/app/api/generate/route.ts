import { NextResponse } from "next/server";

export async function POST(req: Request) {

    // parse and destructure the message sent by the user and the system prompt coming from the frontend/browser
    const { userMsg, systemPrompt } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                { text: systemPrompt + "\n\nUser: " + userMsg }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();
        console.log("Gemini API response:", data);

        // gemini 2.x returns this structure:
        // data.candidates[0].content.parts[0].text
        const text =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Usage has exceeded the limit, sorry!";

        return NextResponse.json({ text });

    } catch (err) {
        console.log("Error connecting to Gemini API:", err);
        return NextResponse.json({ error: "Error connecting to Gemini API" }, { status: 500 });
    }
}
