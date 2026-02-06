import { Router, Request, Response } from 'express';
import { processChat, transcribeAudio, describeImage } from '../services/openai';

const router = Router();

interface ChatRequest {
  message?: string;
  audio?: string; // base64
  image?: string; // base64
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

router.post('/chat', async (req: Request<{}, {}, ChatRequest>, res: Response) => {
  try {
    const { message, audio, image, history = [] } = req.body;

    let userMessage = message || '';
    let transcription: string | undefined;
    let imageDescription: string | undefined;

    // Process audio if provided
    if (audio) {
      try {
        transcription = await transcribeAudio(audio);
        userMessage = transcription;
      } catch (error) {
        console.error('Audio transcription error:', error);
        return res.status(400).json({
          success: false,
          error: 'Error al transcribir el audio'
        });
      }
    }

    // Process image if provided
    if (image) {
      try {
        imageDescription = await describeImage(image);
        userMessage = imageDescription + (message ? `\n\nMensaje adicional: ${message}` : '');
      } catch (error) {
        console.error('Image description error:', error);
        return res.status(400).json({
          success: false,
          error: 'Error al procesar la imagen'
        });
      }
    }

    // If no input provided
    if (!userMessage) {
      return res.status(400).json({
        success: false,
        error: 'Debes enviar un mensaje, audio o imagen'
      });
    }

    // Generate response
    const response = await processChat(userMessage, history, {
      hasAudio: !!audio,
      hasImage: !!image,
      transcription,
      imageDescription
    });

    res.json({
      success: true,
      response,
      transcription,
      imageDescription
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Error procesando tu mensaje'
    });
  }
});

export default router;
