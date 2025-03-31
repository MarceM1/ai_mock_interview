import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function GET() {
  console.log("in POST");
  return Response.json({ success: true, data: "THANK YOU!" }, { status: 200 });
}

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepara preguntas para una entrevista laboral.
        El puesto de trabajo es ${role}.
        El nivel de experiencia requerido para el puesto es ${level}.
        El stack tecnológico utilizado en el puesto es: ${techstack}.
        El enfoque entre preguntas de comportamiento y técnicas debe inclinarse hacia: ${type}.
        La cantidad de preguntas requeridas es: ${amount}.
        Por favor, devuelve solo las preguntas, sin texto adicional.
        Las preguntas serán leídas por un asistente de voz, así que no uses "/" ni "*" ni ningún otro carácter especial que pueda interferir con el asistente de voz.
        Devuelve las preguntas formateadas de la siguiente manera:
        ["Pregunta 1", "Pregunta 2", "Pregunta 3"]
        

        ¡Gracias! <3
    `,
    });

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
