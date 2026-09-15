import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = "AQ.Ab8RN6JmIkhFoWKcTwO5h6a-3ZgiXvr0ahqQH_okAlPSXNTM4Q";

app.post("/chat", async (req, res) => {
    const mensaje = req.body.mensaje;

    try {
        const respuesta = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${GEMINI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gemini-2.5-flash",
                    messages: [
                        { role: "user", content: `Responde pasteloso, suave y dulce: ${mensaje}` }
                    ]
                })
            }
        );

        const data = await respuesta.json();
        res.json(data);

    } catch (error) {
        res.json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Servidor IA pasteloso corriendo en el puerto 3000");
});
