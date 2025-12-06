import { NextResponse } from "next/server";

export async function POST(req: Request) {

    // parse and destructure the message sent by the user and the system prompt coming from the frontend/browser
    const {userMsg, systemPrompt} = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({error: "API key is missing"}, {status: 500});
    
    // call gemini api
    try{
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
    
            body: JSON.stringify({
                messages:[
                    {role: "system", content: systemPrompt},
                    {role: "user", content: userMsg},
                ],
            })
        })
    
        const data = await response.json();

        console.log("Gemini API response data:", data);
        return NextResponse.json({text: data.output});
    }

    catch(err){
        console.log("Error connecting to Gemini API:", err);
        return NextResponse.json({error: "Error connecting to Gemini API"}, {status: 500});
    }

}