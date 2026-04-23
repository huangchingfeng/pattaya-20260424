// 芭堤雅地點資料 — 40家 / coords from KML
window.LOCATIONS = [
  // ============ Soi 6 ============
  {
    id: "3angels", name: "3Angels", area: "Soi 6", type: "bar",
    lat: 12.9419438, lng: 100.8876865,
    address: "Red light district, Pattaya Soi 6, Pattaya City, Bang Lamung District, Chon Buri 20150",
    rating: 3,
    note: "拉吉妹想要包包+飯店+蠟筆小新，等她回覆哪天沒班",
    girls: [
      { name: "拉吉妹", tag: "🔥 指定", price: "", contact: "", desc: "上次認識，想要包包+飯店+蠟筆小新", hours: "待確認" },
      { name: "Pin (พิณ)", age: 26, build: "豐滿・胸部大", photos: ["photos/3angels-pin.jpg"],
        tag: "⭐ 不錯", desc: "淺金長髮、笑容甜美、淺藍比基尼+白短裙、甜美性感型、Cash Only",
        hours: "2026年3月起" }
    ]
  },
  {
    id: "love-missile", name: "Love Missile", area: "Soi 6", type: "bar",
    lat: 12.9420216, lng: 100.8876010, rating: 3,
    girls: [
      { name: "Pranee (ปราณี)", age: 26, build: "纖細有曲線", photos: ["photos/love-missile-pranee.jpg"],
        tag: "⭐", desc: "金色短髮、紅色開衩連身裙、時尚性感型、胸口有紋身",
        hours: "2026年3月起" },
      { name: "清新妹", tag: "⭐ 新", photos: ["photos/love-missile-blue.jpg"],
        build: "纖細・腿長", desc: "棕色中長髮齊瀏海、皮膚白皙、淺藍色露腰短上衣+白色蕾絲短裙、清新可愛鄰家型" }
    ]
  },
  {
    id: "oppa", name: "Oppa Bar", area: "Soi 6", type: "bar",
    lat: 12.9419444, lng: 100.8871944, rating: 4,
    girls: [
      { name: "Mali (มะลิ)", age: 20, build: "豐滿・胸部很大 🔥", photos: ["photos/oppa-bar-mali.jpg"],
        tag: "⭐ 超嫩", desc: "黑色長直髮、皮膚白皙、深藍交叉綁帶連身裙、清純可愛但身材反差猛",
        hours: "2026年2月起" },
      { name: "眼鏡雙馬尾妹", tag: "🔥 2447觀看！", photos: ["photos/oppa-glasses.jpg"],
        build: "豐滿", desc: "黑色長直髮雙馬尾+白色蝴蝶結、圓框眼鏡、棕色平口上衣流蘇裝飾+黑短裙、鎖骨紋身、日系眼鏡娘型、超高人氣" }
    ]
  },
  {
    id: "offshore", name: "Offshore Bar", area: "Soi 6", type: "bar",
    lat: 12.9421966, lng: 100.8869879, rating: 5,
    theme: "護士裝主題",
    note: "⭐⭐⭐ 這家店超有料！妹子很多很性感！藍色霓虹燈裝潢",
    girls: [
      { name: "女孩 #1 (銀比基尼)", photos: ["photos/offshore-bar-girl.jpg"],
        desc: "棕色長髮中分、銀色比基尼+白色短裙、性感豐滿型" },
      { name: "女孩 #2 & #3", photos: ["photos/offshore-bar-2girls.jpg"],
        desc: "黑直髮嬌小妹 + 棕辮子甜美妹，銀色比基尼" },
      { name: "護士妹 🔥🔥", tag: "⭐⭐ 超性感", photos: ["photos/offshore-bar-nurse.jpg"],
        desc: "紅白護士裝 + 白色蓬蓬裙" },
      { name: "清純妹", tag: "⭐ 新", photos: ["photos/offshore-pure.jpg"],
        desc: "淺棕色長髮、皮膚超白皙、淺藍色交叉綁帶上衣+白色短褲、纖細清純鄰家型" }
    ]
  },
  {
    id: "roxy", name: "Roxy Bar", area: "Soi 6", type: "bar",
    lat: 12.9422169, lng: 100.8869368, rating: 3,
    girls: [
      { name: "Pie (พาย)", age: 20, build: "纖細・腰很細", photos: ["photos/roxy-bar-pie.jpg"],
        tag: "⭐", desc: "黑色長直髮、皮膚白皙、紅色細肩帶+黑短褲、清純鄰家型超嫩",
        hours: "2026年2月起" }
    ]
  },
  {
    id: "baba", name: "Baba Bar", area: "Soi 6", type: "bar",
    lat: 12.9421115, lng: 100.8867540, rating: 4,
    address: "54 Soi 6, Pattaya City, Amphoe Bang Lamung, Chon Buri 20150",
    note: "Krongkwan 會英文，她同意跟你喝酒",
    girls: [
      { name: "Krongkwan", tag: "⭐ 會英文", photos: ["photos/baba-bar-krongkwan.jpg"],
        build: "豐滿性感", desc: "會英文、傳了性感自拍影片、同意跟你喝酒" },
      { name: "紅裙妹", photos: ["photos/baba-bar-red-dress.jpg"],
        desc: "棕色長髮、膚色偏深、紅色深V連身裙、成熟性感型、曲線好胸部豐滿" }
    ]
  },
  {
    id: "butterfly", name: "Butterfly Bar 🦋", area: "Soi 6", type: "bar",
    lat: 12.9423663, lng: 100.8864480, rating: 3,
    girls: [
      { name: "Sasithorn (ศศิธร)", age: 23, build: "纖細・腿長", photos: ["photos/butterfly-bar-sasithorn.jpg"],
        tag: "⭐", desc: "棕黑色短髮 Bob、清純臉蛋、黑色緊身短洋裝、清純鄰家型",
        hours: "2026年3月起" }
    ]
  },
  {
    id: "chili", name: "Chili Bar 🌶️", area: "Soi 6", type: "bar",
    lat: 12.9423848, lng: 100.8863021, rating: 4,
    contact: "IG: chilibar.soi6",
    note: "潑水節活動 4/13-19",
    girls: [
      { name: "Kanya (กัญญา)", age: 21, build: "豐滿・胸部大", photos: ["photos/chili-bar-kanya.jpg"],
        tag: "⭐", desc: "黑色長直髮、頭戴紅花🌺、膚色健康偏深、粉紅比基尼、異國風情型",
        hours: "2026年3月起" },
      { name: "粉紫比基尼妹", build: "超豐滿・胸部很大 🔥🔥", photos: ["photos/chili-bar-songkran.jpg"],
        tag: "🔥", desc: "黑色長髮、膚色健康偏深、粉紫色比基尼（潑水節濕身照）" },
      { name: "黑色比基尼妹", tag: "新", photos: ["photos/chili-black-bikini.jpg"],
        build: "豐滿有曲線", desc: "棕色長髮、笑容超燦爛超陽光、黑色綁帶比基尼、活潑型" }
    ]
  },
  {
    id: "liquid", name: "Liquid 🔥", area: "Soi 6", type: "bar",
    lat: 12.9424434, lng: 100.8863153, rating: 5,
    theme: "警察制服主題 + 鋼管舞",
    girls: [
      { name: "Book (บุ๊ค)", age: 27, build: "超豐滿・胸部非常大 🔥🔥🔥", photos: ["photos/liquid-book.jpg"],
        tag: "⭐⭐ 超正", desc: "黑色長直髮、臉蛋超正、紅唇、黑色警察制服深V、冷艷性感型、有鋼管舞",
        hours: "2026年2月起" },
      { name: "軍裝妹", build: "豐滿・胸部大・腿白長 🔥", photos: ["photos/liquid-military.jpg"],
        tag: "🔥 288讚", desc: "棕色長髮齊瀏海、皮膚白皙、深藍軍裝/戰術風連身制服+黑色扣帶、制服控殺手型",
        hours: "IG: liquid.soi6.girl" }
    ]
  },
  {
    id: "benders", name: "Benders", area: "Soi 6", type: "bar",
    lat: 12.9423245, lng: 100.8861932, rating: 3,
    girls: [
      { name: "Oil (ออยล์)", age: 26, build: "纖細・腿長", photos: ["photos/benders-oil.jpg"],
        tag: "⭐", desc: "金色長直髮（超亮金）、淡紫綁帶露肩+白短裙、甜美可愛型",
        hours: "2026年3月起" }
    ]
  },
  {
    id: "horny", name: "Horny Bar", area: "Soi 6", type: "bar",
    lat: 12.9424598, lng: 100.8861905, rating: 5,
    note: "🔥 Kaem 主動約 4/3 見面！問你要不要 LT",
    girls: [
      { name: "Kaem (แกม)", tag: "🔥🔥 已約", photos: ["photos/kaem-chat.jpg"],
        desc: "短髮、戴牙套、非常主動熱情、說你 sexy、傳自拍影片、想要 LT（過夜）",
        contact: "已有聯繫" }
    ]
  },
  {
    id: "wicked", name: "Wicked 🔥", area: "Soi 6", type: "bar",
    lat: 12.9425121, lng: 100.8860189, rating: 5,
    theme: "警察制服主題",
    girls: [
      { name: "Ratchanee (รัชนี)", age: 23, build: "超豐滿・胸部超大 🔥🔥🔥", photos: ["photos/wicked-ratchanee.jpg"],
        tag: "⭐⭐ 超猛", desc: "黑色長直髮帶粉紅挑染、妝容精緻、黑色警察制服連身衣、性感辣妹型氣場強",
        hours: "2026年3月起" }
    ]
  },
  {
    id: "repent", name: "Repent Bar", area: "Soi 6", type: "bar",
    lat: 12.9425124, lng: 100.8860189, rating: 4,
    theme: "護士裝/可愛風格",
    girls: [
      { name: "女孩 #1", photos: ["photos/repent-bar-girl.jpg"],
        desc: "長直髮齊瀏海、粉紅和服風格上衣、嬌小可愛型" },
      { name: "女孩 #2 🔥", photos: ["photos/repent-bar-girl2.jpg"],
        build: "豐滿・胸部很大", desc: "棕色長直髮齊瀏海、粉紅護士裝露臍、手臂紋身、笑容甜美" },
      { name: "Fon (ฝน)", age: 30, build: "超豐滿・胸部很大 🔥🔥", photos: ["photos/repent-bar-fon.jpg"],
        tag: "⭐", desc: "棕色短髮齊肩微翹、白色護士裝（紅十字）深V超低胸、成熟性感型",
        hours: "2026年3月起" },
      { name: "學生制服妹", tag: "新", photos: ["photos/repent-student.jpg"],
        build: "纖細・腿長", desc: "黑色長直髮、皮膚白皙、白色襯衫綁帶露腰+深藍色短裙、清純學生妹型" }
    ]
  },
  {
    id: "sweet", name: "Sweet Bar 🍬", area: "Soi 6", type: "bar",
    lat: 12.9425487, lng: 100.8858888, rating: 3,
    girls: [
      { name: "Amporn (อัมพร)", age: 25, build: "豐滿・胸部大", photos: ["photos/sweet-bar-amporn.jpg"],
        tag: "⭐", desc: "棕色長髮、皮膚白皙、白色比基尼上衣、鄰家甜美型、笑容超自然",
        hours: "2026年3月起" },
      { name: "辮子水手妹", photos: ["photos/sweet-bar-sailor.jpg"], tag: "🔥 新",
        build: "纖細有曲線・臀部翹", desc: "黑色長髮雙辮子、膚色健康偏深、水手服白+深藍色露腰、活潑運動型、笑容超燦爛" }
    ],
    contact: "IG: sweetbarsoi6"
  },
  {
    id: "wet-six", name: "Wet Six", area: "Soi 6", type: "bar",
    lat: 12.9426370, lng: 100.8856700, rating: 3,
    girls: [
      { name: "Porntip (พรทิพย์)", age: 22, build: "纖細勻稱", photos: ["photos/wet-six-porntip.jpg"],
        tag: "⭐", desc: "黑色長髮、臉蛋精緻、黑色透視蕾絲連身裙（開衩高）、優雅性感型",
        hours: "2026年2月起" }
    ]
  },
  {
    id: "utopia", name: "Utopia", area: "Soi 6", type: "bar",
    lat: 12.9425892, lng: 100.8854905, rating: 4,
    theme: "護士裝主題",
    girls: [
      { name: "Snow (สโนว์)", age: 20, build: "纖細勻稱・腰細", photos: ["photos/utopia-snow.jpg"],
        tag: "⭐ 超嫩", desc: "黑色長直髮、膚色健康偏深、白色護士裝露腰（紅十字）+白短裙、陽光甜美型",
        hours: "2026年2月起" }
    ]
  },
  {
    id: "miyu", name: "MIYU Bar", area: "Soi 6", type: "bar",
    lat: 12.9427, lng: 100.8854, rating: 5,
    contact: "IG: miyubarsoi6",
    note: "這家店超有料！四個妹妹都值得認識",
    girls: [
      { name: "MIND", photos: ["photos/miyu-bar-mind-faye.jpg"], tag: "⭐",
        desc: "短髮黑色 Bob 頭、水手服造型、可愛風格" },
      { name: "FAYE", photos: ["photos/miyu-bar-mind-faye.jpg"], tag: "⭐",
        desc: "長髮棕色、水手服露肚裝、笑容甜美" },
      { name: "FUEANG", desc: "很會撩 😏 有點騷" },
      { name: "NOMSOD", photos: ["photos/miyu-bar-nomsod.jpg"], tag: "⭐",
        desc: "短髮齊肩 Bob、紅色比基尼、十字架項鍊、鄰家女孩型" },
      { name: "NAJA", photos: ["photos/miyu-bar-naja-nan.jpg"], tag: "⭐ 新",
        desc: "黑色長直髮齊瀏海、螢光黃露腰（潑水節）、清新可愛型" },
      { name: "NAN", photos: ["photos/miyu-bar-naja-nan.jpg"],
        desc: "棕色長髮、螢光黃網狀上衣、較成熟風格" },
      { name: "Hazel", photos: ["photos/miyu-bar-hazel-ham.jpg"], tag: "新",
        desc: "黑色長髮、皮膚白皙、黑色旗袍風連身裙（中式風格）、纖細、優雅神秘型" },
      { name: "Ham", photos: ["photos/miyu-bar-hazel-ham.jpg"], tag: "新",
        build: "豐滿", desc: "金色/淺橘色長髮、笑容甜美、黑白女僕裝蓬蓬裙、可愛女僕型" },
      { name: "Pinploy", tag: "⭐ 新", photos: ["photos/miyu-pinploy.jpg"],
        desc: "棕色長直髮、皮膚白皙、臉蛋很正、深藍色水手風制服、豐滿、清純自然型" }
    ]
  },
  {
    id: "envy", name: "Envy Bar", area: "Soi 6", type: "bar",
    lat: 12.9427454, lng: 100.8853430, rating: 5,
    theme: "🚔 警察制服主題",
    note: "⭐⭐⭐ 六巷尾巴。Natt 金髮妹可能 30 號離職",
    girls: [
      { name: "警察妹 #1 🔥", photos: ["photos/envy-bar-police1.jpg"],
        desc: "黑色長髮、警察制服、網狀黑絲襪、手臂紋身" },
      { name: "警察妹 #2 🔥", photos: ["photos/envy-bar-police2.jpg"],
        desc: "棕色長髮帶高光、警察制服、性感坐姿" },
      { name: "黑洋裝妹", photos: ["photos/envy-bar-dress.jpg"],
        desc: "超長黑色直髮齊瀏海、黑色緊身短洋裝" }
    ]
  },
  {
    id: "avarice", name: "Avarice", area: "Soi 6", type: "bar",
    lat: 12.9427764, lng: 100.8852725, rating: 5,
    note: "Cash Only 💰，四個妹四種風格",
    girls: [
      { name: "Fang (แฟง)", age: 29, build: "豐滿・胸部很大 🔥", photos: ["photos/avarice-fang.jpg"],
        tag: "⭐", desc: "金色長髮、黑色比基尼、辣妹型氣場強、手臂紋身", hours: "2026年3月起" },
      { name: "Pueng (เปิ้ง)", age: 27, build: "豐滿・臀部好 🔥", photos: ["photos/avarice-pueng.jpg"],
        tag: "⭐", desc: "黑色長髮、水手服造型（深藍+白條紋）、甜美性感型、手臂大面積紋身", hours: "2026年3月起" },
      { name: "Ink (อิ๊งค์)", age: 20, build: "纖細・腿長", photos: ["photos/avarice-ink.jpg"],
        tag: "⭐", desc: "深棕長髮雙辮子、膚色健康偏深、阿根廷球衣+黑網襪、運動甜美型", hours: "2026年2月起" },
      { name: "Lamai (ละไม)", age: 22, build: "纖細勻稱・腿長", photos: ["photos/avarice-lamai.jpg"],
        tag: "⭐", desc: "棕色長直髮、黑色蕾絲透視睡衣風連身裙、甜美性感型", hours: "2026年3月起" }
    ]
  },
  {
    id: "miso", name: "Miso Bar", area: "Soi 6", type: "bar",
    lat: 12.9426842, lng: 100.8851922, rating: 5,
    note: "⭐⭐⭐ 三個妹身材都超好！藍色霓虹燈",
    girls: [
      { name: "Ploy", photos: ["photos/miso-bar-ploy.jpg"], tag: "⭐ 很不錯",
        build: "豐滿性感・胸部很大", desc: "棕色長髮微卷、白色蕾絲露胸上衣、妝容精緻性感" },
      { name: "Cos", photos: ["photos/miso-bar-cos.jpg"], tag: "⭐ 很可愛",
        build: "豐滿", desc: "長直黑髮、白色露肩綁帶上衣、笑容甜美" },
      { name: "Maprang (มะปราง)", age: 25, build: "豐滿・胸部很大 🔥", photos: ["photos/miso-bar-maprang.jpg"],
        tag: "⭐ 新", desc: "棕色長髮、白色鏤空露腰+白短裙、腰鏈、甜美性感型", hours: "2026年3月起" }
    ]
  },
  {
    id: "omega", name: "Omega Bar", area: "Soi 6", type: "bar",
    lat: 12.9427, lng: 100.8856, rating: 3,
    girls: [
      { name: "紋身妹", photos: ["photos/omega-bar-girl.jpg"], tag: "⭐",
        build: "中等・曲線好",
        desc: "長直棕黑髮、太陽眼鏡戴頭上、白色露臍水手領+紫格短裙、手臂腿部泰式紋身、酷女孩風格" }
    ]
  },

  {
    id: "sigon", name: "Sigon Girl Bar", area: "Soi 6", type: "bar",
    lat: 12.9422, lng: 100.8870, rating: 3,
    contact: "IG: sigon.girl.bar.soi6",
    girls: [
      { name: "紋身妹", photos: ["photos/sigon-tattoo.jpg"], tag: "⭐",
        desc: "黑色長直髮、皮膚白皙、白色蕾絲細肩帶連身裙、手臂大面積彩色紋身（花卉）、性感個性型" },
      { name: "紫色制服妹", tag: "新", photos: ["photos/sigon-purple.jpg"],
        desc: "棕色長髮、膚色健康偏深、戴牙套、紫色 SIGON GIRL 制服綁帶式+黑色短褲、曲線好臀部翹、活潑陽光型" },
      { name: "白色蕾絲妹", tag: "新", photos: ["photos/sigon-white-lace.jpg"],
        desc: "黑色長直髮、皮膚白皙、戴牙套、白色蕾絲透視連身裙、纖細、清純小性感型" }
    ]
  },
  {
    id: "monkey-banana", name: "Monkey Banana", area: "Soi 6", type: "bar",
    lat: 12.9423, lng: 100.8865, rating: 3,
    contact: "IG: monkeybananapattaya",
    girls: [
      { name: "日系妹", photos: ["photos/monkey-banana-girl.jpg"], tag: "⭐",
        desc: "金色/淺色短髮、豹紋露背上衣+黑色短裙、纖細、日系可愛型" }
    ]
  },
  {
    id: "helicopter", name: "Helicopter Bar", area: "Soi 6", type: "bar",
    lat: 12.9424, lng: 100.8862, rating: 4,
    contact: "IG: helicopterbarsoi6",
    girls: [
      { name: "Chompoo", photos: ["photos/helicopter-chompoo.jpg"], tag: "⭐",
        desc: "黑色長直髮、笑容甜、啦啦隊服（CHEERS）紅黑色、纖細、運動甜美型" },
      { name: "水槍妹", build: "豐滿・胸部大", photos: ["photos/helicopter-watergirl.jpg"], tag: "🔥",
        desc: "淺棕色/金色長髮、格子比基尼（潑水節）" }
    ]
  },
  {
    id: "nymphoz", name: "Nymphoz", area: "Soi 6", type: "bar",
    lat: 12.9425, lng: 100.8857, rating: 4,
    contact: "IG: nymphoz_soi6",
    girls: [
      { name: "紅髮妹", photos: ["photos/nymphoz-redhair.jpg"], tag: "⭐",
        desc: "紅色短髮 Bob 頭、黑白露肩連身短裙、腿很長、酷辣型" },
      { name: "粉紅比基尼妹", build: "臀部超翹 🔥", photos: ["photos/nymphoz-pink.jpg"], tag: "🔥",
        desc: "黑色長髮、膚色健康偏深、粉紅露背綁帶比基尼、笑容超甜" },
      { name: "黑色短褲妹", photos: ["photos/nymphoz-black.jpg"],
        desc: "淺色長髮齊瀏海、黑色背心+短褲、纖細、暗黑酷女孩" }
    ]
  },
  {
    id: "fire", name: "Fire Bar 🔥", area: "Soi 6", type: "bar",
    lat: 12.9424, lng: 100.8864, rating: 5,
    note: "四個妹四種風格！有撞球桌",
    girls: [
      { name: "Ice", photos: ["photos/fire-bar-ice.jpg"],
        desc: "黑色長髮、皮膚白皙、灰色透視蕾絲上衣+牛仔短褲、豐滿年輕嫩妹、清純小性感型" },
      { name: "Noona", photos: ["photos/fire-bar-noona.jpg"], tag: "⭐⭐ 顏值最高",
        build: "纖細・腿長", desc: "超長棕色直髮、皮膚白皙、灰色學生制服風（領帶+短裙）、甜美學生妹型" },
      { name: "Ket", build: "超豐滿・胸部很大 🔥🔥", photos: ["photos/fire-bar-ket.jpg"], tag: "🔥 身材最猛",
        desc: "黑色中長髮、黑色蕾絲長袖深V上衣、成熟性感型、撞球桌上很有味道" },
      { name: "Whan", build: "曲線超好・臀部翹", photos: ["photos/fire-bar-whan.jpg"], tag: "⭐ 最有特色",
        desc: "黑色長髮、黑框眼鏡、貓耳頭飾、紅色蕾絲連身裙、眼鏡娘+貓女型、手臂紋身" }
    ]
  },

  // ============ Walking Street ============
  {
    id: "fahrenheit", name: "Fahrenheit A Go Go", area: "Walking Street", type: "agogo",
    lat: 12.9266301, lng: 100.8736810, rating: 4,
    address: "Walking St, Pattaya City, Bang Lamung District, Chon Buri 20150",
    note: "小間但超近距離看表演！約30座位，舞台幾乎碰到前排桌子。8個妹！",
    contact: "IG: patta.map",
    girls: [
      { name: "Aom", age: 22, desc: "黑色長髮、網狀絲襪" },
      { name: "Fern", age: 23, desc: "紅色比基尼、性感" },
      { name: "Noch", age: 21, desc: "黑色比基尼" },
      { name: "Ratchanee", age: 24, desc: "紅色比基尼、紋身" },
      { name: "Dew", age: 20, tag: "超嫩", photos: ["photos/fahrenheit-red.jpg"], desc: "年紀最小" },
      { name: "Ink", age: 22, desc: "黑色裝扮" },
      { name: "Sin", age: 22, desc: "紅色比基尼" },
      { name: "June", age: 25, desc: "紅色比基尼、手臂大面積紋身" }
    ]
  },
  {
    id: "sapphire", name: "Sapphire Club", area: "Walking Street", type: "agogo",
    lat: 12.9262016, lng: 100.8738326, rating: 4,
    address: "175/40-41 Moo 10 Walking St, Pattaya City, Chon Buri 20150",
    contact: "FB: SapphirePattaya",
    note: "老牌 GoGo Bar，可以跟 Fahrenheit 一起逛",
    girls: [
      { name: "Mild (มายด์)", age: 30, build: "纖細有曲線・腰很細", photos: ["photos/sapphire-mild.jpg"],
        tag: "⭐", desc: "深棕色長髮、紅唇、鎖骨紋身、青綠色蕾絲比基尼、性感女神型、專業 GoGo 舞者",
        hours: "2026年2月起" },
      { name: "Mint 🏆", tag: "🏆 冠軍", photos: ["photos/sapphire-bikini-mafia.jpg"],
        desc: "Thai Bikini Mafia Season 10 冠軍！黑色比基尼+金色腰帶" },
      { name: "Oil 🥈", tag: "🥈 亞軍", photos: ["photos/sapphire-bikini-mafia.jpg"],
        desc: "Thai Bikini Mafia 亞軍！金色比基尼、金髮、全身大面積紋身" },
      { name: "Sapphire Sweeties", photos: ["photos/sapphire-sweeties.jpg"],
        desc: "藍色比基尼雙人組、身材超好" },
      { name: "黑色鏤空妹", build: "豐滿・胸部大 🔥", photos: ["photos/sapphire-masquerade.jpg"],
        desc: "棕金色長髮、笑容超甜、黑色鏤空比基尼、肩膀紋身（潑水節 Masquerade 特別場 4/17）" },
      { name: "束帶妹", tag: "新", photos: ["photos/sapphire-strap.jpg"],
        desc: "棕色長髮、笑容自信、黑色交叉束帶連身比基尼鏤空設計、纖細有曲線、性感派對型" },
      { name: "皮革女王", tag: "🔥 XXXposure", photos: ["photos/sapphire-leather.jpg"],
        build: "豐滿・胸部大", desc: "深棕色長髮、紅唇妝容精緻、黑色皮革連身裙深V+網狀絲襪+長靴、暗黑女王型氣場爆棚" }
    ]
  },
  {
    id: "xs", name: "XS Pattaya", area: "Walking Street", type: "agogo",
    lat: 12.9266686, lng: 100.8737183, rating: 5,
    address: "113 2 Walking St, Pattaya City, Bang Lamung District, Chon Buri 20150",
    note: "⭐⭐⭐ 很頂！阿峰老師強推！",
    girls: [
      { name: "Jaa (จ๋า)", age: 22, build: "超好・臀部翹曲線完美 🔥🔥🔥", photos: ["photos/xs-jaa.jpg"],
        tag: "⭐⭐ 超正", desc: "黑色長直髮、笑容甜、黑比基尼+網狀絲襪+黑長手套、性感辣妹型、背部手臂大面積紋身",
        hours: "2026年3月起" }
    ]
  },
  {
    id: "chick", name: "Chick Gogo Club", area: "Walking Street", type: "agogo",
    lat: 12.9267076, lng: 100.8737665, rating: 4,
    address: "109 Moo 10, Nongprue, Pattaya City, Bang Lamung District, Chon Buri 20150",
    contact: "IG: chickclubpattaya",
    note: "暗黑束帶風格 GoGo Bar！FELINE TEMPTRESS 貓女主題",
    girls: [
      { name: "#517 貓女妹", tag: "🔥 暗黑辣妹", photos: ["photos/chick-517.jpg"],
        desc: "淺棕金色長髮、紅色比基尼+黑色皮革束帶（心形鏈條）、紅色 choker、手臂大面積彩色紋身、纖細有曲線、BDSM 風格" },
      { name: "紅色戰士妹", tag: "⭐ 可愛戰士", photos: ["photos/chick-red-warrior.jpg"],
        desc: "黑色長髮、笑容甜美、紅色面罩+紅色手套+黑色比基尼+紅色交叉束帶、格鬥/摔角風格" },
      { name: "鎖鏈紋身妹", tag: "🔥 暗黑女王", photos: ["photos/chick-chain-queen.jpg"],
        desc: "棕色長直髮馬尾、臉蛋精緻、黑色蕾絲比基尼+皮革束帶+鎖鏈裝飾、手臂大面積紋身、纖細有曲線、氣場超強" },
      { name: "紅色制服妹×2", tag: "Tuesday Night", photos: ["photos/chick-tuesday.jpg"],
        desc: "紅黑色賽車風統一制服（LOVE SAID 字樣）、一甜美一成熟" }
    ]
  },
  {
    id: "iron", name: "Iron Club 🔥", area: "Walking Street", type: "agogo",
    lat: 12.9266007, lng: 100.8733075, rating: 5,
    theme: "暗黑風格・鏈條・修女裝",
    girls: [
      { name: "Thanika (ธนิกา)", age: 27, build: "超豐滿・胸部超大臀部翹", photos: ["photos/iron-club-thanika.jpg"],
        tag: "⭐⭐ 超猛", desc: "深棕色短髮 Bob、妝容精緻、黑色修女風比基尼（十字架裝飾）、暗黑性感型",
        hours: "2026年3月起" },
      { name: "Nid (นิด)", age: 21, build: "纖細曲線好・臀部翹 🔥", photos: ["photos/iron-club-nid.jpg"],
        tag: "⭐", desc: "紅色長髮！超搶眼、紅色比基尼套裝、鏈條裝飾、叛逆辣妹型", hours: "2026年3月起" },
      { name: "Aom (อ้อม)", age: 28, build: "纖細勻稱", photos: ["photos/iron-club-aom.jpg"],
        tag: "⭐", desc: "深棕色長直髮、臉蛋清純漂亮、暗色系+鏈條、清純反差型臉蛋超正", hours: "2026年3月起" }
    ]
  },
  {
    id: "shark", name: "Shark A-Gogo", area: "Walking Street", type: "agogo",
    lat: 12.9264235, lng: 100.8733203, rating: 3,
    address: "496/2-3,12-13 Bang Lamung District, Chon Buri 20150",
    note: "待探索",
    girls: []
  },
  {
    id: "atmos", name: "Atmos Pattaya", area: "Walking Street", type: "agogo",
    lat: 12.9264215, lng: 100.8730370, rating: 4,
    girls: [
      { name: "Snow (สโนว์)", age: 20, build: "纖細勻稱", photos: ["photos/atmos-snow.jpg"],
        tag: "⭐", desc: "棕色長髮、皮膚白皙、清純臉蛋、黑色蕾絲內衣套裝（吊帶襪）、清純反差型、肩膀紋身+choker",
        hours: "2026年3月起" }
    ]
  },
  {
    id: "pinup", name: "Pinup Gogo", area: "Walking Street", type: "agogo",
    lat: 12.9260387, lng: 100.8726963, rating: 5,
    address: "547/18 Walking St, Pattaya City, Bang Lamung District, Chon Buri 20150",
    theme: "復古 Pin-up 風格",
    note: "⭐⭐⭐ 太可愛了！",
    girls: [
      { name: "LE7", tag: "🔥🔥 超可愛", photos: ["photos/pinup-gogo-le7.jpg"],
        desc: "黑色漸層棕色長髮、號碼 LE7、粉紅色比基尼（Pinup 品牌）+金色鏈條、笑容超甜、肚臍上方小紅紋身" },
      { name: "Lek (เล็ก)", age: 27, build: "超好・曲線完美臀部翹", photos: ["photos/pinup-lek.jpg"],
        tag: "⭐", desc: "深棕色長髮、笑容甜美、皮膚白皙、紅色比基尼套裝（Pin Up 風）、性感可愛型、手臂大腿紋身",
        hours: "2026年3月起" }
    ]
  },
  {
    id: "republic", name: "Republic Club 🎉", area: "Walking Street", type: "club",
    lat: 12.9255324, lng: 100.8723632, rating: 4,
    address: "131/4 Soi JP (Walking Street), Pattaya City, Banglamung, Chon Buri 20150",
    note: "指定要去的夜店 — 適合跟女孩一起去玩",
    girls: []
  },
  {
    id: "identi", name: "Identi", area: "Walking Street", type: "agogo",
    lat: 12.9268, lng: 100.8740, rating: 3,
    girls: [
      { name: "Busaba (บุษบา) #325", age: 22, build: "豐滿有曲線", photos: ["photos/identi-busaba.jpg"],
        tag: "⭐", desc: "棕色長髮齊瀏海、笑容超燦爛、紅唇、藍色亮面比基尼（#325）、甜美活潑型、有鋼管舞",
        hours: "2026年3月起" }
    ]
  },
  {
    id: "suns", name: "SUN'S Club", area: "Walking Street", type: "club",
    lat: 12.9252106, lng: 100.8707185, rating: 4,
    note: "跟 Republic Club 可以一起逛",
    girls: [
      { name: "Tuk (ตุ๊ก)", age: 30, build: "曲線超好・臀部翹 🔥", photos: ["photos/suns-club-tuk.jpg"],
        tag: "⭐", desc: "深棕長髮馬尾、太陽眼鏡戴頭上、紅唇、黑色露背連身短裙（鑲鑽）、派對女王型氣場強",
        hours: "2026年3月起" }
    ]
  },

  // ============ LK Metro ============
  {
    id: "las-vegas", name: "Las Vegas Agogo", area: "LK Metro", type: "agogo",
    lat: 12.930277, lng: 100.8846385, rating: 4,
    address: "33/126 LK Metro Aly, Pattaya City, Bang Lamung District, Chon Buri 20150",
    girls: [
      { name: "581", tag: "🔥 指定", desc: "上次認識的，指定要找" }
    ]
  },
  {
    id: "sugar-sugar", name: "Sugar Sugar Agogo", area: "LK Metro", type: "agogo",
    lat: 12.929558, lng: 100.885235, rating: 5,
    address: "Red Light District, LK Metro Aly, Pattaya City, Bang Lamung District, Chon Buri 20150",
    note: "3,877 觀看！天使雙人組超高人氣",
    girls: [
      { name: "天使妹 #66", tag: "⭐", photos: ["photos/sugar-sugar-angels.jpg"],
        desc: "棕色長髮、笑容甜、白色比基尼+白色網狀絲襪+天使頭飾、鎖骨紋身、甜美型" },
      { name: "天使妹（白）", photos: ["photos/sugar-sugar-angels.jpg"],
        desc: "淺棕色長髮、皮膚白皙、白色比基尼+黑色網狀絲襪+天使頭飾、纖細清純型" }
    ]
  },

  {
    id: "tomcats", name: "Tomcats", area: "Soi 6", type: "bar",
    lat: 12.9423, lng: 100.8866, rating: 5,
    contact: "IG: tomcatspattayasoi6",
    note: "被 Offshore Bar IG 轉發！阿峰老師最愛 ⭐",
    girls: [
      { name: "蛇紋超模妹", tag: "⭐⭐ 最愛！身材超猛", photos: ["photos/tomcats-snake.jpg"],
        build: "超高170+・腿超長・曲線完美 🔥🔥🔥",
        desc: "黑色長直髮、膚色健康偏深、銀灰色蛇紋比基尼、超模型像維密天使" }
    ]
  },
  {
    id: "kimochi", name: "Kimochi Bar 🔥", area: "Soi 6", type: "bar",
    lat: 12.9425, lng: 100.8859, rating: 5,
    contact: "IG: kimochibarpattaya",
    note: "阿峰老師最愛 ⭐ Yu + Aommy 顏值都頂級！",
    girls: [
      { name: "Yu", tag: "⭐⭐ 最愛！顏值頂級", photos: ["photos/kimochi-yu.jpg"],
        desc: "淺棕色長髮、皮膚超白皙、黑色蕾絲旗袍風連身裙（中式立領+露背）、纖細鎖骨美、手腕胸口小紋身、優雅性感型" },
      { name: "Aommy", tag: "⭐ 超正", photos: ["photos/kimochi-aommy.jpg"],
        desc: "黑色長直髮、皮膚超白皙、紅色碎花和服風睡袍（深V）、纖細、清純甜美型" }
    ]
  },
  {
    id: "toybox", name: "Toybox", area: "Soi 6", type: "bar",
    lat: 12.9424, lng: 100.8860, rating: 3,
    contact: "IG: toybox_soi6",
    note: "紅+黑色調裝潢，比一般 Soi 6 bar 高級",
    girls: [
      { name: "黑色蕾絲妹", tag: "⭐", photos: ["photos/toybox-lace.jpg"],
        desc: "黑色中長髮、皮膚白皙、笑容甜美、黑色蕾絲內衣風上衣（蝴蝶結）+黑色短褲、纖細腿長、甜美小性感型" }
    ]
  },
  {
    id: "eve", name: "EVE GoGo Club", area: "LK Metro", type: "agogo",
    lat: 12.9305, lng: 100.8848, rating: 3,
    contact: "IG: evegogoclub",
    note: "LK Metro 新發現的 GoGo Bar！",
    girls: [
      { name: "紅比基尼妹", tag: "🔥", photos: ["photos/eve-red-bikini.jpg"],
        build: "豐滿・胸部大",
        desc: "黑色長直髮、皮膚白皙、紅色綁帶比基尼、性感可愛型" }
    ]
  },

  {
    id: "topgun", name: "Top Gun Agogo", area: "Walking Street", type: "agogo",
    lat: 12.9265, lng: 100.8735, rating: 4,
    contact: "IG: topgun.agogo",
    girls: [
      { name: "鋼管舞雙人組", tag: "🔥", photos: ["photos/topgun-pole.jpg"],
        desc: "粉紅綁帶比基尼×2、透明高跟鞋（鋼管舞專用）、都有紋身、身材超好臀部翹" }
    ]
  },
  {
    id: "maggie-choo", name: "Maggie Choo's 🔥", area: "Soi 6", type: "bar",
    lat: 12.9424, lng: 100.8863, rating: 5,
    contact: "Twitter: @MaggiChoosPattaya",
    note: "Twitter 1,770 則貼文！超活躍，Cash Only 💰",
    girls: [
      { name: "白色比基尼妹", photos: ["photos/maggie-choo-white.jpg"],
        build: "豐滿・胸部大", desc: "棕色長髮齊瀏海、皮膚白皙、白色比基尼+白色短褲、鎖骨紋身、清純性感型" },
      { name: "黑粉比基尼妹", photos: ["photos/maggie-choo-black-pink.jpg"],
        desc: "棕色長髮、黑色比基尼上衣+粉紅褲、纖細腰細、甜美性感型" },
      { name: "金髮亮片妹", tag: "🔥", photos: ["photos/maggie-choo-gold.jpg"],
        build: "超豐滿・胸部很大", desc: "金色短髮、黑色亮片比基尼+粉色褲、肚臍紋身、辣妹型、285觀看" },
      { name: "紅色比基尼妹", tag: "⭐ 人氣最高", photos: ["photos/maggie-choo-red.jpg"],
        desc: "棕色長髮、臉蛋超正、紅色比基尼、纖細有曲線、清純性感型、438觀看" }
    ]
  },

  // ============ 其他 ============
  {
    id: "heaven-above", name: "Heaven Above", area: "Soi Buakhao", type: "bar",
    lat: 12.9342, lng: 100.8779, rating: 4,
    note: "高級 Lounge Bar 風格！深藍皮革沙發+藍色燈光",
    girls: [
      { name: "成熟妹", photos: ["photos/heaven-above-girls.jpg"],
        desc: "棕色長髮、膚色健康偏深、棕色襯衫、Gucci 手錶、成熟型" },
      { name: "清純妹", photos: ["photos/heaven-above-girls.jpg"],
        desc: "黑色短髮、皮膚超白皙、戴牙套、白色上衣+黃色裙子、超年輕清純型" }
    ]
  },
  {
    id: "wild69", name: "The Wild 69 Bar", area: "Soi Buakhao", type: "bar",
    lat: 12.9276933, lng: 100.8832991, rating: 3,
    address: "420 15 188-189 Soi Buakhao, Nongprue, Bang Lamung, Chon Buri 20150",
    note: "Soi Buakhao 是在地人夜生活區",
    girls: [ { name: "Kimmy", tag: "⭐ 也不錯", desc: "上次認識" } ]
  },
  // ============ 住宿 ============
  {
    id: "muxa", name: "🏨 MUXA 中心海景公寓", area: "Soi 6", type: "hotel",
    lat: 12.939593, lng: 100.888267,
    address: "268 Thanon Pattayasaisong (Pattaya Second Road), 20150 芭達雅中心",
    rating: 5,
    note: "4/24-4/27（3晚）已訂！1房1廳+廚房，TWD 3,375。訂單號：1616329598027929。泳池/三溫暖/健身房。就在 Soi 6 旁邊，走路就到！",
    girls: []
  },
  {
    id: "hotel-tbd", name: "🏨 4/27-5/4 住宿（未訂）", area: "Soi 6", type: "hotel",
    lat: 12.9398, lng: 100.8885,
    note: "⚠️🔴 7 晚還沒訂！趕快訂！",
    girls: []
  },

  {
    id: "bunny", name: "Bunnyz Bar 🐰", area: "Soi Buakhao", type: "bar",
    lat: 12.9290, lng: 100.8817, rating: 4,
    address: "548 Soi Made In Thailand, Pattaya City, Bang Lamung District, Chon Buri 20150",
    note: "Soi Made In Thailand 上的 beer bar，有撞球桌",
    girls: [
      { name: "Dao (ดาว)", age: 21, build: "纖細有曲線・鎖骨美", photos: ["photos/bunny-bar-dao.jpg"],
        tag: "⭐", desc: "淺金/棕色長髮、膚色健康偏深、黑色深V連身裙、時尚成熟型氣場強",
        hours: "2026年2月起" },
      { name: "Cream (ครีม)", age: 24, build: "豐滿性感・胸部大 🔥", photos: ["photos/bunny-bar-cream.jpg"],
        tag: "⭐", desc: "黑色長髮中分、五官立體、銀色亮片深V連身裙、性感女神型",
        hours: "2026年2月起" }
    ]
  }
];

window.TYPE_META = {
  bar:   { label: "Beer Bar", color: "#3b82f6", icon: "🍺" },
  agogo: { label: "Gogo Bar", color: "#ef4444", icon: "💃" },
  club:  { label: "Nightclub", color: "#a855f7", icon: "🎉" },
  hotel: { label: "住宿", color: "#f59e0b", icon: "🏨" }
};

window.AREA_META = {
  "Soi 6":          { color: "#3b82f6" },
  "Walking Street": { color: "#ef4444" },
  "LK Metro":       { color: "#10b981" },
  "Soi Buakhao":    { color: "#f59e0b" },
  "南芭提雅":        { color: "#a855f7" }
};
