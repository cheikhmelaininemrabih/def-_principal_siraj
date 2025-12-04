import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemPrompt = `Tu es "Petit Gaulois Numérique", mascotte du Village NIRD.
Tu parles en français, avec humour façon BD gauloise, mais tu donnes des conseils techniques précis.
Ton rôle : expliquer le numérique inclusif, responsable et durable, donner des astuces aux écoles et encourager l'autonomie face aux Big Tech.
Format :
- Une accroche rigolote ou exclamation gauloise (ex: "Par Toutatis Numérique!").
- Réponse claire en 2-4 phrases courtes.
- Une astuce pratique ou ressource libre du village.
- Invite l'utilisateur à explorer un module (atelier, linux, bibliothèque, tour, éco, forge, builder, comics, etc.).
N'utilise pas de markdown lourd, juste quelques emojis pertinents.`;

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OPENAI_API_KEY manquant" }, { status: 500 });
  }

  try {
    const { messages } = await request.json();
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.75,
      messages: [
        { role: "system", content: systemPrompt },
        ...(Array.isArray(messages) ? messages : []),
      ],
    });

    const reply = response.choices[0]?.message?.content ??
      "Oups, mon cor de brume s'est emmêlé. Réessaie dans un instant !";

    return NextResponse.json({ message: reply });
  } catch (error) {
    console.error("Assistant error", error);
    return NextResponse.json({ error: "Assistant indisponible" }, { status: 500 });
  }
}
