import fs from "fs/promises";
import { openAIClient } from "./llm/openai.js";
import { CHECK_IDEA_PROMPT, DETECT_LACKNESS_PROMPT, GET_IDEA_PROMPT, GET_RELATED_FEATURES_PROMPT } from "./prompt/index.js";
const MAX_DEPTH = 8;
type Idea = {
  id: string;
  feature: string;
  reason: string;
  confidence: number;
  productName: string | undefined;
};
type FeatureEntry = { id: string; idea: Idea };
const formatFeature = (entry: FeatureEntry): string =>
  `${entry.idea.feature} / ${entry.idea.confidence} : ${entry.idea.reason}`;
const featureStrings = (entries: FeatureEntry[]): string[] =>
  entries.map(formatFeature);
const asIdea = (raw: any, productName: string | undefined, id: string): Idea => {
  if (!raw || typeof raw.feature !== "string" || typeof raw.reason !== "string" ||
      typeof raw.confidence !== "number" || !Number.isFinite(raw.confidence)) {
    throw new Error("Invalid idea response");
  }
  return { id, feature: raw.feature, reason: raw.reason,
    confidence: raw.confidence, productName };
};
async function improveIdea(
  reason: string,
  targetProduct: string,
  purpose: string,
  currentFeatures: string[],
  currentFeature: Idea,
  allFeatures: string[],
  invertedIndex: any,
  area: string,
  filePathPrefix: string
) {
  // 
  const detectedKeywordString = await openAIClient.getResponse(
    JSON.stringify({
      purpose,
      current_features: currentFeatures,
      current_feature: currentFeature,
      lackness_reason: reason
    }),
    DETECT_LACKNESS_PROMPT,
    false,
  );
  const detectedKeyword = JSON.parse(detectedKeywordString).keyword;
  console.log("Detected keyword:", detectedKeyword);
  const relatedFeaturesString = await openAIClient.getResponse(
    JSON.stringify({
      purpose: detectedKeyword,
      features: allFeatures
    }),
    GET_RELATED_FEATURES_PROMPT,
    false,
  );
  let relatedFeatures; 
  try {
    relatedFeatures = JSON.parse(relatedFeaturesString).related_features.filter((rf: any) => {
      return rf.confidence > 0.65;
    });
  } catch (error) {
    console.error("Failed to parse related features:", error);
    return;
  }
  console.log("Related features:", relatedFeatures.length);
  // 3 
  let searchTarget = []; /*
  result type is
  {
    feature: string; // 機能
    product: string; // 使われている製品
    productStep: string; // 製品の使用ステップ
  }
  */ 
  for (const feature of relatedFeatures) {
    if (invertedIndex[feature.feature]) {
      const entries = invertedIndex[feature.feature];
      for (const e of entries) {
      const entriesArray = e.split(":");
      const productName_ = entriesArray[0];
      const productStep_ = entriesArray[1];
      // 以下のif文を入れるべきか入れないべきか検討中...
      if (productName_ === targetProduct) {
        continue;
      }
      let productJson: any;
      try {
        const productJsonString = await fs.readFile(`${filePathPrefix}/${productName_}.json`, "utf-8");
        productJson = JSON.parse(productJsonString);
      } catch (error) {
        console.error(`Failed to read product JSON for ${productName_}:`, error);
        return;
      }
      const productStep = productJson.process.find((step: any) => String(step.step) === productStep_)?.instruction;
      if (!productStep) {
        continue;
      }
      searchTarget.push({
        feature: feature.feature,
        product: productName_,
        productStep: productStep,
        productName: productName_,
        confidence: feature.confidence
      });
      }
    }
  };
  console.log("Search target:", searchTarget.length);
  searchTarget.sort((a, b) => b.confidence - a.confidence);
  searchTarget = searchTarget.slice(0, 5); // 上位5件に絞る
  console.log("Top 5 search targets:", searchTarget.map((st) => st.feature.slice(0, 30)).join("\n"));
  let highestConfidence = 0;
  let highestConfidenceIdea = null;
  for (const target of searchTarget) {
    if (!target) {
      continue;
    }
    console.log("Searching for target:", target.product, "with feature:", target.feature.slice(0, 30), "...");
    const newIdeaString = await openAIClient.getResponse(
      JSON.stringify({
        purpose, 
        current_features: currentFeatures,
        features_to_add: {
          target_feature: `${target.feature} : ${target.productStep}`,
          relationship: area
        }
      }),
      GET_IDEA_PROMPT,
      false,
    );
    let newIdea;
    try {
      newIdea = {
        ...JSON.parse(newIdeaString).new_ideas,
        productName: target.productName,
      };
      highestConfidence = Math.max(highestConfidence, newIdea.confidence);
      if (newIdea.confidence === highestConfidence) {
        highestConfidenceIdea = newIdea;
      }
    } catch (error) {
      console.error("Failed to parse new idea:", error);
      continue;
    }
  } 
  return highestConfidenceIdea;
}
async function main(purpose: string, targetProduct: string, isProduct: boolean = true) {
  const filePathPrefix = isProduct ? "./json" : "./json2";
  const now = Date.now();
  await fs.mkdir(`${filePathPrefix}/${now}_${targetProduct}`, { recursive: true });
  // docs/flow.md を元に作る
  // 2
  let allFeatures;
  try {
    const allFeaturesString = await fs.readFile(`${filePathPrefix}/all_features.json`, "utf-8");
    allFeatures = JSON.parse(allFeaturesString);
  } catch (error) {
    console.error("Failed to read all_features.json:", error);
    return;
  }
  const relatedFeaturesString = await openAIClient.getResponse(
    JSON.stringify({
      purpose,
      features: allFeatures
    }),
    GET_RELATED_FEATURES_PROMPT,
    false,
  );
  let relatedFeatures; 
  try {
    relatedFeatures = JSON.parse(relatedFeaturesString).related_features.filter((rf: any) => {
      return rf.confidence > 0.65;
    });
  } catch (error) {
    console.error("Failed to parse related features:", error);
    return;
  }
  console.log("Related features:", relatedFeatures.length);
  // 3 
  let invertedIndex;
  try {
    const invertedIndexString = await fs.readFile(`${filePathPrefix}/inverted_features_index.json`, "utf-8");
    invertedIndex = JSON.parse(invertedIndexString);
  } catch (error) {
    console.error("Failed to read inverted_index.json:", error);
    return;
  }
  let searchTarget = []; /*
  result type is
  {
    feature: string; // 機能
    product: string; // 使われている製品
    productStep: string; // 製品の使用ステップ
  }
  */ 
  for (const feature of relatedFeatures) {
    if (invertedIndex[feature.feature]) {
      const entries = invertedIndex[feature.feature];
      for (const e of entries) {
      const entriesArray = e.split(":");
      const productName_ = entriesArray[0];
      const productStep_ = entriesArray[1];
      if (productName_ === targetProduct) {
        continue;
      }
      let productJson: any;
      try {
        const productJsonString = await fs.readFile(`${filePathPrefix}/${productName_}.json`, "utf-8");
        productJson = JSON.parse(productJsonString);
      } catch (error) {
        console.error(`Failed to read product JSON for ${productName_}:`, error);
        return;
      }
      const productStep = productJson.process.find((step: any) => String(step.step) === productStep_)?.instruction;
      if (!productStep) {
        continue;
      }
      searchTarget.push({
        feature: feature.feature,
        product: productName_,
        productStep: productStep,
        productName: productName_,
        confidence: feature.confidence
      });
      }
    }
  };
  searchTarget.sort((a, b) => b.confidence - a.confidence);
  console.log("Search target:", searchTarget.length);
  await fs.writeFile(`${filePathPrefix}/${now}_${targetProduct}/search_target.json`, JSON.stringify(searchTarget, null, 2), "utf-8");
  // 4
  for (const [i, target] of searchTarget.slice(0, 5).entries()) {
    const ideaHistory: any[] = [];
    const historyPath = `${filePathPrefix}/${now}_${targetProduct}/ideaHistory_${i}.json`;
    const featuresPath = `${filePathPrefix}/${now}_${targetProduct}/currentFeatures_${i}.json`;
    console.log("Searching for target:", target.product, "with feature:", target.feature.slice(0, 30));
    const newIdeaString = await openAIClient.getResponse(
      JSON.stringify({
        purpose,
        current_features: [],
        features_to_add: {
          target_feature: `${target.feature} : ${target.productStep}`,
          relationship: "new"
        }
      }),
      GET_IDEA_PROMPT,
      false,
    );
    let currentFeature: Idea;
    try {
      currentFeature = asIdea(JSON.parse(newIdeaString).new_ideas, target.productName, `target-${i}-idea-0`);
    } catch (error) {
      console.error("Failed to parse initial idea:", error);
      continue;
    }
    // Maintain one authoritative structured state; only format it when calling prompts.
    let entries: FeatureEntry[] = [{ id: currentFeature.id, idea: currentFeature }];
    for (let depth = 0; depth < MAX_DEPTH; depth++) {
      const evaluatedIdea = { ...currentFeature };
      const evaluatedFeatures = featureStrings(entries);
      let checkStatusJson: any;
      try {
        const checkStatus = await openAIClient.getResponse(
          JSON.stringify({
            purpose,
            current_features: evaluatedFeatures,
            features_to_add: evaluatedIdea
          }),
          CHECK_IDEA_PROMPT,
          false,
        );
        checkStatusJson = JSON.parse(checkStatus);
        if (!checkStatusJson?.lackness?.area) {
          throw new Error("Missing lackness.area");
        }
      } catch (error) {
        console.error("Failed to check idea:", error);
        ideaHistory.push({ depth, evaluatedIdea, currentFeatures: evaluatedFeatures,
          status: "CHECK_FAILED", error: String(error) });
        break;
      }
      const { area: lacknessArea, reason: lacknessReason } = checkStatusJson.lackness;
      const record: any = {
        depth,
        evaluatedIdea,
        currentFeatures: evaluatedFeatures,
        lacknessArea,
        lacknessReason,
        productName: evaluatedIdea.productName,
      };
      ideaHistory.push(record);
      if (lacknessArea === "FAILED" || lacknessArea === "COMPLETED") {
        record.status = lacknessArea;
        break;
      }
      const relationByArea: Record<string, string> = {
        NEED_IMPROVEMENT: "improvement",
        NEED_AFTER_CARE: "after",
        NEED_BEFORE_CARE: "before",
      };
      const relationship = relationByArea[lacknessArea];
      if (!relationship) {
        record.status = "UNKNOWN_AREA";
        console.error("Unknown lackness area:", lacknessArea);
        break;
      }
      // No need to generate an idea that cannot be checked within MAX_DEPTH.
      if (depth === MAX_DEPTH - 1) {
        record.status = "MAX_DEPTH_REACHED";
        break;
      }
      let improvedIdea: Idea | undefined;
      try {
        const result = await improveIdea(
          lacknessReason,
          targetProduct,
          purpose,
          evaluatedFeatures,
          evaluatedIdea,
          allFeatures,
          invertedIndex,
          relationship,
          filePathPrefix,
        );
        if (result) {
          improvedIdea = asIdea(result, result.productName, `target-${i}-idea-${depth + 1}`);
        }
      } catch (error) {
        console.error("Failed to improve idea:", error);
        record.error = String(error);
      }
      if (!improvedIdea) {
        record.status = "IMPROVEMENT_FAILED";
        break;
      }
      if (lacknessArea === "NEED_IMPROVEMENT") {
        // Replace exactly the currently evaluated idea, not a formatted string.
        const index = entries.findIndex(entry => entry.id === evaluatedIdea.id);
        if (index === -1) {
          record.status = "TARGET_NOT_FOUND";
          break;
        }
        entries[index] = { id: improvedIdea.id, idea: improvedIdea };
      } else if (lacknessArea === "NEED_AFTER_CARE") {
        entries.push({ id: improvedIdea.id, idea: improvedIdea });
      } else {
        // NEED_BEFORE_CARE
        entries.unshift({ id: improvedIdea.id, idea: improvedIdea });
      }
      currentFeature = improvedIdea;
      record.generatedIdea = { ...improvedIdea };
      record.featuresAfter = featureStrings(entries);
      record.status = "IMPROVED";
    }
    await fs.writeFile(historyPath, JSON.stringify(ideaHistory, null, 2), "utf-8");
    await fs.writeFile(featuresPath, JSON.stringify(featureStrings(entries), null, 2), "utf-8");
  }
}
// 1
// 洗濯機・衣服についているあらゆる汚れを落とす
// ヘアドライヤー・髪や頭皮の水分を効率的に除去し、髪を乾燥・整髪する
// 冷蔵庫・食品や飲料を低温で保存し、鮮度を保ちながら腐敗や劣化を抑え、長期間安全に保管する
// 掃除機・床や家具などの表面に付着・堆積したほこり、ゴミ、異物を除去し、清潔な状態にする
// IHクッキングヒーター・鍋やフライパンを効率的に加熱し、調理を行う
// ロボット掃除機・床や家具などの表面に付着・堆積したほこり、ゴミ、異物を除去し、清潔な状態にする
// const purpose = "衣服についているあらゆる汚れを落とす";
// const targetProduct = "洗濯機";
// main(purpose, targetProduct);

// 
// 構文解析_Parsing : 文字列やプログラムなどの入力を文法規則に従って解析し、その構造や要素間の関係を明らかにする
// 型推論_Type_Inference : プログラムの型を自動的に推論し、型安全性を確保する
// A*探索 : グラフ構造の中で、スタート地点からゴール地点までの最小コストの経路を効率よく見つける
const targetProduct = "型推論_Type_Inference";
const purpose = "プログラムの型を自動的に推論し、型安全性を確保する";
main(purpose, targetProduct, false);