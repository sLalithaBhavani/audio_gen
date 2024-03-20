from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoProcessor, MusicgenForConditionalGeneration
import scipy.io.wavfile as wavfile
import numpy as np
import os
from fastapi.responses import FileResponse


app = FastAPI()

# Load model and processor
processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")

class PromptInput(BaseModel):
    prompts: list

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this based on your needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def generate_music(prompt):
    try:
        inputs = processor(
            text=[prompt],
            padding=True,
            return_tensors="pt",
        )
        audio_values = model.generate(**inputs, max_new_tokens=256)

        # Save audio to a file
        sampling_rate = model.config.audio_encoder.sampling_rate
        audio_path = "musicgen_out.wav"
        wavfile.write(audio_path, rate=sampling_rate, data=audio_values[0, 0].numpy())

        return audio_path
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate-music")
async def handle_generate_music(prompts: PromptInput):
    try:
        prompt = prompts.prompts[0]  # Assume there's only one prompt
        audio_path = generate_music(prompt)
        return {"message": "Music generated successfully", "audioUrl": f"/download/{os.path.basename(audio_path)}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download/{file_name}")
async def download_audio(file_name: str):
    file_path = os.path.join("path_to_your_audio_files_directory", file_name)  # Adjust the path as per your setup
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="audio/wav")
    else:
        raise HTTPException(status_code=404, detail="Audio file not found")

