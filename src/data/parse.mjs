import {fstat} from 'fs';
import puppeteer from 'puppeteer';
import fs from 'fs'
import {readFile} from 'fs/promises';

const config = JSON.parse(
    await readFile(
        new URL('../../config.json', import.meta.url)
    )
);

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeIFrameTable(url) {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle2'});
    page.on('console', msg => {
        console.log(`Page console: ${msg.text()}`);
    });

    // 寻找 iframe
    const iframeElement = await page.$('iframe');
    if (!iframeElement) {
        console.error('找不到 iframe');
        await browser.close();
        return;
    }

    await sleep(1000);

    // 切换到 iframe 的内容
    let iframeContent = await iframeElement.contentFrame();
    if (!iframeContent) {
        console.error('找不到 iframe 的内容');
        await browser.close();
        return;
    }

    iframeContent = await (await iframeContent.$("iframe")).contentFrame();
    if (!iframeContent) {
        console.error('找不到 iframe 的内容');
        await browser.close();
        return;
    }

    iframeContent = await (await iframeContent.$("iframe")).contentFrame();
    if (!iframeContent) {
        console.error('找不到 iframe 的内容');
        await browser.close();
        return;
    }

    // 从 iframe 中抓取 table 的数据
    const tableData = await iframeContent.$$eval('table tr', rows => {
        return rows.map(row => {
            const rowData = [];
            row.querySelectorAll('td').forEach(cell => {
                rowData.push(cell.textContent.trim());
            });
            return rowData;
        });
    });

    // 关闭浏览器
    await browser.close();

    return tableData;
}

function parseElementString(str) {
    const elements = {風: 0, 地: 0, 水: 0, 火: 0};
    const pairs = str.match(/([^\d\s]+)(\d*)/g);

    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].match(/([^\d\s]+)(\d*)/);
        const value = parseInt(pair[2] || "1");
        elements[pair[1]] = value;
    }

    return elements;
}


const url = 'https://sites.google.com/view/goodluck2cg/%E5%B0%88%E5%B1%AC%E5%AF%B5%E7%89%A9/%E5%85%A8%E5%AF%B5%E7%89%A9%E4%B8%8D%E5%88%86%E7%B3%BB?authuser=0';

async function parse() {

    let tableData = null;
    if (true) { //!fs.existsSync("data.json")){
        tableData = await scrapeIFrameTable(url);
        fs.writeFileSync("data.json", JSON.stringify(tableData));
    }

    const jsonObject = {
        "野獸": 0,
        "不死": 1,
        "飛行": 2,
        "昆蟲": 3,
        "植物": 4,
        "特殊": 5,
        "金屬": 6,
        "龍": 7,
        "人形": 8,
        "邪魔": 9
    };

    const out = [];

    let index = 1;

    tableData = tableData.slice(1);

    const ret = tableData.map(n => {
        const content = [];
        const attri = parseElementString(n[10]);

        //0 50 50 0→宠物的属性：依次为地、水、火、风

        content.push("編號" + index + "=" + n[1] + "," + n[3], n[4], n[5], n[6], n[7], 20, jsonObject[n[0]],
            attri.地 * 10,
            attri.水 * 10,
            attri.火 * 10,
            attri.風 * 10,
            n[8],
            ""
        )
        index++;

        return content.join(" ");
    });

    if (config.monster_path && "" != config.monster_path.trim()) {
        fs.writeFileSync(config.monster_path, index + "\r\n" + ret.join("\n"));
    }
    const Pts = [[1, "虎人", 0, 22, 26, 17, 19, 16, "D", 7, "N", 2, 8, "謎之迷宮11~16,里歐波多洞窟20~24,風之洞窟26~31,動物實驗室65,迷龍之巢29~31", "動物實驗室(108,94)(118,97)", 10, "Y"], [2, "貓妖", 0, 19, 24, 17, 28, 17, "B", 7, "N", 2, 9, "謎之迷宮11~16,水之洞窟54~61,動物實驗室65", "動物實驗室(112,107)", 10, "Y"], [3, "羅剎", 0, 24, 25, 14, 22, 20, "B", 3, "S", 3, 9, "詛咒的迷宮地下11~20樓41~43,炎之洞窟40~50", "詛咒的迷宮地下13樓(25,5)", 45, "Y"], [4, "貓人", 0, 23, 27, 15, 26, 14, "D", 5, "S", 3, 9, "風之洞窟26~31,迷龍之巢29~34,莎蓮娜東邊洞窟35~37", "莎蓮娜東邊洞窟地下2樓(12,16)", 90, "Y"], [5, "惡魔貓", 0, 21, 23, 12, 27, 22, "D", 3, "S", 3, 9, "阿巴尼斯洞窟34~36", "阿巴尼斯洞窟傑村側1樓(15,15)", 50, "Y"], [6, "妖狐", 0, 18, 30, 11, 25, 26, "B", 5, "S", 4, 8, "冰之洞窟57~59", "冰之洞窟二樓(16,24)", 120, "Y"], [7, "穴熊", 0, 34, 34, 19, 19, 14, "A", 8, "N", 3, 6, "維諾亞洞窟16~18", "維諾亞洞窟全域", 20, "Y"], [8, "赤熊", 0, 35, 36, 15, 20, 14, "C", 8, "N", 5, 6, "尼維爾海村周圍10~13", "尼維爾海村附近 (515,469)(510,470)", 70, "Y"], [9, "北極熊", 0, 36, 33, 22, 18, 11, "A", 2, "N", 5, 6, "阿巴尼斯村周圍31~33", "阿巴尼斯村外(255,182)(256,191)", 40, "Y"], [10, "赤目黑熊", 0, 33, 35, 14, 22, 16, "C", 2, "S", 6, 6, "參道33~35,伊姆爾森林68~70", "X", "X", "Y"], [11, "貓熊", 0, 32, 40, 18, 17, 18, "B", 5, "G", 7, 7, "X", "火焰鼠彩卷B獎", "X", "Y"], [12, "大地鼠", 0, 6, 13, 20, 26, 35, "A", 10, "N", 1, 10, "聖拉魯卡域4~6,流星山丘18~20,一勳遺跡75", "聖拉魯卡村外(235,203)(149,219)", 10, "Y"], [13, "惡夢鼠", 0, 4, 8, 18, 33, 37, "B", 10, "S", 2, 10, "青龍的洞窟23~25,王族的通道49,一勳遺跡75", "五勳任務的王族用脫逃暗道 東方(30,40)", "?", "Y"], [14, "火焰鼠", 0, 7, 12, 15, 34, 32, "C", 10, "N", 1, 10, "奇利村周邊15~17,流星山丘18~20,尼維爾海域,炎之洞窟39~47,一勳遺跡75", "奇利村外(230,330)(235,326)", 15, "Y"], [15, "寶石鼠", 0, 7, 7, 22, 27, 37, "D", 10, "S", 2, 10, "鏡中豪宅21~24,一勳遺跡75", "鏡中豪宅一樓(24,6)(24,8)", 40, "Y"], [16, "水藍鼠", 0, 11, 15, 28, 28, 33, "A", 5, "G", 6, 10, "X", "火焰鼠彩卷B獎", "X", "Y"], [17, "鼠王", 0, 15, 7, 19, 32, 42, "C", 5, "G", 7, 10, "X", "鼠王驚奇蛋1等獎", "X", "Y"], [18, "地獄看門犬", 0, 26, 36, 12, 23, 18, "B", 6, "N", 4, 7, "奇怪的洞窟16~19,里歐波多洞窟20~24,魯米那斯附近45~46", "亞留特村內(48,37),用Lv20以上地獄看門犬換", "X", "Y"], [19, "巨狼", 0, 22, 37, 11, 25, 20, "A", 6, "N", 4, 7, "峽之洞窟42~47", "X", "X", "Y"], [20, "地獄獵犬", 0, 24, 35, 19, 22, 15, "C", 6, "S", 5, 7, "哥拉爾城周邊12~14,詛咒的迷宮地下1~10樓38~40,炎之洞窟40~50", "詛咒的迷宮地下4樓(13,11)(16,11)", 90, "Y"], [21, "地獄妖犬", 0, 23, 40, 13, 21, 18, "D", 6, "S", 5, 7, "積雪的山道39~45,貝茲雷姆神殿附近25~27,雷克塔爾村北側48~49", "傑諾瓦近郊的貝茲雷姆迷宮附近(121,315)(118,323)", 50, "Y"], [22, "殭屍", 1, 37, 32, 12, 12, 12, "D", 6, "N", 2, 9, "暗醫躲藏的家6~9,暖爐底13~15,奇怪洞窟16~19,暗醫洞窟17~23,阿魯巴斯洞窟20~23,翠格墓園23~24,黑暗之巢27~30,庫魯克斯島(701.695)魔導研究塔64", "阿魯巴斯研究所最上層", 5, "Y"], [23, "喪屍", 1, 35, 34, 7, 15, 14, "B", 6, "S", 3, 9, "積雪的山道39~45,黑暗之巢27~30,庫魯克斯島(701.695)魔導研究塔64", "雪山山頂(21,16)", 90, "Y"], [24, "食屍鬼", 1, 32, 32, 17, 7, 17, "C", 6, "N", 2, 9, "阿魯巴斯洞窟20~23,黑暗之巢27~30,庫魯克斯島(701.695)魔導研究塔64", "阿魯巴斯研究所最上層", 5, "Y"], [25, "腐屍", 1, 42, 37, 12, 7, 7, "A", 6, "N", 2, 9, "黑暗醫生躲藏的家10,奇怪的洞窟16~19,黑暗醫生洞窟18~23,阿魯巴斯洞窟20~23,黑暗之巢27~30,庫魯克斯島(701.695)魔導研究塔64", "阿魯巴斯研究所最上層", 5, "Y"], [26, "木乃伊", 1, 39, 32, 14, 8, 17, "C", 5, "S", 4, 8, "沙漠之祠25~31,黑暗之巢28~30,,庫魯克斯島(701.695)魔導研究塔64,伊姆爾森林68~73", "沙漠祠堂第7層(13,25)", 30, "Y"], [27, "骷髏戰士", 1, 12, 27, 42, 12, 17, "D", 7, "N", 3, 8, "翠格墓園20~24,青龍的洞窟23~25,羅連斯研究塔22~24", "X", "X", "Y"], [28, "血骷髏", 1, 13, 24, 41, 10, 22, "C", 7, "S", 4, 8, "夜之蒂娜村31~33", "夜之蒂娜村外的海賊海灣(16,32)", 110, "Y"], [29, "地獄骷髏", 1, 14, 30, 40, 11, 15, "B", 7, "N", 3, 8, "沙塵洞窟24~29", "X", "X", "Y"], [30, "武裝骷髏", 1, 9, 26, 47, 8, 20, "A", 7, "S", 4, 8, "南恰拉山第2通道21~23,聖壇男路線36~38", "聖壇男路線第2層(63,5)", 100, "Y"], [31, "骷髏海盜", 1, 12, 29, 45, 13, 16, "A", 5, "N", 3, 8, "伊姆爾森林68~73", "X", "X", "Y"], [32, "幽靈", 1, 19, 18, 31, 20, 27, "A", 2, "N", 3, 7, "地下迷宮9~16,暖爐之底13~15,,翠格墓園21~24,詛咒的迷宮地下41~50樓50~52", "詛咒的迷宮地下41樓(7,6)(7,8)(8,5)", 50, "Y"], [33, "鬼靈", 1, 9, 21, 27, 25, 33, "C", 8, "S", 5, 7, "黑色祈禱19~20,南恰拉山第1通道18~22,峽之洞窟42~47", "峽之洞窟(74,4)(74,5)需打贏地縛靈", "?", "Y"], [34, "亡靈", 1, 14, 27, 30, 15, 29, "C", 2, "S", 5, 7, "聖壇女路線36~38", "聖壇女路線第2層(74,88)", 100, "Y"], [35, "死靈", 1, 10, 28, 32, 17, 28, "A", 8, "N", 4, 7, "夜之蒂娜村31~33", "夜之蒂娜村(64,53)(33,26)(20,64)(53,48)", 300, "Y"], [36, "小石像怪", 2, 16, 21, 11, 31, 26, "A", 5, "N", 1, 9, "靈堂1~2,米諾基亞村周邊46~47", "靈堂全域", 5, "Y"], [37, "使魔", 2, 21, 20, 15, 27, 27, "C", 7, "N", 2, 9, "X", "完成國民任務後隨機取得", "X", "Y"], [38, "水藍鳥魔", 2, 22, 23, 10, 25, 25, "A", 3, "S", 3, 9, "鏡中豪宅21~24,哥拉爾城周邊11~13,水之洞窟54~61", "鏡中豪宅2樓(40,25)", 60, "Y"], [39, "小惡魔", 2, 21, 20, 9, 25, 30, "D", 3, "N", 2, 9, "亞諾曼城周邊5~10,土之洞窟12~16,奇利村周邊15~17,羽音洞窟30~34", "奇利村附近(280,400)", 30, "Y"], [40, "迷你石像怪", 2, 23, 19, 10, 24, 29, "C", 3, "S", 3, 9, "阿凱魯法外11~13,風之洞窟26~31,詔三47~49,迷龍之巢29~34", "詛咒的迷宮地下35樓(18,5)(18,8)", 60, "Y"], [41, "丘比特", 2, 12, 22, 7, 37, 37, "C", 5, "G", 7, 9, "X", "火焰鼠彩卷B獎", "X", "Y"], [42, "石像怪", 2, 14, 30, 32, 22, 22, "D", 1, "S", 6, 6, "黑白龍城67~70,祭壇2~60", "X", "X", "Y"], [43, "血魔", 2, 13, 31, 26, 25, 25, "B", 1, "N", 6, 6, "黑白龍城67~70,祭壇2~60", "X", "X", "Y"], [44, "墮天使", 2, 11, 28, 28, 27, 26, "A", 1, "S", 6, 6, "冰雪的牢城60~62,黑白龍城67~70,祭壇2~60", "X", "X", "Y"], [45, "惡魔", 2, 10, 27, 26, 26, 31, "C", 1, "N", 5, 6, "冰雪的牢城60~62,黑白龍城67~70,祭壇2~60", "X", "X", "Y"], [46, "小蝙蝠", 2, 11, 26, 16, 31, 21, "A", 6, "N", 2, 10, "亞諾曼城周邊8~10", "完成國民任務後隨機取得", "X", "Y"], [47, "掃把蝙蝠", 2, 13, 28, 12, 29, 18, "B", 6, "S", 2, 10, "莎蓮娜東邊洞窟35~37", "莎蓮娜東邊洞窟第二個地下二樓(18,25)", 60, "Y"], [48, "迷你蝙蝠", 2, 11, 26, 20, 27, 16, "C", 6, "N", 1, 10, "法蘭城周邊1~5,競技場迷宮7~9,聖拉魯卡域3~5,炎之洞窟39~47,法蘭城門外1~2", "法蘭周邊/炎之洞窟外", 5, "Y"], [49, "水果蝙蝠", 2, 17, 25, 15, 26, 17, "D", 6, "S", 2, 10, "霞之洞窟3~14,里歐波多洞窟20~24,魯米那斯附近45~46", "X", "X", "Y"], [50, "惡魔蝙蝠", 2, 13, 34, 10, 29, 24, "B", 8, "G", 7, 10, "X", "黑龍城任務報酬", "X", "Y"], [51, "天使蝙蝠", 2, 9, 22, 12, 37, 30, "D", 8, "G", 7, 10, "X", "白龍城任務報酬", "X", "Y"], [52, "大蝙蝠", 2, 23, 28, 23, 28, 13, "A", 7, "N", 2, 7, "試煉洞窟1~4,黑暗醫生躲藏的家6~9,競技場迷宮7~9,黑暗醫生洞窟18~21,峽之洞窟46~50", "試煉洞窟1,2樓全域", 5, "Y"], [53, "巨蝙蝠", 2, 27, 30, 22, 24, 12, "C", 3, "N", 3, 7, "佈滿青苔的洞窟17~19,青龍的洞窟26~27", "青龍的洞窟第4層(71,68)(72,66)", 60, "Y"], [54, "海蝙蝠", 2, 18, 29, 27, 30, 11, "A", 3, "N", 4, 7, "海賊的洞窟13~15,地底湖17~19,雷克塔爾村南側48,羽音洞窟30~34", "地底湖地下2樓(42,60)(40,61)(44,60)(45,60)", 30, "Y"], [55, "胖蝙蝠", 2, 25, 24, 20, 26, 20, "C", 7, "S", 5, 7, "阿巴尼斯洞窟34~36", "莎蓮娜西方洞窟阿村側1樓(30,46)(29,44)", 60, "Y"], [56, "兔耳蝙蝠", 2, 21, 26, 18, 31, 14, "B", 5, "S", 4, 8, "蒂娜村周邊29~31", "蒂娜村附近(481,255)", 240, "Y"], [57, "藍蠍", 3, 20, 27, 47, 13, 8, "B", 9, "S", 5, 7, "索奇亞沙漠21~22", "加納沙漠(582,327)", 60, "Y"], [58, "紅蠍", 3, 19, 28, 42, 19, 7, "C", 9, "N", 4, 7, "鯰魚洞窟23~25", "鯰魚洞窟地下第3層(26,17)(32,17)", 50, "Y"], [59, "黃蠍", 3, 20, 30, 43, 12, 10, "D", 9, "S", 5, 7, "索奇亞沙漠20~22", "加納沙漠(525,348)(544,341)(539,346)", 150, "Y"], [60, "殺手蠍", 3, 30, 29, 38, 11, 7, "A", 9, "N", 4, 7, "沙漠之祠25~31", "沙漠之祠第8層(17,11)(16,7)<a href='http://ajet.nsysu.edu.tw/~ks176/poor.jpg' target='_blank'><font color='#FFFFD8'>蒔</font></a>", 60, "Y"], [61, "殺人蜂", 3, 12, 37, 12, 37, 12, "D", 5, "S", 4, 8, "米內葛爾島中部36~38", "米內葛爾島中部(447,356)需通過路霸", 60, "Y"], [62, "異型蜂", 3, 14, 33, 11, 35, 17, "C", 5, "N", 3, 8, "維諾亞村周邊11~13,烏克蘭入口14~16,坎那貝拉村外42~44", "維諾亞村周邊(428,400)(405,380)(470,378)(514,382)", 20, "Y"], [63, "虎頭蜂", 3, 13, 40, 8, 38, 11, "D", 3, "S", 4, 8, "烏克蘭入口14~16,雷姆爾山新道28~32,羽音洞窟30~34", "X", "X", "Y"], [64, "黃蜂", 3, 10, 38, 13, 43, 6, "C", 7, "N", 2, 8, "伊爾村周邊6~8,風之洞窟30", "伊爾村附近(668,310)(672,284)(690,286)(666,223)", 15, "Y"], [65, "死亡蜂", 3, 7, 39, 15, 41, 8, "B", 7, "S", 4, 8, "亞諾曼城周邊5~10,蒂娜村周邊26~28", "蒂娜村附近(284,372)(292,366)傑村後門過橋左轉", 120, "Y"], [66, "螳螂", 3, 16, 44, 22, 27, 11, "D", 4, "N", 5, 6, "奇利村周邊16~18", "奇利村附近(292,214)", 15, "Y"], [67, "殺人螳螂", 3, 12, 45, 20, 26, 17, "B", 4, "S", 6, 6, "亞諾曼城周邊5~8,布朗山30~71", "亞諾曼城東北方(297,244)", 120, "Y"], [68, "赤目螳螂", 3, 14, 44, 19, 29, 14, "C", 4, "S", 6, 6, "亞諾曼城周邊5~12,風洞21~23,米諾基亞村周邊46~48,艾爾卡絲之家60", "洪恩大風穴(131,29)(126,28)近加納出口樓梯", 30, "Y"], [69, "死灰螳螂", 3, 15, 40, 17, 33, 15, "B", 5, "S", 6, 6, "蒂娜村周邊28~29", "蒂娜村附近(454,328)(457,329)", 110, "Y"], [70, "致命螳螂", 3, 20, 43, 18, 27, 12, "A", 4, "N", 5, 6, "井底道路18~20", "通往烏克蘭村的井底道路2樓(44,4)", 60, "Y"], [71, "土蜘蛛", 3, 26, 15, 18, 23, 23, "A", 10, "N", 2, 9, "牛鬼的洞窟9~14,海賊指揮部6~10,聖村倉庫10~12,流星山丘18~20,哥拉爾城內(91.136)瓦吉之館的秘密通道56", "牛鬼討伐任務, 對戰鬼犬時會出現", "X", "Y"], [72, "水蜘蛛", 3, 24, 16, 17, 20, 28, "B", 10, "S", 3, 9, "風洞21~23", "洪恩大風穴(9,31)(10,33)", 30, "Y"], [73, "火蜘蛛", 3, 22, 22, 16, 25, 20, "C", 10, "N", 2, 9, "試煉洞窟1~4,哈洞7~9,聖村倉庫10~12,流星山丘18~20,哥拉爾城內(91.136)瓦吉之館的秘密通道56", "試煉洞窟5樓(22,14)", 10, "Y"], [74, "風蜘蛛", 3, 25, 28, 15, 19, 18, "D", 10, "S", 3, 9, "迷路之穴5~9,沙塵洞窟24~29,風之洞窟30", "X", "X", "Y"], [75, "樹精", 4, 32, 17, 32, 12, 17, "B", 4, "N", 2, 8, "伊爾村周邊6~8,德威特島戴克斯特山脈5~15,坎那貝拉村外42~44", "伊爾村附近(561,211)(563,200)(568,196)", 15, "Y"], [76, "死亡樹精", 4, 28, 20, 37, 9, 16, "A", 6, "S", 4, 8, "蒂娜村周邊27~29", "蒂娜村附近(361,339)", 90, "Y"], [77, "黃金樹精", 4, 38, 22, 28, 10, 17, "D", 6, "G", 7, 8, "X", "[黃金樹任務]持有20級以上快枯死的樹精在流星山丘３００Ｍ西邊下山出山丘的飼養師寄宿所(148,199)與飼養師傅換得(限寵物系)", "X", "Y"], [78, "慘白樹精", 4, 29, 16, 28, 17, 20, "C", 3, "S", 4, 8, "德威特島戴克斯特山脈6~15,蒂娜村周邊26~30", "蒂娜村附近(570,240)(559,246)", 60, "Y"], [79, "冰冷樹精", 4, 30, 15, 27, 16, 22, "B", 7, "N", 3, 8, "亞留特村周邊10~13,奴克冰原12~15", "亞留特村附近(579,44)(685,156)", 10, "Y"], [80, "沼澤樹精", 4, 31, 14, 29, 15, 21, "A", 7, "S", 4, 8, "阿凱魯法村附近12~14", "米內葛爾島(171,385)", 50, "Y"], [81, "妖草", 4, 26, 11, 16, 16, 36, "A", 8, "N", 2, 9, "維諾亞村周邊11~13,土之洞窟12~16,米內葛爾島中部36~38", "維諾亞村周邊(422,357)(471,395)(490,392)", 25, "Y"], [82, "蔓陀羅草", 4, 25, 13, 14, 15, 38, "D", 5, "S", 3, 9, "傑諾瓦村周邊23~25,布朗山30~71", "傑諾瓦村附近(280,488)(281,489)", 45, "Y"], [83, "妖花", 4, 27, 12, 12, 19, 35, "C", 5, "S", 3, 9, "X", "再生花園任務報酬", "X", "Y"], [84, "人魔草", 4, 22, 17, 11, 14, 41, "B", 8, "S", 3, 9, "參道33~35", "X", "X", "Y"], [85, "綠色口臭鬼", 4, 38, 23, 16, 15, 23, "D", 1, "N", 4, 7, "莎蓮娜海底24~26,米內葛爾島中部35~37", "莎蓮娜海底1樓芙蕾雅側(9,12)(10,10)(10,13)", 60, "Y"], [86, "黃色口臭鬼", 4, 37, 27, 18, 11, 22, "D", 9, "N", 4, 7, "維諾亞村周邊11~14,阿凱魯法村附近12~14", "維諾亞村周邊(346,514)(371,446)(394,512)(416,564)", 20, "Y"], [87, "藍色口臭鬼", 4, 35, 25, 15, 18, 27, "B", 9, "S", 5, 7, "鯰魚內25~27,亞諾曼城周邊5~8,米內葛爾島中部36~38", "鯰魚洞窟胃袋(53,43)鯰魚大王胃袋(59,41)", 60, "Y"], [88, "紅色口臭鬼", 4, 44, 21, 14, 12, 29, "B", 1, "N", 4, 7, "尼維爾村周邊(??),大樹66~67", "尼維爾海村以西(460,350)以及[5等勳章任務]大樹1F(27,5)", 25, "Y"], [89, "兇暴仙人掌", 4, 27, 29, 22, 12, 20, "D", 5, "N", 3, 8, "詛咒的迷宮地下41~50樓50~52", "詛咒的迷宮地下41樓(10,20)", 60, "Y"], [90, "武術仙人掌", 4, 24, 32, 27, 10, 17, "A", 5, "S", 4, 8, "索奇亞沙漠19~21", "加納沙漠(546,407)(561,401)", 60, "Y"], [91, "兔耳仙人掌", 4, 28, 35, 19, 14, 14, "C", 5, "S", 4, 8, "索奇亞沙漠19~21", "加納沙漠(627,302)(634,296)", 40, "Y"], [92, "印地安仙人掌", 4, 26, 36, 24, 9, 15, "B", 5, "N", 3, 8, "奇利村周邊16~18", "奇利村附近(306,329)(341,316)(343,312)(345,314)", 60, "Y"], [93, "火焰舞者", 4, 19, 38, 18, 15, 25, "B", 2, "G", 5, 8, "X", "鯰魚大王任務報酬", "X", "Y"], [94, "史萊姆", 5, 46, 26, 11, 6, 16, "D", 1, "N", 1, 9, "哈洞7~9,暖爐之底13~15,佈滿青苔的洞窟17~20,科學家的牢房19~21,忍者之家16~18", "法蘭城龜裂的地下道全域", 5, "Y"], [95, "液態史萊姆", 5, 49, 24, 15, 5, 12, "A", 1, "N", 2, 9, "迷路之穴5~9,庫魯克斯島(349.592)紳士淑女養成學校的訓練設施11~13,科學家的牢房19~21", "法蘭城龜裂的地下道地圖上的NPC", "X", "Y"], [96, "果凍史萊姆", 5, 45, 31, 6, 10, 13, "B", 1, "S", 3, 9, "科學家的牢房19~21,忍者之家16~18,莎蓮娜海底24~26,奇怪的坑道26~30,炎之洞窟39~47", "莎蓮娜海底通道一樓傑村側(7,8)", 40, "Y"], [97, "布丁史萊姆", 5, 40, 25, 12, 8, 20, "C", 1, "S", 3, 9, "科學家的牢房19~21,鯰魚內25~27,王族的通道49", "鯰魚大王胃袋(第一層)(97,84)", 45, "Y"], [98, "火精", 5, 25, 25, 25, 25, 25, "C", 10, "G", 6, 9, "X", "火焰鼠彩卷A獎", "X", "Y"], [99, "風精", 5, 25, 25, 25, 25, 25, "D", 10, "G", 6, 9, "X", "火焰鼠彩卷A獎", "X", "Y"], [100, "水精", 5, 25, 25, 25, 25, 25, "B", 10, "G", 6, 9, "X", "火焰鼠彩卷A獎", "X", "Y"], [101, "地精", 5, 25, 25, 25, 25, 25, "A", 10, "G", 6, 9, "X", "火焰鼠彩卷A獎", "X", "Y"], [102, "頑皮炸彈", 5, 15, 15, 15, 15, 40, "A", 8, "N", 1, 10, "土之洞窟12~16,南恰拉山第1通道18~22", "南恰拉山第1通道1樓(29,5)(30,7)(33,5)(35,5)", 60, "Y"], [103, "寶貝炸彈", 5, 14, 17, 11, 16, 42, "B", 8, "S", 2, 10, "霞之洞窟3~14,里歐波多洞窟20~24,詛咒的迷宮地下31~40樓", "詛咒的迷宮地下36樓(22,5)", 60, "Y"], [104, "大炸彈", 5, 12, 20, 14, 14, 40, "C", 8, "S", 2, 10, "貝茲雷姆迷宮34~36,魯米那斯附近47~48", "X", "X", "Y"], [105, "漂浮炸彈", 5, 16, 14, 14, 17, 39, "D", 8, "N", 1, 10, "競技場迷宮7~9,地下迷宮9~16,風之洞窟26~31,迷龍之巢29~34", "法蘭城內競技場迷宮第一地圖(53,43)(已關閉)", "X", "Y"], [106, "丸子炸彈", 5, 17, 17, 7, 17, 47, "D", 5, "G", 6, 10, "X", "火焰鼠彩卷B獎", "X", "Y"], [107, "幻影", 5, 20, 26, 25, 17, 32, "C", 10, "N", 6, 6, "佛利波羅島56~58,冰雪的牢城56~57,阿卡斯島56~58,風鳴之塔56~57,六曜之塔56~57", "X", "X", "N"], [108, "旋律影子", 5, 24, 28, 22, 19, 27, "B", 10, "N", 6, 6, "佛利波羅島56~58,冰雪的牢城56~57,阿卡斯島56~58,風鳴之塔56~57,六曜之塔56~58", "X", "X", "N"], [109, "闇影", 5, 25, 23, 23, 23, 26, "D", 10, "N", 6, 6, "佛利波羅島56~58,冰雪的牢城56~57,阿卡斯島56~58,風鳴之塔56~57,六曜之塔56~59", "X", "X", "N"], [110, "陰影", 5, 28, 24, 22, 22, 24, "A", 10, "N", 6, 6, "佛利波羅島56~58,冰雪的牢城56~57,阿卡斯島56~58,風鳴之塔56~57,六曜之塔56~60", "X", "X", "N"], [111, "血腥之刃", 6, 9, 39, 34, 14, 24, "A", 9, "S", 6, 6, "黑色祈禱19~20,詛咒的迷宮地下11~20樓41~43", "詛咒的迷宮地下18樓(22,12)", 90, "Y"], [112, "殺龍之刃", 6, 17, 37, 41, 11, 19, "B", 9, "N", 5, 6, "六曜之塔63~65", "X", "X", "Y"], [113, "火焰之刃", 6, 10, 39, 28, 12, 31, "C", 9, "N", 5, 6, "聖壇男路線36~38", "聖壇男路線第3層(17,16)(18,19)", 150, "Y"], [114, "烈風之刃", 6, 12, 44, 29, 13, 27, "D", 9, "S", 6, 6, "六曜之塔63~65", "X", "X", "Y"], [115, "嚇人箱", 6, 11, 26, 26, 11, 31, "C", 2, "N", 2, 9, "寶箱中隨機出現(高機率於黑色寶箱中出現)", "收穫季豐收寶窟/黃金迷宮(寶箱中隨機出現,皆時效性活動)", "X", "Y"], [116, "兔耳嚇人箱", 6, 9, 24, 23, 16, 33, "B", 2, "N", 2, 9, "寶箱中隨機出現(高機率於黑色寶箱中出現)", "收穫季豐收寶窟/黃金迷宮(寶箱中隨機出現,皆時效性活動)", "X", "Y"], [117, "紅魔嚇人箱", 6, 12, 32, 27, 12, 27, "B", 5, "N", 3, 8, "寶箱中隨機出現", "收穫季豐收寶窟/黃金迷宮(寶箱中隨機出現,皆時效性活動)", "X", "Y"], [118, "藍魔嚇人箱", 6, 15, 37, 28, 8, 22, "A", 2, "N", 3, 8, "寶箱中隨機出現", "收穫季豐收寶窟/黃金迷宮(寶箱中隨機出現,皆時效性活動)", "X", "Y"], [119, "綠蛙嚇人箱", 6, 13, 35, 29, 10, 23, "D", 2, "N", 3, 8, "寶箱中隨機出現", "收穫季豐收寶窟/黃金迷宮(寶箱中隨機出現,皆時效性活動)", "X", "Y"], [120, "純白嚇人箱", 6, 9, 24, 29, 11, 37, "D", 5, "S", 7, 9, "寶箱中隨機出現", "收穫季豐收寶窟/黃金迷宮(寶箱中隨機出現,皆時效性活動)", "X", "Y"], [121, "冰怪", 6, 20, 30, 46, 7, 12, "B", 10, "N", 4, 7, "聖壇女路線36~38", "聖壇女路線第3層(134,85)(131,79)", 120, "Y"], [122, "石怪", 6, 15, 38, 43, 6, 13, "A", 10, "N", 4, 7, "X", "[月亮俱樂部任務]第28天到芙蕾雅島魔女之家找馬梅達美對話後,至魔法陣中央使用珍妮給予的石像怪的製造方法", "X", "Y"], [123, "銀怪", 6, 10, 32, 48, 8, 17, "C", 10, "N", 4, 7, "X", "在法蘭城冒險者旅館3F用三箱古錢交換(2970個古錢)", "X", "Y"], [124, "金怪", 6, 14, 41, 40, 5, 15, "D", 10, "N", 4, 7, "X", "在法蘭城冒險者旅館3F用十箱古錢交換(9990個古錢)", "X", "Y"], [125, "惡魔螃蟹", 6, 16, 32, 35, 11, 11, "B", 2, "N", 2, 9, "維諾亞洞窟16~18,誓約的海道32~34", "維諾亞洞窟1樓(42,66)", 25, "Y"], [126, "水晶螃蟹", 6, 18, 31, 36, 10, 10, "B", 8, "N", 2, 9, "蒂娜村周邊29~31,水之洞窟54~61", "蒂娜村附近(517,238)", 120, "Y"], [127, "鐵剪螃蟹", 6, 14, 34, 37, 12, 8, "D", 2, "S", 3, 9, "加納村周邊17~19,誓約的海道32~34,貝尼恰斯火山71~75", "加納村周邊(501,209)(462,205)", 100, "Y"], [128, "黃金螃蟹", 6, 22, 30, 34, 7, 12, "D", 8, "S", 3, 9, "井底道路19~20,米內葛爾島中部37~39", "井底道路2樓(22,29)", 80, "Y"], [129, "蜥蜴戰士", 7, 22, 32, 32, 12, 12, "D", 3, "N", 3, 8, "索奇亞海底18~20,維諾亞海底26~27,永久凍土54~63,咨詢60~64", "海底2層(8,47)", 60, "Y"], [130, "蜥蜴鬥士", 7, 18, 37, 37, 8, 10, "A", 3, "S", 4, 8, "羅連斯研究塔21~23,詔二44~46,深淵54~63,咨詢60~64", "詛咒的迷宮地下22樓(17,10)", 60, "Y"], [131, "蜥蝪武士", 7, 20, 31, 30, 15, 14, "B", 3, "N", 3, 8, "永久凍土54~63,咨詢60~64", "X", "X", "Y"], [132, "獵豹蜥蜴", 7, 23, 36, 28, 10, 13, "C", 3, "S", 4, 8, "南恰拉山口13~15,詔二44~46,深淵54~63,咨詢60~64", "詛咒的迷宮地下29樓(12,12)", 60, "Y"], [133, "大地翼龍", 7, 29, 28, 32, 20, 11, "A", 10, "S", 6, 6, "貝茲雷姆迷宮34~36,詛咒的迷宮地下1~10樓38~40,咨詢60~64", "詛咒的迷宮地下7樓(16,20)", 100, "Y"], [134, "寒冰翼龍", 7, 30, 30, 31, 17, 12, "B", 10, "N", 5, 6, "青龍的洞窟26~28", "青龍的洞窟第4層(11,23)", 50, "Y"], [135, "火焰翼龍", 7, 33, 33, 25, 16, 13, "C", 10, "N", 5, 6, "X", "[琥珀之卵6任務]打敗安潔可取得安潔可的逆十字,去蓋雷布倫森林找納塞對話", "X", "Y"], [136, "烈風翼龍", 7, 32, 30, 23, 20, 15, "D", 10, "S", 5, 6, "X", "X", "X", "Y"], [137, "翼龍", 7, 32, 30, 26, 19, 18, "B", 5, "G", "?", 6, "X", "X", "X", "Y"], [138, "地龍蜥", 7, 29, 34, 34, 15, 8, "A", 8, "N", 4, 7, "鯰魚洞窟23~25,深淵54~63,咨詢60~64", "鯰魚洞窟第3層(20,37)", 60, "Y"], [139, "水龍蜥", 7, 36, 38, 34, 11, 6, "B", 8, "N", 4, 7, "索奇亞海底18~20,維諾亞海底26~27,永久凍土54~63,咨詢60~64", "維諾亞海底洞窟第2層(49,8)", 35, "Y"], [140, "火龍蜥", 7, 32, 37, 37, 12, 7, "C", 8, "S", 5, 7, "峽之洞窟46~50,深淵54~63,咨詢60~64", "酒之殿堂外(765,48 )", 150, "Y"], [141, "風龍蜥", 7, 35, 35, 31, 10, 9, "D", 8, "S", 5, 7, "地底湖17~19,永久凍土54~63,咨詢60~64", "傑諾瓦村附近(145,522)", 60, "Y"], [142, "哥布林", 8, 27, 27, 27, 17, 7, "A", 7, "N", 1, 9, "法蘭城周邊1~5,哥布林之家3~12,牛鬼的洞窟9~13,里歐波多洞窟20~25", "法蘭城門外,牛鬼討伐任務對戰鬼犬時", 5, "Y"], [143, "紅帽哥布林", 8, 23, 30, 29, 20, 5, "B", 7, "N", 2, 9, "法蘭城周邊3~4,哥布林之家3~12,哥拉爾城周邊11~13,維諾亞村周邊11~14,里歐波多洞窟20~25", "維諾亞村周邊,牛鬼任務", "X", "Y"], [144, "火焰哥布林", 8, 22, 28, 26, 15, 14, "C", 7, "S", 3, 9, "牛鬼的洞窟9~13,傑諾瓦村周邊23~25,魯米那斯附近45~46", "傑諾瓦村附近(257,593)", 60, "Y"], [145, "烈風哥布林", 8, 30, 26, 24, 23, 4, "D", 7, "S", 3, 9, "奇怪的坑道26~30", "深淵地下水脈(44,56) ", "X", "Y"], [146, "巨人", 8, 38, 35, 24, 9, 14, "A", 10, "N", 5, 6, "風鳴之塔60~62", "風鳴之塔10樓(14,62)(15,62)", 50, "Y"], [147, "單眼巨人", 8, 34, 34, 20, 12, 20, "B", 10, "S", 6, 6, "X", "X", "X", "Y"], [148, "泰坦巨人", 8, 39, 30, 28, 8, 15, "D", 10, "S", 6, 6, "庫魯克斯島(349.592)紳士淑女養成學校的訓練設施11~13", "X", "X", "Y"], [149, "亞特拉斯巨神", 8, 37, 37, 17, 17, 12, "C", 10, "S", 6, 6, "風鳴之塔60~62", "風鳴之塔10樓(60,65)", 50, "Y"], [150, "盜賊", 8, 23, 28, 21, 31, 12, "C", 5, "N", 3, 7, "伊爾外1~9,聖拉魯卡域3~5,牛鬼的洞窟9~14,海賊的洞窟11~14,維諾亞周邊10~15,加納周邊18~21,奇利周邊17~19", "伊爾村近郊", "X", "N"], [151, "山賊", 8, 28, 27, 24, 26, 10, "D", 5, "N", 4, 7, "加納12~20,奇利17~19,奴克冰原14~22,地下遺跡45~49", "X", "X", "N"], [152, "海盜", 8, 19, 31, 23, 28, 14, "B", 5, "N", 4, 7, "海賊的洞窟11~14,加納村周邊18~20", "X", "X", "N"], [153, "破壞狂", 8, 27, 26, 30, 24, 8, "A", 5, "N", 4, 7, "奇怪的坑道26~31", "X", "X", "N"], [154, "鳥人", 8, 17, 17, 17, 37, 22, "D", 1, "N", 3, 8, "亞留特村周邊10~13,大樹66~67", "亞留特村附近(620,65)", 10, "Y"], [155, "幻歌妖", 8, 15, 18, 20, 38, 19, "A", 1, "S", 4, 8, "貝茲雷姆神殿附近25~27", "貝茲雷姆迷宮附近(80,346)", 60, "Y"], [156, "狠毒鳥人", 8, 18, 19, 14, 39, 20, "B", 1, "N", 3, 8, "亞諾曼城周邊5~8,加納村周邊17~19", "加納村周邊(473,387)", 60, "Y"], [157, "烈風鳥人", 8, 13, 20, 12, 42, 23, "C", 1, "S", 4, 8, "阿巴尼斯村周邊31~33", "阿巴尼斯村附近(56,163)", 120, "Y"], [158, "黑暗鳥人", 8, 19, 11, 11, 43, 31, "D", 5, "S", 4, 8, "冰之洞窟57~59", "冰之洞窟2樓(65,39)", 120, "Y"], [159, "山飛甲", 0, 27, 21, 15, 30, 27, "D", 4, "N", "?", 6, "X", "X", "X", "Y"], [160, "獨角獸", 0, 17, 25, 13, 28, 37, "A", 4, "S", "?", 6, "X", "一等勳艾國獎品", "X", "Y"], [161, "天馬", 0, 22, 22, 12, 32, 32, "B", 4, "N", "?", 6, "X", "一等勳艾國獎品", "X", "Y"], [162, "麒麟", 0, 19, 27, 10, 34, 30, "C", 4, "S", "?", 6, "X", "X", "X", "Y"], [163, "地底龜", 0, 22, 22, 37, 10, 19, "D", 5, "N", "?", 8, "X", "X", "X", "Y"], [164, "海底龜", 0, 23, 20, 45, 4, 18, "A", 5, "S", 4, 8, "坎那貝拉村外42~45", "庫魯克斯島坎那貝拉村西(447,320)", 50, "Y"], [165, "火焰龜", 0, 27, 17, 42, 7, 17, "B", 5, "N", 3, 8, "米內葛爾島中部35~37", "米內葛爾島中部(378,268)", 60, "Y"], [166, "硬殼龜", 0, 26, 16, 47, 5, 16, "C", 5, "S", 4, 8, "無人的洞窟", "X", "X", "Y"], [167, "鐮刀魔", 1, 23, 35, 18, 17, 32, "A", 10, "N", "?", 6, "X", "一等勳蘭國獎品", "X", "N"], [168, "暗黑僧侶", 1, 17, 37, 22, 12, 37, "B", 10, "S", 7, 6, "X", "X", "X", "N"], [169, "斬首者", 1, 19, 42, 20, 15, 29, "C", 10, "S", "?", 6, "X", "一等勳蘭國獎品", "X", "N"], [170, "冥界死神", 1, 25, 40, 12, 21, 27, "D", 10, "N", "?", 6, "X", "X", "X", "N"], [171, "牙骨", 1, 27, 32, 32, 12, 7, "D", 1, "N", "?", 8, "X", "X", "X", "Y"], [172, "顎牙", 1, 32, 29, 37, 7, 5, "A", 1, "S", 4, 8, "伊姆爾森林68~70", "X", "X", "Y"], [173, "巨牙", 1, 25, 30, 27, 17, 11, "B", 1, "N", 3, 8, "南恰拉山第2通道21~23", "南恰拉山第2通道1樓(9,23)", 90, "Y"], [174, "利牙", 1, 30, 37, 30, 9, 4, "C", 1, "S", "?", 8, "X", "X", "X", "Y"], [175, "獅鷲獸", 2, 22, 32, 12, 42, 17, "D", 4, "N", "?", 6, "X", "狩獵任務得到的蛋孵化出", "X", "Y"], [176, "變種獅鷲獸", 2, 26, 29, 15, 39, 16, "A", 4, "N", "?", 6, "X", "X", "X", "Y"], [177, "布雷歐", 2, 20, 34, 9, 47, 15, "B", 4, "S", "?", 6, "X", "X", "X", "Y"], [178, "依格羅斯", 2, 18, 36, 11, 44, 16, "C", 4, "S", "?", 6, "X", "X", "X", "Y"], [179, "托羅帝鳥", 2, 32, 20, 13, 35, 10, "D", 2, "N", 3, 8, "X", "X", "X", "Y"], [180, "岩地跑者", 2, 27, 22, 17, 32, 12, "A", 2, "S", 4, 8, "米內葛爾島中部37~39", "米內葛爾島中部(433,133) / 狩獵任務得到的蛋", 90, "Y"], [181, "火焰啄木鳥", 2, 22, 27, 19, 29, 13, "B", 2, "N", 3, 8, "雷姆爾山新道28~32", "X", "X", "Y"], [182, "狂奔鳥", 2, 25, 24, 18, 36, 7, "C", 2, "S", "?", 8, "X", "X", "X", "Y"], [183, "甲蟲", 3, 17, 37, 32, 12, 17, "A", 8, "N", 4, 7, "南恰拉山口13~15", "南恰拉山口(312,403)", 50, "Y"], [184, "掘地蟲", 3, 20, 35, 36, 8, 16, "B", 8, "S", 5, 7, "坎那貝拉村南部森林", "庫魯克斯島坎那貝拉村南(551,420)", 25, "Y"], [185, "鍬型蟲", 3, 15, 39, 29, 14, 18, "C", 8, "N", 5, 7, "麥尼的洞窟70~71", "麥尼的洞窟?", "X", "Y"], [186, "獨角仙", 3, 18, 41, 34, 9, 14, "D", 8, "S", 5, 7, "坎那貝拉村南部森林", "米內葛爾島中部小島(514,353)  ", "?", "Y"], [187, "翠綠菇", 4, 37, 12, 12, 17, 37, "D", 4, "S", 5, 7, "坎那貝拉村外42~44", "庫魯克斯島坎那貝拉村西(458,299)", 30, "Y"], [188, "水藍菇", 4, 38, 15, 13, 15, 34, "A", 4, "N", 4, 7, "阿凱魯法村附近11~13", "米內葛爾島(241,268)", 80, "Y"], [189, "粉紅菇", 4, 35, 10, 15, 14, 41, "B", 4, "N", 4, 7, "地下遺跡45~49", "小梅之間(10,17)", 90, "Y"], [190, "星菇", 4, 40, 13, 10, 13, 39, "C", 4, "S", 5, 7, "米內葛爾島中部36~38", "米內葛爾島中部(311,79)", 100, "Y"], [191, "綠煙", 5, 20, 20, 14, 25, 36, "D", 3, "N", "?", 7, "X", "X", "X", "Y"], [192, "煙霧", 5, 23, 23, 8, 30, 31, "A", 3, "N", 4, 7, "米諾基亞村周邊46~48,艾爾卡絲之家60", "米諾基亞村附近(616,834)", 20, "Y"], [193, "煙羅", 5, 22, 22, 12, 27, 32, "B", 3, "S", 5, 7, "貝尼恰斯火山71~75", "貝尼恰斯火山地下9樓(30,56)", 40, "Y"], [194, "棉球", 5, 25, 26, 9, 25, 30, "C", 3, "S", "?", 7, "X", "盲目之龍艾汀任務獎品 ", "X", "Y"], [195, "盾", 6, 15, 15, 45, 15, 30, "D", 4, "S", "?", 6, "X", "X", "X", "Y"], [196, "潛盾", 6, 17, 12, 47, 12, 32, "A", 4, "N", 5, 6, "哥拉爾城周邊12~14", "庫魯克斯島哥拉爾城附近(153,405)", 40, "Y"], [197, "強盾", 6, 19, 13, 49, 11, 28, "B", 4, "N", 5, 6, "魯米那斯附近45~46", "庫魯克斯島魯米那斯附近(364,606)", 30, "Y"], [198, "神盾", 6, 16, 9, 50, 8, 37, "C", 4, "S", 6, 6, "雷克塔爾村南側48", "庫魯克斯島(731,672)", 10, "Y"], [199, "岩怪", 6, 29, 22, 40, 5, 14, "A", 7, "S", 4, 8, "魯米那斯附近47~48,貝尼恰斯火山71~75", "庫魯克斯島貝尼恰斯火山域(500,632)", 20, "Y"], [200, "爆岩", 6, 30, 20, 42, 6, 12, "B", 7, "N", 3, 8, "伊利斯礦山", "伊利斯礦山大坑道(105,34)", 30, "Y"], [201, "熔岩", 6, 32, 17, 37, 7, 17, "C", 7, "S", 4, 8, "貝尼恰斯火山71~75", "貝尼恰斯火山2樓(59,44)", 60, "Y"], [202, "影岩", 6, 31, 15, 32, 12, 20, "D", 7, "N", 3, 8, "諾斯菲拉特59", "X", "X", "Y"], [203, "希特拉", 7, 42, 42, 27, 7, 7, "A", 6, "N", "?", 6, "詛咒者的洞窟(地)76", "X", "X", "Y"], [204, "蛟龍", 7, 40, 44, 25, 8, 8, "B", 6, "S", "?", 6, "詛咒者的洞窟(水)76", "X", "X", "Y"], [205, "埃及眼鏡蛇", 7, 38, 45, 30, 6, 6, "C", 6, "N", "?", 6, "詛咒者的洞窟(火)76", "X", "X", "Y"], [206, "八岐大蛇", 7, 46, 46, 23, 5, 5, "D", 6, "S", "?", 6, "X", "X", "X", "Y"], [207, "口袋龍", 7, 15, 34, 21, 20, 25, "D", 5, "N", 4, 7, "魯米那斯附近45~46", "庫魯克斯島魯米那斯附近(292,819)", 30, "Y"], [208, "迷你龍", 7, 10, 35, 23, 21, 26, "A", 5, "S", 5, 7, "X", "虛弱雛鳥任務的報酬", "X", "Y"], [209, "雛龍", 7, 12, 32, 22, 22, 27, "B", 5, "S", 5, 7, "弗利德島、皇后陵寢、雪拉威森塔", "皇后陵寢(58.45)(帶隊者身上須攜帶草葉彩苗)、到達方法參考任務：彩葉草之戀", "X", "Y"], [210, "穴龍", 7, 11, 31, 20, 25, 28, "C", 5, "N", 4, 7, "哥拉爾城周邊12~14", "庫魯克斯島哥拉爾城北(402,345)", 60, "Y"], [211, "大型半獸人", 8, 34, 25, 35, 10, 11, "A", 6, "N", 4, 7, "魯米那斯附近45~47", "庫魯克斯島魯米那斯附近(460,629)", 30, "Y"], [212, "豬鬼", 8, 33, 28, 33, 11, 10, "B", 6, "S", 5, 7, "雷克塔爾村北側48~49", "雷克塔爾村以西(383,265)", 20, "Y"], [213, "鋼鬼", 8, 30, 30, 30, 16, 9, "C", 6, "S", 5, 7, "米諾基亞村周邊46~47", "米諾基亞村東門外(549,838)", 20, "Y"], [214, "半獸人", 8, 32, 27, 32, 12, 12, "D", 6, "N", 4, 7, "哥拉爾城周邊11~13", "庫魯克斯島哥拉爾城周邊(425,453)", 60, "Y"], [215, "陸行鯊", 2, 29, 15, 36, 14, 9, "A", 3, "N", 2, 8, "法蘭城遺跡2~4,溫迪爾平原2~4", "法蘭城遺跡全域", "X", "Y"], [216, "沙地鯊(缺)", 2, 23, 13, 28, 23, 8, "B", 10, "N", "?", 10, "X", "X", "X", "N"], [217, "丘陵鯊(缺)", 2, 18, 8, 18, 33, 4, "B", 10, "N", "?", 10, "溫迪爾平原5~9", "X", "X", "N"], [218, "岩石鯊", 2, 27, 36, 7, 8, 25, "B", 10, "N", 3, 10, "布拉基姆高地30~34", "布拉基姆高地(148,138)附近(瀑布前方)", "?", "Y"], [219, "雛鳥", 2, 7, 8, 5, 38, 39, "D", 10, "G", 9, 10, "X", "X", "X", "Y"], [220, "鴨嘴獸(缺)", 2, 10, 23, 7, 23, 28, "B", 10, "G", 9, 10, "溫迪爾平原5~9", "X", "X", "Y"], [221, "小鴨子", 2, 8, 14, 7, 34, 28, "A", 10, "G", 9, 10, "溫迪爾平原2~4", "X", "X", "Y"], [222, "小兔子", 2, 11, 23, 7, 23, 28, "C", 10, "G", 9, 10, "X", "X", "X", "Y"], [223, "蛋白石怪(缺)", 6, 4, 8, 23, 4, 28, "A", 10, "N", "?", 10, "蓋雷布倫森林2~4,布拉基姆高地25~29", "X", "X", "N"], [224, "紅寶石怪(缺)", 6, 11, 23, 26, 6, 33, "A", 6, "N", 3, 10, "X", "X", "X", "Y"], [225, "岩蟲(缺)", 6, 28, 8, 23, 8, 23, "D", 2, "N", 4, 10, "布拉基姆高地40~45", "X", "X", "Y"], [226, "水晶怪(缺)", 6, 18, 8, 33, 4, 43, "A", 10, "G", 5, 10, "X", "X", "X", "N"], [227, "刀雞(缺)", 0, 4, 8, 4, 23, 8, "D", 10, "N", "?", 10, "蓋雷布倫森林10~14,布拉基姆高地25~29", "X", "X", "N"], [228, "劍鴕鳥(缺)", 0, 4, 18, 8, 23, 13, "D", 10, "N", "?", 10, "溫迪爾平原5~9", "X", "X", "N"], [229, "大刀鴯苗(缺)", 0, 7, 38, 8, 35, 21, "D", 10, "N", 3, 8, "布拉基姆高地30~34", "X", "X", "Y"], [230, "刀鋒阿姆鳥(缺)", 0, 4, 28, 8, 23, 23, "D", 10, "N", "?", 10, "L1恩‧凱迴廊2~4,L2恩‧凱迴廊10~14,L3恩‧凱迴廊20~24", "X", "X", "N"], [231, "火蜥蜴(缺)", 7, 33, 18, 18, 18, 28, "C", 10, "N", "?", 10, "L1阿陀羅迴廊2~4,L2阿陀羅迴廊10~14,L3阿陀羅迴廊20~24,盡頭的風穴75~79", "X", "X", "N"], [232, "毒蜥蜴(缺)", 7, 23, 8, 13, 8, 18, "A", 10, "N", "?", 10, "蓋雷布倫森林10~14,深草的綠洞43~49,怨靈的赤窟48~64", "X", "X", "N"], [233, "冰蜥蜴", 7, 26, 12, 33, 7, 27, "B", 10, "N", 3, 8, "罪之房1樓, L1花羅迴廊2~4,L2花羅迴廊10~14,L3花羅迴廊20~24", "罪之房1樓(131,51)", "?", "Y"], [234, "金屬蜥蜴(缺)", 7, 18, 8, 33, 4, 28, "A", 10, "S", 4, 7, "布拉基姆高地35~39", "X", "X", "Y"], [235, "戴靴怪", 3, 9, 9, 30, 26, 26, "A", 6, "N", 2, 8, "法蘭城遺跡2~4,L1威雷迴廊2~4,L2威雷迴廊10~14,L3威雷迴廊20~24", "X", "X", "Y"], [236, "舞靴怪(缺)", 3, 8, 13, 31, 35, 11, "C", 4, "N", 3, 8, "蓋雷布倫森林10~14,黑歷史之石洞20~27", "黑歷史之石洞4F(250.89)", "X", "Y"], [237, "潛靴怪(缺)", 3, 9, 25, 9, 34, 26, "D", 4, "N", 3, 8, "黑歷史之石洞20~27", "X", "X", "Y"], [238, "咚咚靴怪(缺)", 3, 4, 18, 23, 38, 8, "A", 10, "N", 3, 10, "布拉基姆高地30~34", "X", "X", "Y"], [239, "大公雞(缺)", 9, 4, 38, 4, 38, 48, "D", 10, "G", "?", 10, "法蘭城遺跡50,蓋雷布倫森林50,溫迪爾平原50", "X", "X", "N"], [240, "耶誕靴怪(缺)", 3, 7, 24, 13, 17, 7, "D", 10, "G", "?", 9, "X", "X", "X", "Y"], [241, "鑽石怪(缺)", 6, 31, 9, 23, 8, 25, "A", 10, "S", 3, 7, "布拉基姆高地30~34", "X", "X", "Y"], [242, "死神公雞", 9, 52, 52, 52, 52, 52, "B", 7, "G", "?", 10, "雪拉威森塔", "X", "X", "N"], [243, "銀獅", 0, 18, 42, 10, 32, 5, "C", 3, "S", 5, 5, "布拉基姆高地40~45", "布拉基姆高地(168,116)(171,117)附近(瀑布上方)", "X", "Y"], [244, "黃銅怪", 0, 32, 21, 10, 34, 18, "A", 7, "N", 2, 6, "X", "地之昏神的領域(146,143)(147,141)", "X", "Y"], [245, "鐵獅", 0, 19, 40, 11, 30, 5, "C", 10, "N", 3, 8, "罪之房38~40,盡頭的風穴75~79", "罪之房二層(128,55)", "?", "Y"], [246, "紅銅怪", 0, 27, 30, 13, 26, 19, "B", 7, "N", 2, 6, "X", "水之昏神的領域(167,101)(168,107)", "X", "Y"], [247, "跳跳地雷", 6, 31, 18, 16, 8, 33, "A", 10, "N", 3, 8, "罪之房38~40", "罪之房三層(209,224)", "?", "Y"], [248, "碎碎地雷", 6, 17, 27, 37, 7, 17, "C", 4, "N", 3, 8, "蟲洞29~34", "X", "X", "Y"], [249, "皮皮地雷(缺)", 6, 14, 30, 40, 7, 14, "A", 6, "S", 3, 7, "技能大師宴會任務密道", "技能大師宴會任務密道２Ｆ(77,108)附近", "X", "Y"], [250, "薩普地雷(缺)", 6, 13, 28, 38, 8, 23, "B", 4, "N", 4, 7, "深草的綠洞43~49,怨靈的赤窟48~64", "X", "X", "Y"], [251, "龍骨", 1, 7, 37, 12, 22, 27, "D", 5, "N", 3, 8, "布拉基姆高地30~34", "X", "X", "Y"], [252, "暗黑龍骨(缺)", 1, 4, 47, 11, 12, 27, "D", 2, "S", 3, 5, "技能大師宴會任務密道", "X", "X", "Y"], [253, "黃金龍骨", 1, 7, 42, 11, 12, 32, "D", 5, "S", 4, 6, "布拉基姆高地35~39", "布拉基姆高地(236,224)附近(挖掘鐵人任務方向)", "X", "Y"], [255, "走路花妖", 4, 8, 39, 25, 12, 19, "D", 3, "N", 3, 9, "布拉基姆高地", "布拉基姆高地(165.243)(蟲洞側)", "?", "Y"], [256, "跑步花妖", 4, 14, 41, 16, 17, 14, "A", 8, "N", 3, 8, "黑歷史之石洞20~27", "黑歷史之石洞6F(240.130)([岩屋七賢]任務,由5F(219.90)往下到6F)", "X", "Y"], [257, "舞蹈花妖", 4, 45, 14, 11, 7, 38, "B", 7, "N", 3, 7, "蟲洞28~31", "辛梅爾(181.82)公寓[騎寵駕訓班]任務第9天與溜五郎教官對話取得", "X", "Y"], [258, "(未命名)(缺)", 4, 13, 38, 23, 8, 8, "A", 3, "S", 3, "?", "X", "X", "X", "Y"], [261, "拉札魟怪", 2, 26, 31, 20, 24, 9, "C", 7, "N", 2, 8, "光之路", "光之路(218.103)(221.103)", "X", "Y"], [262, "拉賈魟怪", 2, 35, 24, 13, 31, 7, "D", 10, "X", "?", 8, "雪拉威森塔", "雪拉威森塔第30層(41.57)", "X", "Y"], [263, "烏賊怪;", 4, 29, 33, 38, 7, 8, "C", 6, "N", 4, 7, "光之路", "光之路(264.250)", "X", "Y"], [272, "羅查", 7, 11, 20, 25, 35, 19, "B", 10, "N", 2, 8, "雪拉威森塔", "雪拉威森塔28F(68.63)", "X", "Y"], [282, "潛地龍", 6, 33, 38, 33, 4, 8, "D", 8, "N", 1, 7, "光之路", "光之路(190.92)(196.89)", "X", "Y"], [283, "布卡", 0, 27, 22, 13, 45, 8, "A", 9, "S", 2, 8, "光之路、雪拉威森塔5-14F", "雪拉威森塔14F全域(以二連戰方式登場)", "X", "Y"], [286, "妖化布卡", 0, 18, 15, 16, 51, 15, "C", 1, "S", 2, 8, "光之路、雪拉威森塔", "雪拉威森塔33F全域(以二連戰方式登場)", "X", "Y"], [291, "玫瑰粉怪", 5, 7, 23, 46, 28, 6, "A", 10, "N", 2, 8, "雪拉威森塔", "雪拉威森塔34F(52.186)", "X", "Y"], [300, "德魯伊之鬼", 5, 16, 12, 23, 22, 47, "A", 10, "N", 2, 8, "雪拉威森塔", "雪拉威森塔", "X", "Y"], [303, "尤拉蝙蝠", 2, 22, 22, 22, 22, 22, "A", 10, "N", 1, 10, "試驗之間第三區域", "試驗之間第三區域,新手任務完成後隨機二選一", "X", "Y"], [304, "歐比爾蝙蝠", 2, 22, 22, 22, 22, 22, "B", 10, "N", 1, 10, "光之路", "X", "X", "Y"], [305, "韋伯蝙蝠", 2, 22, 22, 22, 22, 22, "C", 10, "N", 1, 10, "雪拉威森塔", "雪拉威森塔5F(273.172)", "X", "Y"], [306, "歐圖蝙蝠", 2, 22, 22, 22, 22, 22, "D", 10, "N", 1, 10, "試驗之間第二區域", "試驗之間第二區域,新手任務完成後隨機二選一", "X", "Y"], [307, "愛絲波波", 5, 34, 35, 18, 19, 14, "D", 5, "N", 1, 10, "未開放", "當期回饋卷", "X", "Y"]];


    const pts2 = Pts.map(n => {
        const res = n.slice(0, 10)
        if (res[1] == "使魔" || res[1] == "小蝙蝠") {
            res[8] = 0.3;
        } else {
            res[8] = 0.2;
        }
        return res;
    });


    const mappedpet2 = tableData.map(n => [null, n[1], null,
        n[3], n[4], n[5], n[6], n[7], 0.2
    ]);


    let allpets = [...pts2, ...mappedpet2];
    fs.writeFileSync("mergedpets.json",
        JSON.stringify(allpets));

    return allpets;

}

export {parse};

//   const elements1 = parseElementString("地3水7");
// console.log(elements1); // { 火: 5, 風: 5 }

// const elements2 = parseElementString("火10");
// console.log(elements2); // { 火: 10 }

// const elements3 = parseElementString("地5水5");
// console.log(elements3); // { 地: 5, 水: 5 }