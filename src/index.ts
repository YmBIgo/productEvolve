import fs from "fs/promises";
import { openAIClient } from "./llm/openai.js";
import { CHECK_IDEA_PROMPT, DETECT_LACKNESS_PROMPT, GET_IDEA_PROMPT, GET_RELATED_FEATURES_PROMPT } from "./prompt/index.js";

const MAX_DEPTH = 4;

async function improveIdea(
  reason: string,
  targetProduct: string,
  purpose: string,
  currentFeatures: string[],
  currentFeature: any,
  allFeatures: string[],
  invertedIndex: any,
  area: string
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
      // 以下の改修はあまり入れたくない...
      //   if (productName_ === targetProduct) {
      //     continue;
      //   }
      let productJson: any;
      try {
        const productJsonString = await fs.readFile(`./json/${productName_}.json`, "utf-8");
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
  console.log("Top 5 search targets:", searchTarget.map((st) => st.feature.slice(0, 30) + "\n"));
  // 修正余地あり...
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

async function main(purpose: string, targetProduct: string) {
  const now = Date.now();
  await fs.mkdir(`./json/${now}_${targetProduct}`, { recursive: true });
  // docs/flow.md を元に作る
  // 2
  let allFeatures;
  try {
    const allFeaturesString = await fs.readFile("./json/all_features.json", "utf-8");
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
    const invertedIndexString = await fs.readFile("./json/inverted_features_index.json", "utf-8");
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
        const productJsonString = await fs.readFile(`./json/${productName_}.json`, "utf-8");
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
  await fs.writeFile(`./json/${now}_${targetProduct}/search_target.json`, JSON.stringify(searchTarget, null, 2), "utf-8");
  // 4
  for (const i in searchTarget.slice(0, 5)) {
    let ideaHistory: any[] = [];
    const target = searchTarget[i];
    console.log("Target : ", i);
    if (!target) {
      continue;
    }
    console.log("Searching for target:", target.product, "with feature:", target.feature.slice(0, 30), "...");
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
    let newIdea: any;
    let oldIdea: any;
    try {
      newIdea = JSON.parse(newIdeaString);
      newIdea = {
        ...newIdea.new_ideas,
        productName: target.productName
      };
    } catch (error) {
      console.error("Failed to parse new idea JSON:", error);
      continue;
    }
    let depth = 0;
    let currentFeatures = [newIdea.feature];
    let currentFeature = {
      feature: newIdea.feature,
      reason: newIdea.reason,
      confidence: newIdea.confidence,
      productName: newIdea.productName
    }
    let shouldBreak = false;
    while(depth < MAX_DEPTH && !shouldBreak) {
      // 5
      const checkStatus = await openAIClient.getResponse(
        JSON.stringify({
          purpose,
          current_features: currentFeatures,
          features_to_add: currentFeature
        }),
        CHECK_IDEA_PROMPT,
        false,
      );
      try {
        // 6
        const checkStatusJson = JSON.parse(checkStatus);
        const lackness = checkStatusJson.lackness;
        const lacknessArea = lackness.area;
        ideaHistory.push({
          depth,
          currentFeatures: [...currentFeatures],
          lacknessArea,
          lacknessReason: lackness.reason,
          productName: newIdea.productName,
        });
        oldIdea = { ...newIdea };
        if (lacknessArea === "FAILED") {
          console.log("Idea check failed for target:", target.product, "with feature:", target.feature.slice(0, 30));
          shouldBreak = true;
        }
        if (lacknessArea === "COMPLETED") {
          console.log("Idea check completed for target:", target.product, "with feature:", target.feature.slice(0, 30));
          shouldBreak = true;
        }
        if (lacknessArea === "NEED_IMPROVEMENT") {
          newIdea = await improveIdea(
            lackness.reason,
            targetProduct,
            purpose,
            currentFeatures,
            newIdea.feature, 
            allFeatures,
            invertedIndex,
            "improvement"
          )
          if (!newIdea) {
            console.error("Failed to improve idea for reason:", lackness.reason);
            shouldBreak = true;
          } else {
          currentFeatures = currentFeatures.map((f) => {
            return f === oldIdea.feature ? `${newIdea.feature} / ${newIdea.confidence} : ${newIdea.reason}` : f;
          });
          currentFeature = {
            feature: newIdea.feature,
            reason: newIdea.reason,
            confidence: newIdea.confidence,
            productName: newIdea.productName
          };
        }
        }
        if (lacknessArea === "NEED_AFTER_CARE") {
          newIdea = await improveIdea(
            lackness.reason,
            targetProduct,
            purpose,
            currentFeatures,
            newIdea.feature, 
            allFeatures,
            invertedIndex,
            "after"
          );
          if (!newIdea) {
            console.error("Failed to improve idea for reason:", lackness.reason);
            shouldBreak = true;
          } else {
          currentFeatures.push(`${newIdea.feature} / ${newIdea.confidence} : ${newIdea.reason}`);
          currentFeature = {
            feature: newIdea.feature,
            reason: newIdea.reason,
            confidence: newIdea.confidence,
            productName: newIdea.productName
          };
        }
        }
        if (lacknessArea === "NEED_BEFORE_CARE") {
          newIdea = await improveIdea(
            lackness.reason,
            targetProduct,
            purpose,
            currentFeatures,
            newIdea.feature, 
            allFeatures,
            invertedIndex,
            "before"
          );
          if (!newIdea) {
            console.error("Failed to improve idea for reason:", lackness.reason);
            shouldBreak = true;
          } else {
          currentFeatures = [`${newIdea.feature} / ${newIdea.confidence} : ${newIdea.reason}`, ...currentFeatures];
          currentFeature = {
            feature: newIdea.feature,
            reason: newIdea.reason,
            confidence: newIdea.confidence,
            productName: newIdea.productName
          };
        }
        }
      } catch (error) {
        console.error("Failed to parse check status JSON:", error);
        break;
      }
      depth++;
    }
    await fs.writeFile(`json/${now}_${targetProduct}/ideaHistory_${i}.json`, JSON.stringify(ideaHistory, null, 2));
    await fs.writeFile(`json/${now}_${targetProduct}/currentFeatures_${i}.json`, JSON.stringify(currentFeatures, null, 2));
  }
}
// 1
// 洗濯機・衣服についているあらゆる汚れを落とす
// ヘアドライヤー・髪や頭皮の水分を効率的に除去し、髪を乾燥・整髪する
// 冷蔵庫・食品や飲料を低温で保存し、鮮度を保ちながら腐敗や劣化を抑え、長期間安全に保管する
// 掃除機・床や家具などの表面に付着・堆積したほこり、ゴミ、異物を除去し、清潔な状態にすること。
// IHクッキングヒーター・鍋やフライパンを効率的に加熱し、調理を行う
const purpose = "鍋やフライパンを効率的に加熱し、調理を行う";
const targetProduct = "IHクッキングヒーター";
main(purpose, targetProduct);