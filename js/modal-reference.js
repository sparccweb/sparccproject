// -------------------------------------
// This object only stored the data which is missing in SlickPlan export.
// We use thins data ONLY to populate islands->popups objects
//
// Types:
// 0 - video only,
// 1 - text (info icon)
// 2 - text (newspaper icon)
//
// 3 - policy
// 4 - capital
// 5 - health
// 6 - climate
// 7 - learning
// 8 - evolution
// 9 - partners
// 10 - reports
//
// Types 1 to  are the same thing except the icon
// -------------------------------------


const markersRef = {

    // -------------------------------------

    'A01': {
        pos: [813, 1505],
        type: 2,
        labels: ['Site Story']
    },
    'A02': {
        pos: [752, 1390],
        type: 1,
        labels: ['Grants', 'Racial Equity', 'Arts & Culture']
    },
    'A03': {
        pos: [755, 1560],
        type: 1,
        labels: ['Grants', 'Climate']
    },
    'A04': {
        pos: [662, 1490],
        type: 1,
        labels: ['Grants', 'Climate']
    },
    'A05': {
        pos: [680, 1555],
        type: 1,
        labels: ['Grants', 'Climate']
    },
    'A06': {
        pos: [710, 1580],
        type: 1,
        labels: ['Grants', 'Housing', 'Education']
    },
    'A07': {
        pos: [730, 1620],
        type: 1,
        labels: ['Grants', 'Housing']
    },
    'A08': {
        pos: [660, 1630],
        type: 1,
        labels: ['Grants', 'ETOD']
    },
    'A09': {
        pos: [831, 1555],
        type: 1,
        labels: ['Grants', 'Policy']
    },
    'A10': {
        pos: [771, 1600],
        type: 1,
        labels: ['Grants', 'Health', 'Arts & Culture']
    },
    'A11': {
        pos: [870, 1500],
        type: 0,
        labels: ['Site Story']
    },
    'A12': {
        pos: [815, 1285],
        labels: ['Site Story'],
        type: 0,
    },
    'A13': {
        pos: [840, 1600],
        type: 0,
        labels: ['Site Story']
    },
    'A14': {
        pos: [840, 1470],
        type: 2,
        labels: ['Site Story']
    },

    // -------------------------------------

    'M01': {
        pos: [1445, 1532],
        type: 2,
        labels: ['Site Story']
    },
    'M02': {
        pos: [1503, 1536],
        type: 1,
        labels: ['Grants']
    },
    'M03': {
        pos: [1410, 1484],
        type: 1,
        labels: ['Grants', 'Health']
    },
    'M04': {
        pos: [1463, 1649],
        type: 1,
        labels: ['Capital']
    },
    'M05': {
        pos: [1410, 1615.],
        type: 0,
        labels: ['Site Story']
    },
    'M06': {
        pos: [1316, 1618],
        type: 1,
        labels: ['Grants', 'Housing']
    },
    'M07': {
        pos: [1398, 1697],
        type: 1,
        labels: ['Grants']
    },
    'M08': {
        pos: [1448, 1505],
        type: 1,
        labels: ['Grants', 'Housing']
    },
    'M09': {
        pos: [1417, 1588],
        type: 0,
        labels: ['Site Story']
    },
    'M10': {
        pos: [1547, 1593],
        type: 1,
        labels: ['Grants']
    },
    'M11': {
        pos: [1490, 1705],
        type: 1,
        labels: ['Grants']
    },

    // -------------------------------------

    'B01': {
        pos: [1709, 800],
        type: 2,
        labels: ['Site Story']
    },
    'B02': {
        pos: [1726, 1060],
        type: 1,
        labels: ['Grants', 'Capital', 'Housing']
    },
    'B03': {
        pos: [1817, 1019],
        type: 1,
        labels: ['Grants', 'Capital', 'Housing']
    },
    'B04': {
        pos: [1746, 890],
        type: 1,
        labels: ['Grants', 'ETOD']
    },
    'B05': {
        pos: [1823, 1113],
        type: 0,
        labels: ['Site Story']
    },
    'B06': {
        pos: [1676, 1069],
        type: 0,
        labels: ['Site Story']
    },
    'B07': {
        pos: [1796, 1159],
        type: 0,
        labels: ['Site Story']
    },
    'B08': {
        pos: [1735, 937],
        type: 2,
        labels: ['Site Story']
    },

    // -------------------------------------

    'C01': {
        pos: [1946, 1487],
        type: 2,
        labels: ['Site Story']
    },
    'C02': {
        pos: [1954, 1383],
        type: 1,
        labels: ['Grants']
    },
    'C03': {
        pos: [1983, 1548],
        type: 1,
        labels: ['Capital', 'Health']
    },
    'C04': {
        pos: [1917, 1538],
        type: 2,
        labels: ['Capital', 'Health']
    },
    'C05': {
        pos: [1922, 1419],
        type: 1,
        labels: ['Climate', 'Grants']
    },
    'C06': {
        pos: [1928, 1507],
        type: 1,
        labels: ['Grants', 'Housing']
    },
    'C07': {
        pos: [1961, 1589],
        type: 1,
        labels: ['Grants', 'Policy', 'Climate', 'ETOD']
    },
    'C08': {
        pos: [1832, 1326],
        type: 1,
        labels: ['Grants', 'Health']
    },
    'C09': {
        pos: [2029, 1465],
        type: 1,
        labels: ['Grants', 'Racial Equity']
    },
    'C10': {
        pos: [1996, 1510],
        type: 1,
        labels: ['Grants']
    },
    'C11': {
        pos: [2010, 1423],
        type: 0,
        labels: ['Site Story']
    },
    'C12': {
        pos: [2045, 1648],
        type: 0,
        labels: ['Site Story']
    },
    'C13': {
        pos: [1975, 1482],
        type: 2,
        labels: ['Site Story']
    },

    // -------------------------------------

    'D01': {
        pos: [407, 1212],
        type: 2,
        labels: ['Site Story']
    },
    'D02': {
        pos: [432, 1277],
        type: 1,
        labels: ['Grants']
    },
    'D03': {
        pos: [417, 1239],
        type: 2,
        labels: ['Grants']
    },
    'D04': {
        pos: [573, 1219],
        type: 0,
        labels: ['Site Story']
    },
    'D05': {
        pos: [487, 1277],
        type: 0,
        labels: ['Site Story']
    },
    'D06': {
        pos: [640, 1138],
        type: 0,
        labels: ['Site Story']
    },
    'D07': {
        pos: [382, 1358],
        type: 1,
        labels: ['Grants']
    },
    'D08': {
        pos: [488, 1202],
        type: 2,
        labels: ['Site Story']
    },

    // -------------------------------------

    'G01': {
        pos: [1210, 1152],
        type: 3,
        labels: ['Policy', 'Site Story']
    },
    'G02': {
        pos: [1218,1194],
        type: 3,
        labels: ['Policy', 'Racial Equity', 'Housing']
    },
    'G03': {
        pos: [1056, 1231],
        type: 3,
        labels: ['Policy', 'Housing', 'Racial Equity']
    },
    'G04': {
        pos: [1338, 1391],
        type: 3,
        labels: ['Policy', 'ETOD']
    },
    'G05': {
        pos: [1380, 1210],
        type: 4,
        labels: ['Capital', 'Racial Equity']
    },
    'G06': {
        pos: [1202, 1117],
        type: 4,
        labels: ['Capital', 'Grants', 'Climate']
    },
    'G07': {
        pos: [1111, 1133],
        type: 4,
        labels: ['Capital', 'Racial Equity', 'Housing']
    },
    'G08': {
        pos: [1248, 1166],
        type: 5,
        labels: ['Health', 'Racial Equity', 'Site Story']
    },
    'G09': {
        pos: [1268, 1202],
        type: 5,
        labels: ['Health', 'Climate', 'Policy']
    },
    'G10': {
        pos: [1205, 1327],
        type: 6,
        labels: ['Climate', 'Health', 'Site Story']
    },
    'G11': {
        pos: [1338, 1425],
        type: 6,
        labels: ['Climate', 'Policy', 'Racial Equity']
    },
    'G12': {
        pos: [1375, 1425],
        type: 6,
        labels: ['Climate', 'Policy', 'Site Story']
    },
    'G13': {
        pos: [1375, 1391],
        type: 6,
        labels: ['Climate', 'Health', 'Capital']
    },
    'G14': {
        pos: [1085,1232],
        type: 10,
        labels: ['Policy', 'Site Story', 'Housing']
    },
    // 'G15': {
    //     pos: [1179, 1176],
    //     type: 7,
    //     labels: ['Racial Equity', 'Site Story']
    // },
    'G16': {
        pos: [1254, 1093],
        type: 7,
        labels: ['Racial Equity', 'Site Story']
    },
    'G17': {
        pos: [1290, 1163],
        type: 7,
        labels: ['Racial Equity', 'Site Story']
    },
    'G18': {
        pos: [1206, 1371],
        type: 8,
        labels: []
    },
    'G19': {
        pos: [1121, 1232],
        type: 8,
        labels: ['Racial Equity']
    },
    'G20': {
        pos: [1265, 1236],
        type: 8,
        labels: ['Racial Equity']
    },
    'G21': {
        pos: [1302.5, 1126],
        type: 0,
        labels: ['Racial Equity', 'Housing', 'Policy']
    },
    // 'G22': {
    //     pos: [1255, 1127],
    //     type: 0,
    //     labels: ['Capital', 'Health', 'Racial Equity']
    // },
    // 'G23': {
    //     pos: [1220, 1230],
    //     type: 9,
    //     labels: ['Grants', 'Racial Equity']
    // },
    // 'G24': {
    //     pos: [1310, 1200],
    //     type: 8,
    //     labels: ['Grants', 'Racial Equity', 'Capital']
    // },
    'G25': {
        pos: [1202, 1117],
        type: 8,
        labels: ['Racial Equity']
    },

    // -------------------------------------

    'L01': {
        pos: [1012, 846],
        type: 2,
        labels: ['Site Story']
    },
    'L02': {
        pos: [1213, 932],
        type: 1,
        labels: ['Grants', 'Housing']
    },
    'L03': {
        pos: [1079, 830],
        type: 2,
        labels: ['Grants', 'ETOD']
    },
    'L04': {
        pos: [1043, 939],
        type: 1,
        labels: ['Grants', 'Housing', 'Arts & Culture']
    },
    'L05': {
        pos: [1092, 866],
        type: 1,
        labels: ['Grants', 'Capital', 'Housing']
    },
    'L06': {
        pos: [1120, 932],
        type: 1,
        labels: ['Grants', 'Capital', 'Housing']
    },
    'L07': {
        pos: [899, 826],
        type: 1,
        labels: ['Grants', 'Climate', 'Housing', 'Policy']
    },
    'L08': {
        pos: [1060, 810],
        type: 1,
        labels: ['Grants', 'Housing']
    },
    'L09': {
        pos: [1076, 893],
        type: 1,
        labels: ['Grants', 'Policy']
    },
    'L10': {
        pos: [1009, 938],
        type: 0,
        labels: ['Site Story']
    },
    'L11': {
        pos: [1077, 1024],
        type: 0,
        labels: ['Site Story']
    },
    'L12': {
        pos: [1239, 880],
        type: 0,
        labels: ['Site Story']
    },
    'L13': {
        pos: [1325, 905],
        type: 2,
        labels: ['Site Story']
    }
}