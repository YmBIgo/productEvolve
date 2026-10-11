// Example prompt for product manufacturing process
export const GET_PRODUCT_MANUFACTURING_PROMPT = `You are a expert in product manufacturing.
The user will provide you with a product name and product features,
and you should respond with detailed manufacturing instructions for that product with json format.

- Please respond with the manufacturing instructions in JSON format in Japanese.
- If there are no matching features, create new features based on the product.
- manufacturing instructions should be detailed and clear.

[Example JSON type]

- Input Example
{
  "productName": "製品の名前",
  "features": ["特徴1", "特徴2"]
}

- Output Example
{
  "productName": "製品の名前",
  "manufacturingInstructions": [
    {
      "step": 1,
      "instruction": "製品の製造手順をここに記入してください。",
      "tools": ["ツール1", "ツール2"], // 使用するツールのリスト
      "features: ["特徴1", "特徴2"] // 製品の特徴のリスト
    }
  ]
}

[Example Input and Output]

- Input

{
  "productName": "洗濯機",
  "features": []
}

- Output


{
  "productName": "洗濯機",
  "manufacturingInstructions": [
    {
      "step": 1,
      "instruction": "製品仕様を策定する。家庭用の全自動縦型洗濯機を製造対象とし、洗濯容量7kg、標準水道圧対応、複数の洗濯コース、脱水機能、節水機能、安全ロック機能を基本仕様として設定する。洗濯槽の寸法、モーター出力、給排水方式、電気回路、制御ソフトウェア、外装構造を設計する。3D CADで部品間の干渉を確認し、強度、振動、騒音、電気安全性を評価する。",
      "tools": [
        "3D CAD",
        "CAE解析ソフトウェア",
        "電気回路設計ソフトウェア",
        "製品仕様管理システム"
      ],
      "features": [
        "全自動洗濯",
        "洗濯容量7kg",
        "節水機能",
        "低騒音設計",
        "安全ロック機能"
      ]
    },
    {
      "step": 2,
      "instruction": "製造に必要な原材料と電子部品を調達する。洗濯槽には耐食性に優れたステンレス鋼板、外槽には耐熱性と耐薬品性を考慮した樹脂、筐体には防錆処理可能な鋼板、配管には耐水性樹脂を使用する。モーター、ベアリング、給水弁、排水ポンプ、センサー、制御基板用電子部品、電源コード、配線ハーネスを調達する。材料証明書、寸法精度、電気特性、外観を受入検査する。",
      "tools": [
        "材料検査装置",
        "ノギス",
        "マイクロメーター",
        "デジタルマルチメーター",
        "部品管理システム"
      ],
      "features": [
        "耐腐食性",
        "耐久性",
        "電気安全性",
        "品質の安定性"
      ]
    },
    {
      "step": 3,
      "instruction": "洗濯機の外装筐体を製造する。鋼板を指定寸法に切断し、プレス加工によって側面パネル、背面パネル、底面フレームなどを成形する。必要な取付穴、配線用開口部、補強形状を加工し、溶接または機械的締結によってフレームを組み立てる。加工後はバリを除去し、洗浄、表面処理、粉体塗装、焼付乾燥を行う。塗膜厚、外観、耐食性、寸法精度を検査する。",
      "tools": [
        "レーザー切断機",
        "プレス加工機",
        "曲げ加工機",
        "スポット溶接機",
        "粉体塗装設備",
        "塗膜厚測定器"
      ],
      "features": [
        "高剛性筐体",
        "防錆性能",
        "耐衝撃性",
        "外観品質"
      ]
    },
    {
      "step": 4,
      "instruction": "洗濯物を収容するステンレス製の内槽を製造する。ステンレス鋼板を切断し、プレス加工またはロール成形によって円筒形状を作る。洗濯液の流通と脱水に必要な多数の小孔を打ち抜き加工する。円筒部分を接合し、底板、補強部材、回転軸との接続部品を取り付ける。内面と孔の周辺を研磨してバリを除去し、衣類を傷つけない滑らかな表面に仕上げる。完成後は真円度、回転バランス、接合強度を検査する。",
      "tools": [
        "ステンレス切断機",
        "ロール成形機",
        "パンチングプレス",
        "溶接装置",
        "研磨機",
        "真円度測定器",
        "動バランス試験機"
      ],
      "features": [
        "ステンレス製洗濯槽",
        "耐腐食性",
        "高速脱水対応",
        "衣類保護"
      ]
    },
    {
      "step": 5,
      "instruction": "洗濯水を保持する外槽を製造する。設計した金型に耐熱性と耐薬品性を持つ樹脂を射出成形し、外槽本体と必要なカバー部品を形成する。成形品を冷却して取り出し、ゲート部分やバリを除去する。給水口、排水口、軸受取付部、シール取付部の寸法を確認する。必要に応じて複数の成形部品を締結または溶着し、水密性を確保する。水張り試験によって漏水がないことを確認する。",
      "tools": [
        "射出成形機",
        "樹脂成形金型",
        "冷却設備",
        "超音波溶着機",
        "寸法測定器",
        "水密試験装置"
      ],
      "features": [
        "軽量構造",
        "耐水性",
        "耐薬品性",
        "漏水防止"
      ]
    },
    {
      "step": 6,
      "instruction": "洗濯槽の回転駆動機構を製造する。設計仕様に適合する電動モーターを製造または調達し、回転軸、ベアリング、プーリー、ベルト、クラッチなど必要な駆動部品を準備する。モーターの巻線抵抗、絶縁性能、回転特性を確認する。駆動方式に応じて、減速機構またはダイレクトドライブ機構を組み立てる。軸の同心度、軸受の圧入状態、伝達効率、回転時の振動と騒音を検査する。",
      "tools": [
        "巻線機",
        "圧入機",
        "トルクレンチ",
        "絶縁抵抗計",
        "モーター試験装置",
        "振動測定器"
      ],
      "features": [
        "高効率モーター",
        "安定した回転制御",
        "低振動",
        "低騒音",
        "高耐久性"
      ]
    },
    {
      "step": 7,
      "instruction": "洗濯槽の攪拌機構を製造する。縦型洗濯機の底部に配置するパルセーターを樹脂射出成形によって製造する。水流を発生させる羽根形状、中心軸との接続部、補強リブを成形する。バリを除去し、表面を仕上げる。駆動軸への固定構造を確認し、洗濯時の水流形成能力、機械的強度、摩耗耐久性を評価する。",
      "tools": [
        "射出成形機",
        "樹脂成形金型",
        "バリ取り工具",
        "トルク測定器",
        "水流試験装置"
      ],
      "features": [
        "効率的な洗浄水流",
        "衣類の攪拌",
        "耐摩耗性",
        "洗浄性能"
      ]
    },
    {
      "step": 8,
      "instruction": "給水機構を製造する。水道接続口、給水ホース接続部、電磁給水弁、給水経路、必要なフィルターを準備する。電磁弁のコイル抵抗、開閉応答、流量特性を測定する。水道圧の変動を考慮してシール材と接続構造を設計し、ホースおよび配管を組み立てる。所定の試験圧力で漏水試験を実施し、弁を閉じた状態での止水性能を確認する。",
      "tools": [
        "配管組立工具",
        "トルクレンチ",
        "流量計",
        "水圧試験装置",
        "漏水検査装置",
        "電磁弁試験装置"
      ],
      "features": [
        "自動給水",
        "安定した水量制御",
        "漏水防止",
        "節水機能"
      ]
    },
    {
      "step": 9,
      "instruction": "排水機構を製造する。外槽底部の排水口に接続する配管、排水弁または排水ポンプ、排水ホース、シール部品を準備する。排水経路に異物が詰まりにくい構造を採用し、必要に応じて異物捕集部を設ける。排水機構を組み立て、排水量、排水時間、逆流防止性能、漏水の有無を確認する。排水ポンプを使用する構成では電流値、揚程、騒音も検査する。",
      "tools": [
        "配管組立工具",
        "ホースクランプ工具",
        "流量計",
        "排水試験装置",
        "電流計",
        "漏水検査装置"
      ],
      "features": [
        "自動排水",
        "排水効率",
        "詰まり防止",
        "漏水防止"
      ]
    },
    {
      "step": 10,
      "instruction": "振動吸収機構を製造する。外槽を支持する吊り棒、スプリング、ダンパー、防振ゴムなどを設計仕様に従って加工または調達する。各部品のばね定数、減衰特性、寸法、耐荷重性能を確認する。洗濯槽が偏荷重状態で回転した場合にも筐体と接触しにくい支持構造を組み立てる。振動試験機を使用して共振特性、振動伝達、耐久性を評価する。",
      "tools": [
        "ばね試験機",
        "荷重試験機",
        "振動試験機",
        "トルクレンチ",
        "変位測定器"
      ],
      "features": [
        "振動低減",
        "脱水時の安定性",
        "低騒音",
        "長寿命設計"
      ]
    },
    {
      "step": 11,
      "instruction": "洗濯機の電子制御基板を製造する。マイクロコントローラー、モータードライバー、電源回路、リレー、保護回路、通信回路、センサー入力回路を設計する。プリント基板を製造し、表面実装機で電子部品を配置してリフローはんだ付けを行う。必要な挿入部品を実装し、はんだ接合部を検査する。基板に制御ファームウェアを書き込み、電源投入試験、入出力試験、保護回路試験を実施する。",
      "tools": [
        "PCB設計ソフトウェア",
        "はんだ印刷機",
        "表面実装機",
        "リフロー炉",
        "自動光学検査装置",
        "ファームウェア書込装置",
        "オシロスコープ"
      ],
      "features": [
        "全自動制御",
        "モーター速度制御",
        "省エネルギー制御",
        "異常検知",
        "安全保護"
      ]
    },
    {
      "step": 12,
      "instruction": "水位、回転状態、蓋の開閉状態などを検知するセンサーを製造または調達する。水位センサーの検出範囲と精度、回転検出センサーの応答性能、蓋開閉スイッチの動作を確認する。必要な配線ハーネスとコネクターを加工し、導通試験を行う。各センサーを制御基板と接続し、正常値と異常値の両方を入力して検知機能を検証する。",
      "tools": [
        "センサー校正装置",
        "圧力校正器",
        "導通試験機",
        "デジタルマルチメーター",
        "信号発生器",
        "ハーネス加工機"
      ],
      "features": [
        "自動水位調整",
        "回転状態監視",
        "蓋開閉検知",
        "異常検知"
      ]
    },
    {
      "step": 13,
      "instruction": "操作パネルを製造する。操作ボタン、表示LEDまたは液晶表示器、操作基板、パネル外装を設計する。樹脂成形によってパネル部品を製造し、印刷またはレーザーマーキングによって操作表示を形成する。操作基板にスイッチと表示部品を実装し、外装部品と組み合わせる。ボタンの押下耐久性、表示視認性、耐湿性、操作応答を検査する。",
      "tools": [
        "射出成形機",
        "スクリーン印刷機",
        "レーザーマーキング装置",
        "基板実装装置",
        "スイッチ耐久試験機",
        "表示検査装置"
      ],
      "features": [
        "直感的な操作",
        "洗濯コース選択",
        "残り時間表示",
        "耐湿性",
        "操作性"
      ]
    },
    {
      "step": 14,
      "instruction": "洗濯機の蓋と安全ロック機構を製造する。蓋本体を樹脂成形し、必要に応じて透明窓、ヒンジ、緩衝部品、取っ手を取り付ける。脱水中の蓋開放を防止するロック機構と開閉検知スイッチを組み込む。蓋の開閉角度、ヒンジ耐久性、ロック保持力、異常時の停止動作を検査する。回転中に蓋が開かないこと、および安全条件が成立した場合にのみロック解除できることを確認する。",
      "tools": [
        "射出成形機",
        "組立治具",
        "トルクレンチ",
        "開閉耐久試験機",
        "ロック機構試験装置"
      ],
      "features": [
        "安全ロック",
        "誤操作防止",
        "耐久性",
        "安全な開閉操作"
      ]
    },
    {
      "step": 15,
      "instruction": "洗濯機の主要機械部品を組み立てる。外槽に軸受、シール、回転軸、駆動機構を取り付ける。内槽を回転軸に固定し、パルセーターを取り付ける。締結部品は指定トルクで固定し、必要な箇所には緩み止め処理を施す。組立後に洗濯槽を手動または低速で回転させ、接触、異音、偏心、回転抵抗の異常がないことを確認する。",
      "tools": [
        "組立治具",
        "電動トルクドライバー",
        "圧入機",
        "トルクレンチ",
        "ダイヤルゲージ",
        "回転試験装置"
      ],
      "features": [
        "高精度組立",
        "安定した回転",
        "耐久性",
        "低振動"
      ]
    },
    {
      "step": 16,
      "instruction": "洗濯槽ユニットを筐体に搭載する。筐体内部に防振支持機構を取り付け、組み立て済みの外槽ユニットを所定の位置に固定する。駆動モーター、給水機構、排水機構を取り付け、ホースと配管を接続する。各配管の取り回し、固定位置、可動部とのクリアランスを確認する。洗濯槽が想定される振動範囲内で自由に動作し、筐体や配線に干渉しないことを検査する。",
      "tools": [
        "組立ライン",
        "吊り上げ治具",
        "電動トルクドライバー",
        "ホースクランプ工具",
        "クリアランス測定器"
      ],
      "features": [
        "安定した内部構造",
        "防振性能",
        "保守性",
        "漏水防止"
      ]
    },
    {
      "step": 17,
      "instruction": "電気配線と制御ユニットを組み立てる。制御基板を指定位置に固定し、モーター、給水弁、排水機構、各種センサー、操作パネル、蓋ロック機構を配線ハーネスで接続する。配線をクランプで固定し、可動部、鋭利な金属端部、高温部、水がかかる箇所から適切に離す。保護接地を必要とする構造では確実に接地接続を行う。配線の導通、極性、接地導通、絶縁性能を確認する。",
      "tools": [
        "ハーネス組立工具",
        "圧着工具",
        "電動ドライバー",
        "導通試験機",
        "絶縁抵抗計",
        "接地導通試験機"
      ],
      "features": [
        "電気安全性",
        "配線信頼性",
        "自動制御",
        "保守性"
      ]
    },
    {
      "step": 18,
      "instruction": "洗濯制御ソフトウェアを完成させる。標準洗い、すすぎ、脱水、時短、節水などの運転コースを実装する。水位センサーの情報に基づく給水停止、モーター回転方向と速度の切替、排水制御、脱水時の偏荷重検知、蓋ロック制御、異常時の安全停止を実装する。各運転状態の遷移条件を定義し、単体試験、結合試験、異常系試験を行う。検証済みのファームウェアを制御基板に書き込む。",
      "tools": [
        "統合開発環境",
        "組込みプログラミングツール",
        "デバッガー",
        "ファームウェア書込装置",
        "自動テストシステム",
        "ハードウェアインザループ試験装置"
      ],
      "features": [
        "複数の洗濯コース",
        "自動運転",
        "節水制御",
        "偏荷重検知",
        "異常時自動停止"
      ]
    },
    {
      "step": 19,
      "instruction": "洗濯機の最終外装を組み立てる。上部カバー、操作パネル、蓋、背面パネル、底部保護部品を取り付ける。製品ラベル、定格表示、警告表示、製造番号を所定の位置に貼付する。外装パネル間の隙間、段差、傷、変形、塗装不良を確認する。蓋と操作ボタンの動作を再確認し、輸送時に外れやすい部品や固定不足がないことを検査する。",
      "tools": [
        "最終組立ライン",
        "電動トルクドライバー",
        "位置決め治具",
        "外観検査装置",
        "バーコード印刷機"
      ],
      "features": [
        "完成外観",
        "操作性",
        "製品識別",
        "組立品質"
      ]
    },
    {
      "step": 20,
      "instruction": "完成した洗濯機に対して電気安全検査を実施する。製品仕様および適用規格に従い、絶縁抵抗、耐電圧、漏えい電流、接地導通、消費電力を測定する。電源電圧の変動、異常停止、モーター過負荷、センサー断線などの条件を再現し、保護機能が適切に作動することを確認する。不適合品は出荷工程から分離し、原因解析と修正後の再検査を実施する。",
      "tools": [
        "耐電圧試験機",
        "絶縁抵抗計",
        "漏えい電流試験機",
        "接地導通試験機",
        "電力計",
        "安全機能試験装置"
      ],
      "features": [
        "感電防止",
        "過負荷保護",
        "電気安全性",
        "異常時の安全停止"
      ]
    },
    {
      "step": 21,
      "instruction": "完成品の給水、洗浄、すすぎ、排水、脱水機能を検査する。試験設備に洗濯機を接続し、標準試験負荷を投入して運転する。給水量、給水時間、水位制御、洗濯槽回転数、排水時間、脱水性能、消費電力量、使用水量を測定する。衣類の洗浄性能とすすぎ性能は規定された試験方法で評価する。運転中の漏水、異音、異常振動、制御エラーがないことを確認する。",
      "tools": [
        "洗濯性能試験設備",
        "標準試験負荷",
        "流量計",
        "回転速度計",
        "電力計",
        "騒音計",
        "振動測定器"
      ],
      "features": [
        "洗浄性能",
        "すすぎ性能",
        "脱水性能",
        "節水性能",
        "省エネルギー性能"
      ]
    },
    {
      "step": 22,
      "instruction": "洗濯機の耐久性と信頼性を評価する。量産工程から抽出した製品に対して、洗濯、すすぎ、脱水の繰返し運転試験を行う。モーター、ベアリング、シール、給排水弁、ダンパー、蓋ヒンジ、操作ボタンなどの劣化を調査する。偏荷重運転、温湿度変化、輸送振動などの試験条件を設定し、破損、漏水、性能低下が発生しないか確認する。試験結果を設計部門と製造部門へフィードバックする。",
      "tools": [
        "耐久運転試験装置",
        "恒温恒湿槽",
        "振動試験機",
        "データロガー",
        "摩耗測定器",
        "品質解析ソフトウェア"
      ],
      "features": [
        "長寿命",
        "高信頼性",
        "耐振動性",
        "耐湿性",
        "安定した洗濯性能"
      ]
    },
    {
      "step": 23,
      "instruction": "完成品の最終品質検査を行う。外観、寸法、付属品、電気安全検査結果、運転検査結果、製造番号を確認する。各製品の検査データを品質管理システムに登録し、製造ロット、主要部品、ファームウェアバージョンとの対応を記録する。合格品には検査完了情報を付与し、不合格品は原因に応じて修理、再検査、または廃棄処理する。",
      "tools": [
        "品質管理システム",
        "バーコードリーダー",
        "外観検査装置",
        "寸法測定器",
        "製品検査端末"
      ],
      "features": [
        "品質保証",
        "製造履歴管理",
        "トレーサビリティ",
        "不良品流出防止"
      ]
    },
    {
      "step": 24,
      "instruction": "洗濯機を出荷用に梱包する。輸送時の振動や衝撃から洗濯槽と外装を保護するため、必要な輸送固定部品と緩衝材を取り付ける。取扱説明書、保証書、給水ホース、排水ホース、必要な取付部品を同梱する。段ボールまたは専用梱包材で製品を保護し、製品名、型番、製造番号、取扱注意表示を印刷または貼付する。梱包状態、重量、付属品の不足がないことを確認する。",
      "tools": [
        "梱包ライン",
        "緩衝材加工機",
        "段ボール封函機",
        "重量計",
        "ラベルプリンター",
        "梱包検査装置"
      ],
      "features": [
        "輸送時の製品保護",
        "付属品管理",
        "梱包品質",
        "製品識別"
      ]
    },
    {
      "step": 25,
      "instruction": "完成した洗濯機を倉庫へ搬送し、出荷管理を行う。梱包済み製品をパレットに積載し、製造ロット、型番、数量、保管場所を在庫管理システムに登録する。保管中の転倒、湿気、過大な積載荷重を防止する。出荷指示に基づいて対象製品をピッキングし、製造番号と配送先を照合する。輸送業者への引渡し時に梱包状態と数量を確認し、出荷履歴を記録する。",
      "tools": [
        "フォークリフト",
        "パレット",
        "バーコードリーダー",
        "倉庫管理システム",
        "出荷検品システム"
      ],
      "features": [
        "安全な保管",
        "効率的な物流",
        "在庫管理",
        "出荷トレーサビリティ"
      ]
    }
  ]
}
`;

export const GET_PRODUCT_PROCESS_PROMPT = `You are an expert in how products work, with extensive knowledge of their operating principles, internal mechanisms, components, and functional processes.

Given a product and its features, your task is to explain how the product operates through a detailed, step-by-step process.

Follow these requirements:

- Break down the product's operation into logical, sequential steps, from initiation to completion.
- For each step, provide detailed instructions explaining what happens, how it happens, and why it is necessary.
- Identify the components, mechanisms, and technologies involved in each step.
- List the product features relevant to each step.
- If the input features array is empty, infer appropriate features based on the product.
- If a step does not correspond to any specified feature, include relevant inferred features where appropriate.
- Focus on how the product functions, not how it is manufactured or assembled.
- Ensure that the explanations are technically accurate and reflect realistic operating principles.
- Respond in Japanese using valid JSON only, without Markdown formatting or additional explanations.

## Input JSON

\`\`\`json
{
  "product": "<product name>",
  "features": ["<feature1>", "<feature2>"]
}
\`\`\`

## Output JSON

\`\`\`json
{
  "process": [
    {
      "step": 1,
      "instruction": "<detailed explanation of the operation>",
      "tools": ["<component1>", "<component2>"],
      "features": ["<feature1>", "<feature2>"]
    }
  ]
}
\`\`\`

## Example Input JSON

\`\`\`json
{
  "product": "全自動縦型洗濯機（パルセーター式）",
  "features": []
}
\`\`\`

## Example Output JSON

\`\`\`json

{
  "process": [
    {
      "step": 1,
      "instruction": "ユーザーが洗濯物を洗濯槽に投入し、洗剤や柔軟剤を所定の投入口に入れる。電源を入れて洗濯コースを選択し、スタートボタンを押すと、制御基板が洗濯プログラムを開始する。洗濯物の量や選択されたコースに応じて、必要な水量、洗濯時間、すすぎ回数、脱水時間などが決定される。",
      "tools": [
        "操作パネル",
        "制御基板",
        "洗濯槽",
        "洗剤投入口",
        "重量検知機構"
      ],
      "features": [
        "洗濯コース選択",
        "自動洗濯制御",
        "洗濯物量検知"
      ]
    },
    {
      "step": 2,
      "instruction": "制御基板が給水弁に電気信号を送り、給水経路を開く。水道から供給された水が洗濯槽に流入する。水位センサーが槽内の水位を監視し、設定された水量に達すると制御基板が給水弁を閉じる。これにより、洗濯物の量に適した水量を確保する。",
      "tools": [
        "給水弁",
        "給水ホース",
        "水位センサー",
        "制御基板"
      ],
      "features": [
        "自動給水",
        "水位制御",
        "節水機能"
      ]
    },
    {
      "step": 3,
      "instruction": "給水された水と洗剤が混合され、洗剤成分が水中に分散する。界面活性剤は繊維と汚れの界面に作用し、皮脂などの油性汚れを水中に取り込みやすくする。洗濯槽内の水流によって洗剤液が洗濯物全体に行き渡り、汚れを除去する準備が整う。",
      "tools": [
        "洗濯槽",
        "パルセーター",
        "駆動モーター",
        "洗剤"
      ],
      "features": [
        "洗剤混合",
        "洗剤浸透",
        "汚れ分散"
      ]
    },
    {
      "step": 4,
      "instruction": "駆動モーターがパルセーターを回転させ、洗濯槽内に水流を発生させる。水流によって衣類が移動し、衣類同士の摩擦や水の流体力が繊維に付着した汚れを引き離す。同時に洗剤の界面活性剤が油脂汚れの除去を助ける。制御基板はモーターの回転方向、速度、動作時間を調整し、洗浄力と衣類への負担のバランスを取る。",
      "tools": [
        "駆動モーター",
        "パルセーター",
        "洗濯槽",
        "モーター駆動回路"
      ],
      "features": [
        "水流洗浄",
        "回転制御",
        "汚れ除去",
        "衣類保護"
      ]
    },
    {
      "step": 5,
      "instruction": "設定された洗濯時間が終了すると、制御基板が排水弁または排水ポンプを作動させる。洗濯槽内の洗剤液と、衣類から分離された汚れを含む水が排水ホースを通って機外へ排出される。機種によっては排水後に短時間の回転を行い、衣類に残った洗剤液を減らす。",
      "tools": [
        "排水弁",
        "排水ポンプ",
        "排水ホース",
        "制御基板"
      ],
      "features": [
        "自動排水",
        "汚水排出",
        "中間脱水"
      ]
    },
    {
      "step": 6,
      "instruction": "すすぎ工程では、新しい水を洗濯槽に供給し、パルセーターによる水流や槽の回転によって衣類に残った洗剤成分と汚れを水中に移動させる。その後、すすぎ水を排出する。選択されたコースに応じてこの工程を繰り返す。柔軟剤の自動投入機能がある場合は、所定のすすぎ工程で柔軟剤を投入する。",
      "tools": [
        "給水弁",
        "水位センサー",
        "パルセーター",
        "排水機構",
        "柔軟剤投入機構"
      ],
      "features": [
        "自動すすぎ",
        "洗剤残留低減",
        "柔軟剤投入"
      ]
    },
    {
      "step": 7,
      "instruction": "すすぎが終了すると排水を行い、洗濯槽を高速回転させる。衣類は遠心作用によって槽の内壁側に押し付けられ、水分が槽の排水孔を通って外側へ移動する。分離された水は排水経路から排出される。制御基板は回転速度を段階的に上昇させ、振動センサーや回転状態の監視によって衣類の偏りを検出する。偏りが大きい場合は回転を停止し、衣類の配置を調整する動作を行う。",
      "tools": [
        "脱水槽",
        "駆動モーター",
        "回転速度検知機構",
        "振動検知機構",
        "排水機構"
      ],
      "features": [
        "遠心脱水",
        "高速回転制御",
        "振動抑制",
        "衣類偏り検知"
      ]
    },
    {
      "step": 8,
      "instruction": "設定された脱水時間が終了すると、制御基板がモーターの駆動を停止する。洗濯槽の回転速度が低下し、安全に停止するまで蓋やドアのロックを維持する。回転停止が確認されると、安全条件を満たした場合にロックが解除される。",
      "tools": [
        "制御基板",
        "駆動モーター",
        "回転速度センサー",
        "蓋ロック機構"
      ],
      "features": [
        "自動停止",
        "安全ロック",
        "回転停止検知"
      ]
    },
    {
      "step": 9,
      "instruction": "すべての洗濯工程が正常に完了すると、制御基板が終了状態に移行する。操作パネルの表示や電子ブザーによってユーザーに洗濯終了を通知する。機種によっては一定時間後に電源を自動的に切り、待機時の消費電力を低減する。ユーザーは蓋を開けて洗濯物を取り出す。",
      "tools": [
        "制御基板",
        "操作パネル",
        "電子ブザー",
        "電源制御回路"
      ],
      "features": [
        "洗濯終了通知",
        "自動電源オフ",
        "省エネルギー"
      ]
    }
  ]
}
\`\`\`
`

export const GET_RELATED_FEATURES_PROMPT = `You are an exper in how product work, with extensive knoledge of their operating priciples internal mechanisms, components and functionalprocesses.

Given a product's purpose and feature lists, identify the related features with confidence.

Follow these requirements:
- Only list features that are directly related to the product's purpose and functionality.
- Avoid including unrelated or tangential features.
- Respond in Japanese using valid JSON only, without Markdown formatting or additional explanations.

## Input JSON
\`\`\`json
{
  "purpose": "製品の目的をここに記入",
  "features": [
    "機能1",
    "機能2",
    "機能3",
    ...
  ]
}
\`\`\`

## Output JSON
\`\`\`json
{
  "related_features": [
    {
      "feature": "機能1",
      "confidence": 0.0~1.0 // この機能が製品の目的に関連している確信度0〜1をここに記入
    },
    {
      "feature": "機能2",
      "confidence": 0.0~1.0 // この機能が製品の目的に関連している確信度0〜1をここに記入
    }
  ]
}
\`\`\`
`

export const GET_IDEA_PROMPT = `You are an expert in first-principles reasoning, inventive problem-solving, and product innovation.

Your task is to generate a fundamentally new functional idea that achieves a product's purpose.

Do not assume that existing products, mechanisms, components, or conventional approaches are necessary.

## Core Principles

1. **Start from the purpose, not the existing product.**
   - Identify the fundamental outcome that must be achieved.
   - Consider what physical, chemical, biological, computational, or other mechanisms could produce that outcome.
   - Explore alternative ways to achieve the same result, including approaches fundamentally different from existing technologies.

2. **Avoid anchoring on existing features.**
   - Treat \`current_features\` as contextual information, not as mandatory design constraints.
   - Existing features may be replaced, eliminated, bypassed, or fundamentally redesigned.
   - Do not merely combine existing features or make incremental improvements unless doing so leads to a genuinely different mechanism.

3. **Generate ideas through first-principles reasoning.**
   - Identify the underlying problem that the target feature solves.
   - Question the assumptions behind the existing solution.
   - Consider whether the desired outcome can be achieved without the target feature's conventional mechanism.
   - Prefer ideas that introduce a new operating principle, causal mechanism, or functional architecture.

4. **Respect the requested feature relationship.**
   - \`new\`: Introduce a new functional approach that contributes directly to the product's purpose.
   - \`before\`: Introduce a function that prepares the necessary conditions before the target feature operates.
   - \`improvement\`: Introduce a fundamentally different or substantially improved way to achieve the target feature's intended outcome.
   - \`after\`: Introduce a function that processes, stabilizes, completes, or improves the result produced by the target feature.

5. **Maintain functional relevance.**
   - Every idea must directly contribute to achieving the product's purpose.
   - Avoid unrelated convenience features, cosmetic changes, or superficial additions.
   - Favor physically or technically plausible ideas, but do not reject unconventional approaches simply because they are not commonly used.

6. **Prioritize conceptual novelty.**
   - Seek alternative mechanisms rather than variations of conventional designs.
   - Do not assume that the existing product architecture must be preserved.
   - Consider approaches from entirely different scientific or engineering domains when they can achieve the same functional outcome.

## Reasoning Process

Before generating the final idea, internally perform the following steps:

1. Abstract the product's purpose into its fundamental functional outcome.
2. Identify the role of the target feature in achieving that outcome.
3. Remove assumptions inherited from conventional implementations.
4. Explore multiple alternative mechanisms for achieving the outcome.
5. Select the idea that best balances conceptual novelty, functional relevance, and technical plausibility.

Do not include this reasoning process in the output.

## Input JSON

{
  "purpose": "<fundamental purpose of the product>",
  "current_features": [
    "<existing feature 1>",
    "<existing feature 2>"
  ],
  "features_to_add": {
    "target_feature": "<target feature>",
    "relationship": "new | before | improvement | after"
  }
}

## Output JSON

{
  "new_ideas": {
    "feature": "<new functional idea>",
    "reason": "<explain the mechanism, how it achieves the intended outcome, and why it differs fundamentally from conventional approaches>",
    "confidence": 0.0~1.0 // 技術的実現可能性の推定スコア
  }
}

## Output Requirements

- Respond in Japanese.
- Return valid JSON only.
- Generate one idea.
- Describe a concrete functional mechanism rather than an abstract concept.
- Do not include Markdown formatting or additional explanations.
- Include a "confidence" score between 0.0 and 1.0.
- The confidence score should represent the estimated technical feasibility of the proposed idea, based on established scientific principles, engineering constraints, and practical implementation challenges.
- Use the following guidelines:
  - 0.9–1.0: Highly feasible with established scientific and engineering principles.
  - 0.7–0.9: Technically plausible, but requires significant engineering development.
  - 0.4–0.7: Theoretically plausible, but involves substantial technical uncertainties.
  - 0.1–0.4: Highly speculative, requiring breakthroughs or unverified mechanisms.
  - 0.0–0.1: Inconsistent with known scientific principles or extremely unlikely to work.
- Evaluate feasibility independently of novelty. A highly innovative idea should not automatically receive a low confidence score.
- Treat confidence as a qualitative feasibility estimate, not a statistically calibrated probability.
`

export const CHECK_IDEA_PROMPT = `You are an expert in evaluating the feasibility and relevance of new product ideas based on their purpose and existing features.

Given a product's purpose, existing features, and new ideas, describe the lackness of the new ideas in terms of feasibility and relevance.

Follow these requirements:
- Only evaluate ideas that are directly related to the product's purpose and functionality.
- Avoid evaluating unrelated or tangential ideas.
- Respond in Japanese using valid JSON only, without Markdown formatting or additional explanations.

## Input JSON
\`\`\`json
{
  "purpose": "製品の目的をここに記入",
  "current_features": [
    "機能1",
    "機能2",
    ... // ここまでの機能が順番で記述されている
  ],
  "new_ideas": [
    {
      "feature": "新しい機能1",
      "reason": "この機能が製品の目的にどのように貢献するかをここに記入"
    }
  ]
}
\`\`\`

## Output JSON
\`\`\`json
{
  "feature": "新しい機能1",
  "lackness": {
    "area": "NEED_IMPROVEMENT / NEED_BEFORE_CARE / NEED_AFTER_CARE のいずれかをここに記入",
    "reason": "この機能がなぜその評価になったのかの理由をここに記入"
  }
}
\`\`\`
`

export const DETECT_LACKNESS_PROMPT = `You are an expert in detecting the lackness of new product ideas based on their purpose and existing features.

Given a product's purpose, existing features, and reason for lackness of existing features, detect the keyword that best describes the area of improvement needed.

Follow these requirements:
- Only detect lackness that is directly related to the product's purpose and functionality.
- Avoid detecting unrelated or tangential lackness.
- Respond in Japanese using valid JSON only, without Markdown formatting or additional explanations.

## Input JSON
\`\`\`json
{
  "purpose": "製品の目的をここに記入",
  "current_features": [
    "機能1",
    "機能2",
    ... // ここまでの機能が順番で記述されている
  ],
  "current_feature": "不足している既存の機能をここに記入",
  "lackness_reason": "既存の機能の不足理由をここに記入"
}
\`\`\`

## Output JSON
\`\`\`json
{
  "keyword": "必要な改善を表すキーワード"
}
\`\`\`
`