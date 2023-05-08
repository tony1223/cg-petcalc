import {parse} from "../data/parse.mjs";

const Pts =
    [[1, "虎人", 0, 22, 26, 17, 19, 16, 0.2, 7], [2, "貓妖", 0, 19, 24, 17, 28, 17, 0.2, 7], [3, "羅剎", 0, 24, 25, 14, 22, 20, 0.2, 3], [4, "貓人", 0, 23, 27, 15, 26, 14, 0.2, 5], [5, "惡魔貓", 0, 21, 23, 12, 27, 22, 0.2, 3], [6, "妖狐", 0, 18, 30, 11, 25, 26, 0.2, 5], [7, "穴熊", 0, 34, 34, 19, 19, 14, 0.2, 8], [8, "赤熊", 0, 35, 36, 15, 20, 14, 0.2, 8], [9, "北極熊", 0, 36, 33, 22, 18, 11, 0.2, 2], [10, "赤目黑熊", 0, 33, 35, 14, 22, 16, 0.2, 2], [11, "貓熊", 0, 32, 40, 18, 17, 18, 0.2, 5], [12, "大地鼠", 0, 6, 13, 20, 26, 35, 0.2, 10], [13, "惡夢鼠", 0, 4, 8, 18, 33, 37, 0.2, 10], [14, "火焰鼠", 0, 7, 12, 15, 34, 32, 0.2, 10], [15, "寶石鼠", 0, 7, 7, 22, 27, 37, 0.2, 10], [16, "水藍鼠", 0, 11, 15, 28, 28, 33, 0.2, 5], [17, "鼠王", 0, 15, 7, 19, 32, 42, 0.2, 5], [18, "地獄看門犬", 0, 26, 36, 12, 23, 18, 0.2, 6], [19, "巨狼", 0, 22, 37, 11, 25, 20, 0.2, 6], [20, "地獄獵犬", 0, 24, 35, 19, 22, 15, 0.2, 6], [21, "地獄妖犬", 0, 23, 40, 13, 21, 18, 0.2, 6], [22, "殭屍", 1, 37, 32, 12, 12, 12, 0.2, 6], [23, "喪屍", 1, 35, 34, 7, 15, 14, 0.2, 6], [24, "食屍鬼", 1, 32, 32, 17, 7, 17, 0.2, 6], [25, "腐屍", 1, 42, 37, 12, 7, 7, 0.2, 6], [26, "木乃伊", 1, 39, 32, 14, 8, 17, 0.2, 5], [27, "骷髏戰士", 1, 12, 27, 42, 12, 17, 0.2, 7], [28, "血骷髏", 1, 13, 24, 41, 10, 22, 0.2, 7], [29, "地獄骷髏", 1, 14, 30, 40, 11, 15, 0.2, 7], [30, "武裝骷髏", 1, 9, 26, 47, 8, 20, 0.2, 7], [31, "骷髏海盜", 1, 12, 29, 45, 13, 16, 0.2, 5], [32, "幽靈", 1, 19, 18, 31, 20, 27, 0.2, 2], [33, "鬼靈", 1, 9, 21, 27, 25, 33, 0.2, 8], [34, "亡靈", 1, 14, 27, 30, 15, 29, 0.2, 2], [35, "死靈", 1, 10, 28, 32, 17, 28, 0.2, 8], [36, "小石像怪", 2, 16, 21, 11, 31, 26, 0.2, 5], [37, "使魔", 2, 21, 20, 15, 27, 27, 0.3, 7], [38, "水藍鳥魔", 2, 22, 23, 10, 25, 25, 0.2, 3], [39, "小惡魔", 2, 21, 20, 9, 25, 30, 0.2, 3], [40, "迷你石像怪", 2, 23, 19, 10, 24, 29, 0.2, 3], [41, "丘比特", 2, 12, 22, 7, 37, 37, 0.2, 5], [42, "石像怪", 2, 14, 30, 32, 22, 22, 0.2, 1], [43, "血魔", 2, 13, 31, 26, 25, 25, 0.2, 1], [44, "墮天使", 2, 11, 28, 28, 27, 26, 0.2, 1], [45, "惡魔", 2, 10, 27, 26, 26, 31, 0.2, 1], [46, "小蝙蝠", 2, 11, 26, 16, 31, 21, 0.3, 6], [47, "掃把蝙蝠", 2, 13, 28, 12, 29, 18, 0.2, 6], [48, "迷你蝙蝠", 2, 11, 26, 20, 27, 16, 0.2, 6], [49, "水果蝙蝠", 2, 17, 25, 15, 26, 17, 0.2, 6], [50, "惡魔蝙蝠", 2, 13, 34, 10, 29, 24, 0.2, 8], [51, "天使蝙蝠", 2, 9, 22, 12, 37, 30, 0.2, 8], [52, "大蝙蝠", 2, 23, 28, 23, 28, 13, 0.2, 7], [53, "巨蝙蝠", 2, 27, 30, 22, 24, 12, 0.2, 3], [54, "海蝙蝠", 2, 18, 29, 27, 30, 11, 0.2, 3], [55, "胖蝙蝠", 2, 25, 24, 20, 26, 20, 0.2, 7], [56, "兔耳蝙蝠", 2, 21, 26, 18, 31, 14, 0.2, 5], [57, "藍蠍", 3, 20, 27, 47, 13, 8, 0.2, 9], [58, "紅蠍", 3, 19, 28, 42, 19, 7, 0.2, 9], [59, "黃蠍", 3, 20, 30, 43, 12, 10, 0.2, 9], [60, "殺手蠍", 3, 30, 29, 38, 11, 7, 0.2, 9], [61, "殺人蜂", 3, 12, 37, 12, 37, 12, 0.2, 5], [62, "異型蜂", 3, 14, 33, 11, 35, 17, 0.2, 5], [63, "虎頭蜂", 3, 13, 40, 8, 38, 11, 0.2, 3], [64, "黃蜂", 3, 10, 38, 13, 43, 6, 0.2, 7], [65, "死亡蜂", 3, 7, 39, 15, 41, 8, 0.2, 7], [66, "螳螂", 3, 16, 44, 22, 27, 11, 0.2, 4], [67, "殺人螳螂", 3, 12, 45, 20, 26, 17, 0.2, 4], [68, "赤目螳螂", 3, 14, 44, 19, 29, 14, 0.2, 4], [69, "死灰螳螂", 3, 15, 40, 17, 33, 15, 0.2, 5], [70, "致命螳螂", 3, 20, 43, 18, 27, 12, 0.2, 4], [71, "土蜘蛛", 3, 26, 15, 18, 23, 23, 0.2, 10], [72, "水蜘蛛", 3, 24, 16, 17, 20, 28, 0.2, 10], [73, "火蜘蛛", 3, 22, 22, 16, 25, 20, 0.2, 10], [74, "風蜘蛛", 3, 25, 28, 15, 19, 18, 0.2, 10], [75, "樹精", 4, 32, 17, 32, 12, 17, 0.2, 4], [76, "死亡樹精", 4, 28, 20, 37, 9, 16, 0.2, 6], [77, "黃金樹精", 4, 38, 22, 28, 10, 17, 0.2, 6], [78, "慘白樹精", 4, 29, 16, 28, 17, 20, 0.2, 3], [79, "冰冷樹精", 4, 30, 15, 27, 16, 22, 0.2, 7], [80, "沼澤樹精", 4, 31, 14, 29, 15, 21, 0.2, 7], [81, "妖草", 4, 26, 11, 16, 16, 36, 0.2, 8], [82, "蔓陀羅草", 4, 25, 13, 14, 15, 38, 0.2, 5], [83, "妖花", 4, 27, 12, 12, 19, 35, 0.2, 5], [84, "人魔草", 4, 22, 17, 11, 14, 41, 0.2, 8], [85, "綠色口臭鬼", 4, 38, 23, 16, 15, 23, 0.2, 1], [86, "黃色口臭鬼", 4, 37, 27, 18, 11, 22, 0.2, 9], [87, "藍色口臭鬼", 4, 35, 25, 15, 18, 27, 0.2, 9], [88, "紅色口臭鬼", 4, 44, 21, 14, 12, 29, 0.2, 1], [89, "兇暴仙人掌", 4, 27, 29, 22, 12, 20, 0.2, 5], [90, "武術仙人掌", 4, 24, 32, 27, 10, 17, 0.2, 5], [91, "兔耳仙人掌", 4, 28, 35, 19, 14, 14, 0.2, 5], [92, "印地安仙人掌", 4, 26, 36, 24, 9, 15, 0.2, 5], [93, "火焰舞者", 4, 19, 38, 18, 15, 25, 0.2, 2], [94, "史萊姆", 5, 46, 26, 11, 6, 16, 0.2, 1], [95, "液態史萊姆", 5, 49, 24, 15, 5, 12, 0.2, 1], [96, "果凍史萊姆", 5, 45, 31, 6, 10, 13, 0.2, 1], [97, "布丁史萊姆", 5, 40, 25, 12, 8, 20, 0.2, 1], [98, "火精", 5, 25, 25, 25, 25, 25, 0.2, 10], [99, "風精", 5, 25, 25, 25, 25, 25, 0.2, 10], [100, "水精", 5, 25, 25, 25, 25, 25, 0.2, 10], [101, "地精", 5, 25, 25, 25, 25, 25, 0.2, 10], [102, "頑皮炸彈", 5, 15, 15, 15, 15, 40, 0.2, 8], [103, "寶貝炸彈", 5, 14, 17, 11, 16, 42, 0.2, 8], [104, "大炸彈", 5, 12, 20, 14, 14, 40, 0.2, 8], [105, "漂浮炸彈", 5, 16, 14, 14, 17, 39, 0.2, 8], [106, "丸子炸彈", 5, 17, 17, 7, 17, 47, 0.2, 5], [107, "幻 影", 5, 20, 26, 25, 17, 32, 0.2, 10], [108, "旋律影子", 5, 24, 28, 22, 19, 27, 0.2, 10], [109, "闇影", 5, 25, 23, 23, 23, 26, 0.2, 10], [110, "陰影", 5, 28, 24, 22, 22, 24, 0.2, 10], [111, "血腥之刃", 6, 9, 39, 34, 14, 24, 0.2, 9], [112, "殺龍之刃", 6, 17, 37, 41, 11, 19, 0.2, 9], [113, "火焰之刃", 6, 10, 39, 28, 12, 31, 0.2, 9], [114, "烈風之刃", 6, 12, 44, 29, 13, 27, 0.2, 9], [115, "嚇人箱", 6, 11, 26, 26, 11, 31, 0.2, 2], [116, "兔耳嚇人箱", 6, 9, 24, 23, 16, 33, 0.2, 2], [117, "紅魔嚇人箱", 6, 12, 32, 27, 12, 27, 0.2, 5], [118, "藍魔嚇人箱", 6, 15, 37, 28, 8, 22, 0.2, 2], [119, "綠蛙嚇人 箱", 6, 13, 35, 29, 10, 23, 0.2, 2], [120, "純白嚇人箱", 6, 9, 24, 29, 11, 37, 0.2, 5], [121, "冰怪", 6, 20, 30, 46, 7, 12, 0.2, 10], [122, "石怪", 6, 15, 38, 43, 6, 13, 0.2, 10], [123, "銀怪", 6, 10, 32, 48, 8, 17, 0.2, 10], [124, "金怪", 6, 14, 41, 40, 5, 15, 0.2, 10], [125, "惡魔螃蟹", 6, 16, 32, 35, 11, 11, 0.2, 2], [126, "水晶螃蟹", 6, 18, 31, 36, 10, 10, 0.2, 8], [127, "鐵剪螃蟹", 6, 14, 34, 37, 12, 8, 0.2, 2], [128, "黃金螃蟹", 6, 22, 30, 34, 7, 12, 0.2, 8], [129, "蜥蜴戰士", 7, 22, 32, 32, 12, 12, 0.2, 3], [130, "蜥蜴鬥士", 7, 18, 37, 37, 8, 10, 0.2, 3], [131, "蜥蝪武士", 7, 20, 31, 30, 15, 14, 0.2, 3], [132, "獵豹蜥蜴", 7, 23, 36, 28, 10, 13, 0.2, 3], [133, "大地翼龍", 7, 29, 28, 32, 20, 11, 0.2, 10], [134, "寒冰翼龍", 7, 30, 30, 31, 17, 12, 0.2, 10], [135, "火焰翼龍", 7, 33, 33, 25, 16, 13, 0.2, 10], [136, "烈風翼龍", 7, 32, 30, 23, 20, 15, 0.2, 10], [137, "翼龍", 7, 32, 30, 26, 19, 18, 0.2, 5], [138, "地龍蜥", 7, 29, 34, 34, 15, 8, 0.2, 8], [139, "水龍蜥", 7, 36, 38, 34, 11, 6, 0.2, 8], [140, "火龍蜥", 7, 32, 37, 37, 12, 7, 0.2, 8], [141, "風龍蜥", 7, 35, 35, 31, 10, 9, 0.2, 8], [142, "哥布林", 8, 27, 27, 27, 17, 7, 0.2, 7], [143, "紅帽哥布林", 8, 23, 30, 29, 20, 5, 0.2, 7], [144, "火焰哥布林", 8, 22, 28, 26, 15, 14, 0.2, 7], [145, "烈風哥布林", 8, 30, 26, 24, 23, 4, 0.2, 7], [146, "巨人", 8, 38, 35, 24, 9, 14, 0.2, 10], [147, "單眼巨人", 8, 34, 34, 20, 12, 20, 0.2, 10], [148, "泰坦巨人", 8, 39, 30, 28, 8, 15, 0.2, 10], [149, "亞特拉斯巨神", 8, 37, 37, 17, 17, 12, 0.2, 10], [150, "盜賊", 8, 23, 28, 21, 31, 12, 0.2, 5], [151, "山賊", 8, 28, 27, 24, 26, 10, 0.2, 5], [152, "海盜", 8, 19, 31, 23, 28, 14, 0.2, 5], [153, "破壞 狂", 8, 27, 26, 30, 24, 8, 0.2, 5], [154, "鳥人", 8, 17, 17, 17, 37, 22, 0.2, 1], [155, "幻歌妖", 8, 15, 18, 20, 38, 19, 0.2, 1], [156, "狠毒鳥人", 8, 18, 19, 14, 39, 20, 0.2, 1], [157, "烈風鳥人", 8, 13, 20, 12, 42, 23, 0.2, 1], [158, "黑暗鳥人", 8, 19, 11, 11, 43, 31, 0.2, 5], [159, "山飛甲", 0, 27, 21, 15, 30, 27, 0.2, 4], [160, "獨角獸", 0, 17, 25, 13, 28, 37, 0.2, 4], [161, "天馬", 0, 22, 22, 12, 32, 32, 0.2, 4], [162, "麒麟", 0, 19, 27, 10, 34, 30, 0.2, 4], [163, "地底龜", 0, 22, 22, 37, 10, 19, 0.2, 5], [164, "海底龜", 0, 23, 20, 45, 4, 18, 0.2, 5], [165, "火焰龜", 0, 27, 17, 42, 7, 17, 0.2, 5], [166, "硬殼龜", 0, 26, 16, 47, 5, 16, 0.2, 5], [167, "鐮刀魔", 1, 23, 35, 18, 17, 32, 0.2, 10], [168, "暗黑僧侶", 1, 17, 37, 22, 12, 37, 0.2, 10], [169, "斬首者", 1, 19, 42, 20, 15, 29, 0.2, 10], [170, "冥界死神", 1, 25, 40, 12, 21, 27, 0.2, 10], [171, "牙骨", 1, 27, 32, 32, 12, 7, 0.2, 1], [172, " 顎牙", 1, 32, 29, 37, 7, 5, 0.2, 1], [173, "巨牙", 1, 25, 30, 27, 17, 11, 0.2, 1], [174, "利牙", 1, 30, 37, 30, 9, 4, 0.2, 1], [175, "獅鷲獸", 2, 22, 32, 12, 42, 17, 0.2, 4], [176, "變種獅鷲獸", 2, 26, 29, 15, 39, 16, 0.2, 4], [177, "布雷歐", 2, 20, 34, 9, 47, 15, 0.2, 4], [178, "依格羅斯", 2, 18, 36, 11, 44, 16, 0.2, 4], [179, "托羅帝鳥", 2, 32, 20, 13, 35, 10, 0.2, 2], [180, "岩地跑者", 2, 27, 22, 17, 32, 12, 0.2, 2], [181, "火焰啄木鳥", 2, 22, 27, 19, 29, 13, 0.2, 2], [182, "狂奔鳥", 2, 25, 24, 18, 36, 7, 0.2, 2], [183, "甲蟲", 3, 17, 37, 32, 12, 17, 0.2, 8], [184, "掘地蟲", 3, 20, 35, 36, 8, 16, 0.2, 8], [185, "鍬型蟲", 3, 15, 39, 29, 14, 18, 0.2, 8], [186, "獨角仙", 3, 18, 41, 34, 9, 14, 0.2, 8], [187, "翠綠菇", 4, 37, 12, 12, 17, 37, 0.2, 4], [188, "水藍菇", 4, 38, 15, 13, 15, 34, 0.2, 4], [189, "粉紅菇", 4, 35, 10, 15, 14, 41, 0.2, 4], [190, "星菇", 4, 40, 13, 10, 13, 39, 0.2, 4], [191, "綠煙", 5, 20, 20, 14, 25, 36, 0.2, 3], [192, "煙霧", 5, 23, 23, 8, 30, 31, 0.2, 3], [193, "煙羅", 5, 22, 22, 12, 27, 32, 0.2, 3], [194, "棉球", 5, 25, 26, 9, 25, 30, 0.2, 3], [195, "盾", 6, 15, 15, 45, 15, 30, 0.2, 4], [196, "潛盾", 6, 17, 12, 47, 12, 32, 0.2, 4], [197, "強盾", 6, 19, 13, 49, 11, 28, 0.2, 4], [198, "神盾", 6, 16, 9, 50, 8, 37, 0.2, 4], [199, "岩怪", 6, 29, 22, 40, 5, 14, 0.2, 7], [200, "爆岩", 6, 30, 20, 42, 6, 12, 0.2, 7], [201, "熔岩", 6, 32, 17, 37, 7, 17, 0.2, 7], [202, "影岩", 6, 31, 15, 32, 12, 20, 0.2, 7], [203, "希特拉", 7, 42, 42, 27, 7, 7, 0.2, 6], [204, "蛟龍", 7, 40, 44, 25, 8, 8, 0.2, 6], [205, "埃及眼鏡蛇", 7, 38, 45, 30, 6, 6, 0.2, 6], [206, "八岐大蛇", 7, 46, 46, 23, 5, 5, 0.2, 6], [207, "口袋龍", 7, 15, 34, 21, 20, 25, 0.2, 5], [208, "迷你龍", 7, 10, 35, 23, 21, 26, 0.2, 5], [209, "雛龍", 7, 12, 32, 22, 22, 27, 0.2, 5], [210, "穴龍", 7, 11, 31, 20, 25, 28, 0.2, 5], [211, "大 型半獸人", 8, 34, 25, 35, 10, 11, 0.2, 6], [212, "豬鬼", 8, 33, 28, 33, 11, 10, 0.2, 6], [213, "鋼鬼", 8, 30, 30, 30, 16, 9, 0.2, 6], [214, "半獸人", 8, 32, 27, 32, 12, 12, 0.2, 6], [215, "陸行鯊", 2, 29, 15, 36, 14, 9, 0.2, 3], [216, "沙地鯊(缺)", 2, 23, 13, 28, 23, 8, 0.2, 10], [217, "丘陵鯊(缺)", 2, 18, 8, 18, 33, 4, 0.2, 10], [218, "岩石鯊", 2, 27, 36, 7, 8, 25, 0.2, 10], [219, "雛鳥", 2, 7, 8, 5, 38, 39, 0.2, 10], [220, "鴨嘴獸(缺)", 2, 10, 23, 7, 23, 28, 0.2, 10], [221, "小鴨子", 2, 8, 14, 7, 34, 28, 0.2, 10], [222, "小兔子", 2, 11, 23, 7, 23, 28, 0.2, 10], [223, "蛋白石怪(缺)", 6, 4, 8, 23, 4, 28, 0.2, 10], [224, "紅寶石怪(缺)", 6, 11, 23, 26, 6, 33, 0.2, 6], [225, "岩蟲(缺)", 6, 28, 8, 23, 8, 23, 0.2, 2], [226, "水晶怪(缺)", 6, 18, 8, 33, 4, 43, 0.2, 10], [227, "刀雞(缺)", 0, 4, 8, 4, 23, 8, 0.2, 10], [228, "劍鴕鳥(缺)", 0, 4, 18, 8, 23, 13, 0.2, 10], [229, "大刀鴯苗(缺)", 0, 7, 38, 8, 35, 21, 0.2, 10], [230, "刀鋒阿姆鳥(缺)", 0, 4, 28, 8, 23, 23, 0.2, 10], [231, "火蜥蜴(缺)", 7, 33, 18, 18, 18, 28, 0.2, 10], [232, "毒蜥蜴(缺)", 7, 23, 8, 13, 8, 18, 0.2, 10], [233, "冰蜥蜴", 7, 26, 12, 33, 7, 27, 0.2, 10], [234, "金屬蜥蜴(缺)", 7, 18, 8, 33, 4, 28, 0.2, 10], [235, "戴靴怪", 3, 9, 9, 30, 26, 26, 0.2, 6], [236, "舞靴怪(缺)", 3, 8, 13, 31, 35, 11, 0.2, 4], [237, "潛靴怪(缺)", 3, 9, 25, 9, 34, 26, 0.2, 4], [238, "咚咚靴怪(缺)", 3, 4, 18, 23, 38, 8, 0.2, 10], [239, "大公雞(缺)", 9, 4, 38, 4, 38, 48, 0.2, 10], [240, "耶誕靴怪(缺)", 3, 7, 24, 13, 17, 7, 0.2, 10], [241, "鑽石怪(缺)", 6, 31, 9, 23, 8, 25, 0.2, 10], [242, "死神公雞", 9, 52, 52, 52, 52, 52, 0.2, 7], [243, "銀獅", 0, 18, 42, 10, 32, 5, 0.2, 3], [244, "黃銅怪", 0, 32, 21, 10, 34, 18, 0.2, 7], [245, "鐵獅", 0, 19, 40, 11, 30, 5, 0.2, 10], [246, "紅銅怪", 0, 27, 30, 13, 26, 19, 0.2, 7], [247, "跳跳地雷", 6, 31, 18, 16, 8, 33, 0.2, 10], [248, "碎碎地雷", 6, 17, 27, 37, 7, 17, 0.2, 4], [249, "皮皮地雷(缺)", 6, 14, 30, 40, 7, 14, 0.2, 6], [250, "薩普地雷(缺)", 6, 13, 28, 38, 8, 23, 0.2, 4], [251, "龍骨", 1, 7, 37, 12, 22, 27, 0.2, 5], [252, "暗黑龍骨(缺)", 1, 4, 47, 11, 12, 27, 0.2, 2], [253, "黃金龍骨", 1, 7, 42, 11, 12, 32, 0.2, 5], [255, "走路花妖", 4, 8, 39, 25, 12, 19, 0.2, 3], [256, "跑步花妖", 4, 14, 41, 16, 17, 14, 0.2, 8], [257, "舞蹈花妖", 4, 45, 14, 11, 7, 38, 0.2, 7], [258, "(未命名)(缺)", 4, 13, 38, 23, 8, 8, 0.2, 3], [261, "拉札魟怪", 2, 26, 31, 20, 24, 9, 0.2, 7], [262, "拉賈魟怪", 2, 35, 24, 13, 31, 7, 0.2, 10], [263, "烏賊怪;", 4, 29, 33, 38, 7, 8, 0.2, 6], [272, "羅查", 7, 11, 20, 25, 35, 19, 0.2, 10], [282, "潛地龍", 6, 33, 38, 33, 4, 8, 0.2, 8], [283, "布卡", 0, 27, 22, 13, 45, 8, 0.2, 9], [286, "妖化布卡", 0, 18, 15, 16, 51, 15, 0.2, 1], [291, "玫瑰粉怪", 5, 7, 23, 46, 28, 6, 0.2, 10], [300, "德魯伊之鬼", 5, 16, 12, 23, 22, 47, 0.2, 10], [303, "尤拉蝙蝠", 2, 22, 22, 22, 22, 22, 0.2, 10], [304, "歐比爾蝙蝠", 2, 22, 22, 22, 22, 22, 0.2, 10], [305, "韋伯蝙蝠", 2, 22, 22, 22, 22, 22, 0.2, 10], [306, "歐圖蝙蝠", 2, 22, 22, 22, 22, 22, 0.2, 10], [307, "愛絲波波", 5, 34, 35, 18, 19, 14, 0.2, 5], [null, "海洋元素使", null, "50", "50", "4", "17", "4", 0.2], [null, "一尾狐", null, "22", "22", "22", "22", "22", 0.2], [null, "三尾狐", null, "23", "23", "23", "23", "23", 0.2], [null, "五尾狐", null, "24", "24", "24", "24", "24", 0.2], [null, "七尾狐", null, "28", "19", "19", "19", "40", 0.2], [null, "九尾狐", null, "36", "6", "15", "21", "47", 0.2], [null, "銀狐", null, "32", "50", "14", "23", "6", 0.2], [null, "雷霆之怒", null, "27", "35", "23", "14", "15", 0.2], [null, "神聖巨龍", null, "45", "6", "14", "15", "45", 0.2], [null, "古代緋櫻長老", null, "28", "6", "17", "27", "47", 0.2], [null, "強襲地雷", null, "34", "45", "24", "12", "10", 0.2], [null, "強襲機甲LMX", null, "50", "39", "16", "14", "6", 0.2], [null, "水殼龍", null, "32", "26", "33", "17", "15", 0.2], [null, "斯巴達戰神", null, "44", "40", "23", "10", "8", 0.2], [null, "利刃勇士", null, "40", "33", "27", "15", "10", 0.2], [null, "伏葉妖精", null, "28", "39", "16", "25", "12", 0.2], [null, "閃光地雷", null, "34", "10", "24", "12", "45", 0.2], [null, "機甲G1型", null, "40", "22", "18", "35", "10", 0.2], [null, "赤甲黃尾龍", null, "17", "15", "32", "26", "33", 0.2], [null, "閃光機甲AEX", null, "41", "6", "16", "16", "46", 0.2], [null, "機甲C2型", null, "35", "40", "22", "18", "10", 0.2], [null, "土甲龍", null, "32", "15", "26", "17", "33", 0.2], [null, "大天使", null, "37", "14", "23", "12", "34", 0.2], [null, "光明天使", null, "46", "40", "14", "19", "6", 0.2], [null, "天使路西法", null, "43", "6", "12", "19", "45", 0.2], [null, "魔弓巴克達", null, "28", "48", "19", "24", "6", 0.2], [null, "魔界小惡魔", null, "27", "42", "21", "18", "12", 0.2], [null, "天界小惡魔", null, "18", "12", "21", "27", "2", 0.2], [null, "深淵小惡魔", null, "27", "12", "18", "21", "42", 0.2], [null, "地獄小惡魔", null, "42", "21", "27", "18", "12", 0.2], [null, "太陽海豚", null, "41", "6", "20", "15", "43", 0.2], [null, "地獄星", null, "32", "40", "25", "18", "10", 0.2], [null, "飛刃 螳螂", null, "31", "49", "15", "18", "12", 0.2], [null, "冥界騎士", null, "33", "48", "15", "21", "8", 0.2], [null, "冥府之主", null, "36", "6", "20", "16", "47", 0.2], [null, "玫瑰毒怪", null, "39", "43", "15", "20", "8", 0.2], [null, "烈風牛頭怪", null, "34", "33", "20", "19", "24", 0.2], [null, "烈風牛魔王", null, "15", "6", "12", "46", "46", 0.2], [null, "大地牛鬼領主", null, "50", "35", "13", "21", "6", 0.2], [null, "寒冰牛鬼領主", null, "34", "52", "13", "20", "6", 0.2], [null, "火焰牛鬼領主", null, "14", "6", "12", "48", "45", 0.2], [null, "烈風牛 鬼領主", null, "37", "6", "12", "20", "50", 0.2], [null, "聖晶獨角獸", null, "35", "6", "16", "19", "49", 0.2], [null, "冰原獨角獸", null, "31", "47", "13", "26", "8", 0.2], [null, "古代紅櫻長老", null, "35", "6", "24", "14", "46", 0.2], [null, "地鈴花妖", null, "27", "12", "14", "32", "35", 0.2], [null, "水鈴花妖", null, "32", "35", "14", "27", "12", 0.2], [null, "火鈴花妖", null, "35", "14", "33", "27", "12", 0.2], [null, "風鈴花妖", null, "32", "12", "14", "27", "35", 0.2], [null, "橘子公主", null, "37", "6", "16", "22", "44", 0.2], [null, "毒龍骨", null, "28", "37", "37", "12", "11", 0.2], [null, "黃金龍骨", null, "28", "11", "37", "12", "37", 0.2], [null, "炎心真龍", null, "32", "47", "14", "22", "10", 0.2], [null, "冰霜巨龍", null, "36", "10", "22", "14", "45", 0.2], [null, "熾炎神鳳", null, "40", "4", "11", "20", "50", 0.2], [null, "彩鳳", null, "37", "45", "13", "24", "6", 0.2], [null, "雛鳳", null, "37", "6", "13", "24", "45", 0.2], [null, "赤鳳", null, "45", "37", "24", "13", "6", 0.2], [null, "金鳳", null, "24", "6", "37", "13", "45", 0.2], [null, "繽紛水藍鼠", null, "32", "6", "13", "24", "50", 0.2], [null, "地獄護衛犬", null, "40", "41", "15", "17", "12", 0.2], [null, "海賊王", null, "33", "52", "12", "22", "6", 0.2], [null, "修羅歐茲尼克", null, "38", "50", "11", "20", "6", 0.2], [null, "鬥神歐茲尼克", null, "40", "6", "24", "15", "40", 0.2], [null, "酒仙歐茲那克", null, "43", "6", "11", "17", "48", 0.2], [null, "羅剎歐茲那克", null, "45", "45", "11", "18", "6", 0.2], [null, "番茄聖女", null, "33", "6", "16", "22", "48", 0.2], [null, "吉祥癸兔", null, "40", "40", "15", "15", "15", 0.2], [null, "吉利癸兔", null, "15", "40", "40", "15", "15", 0.2], [null, "吉星癸兔", null, "40", "15", "15", "15", "40", 0.2], [null, "吉兆癸兔", null, "15", "15", "15", "40", "40", 0.2], [null, "兔吉祥", null, "30", "30", "21", "21", "21", 0.2], [null, "兔吉利", null, "21", "30", "30", "21", "21", 0.2], [null, "兔吉星", null, "30", "21", "21", "21", "30", 0.2], [null, "兔吉兆", null, "21", "21", "21", "30", "30", 0.2], [null, "百兩招財貓", null, "22", "22", "22", "22", "22", 0.2], [null, "千兩招財貓", null, "30", "16", "12", "25", "40", 0.2], [null, "萬兩招財貓", null, "23", "12", "20", "24", "46", 0.2], [null, "十萬兩招 財貓", null, "32", "36", "25", "24", "8", 0.2], [null, "億萬兩招財貓", null, "38", "6", "10", "21", "50", 0.2], [null, "風暴仙靈", null, "44", "37", "13", "21", "10", 0.2], [null, "逐月仙靈", null, "46", "6", "11", "13", "49", 0.2], [null, "星輝仙靈", null, "50", "6", "15", "6", "48", 0.2], [null, "焚炎仙靈", null, "37", "10", "13", "21", "44", 0.2], [null, "新生露比", null, "25", "25", "25", "25", "25", 0.2], [null, " 見習戰斧露比", null, "40", "40", "15", "24", "6", 0.2], [null, "見習弓箭手露比", null, "24", "40", "15", "40", "6", 0.2], [null, "見習格鬥家露比", null, "22", "40", "17", "40", "6", 0.2], [null, "見習劍士露比", null, "32", "42", "13", "32", "6", 0.2], [null, "見習巫師露比", null, "36", "6", "15", "26", "42", 0.2], [null, "見習騎士露比", null, "40", "40", "25", "14", "6", 0.2], [null, "戰斧大師露比", null, "43", "52", "11", "13", "6", 0.2], [null, "弓術大師露比", null, "47", "46", "11", "15", "6", 0.2], [null, "格鬥大師露比", null, "12", "46", "11", "50", "6", 0.2], [null, "劍術大師露比", null, "14", "52", "11", "42", "6", 0.2], [null, "巫術大師露比", null, "46", "6", "11", "12", "50", 0.2], [null, "槍術大師露比", null, "36", "52", "11", "20", "6", 0.2], [null, "火柴小王子", null, "42", "6", "9", "47", "21", 0.2], [null, "碧燄", null, "35", "10", "16", "20", "44", 0.2], [null, "赤燄", null, "39", "6", "12", "24", "44", 0.2], [null, "山隱仙靈", null, "21", "10", "13", "37", "44", 0.2], [null, "潮汐仙靈", null, "21", "10", "37", "13", "44", 0.2], [null, "焦糖丸子炸彈", null, "12", "21", "13", "32", "47", 0.2], [null, "天空元素使", null, "17", "4", "4", "50", "50", 0.2], [null, "炎精靈", null, "19", "45", "12", "43", "6", 0.2], [null, "烈焰元素使", null, "17", "50", "4", "50", "4", 0.2], [null, "大地元素使", null, "50", "4", "17", "4", "50", 0.2], [null, "綠沼泥", null, "31", "19", "37", "13", "20", 0.2], [null, "岩鐵怪", null, "13", "33", "22", "17", "35", 0.2], [null, "靴怪精靈", null, "9", "19", "23", "34", "35", 0.2], [null, "冰靴精靈", null, "9", "19", "34", "23", "35", 0.2], [null, "木精靈", null, "45", "6", "19", "12", "43", 0.2], [null, "光精靈", null, "19", "6", "12", "45", "43", 0.2], [null, "冰精靈", null, "43", "45", "12", "19", "6", 0.2], [null, "甜心炸彈", null, "15", "8", "18", "34", "50", 0.2], [null, "行大運白虎王", null, "38", "6", "15", "19", "47", 0.2], [null, "贏珍寶黑虎王", null, "18", "42", "15", "44", "6", 0.2], [null, "綠茶麻薯兔兔", null, "21", "9", "33", "20", "40", 0.2], [null, "芋泥麻薯兔兔", null, "33", "9", "20", "21", "40", 0.2], [null, "紅豆麻薯兔兔", null, "33", "40", "20", "21", "9", 0.2], [null, "花生麻薯兔兔", null, "40", "33", "21", "20", "9", 0.2], [null, "白櫻麻薯兔兔", null, "42", "45", "12", "20", "6", 0.2], [null, "黑醬麻薯兔兔", null, "42", "6", "12", "20", "45", 0.2], [null, "布卡", null, "25", "21", "16", "35", "26", 0.2], [null, "寄生布卡", null, "25", "16", "21", "26", "35", 0.2], [null, "樹精布卡", null, "25", "26", "21", "35", "16", 0.2], [null, "布卡四重奏", null, "17", "6", "17", "43", "42", 0.2], [null, "陣", null, "17", "6", "17", "42", "43", 0.2], [null, "連", null, "42", "17", "17", "43", "6", 0.2], [null, "週年慶禮盒地精靈", null, "18", "18", "48", "18", "18", 0.2], [null, "週年慶禮盒水精靈", null, "18", "18", "18", "18", "48", 0.2], [null, "週年慶禮盒火精靈", null, "18", "48", "18", "18", "18", 0.2], [null, "週年慶禮盒風精靈", null, "18", "18", "18", "48", "18", 0.2], [null, "天使小熊", null, "14", "47", "16", "42", "6", 0.2], [null, "愛情小熊", null, "43", "32", "20", "24", "6", 0.2], [null, "戀愛小熊", null, "49", "31", "19", "20", "6", 0.2], [null, "愛心小熊", null, "35", "6", "26", "14", "44", 0.2], [null, "花生 元宵", null, "32", "32", "32", "12", "12", 0.2], [null, "芝麻元宵", null, "32", "12", "32", "12", "32", 0.2], [null, "流沙元宵", null, "12", "32", "32", "12", "32", 0.2], [null, "紅豆元宵", null, "12", "12", "32", "32", "32", 0.2], [null, "愛絲波波", null, "35", "22", "22", "22", "22", 0.2], [null, "絲諾波波", null, "22", "35", "22", "22", "22", 0.2], [null, "聖誕波波", null, "22", "22", "22", "35", "22", 0.2], [null, "雪兒波波", null, "22", "22", "22", "22", "35", 0.2], [null, "旋律影子", null, "24", "28", "22", "19", "27", 0.2], [null, "噩夢旋律影子", null, "23", "38", "8", "50", "6", 0.2], [null, "魷魚霸王", null, "13", "6", "12", "46", "48", 0.2], [null, "呆萌魷魚", null, "13", "9", "23", "36", "42", 0.2], [null, "冷酷魷魚", null, "15", "9", "21", "34", "44", 0.2], [null, "暴躁魷魚", null, "12", "9", "20", "37", "45", 0.2], [null, "瘋狂魷魚", null, "17", "9", "15", "39", "43", 0.2], [null, "閃光魷魚王", null, "30", "52", "15", "22", "6", 0.2], [null, "幻影", null, "20", "26", "25", "17", "32", 0.2], [null, "深邃幻影", null, "16", "6", "22", "37", "44", 0.2], [null, "純白液態史萊姆", null, "50", "32", "15", "17", "10", 0.2], [null, "聖金雪橇鹿車", null, "52", "39", "14", "14", "6", 0.2], [null, "黑金雪橇鹿車", null, "52", "14", "39", "14", "6", 0.2], [null, "黃金雪橇鹿車", null, "52", "14", "14", "39", "6", 0.2], [null, "白金雪橇鹿車", null, "39", "52", "14", "14", "14", 0.2], [null, "地獄魔王", null, "23", "33", "20", "27", "17", 0.2], [null, "魔王撒旦", null, "16", "48", "11", "44", "6", 0.2], [null, "深綠蝙蝠", null, "23", "31", "21", "27", "18", 0.2], [null, "檸檬蝙蝠", null, "22", "33", "21", "24", "20", 0.2], [null, "月兔卜樂", null, "14", "24", "16", "37", "34", 0.2], [null, "廣寒仙兔", null, "12", "8", "13", "47", "45", 0.2], [null, "曜玉金鵷", null, "23", "6", "10", "46", "40", 0.2], [null, "雛鳳", null, "37", "6", "13", "24", "45", 0.2], [null, "格陵蘭虎鯊", null, "19", "13", "15", "42", "31", 0.2], [null, "北海響尾鯊", null, "42", "31", "15", "19", "13", 0.2], [null, "嗜血巡遊鯊", null, "31", "42", "15", "19", "13", 0.2], [null, "地獄亡靈", null, "22", "24", "13", "35", "26", 0.2], [null, "地獄惡魔", null, "11", "6", "17", "43", "48", 0.2], [null, "魔力小黃雞", null, "17", "35", "15", "38", "15", 0.2], [null, "寶貝紫藍雞", null, "17", "15", "15", "38", "35", 0.2], [null, "永恆熒光雞", null, "17", "38", "15", "35", "15", 0.2], [null, " 初心粉紅雞", null, "17", "15", "15", "35", "38", 0.2], [null, "兔耳魔力小黃雞", null, "19", "37", "15", "40", "12", 0.2], [null, "兔耳寶貝紫藍雞", null, "19", "12", "15", "40", "37", 0.2], [null, "兔耳永恆熒光雞", null, "19", "40", "15", "37", "12", 0.2], [null, "兔耳初心粉紅雞", null, "19", "12", "15", "37", "40", 0.2], [null, "印第安魔力小雞", null, "19", "39", "15", "42", "10", 0.2], [null, "大法官魔力小雞", null, "19", "10", "15", "42", "39", 0.2], [null, "牛仔帽魔力小雞", null, "19", "42", "15", "39", "10", 0.2], [null, "紳士裝魔力小雞", null, "19", "10", "15", "39", "42", 0.2], [null, "布偶夏莉", null, "19", "19", "17", "34", "44", 0.2], [null, "布偶凱琪", null, "15", "9", "16", "43", "40", 0.2], [null, "布偶艾菈", null, "16", "9", "42", "17", "39", 0.2], [null, "布偶米琪", null, "30", "47", "14", "23", "9", 0.2], [null, "布偶紫音", null, "37", "38", "29", "10", "9", 0.2], [null, "飛馬公主", null, "16", "6", "14", "43", "46", 0.2], [null, "飛馬王子", null, "35", "41", "16", "27", "6", 0.2], [null, "愛神丘比特", null, "16", "12", "15", "40", "42", 0.2], [null, "小丑魚霸王", null, "19", "42", "13", "45", "6", 0.2], [null, "風暴小丑魚王", null, "16", "6", "14", "45", "44", 0.2], [null, "碧波小丑魚", null, "16", "39", "15", "43", "10", 0.2], [null, "蒼角小丑魚", null, "18", "40", "14", "41", "10", 0.2], [null, "赤丸小丑魚", null, "17", "39", "15", "42", "10", 0.2], [null, "魔方小丑魚", null, "20", "40", "13", "40", "10", 0.2], [null, "歐特奇美拉", null, "24", "22", "22", "35", "17", 0.2], [null, "疾風奇美拉", null, "20", "6", "8", "45", "46", 0.2], [null, "水母霸王", null, "42", "9", "11", "17", "46", 0.2], [null, "雷暴娃娃水母", null, "47", "6", "11", "46", "15", 0.2], [null, "晴天娃娃水母", null, "36", "9", "23", "13", "42", 0.2], [null, "小雨娃娃水母", null, "35", "9", "23", "12", "44", 0.2], [null, "大雪娃娃水母", null, "34", "9", "20", "15", "45", 0.2], [null, "多雲娃娃水母", null, "34", "9", "21", "16", "43", 0.2], [null, "符能青鸞", null, "23", "40", "10", "46", "6", 0.2], [null, "石像魔王", null, "12", "36", "13", "18", "46", 0.2], [null, "露比", null, "12", "18", "12", "39", "39", 0.2], [null, "魅影露比", null, "17", "6", "10", "42", "50", 0.2], [null, "山吹", null, "13", "23", "25", "22", "37", 0.2], [null, "咒殺型山吹", null, "15", "6", "11", "47", "46", 0.2], [null, "暗影鳥人", null, "15", "8", "16", "44", "42", 0.2], [null, "綠帽哥布林", null, "29", "41", "23", "21", "11", 0.2], [null, "寒冰牛頭怪", null, "26", "31", "24", "21", "18", 0.2], [null, "寒冰牛魔王", null, "15", "47", "12", "45", "6", 0.2], [null, "李貝留斯", null, "17", "18", "27", "23", "40", 0.2], [null, "軍王李貝留斯", null, "14", "8", "13", "43", "47", 0.2], [null, "巴洛斯", null, "33", "19", "34", "23", "16", 0.2], [null, "邪神巴洛斯", null, "43", "27", "32", "15", "8", 0.2], [null, "阿卡斯", null, "25", "17", "34", "17", "32", 0.2], [null, "狂魔阿卡斯", null, "19", "6", "33", "20", "47", 0.2], [null, "佛利波羅", null, "26", "30", "30", "22", "12", 0.2], [null, "魔化佛利波羅", null, "37", "43", "21", "18", "6", 0.2], [null, "梅茲", null, "25", "29", "14", "32", "20", 0.2], [null, "忍王梅茲", null, "24", "45", "4", "46", "6", 0.2], [null, "斧頭幫千軍", null, "31", "49", "20", "19", "6", 0.2], [null, "斧頭幫萬馬", null, "38", "8", "19", "18", "42", 0.2], [null, "火焰牛頭怪", null, "16", "30", "20", "32", "22", 0.2], [null, " 煉獄牛頭怪", null, "41", "6", "16", "19", "43", 0.2], [null, "艾兒卡絲", null, "42", "6", "20", "17", "40", 0.2], [null, "毆茲那克", null, "28", "36", "19", "19", "18", 0.2], [null, "熊霸毆茲那克", null, "50", "37", "12", "20", "6", 0.2], [null, "歐茲尼克", null, "21", "36", "13", "28", "22", 0.2], [null, "煞氣歐茲尼克", null, "14", "50", "12", "43", "6", 0.2], [null, "愛絲精靈", null, "52", "30", "17", "18", "8", 0.2], [null, "絲諾精靈", null, "30", "52", "17", "18", "8", 0.2], [null, "雪兒精靈", null, "14", "8", "14", "42", "47", 0.2], [null, "聖誕精靈", null, "14", "42", "14", "47", "8", 0.2], [null, "牛鬼", null, "24", "29", "24", "29", "14", 0.2], [null, "強襲牛鬼", null, "28", "50", "21", "20", "6", 0.2], [null, "屠龍鬥士", null, "51", "24", "30", "13", "6", 0.2], [null, "皎月之靈", null, "20", "8", "13", "34", "50", 0.2], [null, "暗月之靈", null, "29", "50", "12", "26", "8", 0.2], [null, "月宮之靈", null, "22", "9", "43", "9", "41", 0.2], [null, "水月之靈", null, "41", "9", "22", "9", "43", 0.2], [null, "猩紅之靈", null, "22", "43", "9", "41", "9", 0.2], [null, "風月之靈", null, "9", "41", "22", "43", "9", 0.2], [null, "西瓜大地鼠", null, "17", "17", "47", "17", "17", 0.2], [null, "祭奠火焰鼠", null, "17", "47", "17", "17", "17", 0.2], [null, "浮潛惡夢鼠", null, "17", "17", "17", "17", "47", 0.2], [null, "兜風寶石鼠", null, "17", "17", "17", "47", "17", 0.2], [null, "漂漂水藍鼠", null, "52", "17", "17", "17", "17", 0.2], [null, "月獅", null, "30", "32", "13", "26", "22", 0.2], [null, "雪獅", null, "36", "32", "18", "24", "13", 0.2], [null, "蝕月炎獸", null, "43", "6", "16", "18", "42", 0.2], [null, "暴雪魔獸", null, "50", "40", "12", "17", "6", 0.2], [null, "純金豬王", null, "48", "33", "23", "16", "6", 0.2], [null, "粉心王妃", null, "30", "6", "31", "14", "43", 0.2], [null, "呆萌豬王", null, "30", "45", "15", "28", "6", 0.2], [null, "白眉豬王", null, "31", "6", "16", "28", "43", 0.2], [null, "銀豬太郎", null, "37", "34", "31", "13", "8", 0.2], [null, "粉豬太郎", null, "30", "8", "31", "13", "40", 0.2], [null, "棕豬太郎", null, "33", "36", "16", "29", "8", 0.2], [null, " 灰豬太郎", null, "32", "8", "17", "24", "41", 0.2], [null, "銅豬寶寶", null, "35", "31", "34", "11", "10", 0.2], [null, "斑點豬寶寶", null, "24", "10", "36", "11", "40", 0.2], [null, "刺豬寶寶", null, "32", "37", "12", "30", "10", 0.2], [null, "白紋豬寶寶", null, "32", "10", "17", "22", "40", 0.2], [null, "天然寶石鼠", null, "12", "12", "17", "39", "45", 0.2], [null, "天狼星", null, "22", "39", "15", "33", "16", 0.2], [null, "雷霆幻獸", null, "17", "43", "6", "47", "12", 0.2], [null, "聖誕火焰鼠", null, "37", "10", "10", "19", "47", 0.2], [null, "聖誕鼠王", null, "15", "6", "12", "43", "49", 0.2], [null, "聖誕水藍鼠", null, "36", "50", "12", "20", "6", 0.2], [null, "糖果大地鼠", null, "10", "32", "10", "26", "45", 0.2], [null, "聖誕寶石鼠", null, "10", "14", "12", "40", "47", 0.2], [null, "聖誕麋鹿", null, "38", "35", "25", "15", "10", 0.2], [null, "聖誕馴鹿", null, "38", "25", "35", "15", "10", 0.2], [null, "聖誕林鹿", null, "25", "38", "35", "15", "10", 0.2], [null, "聖誕梅花鹿", null, "35", "38", "25", "15", "10", 0.2], [null, "聖誕小熊", null, "24", "24", "24", "24", "24", 0.2], [null, "淘氣小熊", null, "24", "24", "24", "24", "24", 0.2], [null, "可愛小熊", null, "24", "24", "24", "24", "24", 0.2], [null, "搗蛋小熊", null, "24", "24", "24", "24", "24", 0.2], [null, "紫翎", null, "20", "6", "13", "45", "40", 0.2], [null, "喜慶虎寶寶", null, "18", "10", "19", "35", "41", 0.2], [null, "歡樂虎寶寶", null, "24", "10", "35", "12", "42", 0.2], [null, "招財虎寶寶", null, "13", "10", "27", "32", "41", 0.2], [null, "幸福虎寶 寶", null, "11", "41", "11", "19", "41", 0.2], [null, "萬年龜", null, "22", "21", "39", "4", "38", 0.2], [null, "月仙兔", null, "45", "33", "13", "25", "8", 0.2], [null, "月夜兔", null, "25", "34", "9", "45", "11", 0.2], [null, "月地兔", null, "22", "43", "22", "22", "14", 0.2], [null, "月冰兔", null, "22", "22", "43", "14", "22", 0.2], [null, "月火兔", null, "22", "22", "14", "43", "22", 0.2], [null, "月風兔", null, "22", "14", "22", "22", "43", 0.2], [null, "強盾守護", null, "36", "33", "30", "13", "13", 0.2], [null, "鑽石蟲", null, "11", "21", "38", "17", "33", 0.2], [null, "黑曜蟲", null, "17", "21", "40", "9", "33", 0.2], [null, "風甲蜥蜴", null, "35", "34", "32", "12", "12", 0.2], [null, "死亡騎士", null, "24", "16", "24", "16", "40", 0.2], [null, "凱法", null, "41", "6", "12", "20", "46", 0.2], [null, "猩紅騎士", null, "21", "36", "13", "28", "22", 0.2], [null, "帕布提斯馬", null, "50", "30", "13", "26", "6", 0.2], [null, "純白精靈箱", null, "17", "6", "12", "40", "50", 0.2], [null, "藍魔精靈箱", null, "47", "34", "17", "18", "9", 0.2], [null, "紅魔精靈箱", null, "34", "9", "17", "18", "47", 0.2], [null, " 兔耳精靈箱", null, "19", "6", "12", "40", "48", 0.2], [null, "嚇人精靈箱", null, "34", "47", "17", "18", "9", 0.2], [null, "綠蛙精靈箱", null, "18", "9", "34", "17", "47", 0.2], [null, "暴走霸王", null, "17", "44", "12", "46", "6", 0.2], [null, "毒刺魔鴨", null, "38", "9", "13", "19", "44", 0.2], [null, "水藍魔鴨", null, "38", "44", "13", "19", "9", 0.2], [null, "赤目魔鴨", null, "44", "19", "13", "38", "9", 0.2], [null, "披甲魔鴨", null, "19", "38", "13", "44", "9", 0.2], [null, "暴走使徒", null, "16", "6", "15", "42", "46", 0.2], [null, "蟲毒魔蟹", null, "12", "30", "32", "6", "45", 0.2], [null, "無頭將軍", null, "34", "27", "26", "13", "20", 0.2], [null, "沙海將軍", null, "45", "41", "12", "19", "8", 0.2], [null, "血腥魔刃", null, "14", "6", "31", "34", "40", 0.2], [null, "碧月", null, "16", "9", "45", "16", "37", 0.2], [null, "青 月", null, "24", "42", "14", "3", "9", 0.2], [null, "絳月", null, "26", "33", "16", "39", "9", 0.2], [null, "橙月", null, "34", "36", "30", "14", "9", 0.2], [null, "青銅刺豚", null, "14", "39", "30", "22", "15", 0.2], [null, "逆刃死灰", null, "40", "42", "16", "14", "13", 0.2], [null, "龍蝦霸王", null, "37", "50", "16", "16", "6", 0.2], [null, "沼澤龍蝦", null, "29", "47", "26", "14", "7", 0.2], [null, "海龍蝦", null, "31", "45", "23", "16", "8", 0.2], [null, "烈焰龍蝦", null, "28", "48", "19", "21", "7", 0.2], [null, "烈風龍蝦", null, "27", "46", "18", "24", "8", 0.2], [null, "牛角寄居蟹", null, "18", "9", "31", "17", "35", 0.2], [null, "金甲蟲", null, "18", "37", "37", "11", "20", 0.2], [null, "櫻花螳螂", null, "18", "45", "22", "27", "11", 0.2], [null, "赤炎假面", null, "31", "10", "22", "19", "43", 0.2], [null, "巨斧假面", null, "36", "39", "21", "19", "10", 0.2], [null, "魔法師之鬼", null, "17", "12", "16", "28", "47", 0.2], [null, "巫師之鬼", null, "16", "31", "17", "40", "16", 0.2], [null, "卡爾克", null, "12", "45", "20", "26", "17", 0.2], [null, "卡卡特", null, "20", "43", "18", "27", "12", 0.2], [null, "魔導師之魂", null, "18", "10", "14", "34", "49", 0.2], [null, "巫妖王之魂", null, "26", "31", "14", "44", "10", 0.2], [null, "血魔之棺", null, "23", "49", "17", "26", "10", 0.2], [null, "白銀之棺", null, "33", "10", "16", "21", "45", 0.2], [null, "龍骨", null, "32", "35", "20", "21", "16", 0.2], [null, "暗黑龍骨", null, "30", "16", "27", "14", "37", 0.2], [null, "玄翼暴龍", null, "40", "40", "14", "21", "10", 0.2], [null, "闇影魔龍", null, "35", "10", "16", "24", "40", 0.2], [null, "幽紫妖靈", null, "19", "11", "23", "33", "39", 0.2], [null, "獅面女神", null, "33", "14", "22", "19", "35", 0.2], [null, "貓臉女神", null, "42", "37", "12", "18", "14", 0.2], [null, "貓隊長", null, "35", "42", "17", "19", "10", 0.2], [null, "惡夢貓", null, "15", "20", "20", "32", "36", 0.2], [null, "福爾菲斯", null, "14", "40", "12", "18", "39", 0.2], [null, "萬聖南瓜精靈", null, "18", "6", "22", "31", "48", 0.2], [null, "晨曦南瓜怪", null, "15", "33", "15", "45", "15", 0.2], [null, "白晝南 瓜怪", null, "45", "15", "33", "15", "15", 0.2], [null, "黃昏南瓜怪", null, "15", "45", "15", "33", "15", 0.2], [null, "暮夜南瓜怪", null, "15", "15", "45", "15", "33", 0.2], [null, "舞動花妖", null, "36", "12", "17", "16", "39", 0.2], [null, "迷魂草", null, "29", "17", "15", "22", "37", 0.2], [null, "致幻海葵", null, "28", "14", "22", "13", "33", 0.2], [null, "迷幻海葵", null, "32", "13", "23", "11", "31", 0.2], [null, "大地巨龍", null, "29", "22", "24", "13", "32", 0.2], [null, "失翼之龍杜瓦", null, "40", "6", "10", "19", "50", 0.2], [null, "暗裔龍祖", null, "20", "47", "13", "38", "7", 0.2], [null, "黑暗水龍蜥", null, "38", "38", "35", "9", "5", 0.2], [null, "翼龍", null, "32", "30", "26", "19", "18", 0.2], [null, "神聖翼龍", null, "16", "6", "14", "43", "46", 0.2], [null, "飛刺海馬", null, "13", "36", "19", "33", "19", 0.2], [null, "火頸龍", null, "24", "16", "15", "28", "37", 0.2], [null, "碧角口袋龍", null, "12", "40", "13", "18", "42", 0.2], [null, "荒漠兔耳仙人 掌", null, "26", "42", "16", "25", "13", 0.2], [null, "迷幻歌妖", null, "16", "21", "8", "41", "36", 0.2], [null, "墮落惡魔螃蟹", null, "22", "38", "40", "13", "8", 0.2], [null, "夜行貓人", null, "24", "31", "16", "40", "14", 0.2], [null, "禁地妖花", null, "33", "13", "18", "23", "38", 0.2], [null, "深淵武裝骷髏", null, "18", "23", "43", "8", "28", 0.2], [null, "懷舊樹精", null, "42", "31", "34", "14", "3", 0.2], [null, "赤炎黃蜂", null, "14", "38", "15", "43", "10", 0.2], [null, "黃金鼠王", null, "18", "8", "20", "34", "45", 0.2], [null, "變異龍祖", null, "26", "46", "13", "33", "7", 0.2], [null, "粉紅炸彈", null, "18", "11", "16", "30", "48", 0.2], [null, "劇毒螃蟹", null, "12", "31", "36", "8", "36", 0.2], [null, "雷獸", null, "16", "40", "8", "43", "18", 0.2], [null, "改造殭屍", null, "41", "36", "16", "16", "16", 0.2], [null, "改造黃蠍", null, "20", "10", "43", "12", "40", 0.2], [null, "改造掃把蝙蝠", null, "6", "44", "6", "33", "36", 0.2], [null, "改造烈風哥布林", null, "26", "49", "22", "22", "8", 0.2], [null, "祥雲寶寶", null, "23", "10", "8", "36", "46", 0.2], [null, "小白龍", null, "20", "36", "9", "42", "16", 0.2]];

const Data = Pts;
const updateData = parse;
export {Data, updateData};


