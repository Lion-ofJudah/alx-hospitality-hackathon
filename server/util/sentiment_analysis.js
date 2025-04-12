import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

const hf = new HfInference(process.env.HUGGING_FACE_ACCESS_TOKEN);

export const sentimentAnalysis = async (req, res) => {
  const { message } = req.body;
  const text = message;
  console.log(text);
  console.log(req.body);
  try {
    const response = await hf.textClassification({
      model: "Liusuthu/my_text_classification_model_based_on_distilbert",
      inputs: text,
    });
    return response;
  } catch (err) {
    console.log(err);
    return "error occurred";
  }
};
