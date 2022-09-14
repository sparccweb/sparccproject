// -------------------------------------
//
// Types:
// 0 - video only,
// 1 - text short
// 2 - text long
// -------------------------------------


const markersRef = {
    'A01': {
        pos: [813, 1505],
        type: 2,
        labels: ['Site Story']
    },
    'A02': {
        pos: [752, 1390],
        type: 1,
        labels: ['Grant', 'Racial Equity', 'Arts & Culture']
    },
    'A03': {
        pos: [755, 1560],
        type: 1,
        labels: ['Grant', 'Climate']
    },
    'A04': {
        pos: [662, 1490],
        type: 1,
        labels: ['Grant', 'Climate']
    },
    'A05': {
        pos: [680, 1555],
        type: 1,
        labels: ['Grant', 'Climate']
    },
    'A06': {
        pos: [710, 1580],
        type: 1,
        labels: ['Grant', 'Housing', 'Education']
    },
    'A07': {
        pos: [730, 1620],
        type: 1,
        labels: ['Grant', 'Housing']
    },
    'A08': {
        pos: [660, 1630],
        type: 1,
        labels: ['Grant', 'Transportation']
    },
    'A09': {
        pos: [831, 1555],
        type: 1,
        labels: ['Grant', 'Policy']
    },
    'A10': {
        pos: [771, 1600],
        type: 1,
        labels: ['Grant', 'Health', 'Arts & Culture']
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

    'M01': {
        pos: [1445, 1532],
        type: 2,
        labels: ['Site Story']
    },
    'M02': {
        pos: [1503, 1536],
        type: 1,
        labels: ['Grant']
    },
    'M03': {
        pos: [1410, 1484],
        type: 1,
        labels: ['Grant', 'Health']
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
        labels: ['Grant', 'Housing']
    },
    'M07': {
        pos: [1398, 1697],
        type: 1,
        labels: ['Grant']
    },
    'M08': {
        pos: [1448, 1505],
        type: 1,
        labels: ['Grant', 'Housing']
    },
    'M09': {
        pos: [1417, 1588],
        type: 0,
        labels: ['Site Story']
    },
    'M10': {
        pos: [1547, 1593],
        type: 1,
        labels: ['Grant']
    },
    'M11': {
        pos: [1490, 1705],
        type: 1,
        labels: ['Grant']
    },

    'B01': {
        pos: [1709, 800],
        type: 2,
        labels: ['Site Story']
    },
    'B02': {
        pos: [1726, 1060],
        type: 1,
        labels: ['Grant', 'Capital', 'Housing']
    },
    'B03': {
        pos: [1817, 1019],
        type: 1,
        labels: ['Grant', 'Capital', 'Housing']
    },
    'B04': {
        pos: [1746, 890],
        type: 1,
        labels: ['Grant', 'ETOD']
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

    'C01': {
        pos: [1946, 1487],
        type: 2,
        labels: ['Site Story']
    },
    'C02': {
        pos: [1954, 1383],
        type: 1,
        labels: ['Grant']
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
        labels: ['Climate', 'Grant']
    },
    'C06': {
        pos: [1928, 1507],
        type: 1,
        labels: ['Grant', 'Housing']
    },
    'C07': {
        pos: [1961, 1589],
        type: 1,
        labels: ['Grant', 'Policy', 'Climate', 'ETOD']
    },
    'C08': {
        pos: [1832, 1326],
        type: 1,
        labels: ['Grant', 'Health']
    },
    'C09': {
        pos: [2037, 1432],
        type: 1,
        labels: ['Grant', 'Racial Equity']
    },
    'C10': {
        pos: [1996, 1510],
        type: 1,
        labels: ['Grant']
    },
    'C11': {
        pos: [2036, 1372],
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
    
    'D01': {
        pos: [407, 1212],
        type: 2,
        labels: ['Site Story']
    },
    'D02': {
        pos: [432, 1277],
        type: 1,
        labels: ['Grant']
    },
    'D03': {
        pos: [417, 1239],
        type: 2,
        labels: ['Grant']
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
        labels: ['Grant']
    },
    'D08': {
        pos: [488, 1202],
        type: 2,
        labels: ['Site Story']
    },

    'G01': {
        pos: [1284, 1325],
        type: 2,
        labels: ['Policy']
    },
    'G02': {
        pos: [1347, 1116],
        type: 2,
        labels: ['Capital', 'Grant']
    },
    'G03': {
        pos: [1056, 1231],
        type: 2,
        labels: ['Housing']
    },
    'G04': {
        pos: [1338, 1391],
        type: 2,
        labels: ['Health']
    },
    'G05': {
        pos: [1437, 1281],
        type: 2,
        labels: ['Economic Empowerment']
    },
    'G06': {
        pos: [1260, 1358],
        type: 2,
        labels: ['Transporation']
    },
    'G07': {
        pos: [1111, 1133],
        type: 2,
        labels: ['Health', 'Climate']
    },
    'G08': {
        pos: [1258, 1181],
        type: 2,
        labels: ['Climate']
    },
    'G09': {
        pos: [1340, 1205],
        type: 2,
        labels: ['Policy']
    },
    'G10': {
        pos: [1205, 1327],
        type: 2,
        labels: ['Other']
    },
    'G11': {
        pos: [1318, 1149],
        type: 2,
        labels: ['Capital']
    },
    'G12': {
        pos: [1206, 1371],
        type: 2,
        labels: ['Other']
    },
    'G13': {
        pos: [1121, 1232],
        type: 2,
        labels: ['Capital', 'Grants']
    },
    'G14': {
        pos: [1265, 1270],
        type: 2,
        labels: ['Other']
    },
    'G15': {
        pos: [1387, 1144],
        type: 2,
        labels: ['Capital']
    },
    'G16': {
        pos: [1260, 1090],
        type: 0,
        labels: ['Other']
    },

    'L01': {
        pos: [1012, 846],
        type: 2,
        labels: ['Site Story']
    },
    'L02': {
        pos: [1213, 932],
        type: 1,
        labels: ['Grant', 'Housing']
    },
    'L03': {
        pos: [1079, 830],
        type: 2,
        labels: ['Grant', 'Transit']
    },
    'L04': {
        pos: [1043, 939],
        type: 1,
        labels: ['Grant', 'Housing', 'Arts & Culture']
    },
    'L05': {
        pos: [1092, 866],
        type: 1,
        labels: ['Grant', 'Capital', 'Housing']
    },
    'L06': {
        pos: [1120, 932],
        type: 1,
        labels: ['Grant', 'Capital', 'Housing']
    },
    'L07': {
        pos: [899, 826],
        type: 1,
        labels: ['Grant', 'Climate', 'Housing', 'Policy']
    },
    'L08': {
        pos: [1060, 810],
        type: 1,
        labels: ['Grant', 'Housing']
    },
    'L09': {
        pos: [1076, 893],
        type: 1,
        labels: ['Grant', 'Policy']
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
    }
}