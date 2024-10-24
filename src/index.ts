import { Configuration, OpenAIApi } from "openai";
import { createCanvas } from "canvas";
import * as fs from 'fs';

async function generateTokenName() {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Generate a creative and unique meme token name that hasn't been used before. It should be animal-themed and catchy.",
            max_tokens: 100
        });

        return completion.data.choices[0].text?.trim();
    } catch (error) {
        console.error('Error generating token name:', error);
        throw error;
    }
}

async function generateTokenImage(tokenName: string) {
    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext('2d');

    // Basic image generation logic
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 500, 500);

    // Save the image
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('token-image.png', buffer);
}

async function main() {
    try {
        const tokenName = await generateTokenName();
        console.log('Generated Token Name:', tokenName);
        
        await generateTokenImage(tokenName);
        console.log('Token image generated successfully');
    } catch (error) {
        console.error('Error in main process:', error);
        process.exit(1);
    }
}

main();
