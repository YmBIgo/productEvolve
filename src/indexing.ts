import fs from "fs/promises";
import { ALL_PRODUCTS } from "./const/product.js";
import { openAIClient } from "./llm/openai.js";
import { GET_PRODUCT_PROCESS_PROMPT } from "./prompt/index.js";

async function getProductJson(productName: string, features: string[]): Promise<Record<string, any>> {
  const input = {
    product: productName,
    features: features
  }
  const response = await openAIClient.getResponse(JSON.stringify(input), GET_PRODUCT_PROCESS_PROMPT, false);
  try {
    const responseJ = JSON.parse(response);
    const newFeatures = Array.from(new Set(responseJ.process.map((item: any) => item.features).flat()));
    return {
      response,
      features: newFeatures
    };
  } catch (error) {
    console.error("Error parsing response:", error);
    return {
      response: "",
      features: []
    };
  }
}

function invertFeaturesIndex(oldInvertedIndex: Record<string, string[]>, newFeatures: string[], productSteps: any[], productName: string): Record<string, string[]> {
  let newInvertedIndex = { ...oldInvertedIndex };
  for (const nf of newFeatures) {
    if (!newInvertedIndex[nf]) {
      newInvertedIndex[nf] = [];
    }
    for (const step of productSteps) {
      if (step.features.includes(nf)) {
        newInvertedIndex[nf].push(`${productName}:${step.step}`);
      }
    }
  }
  return newInvertedIndex;
}

async function main() {
  const productName = ALL_PRODUCTS; //.slice(0, 3);
  let features: string[] = [];
  try {
    await fs.access(`./json/all_features.json`);
    const featuresData = await fs.readFile(`./json/all_features.json`, "utf-8");
    features = JSON.parse(featuresData);
  } catch (error) {
    console.error(`File ./json/all_features.json does not exist. continue generating...`);
  }
  let invertedFeaturesIndex: Record<string, string[]> = {};
  try {
    await fs.access(`./json/inverted_features_index.json`);
    const data = await fs.readFile(`./json/inverted_features_index.json`, "utf-8");
    invertedFeaturesIndex = JSON.parse(data);
  } catch (error) {
    console.error(`File ./json/inverted_features_index.json does not exist. continue generating...`);
  }
  for (const name of productName) {
    try {
      await fs.access(`./json/${name}.json`);
      continue;
    } catch (error) {
      console.error(`File ./json/${name}.json does not exist. continue generating...`);
    }
    const {
      response: productJson,
      features: productFeatures
    } = await getProductJson(name, []);
    features = Array.from(new Set([...features, ...productFeatures]));
    invertedFeaturesIndex = invertFeaturesIndex(invertedFeaturesIndex, productFeatures, JSON.parse(productJson).process, name);
    await fs.writeFile(`./json/all_features.json`, JSON.stringify(features, null, 2));
    await fs.writeFile(`./json/inverted_features_index.json`, JSON.stringify(invertedFeaturesIndex, null, 2));
    await fs.writeFile(`./json/${name}.json`, productJson);
  }
  await fs.writeFile(`./json/all_features.json`, JSON.stringify(features, null, 2));
  await fs.writeFile(`./json/inverted_features_index.json`, JSON.stringify(invertedFeaturesIndex, null, 2));
}

main();