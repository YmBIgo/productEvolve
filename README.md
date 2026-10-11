# Product Idea Evolution

既存製品の機能を別の製品へ応用し、OpenAI APIを使って新しい製品アイデアを生成・評価・改善する実験用プロジェクトです。

たとえば「衣服の汚れを落とす」という洗濯機の目的に対し、他製品が持つ関連機能を検索してアイデアを作成します。その後、アイデアに不足している要素を評価し、別の機能を組み合わせながら最大4段階まで改善します。

## 処理の概要

このプロジェクトは、次の2段階で動作します。

1. 製品機能のインデックスを作成する
   - `src/const/product.ts` に定義された100製品について、動作工程と機能をOpenAI APIで生成します。
   - 全機能の一覧と、機能から製品・工程を逆引きするインデックスを作成します。
2. 製品アイデアを生成する
   - 対象製品の目的に関連する機能を検索します。
   - 別製品の機能を転用した初期アイデアを生成します。
   - アイデアを `COMPLETED`、`FAILED`、`NEED_IMPROVEMENT`、`NEED_BEFORE_CARE`、`NEED_AFTER_CARE` のいずれかとして評価します。
   - 不足がある場合は関連機能を追加し、アイデアを反復的に改善します。

より詳しい処理手順は [docs/flow.md](docs/flow.md) を参照してください。

## 必要な環境

- Node.js（ES Modulesと組み込みの環境変数を利用できるバージョン）
- npm
- OpenAI APIキー

APIの呼び出しには料金が発生します。特にインデックス作成では多数のリクエストを送信するため、利用量と課金上限を確認してから実行してください。

## セットアップ

依存パッケージをインストールします。

```bash
npm install
```

OpenAI APIキーを環境変数に設定します。

```bash
export OPENAI_API_KEY="your-api-key"
```

TypeScriptをビルドします。

```bash
npm run build
```

## 使い方

### 1. インデックスを作成する

```bash
npm run indexing
```

処理結果は `json/` に保存されます。

- `all_features.json`: 全製品から抽出した機能の一覧
- `inverted_features_index.json`: 機能をキーとした製品・工程の逆引きインデックス
- `<製品名>.json`: 各製品の動作工程と機能

既に `<製品名>.json` が存在する製品はスキップされます。途中で停止した場合も、同じコマンドで処理を再開できます。

### 2. アイデアを生成する

現時点では、対象製品と目的を `src/index.ts` の末尾で指定します。

```ts
const purpose = "鍋やフライパンを効率的に加熱し、調理を行う";
const targetProduct = "IHクッキングヒーター";
```

値を変更した後、再度ビルドして実行します。

```bash
npm run build
npm start
```

結果は `json/<タイムスタンプ>_<対象製品>/` に保存されます。

- `search_target.json`: 目的に関連する転用候補の機能
- `ideaHistory_<番号>.json`: 各候補の評価・改善履歴
- `currentFeatures_<番号>.json`: 最終的に構成された機能の一覧

## ディレクトリ構成

```text
.
├── docs/
│   └── flow.md              # アイデア生成フローの詳細
├── json/                    # インデックス、製品データ、生成結果
├── src/
│   ├── const/product.ts     # インデックス対象の製品一覧
│   ├── llm/openai.ts        # OpenAI APIクライアント
│   ├── prompt/index.ts      # 各処理で使用するプロンプト
│   ├── indexing.ts          # 製品機能インデックスの生成
│   └── index.ts             # アイデアの生成・評価・改善
├── package.json
└── tsconfig.json
```

## npmスクリプト

| コマンド | 内容 |
| --- | --- |
| `npm run build` | TypeScriptを`dist/`へコンパイルする |
| `npm run indexing` | コンパイル済みのインデックス生成処理を実行する |
| `npm start` | コンパイル済みのアイデア生成処理を実行する |

`indexing` と `start` は `dist/` 内のJavaScriptを実行します。ソースを変更した場合は、先に `npm run build` を実行してください。

## 現在の制約

- 対象製品と目的をコマンドラインから指定する機能はなく、`src/index.ts` の編集が必要です。
- API応答はJSONであることを前提としているため、応答形式が崩れると対象処理をスキップする場合があります。
- 自動テストはまだ用意されていません。
- APIモデルは `src/llm/openai.ts` に固定されています。利用可能なモデルに合わせて変更してください。

## ライセンス

MIT
