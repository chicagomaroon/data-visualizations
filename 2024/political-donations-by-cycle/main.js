// For API and chart documentation please look here:
// https://www.highcharts.com/demo
const byDay2016 = [
    46, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 223, 223, 223, 223, 256,
    256, 289, 381, 414, 427, 460, 460, 460, 460, 473, 531, 568, 633, 633, 679,
    712, 712, 712, 712, 712, 712, 712, 758, 758, 758, 758, 758, 758, 758, 758,
    791, 791, 823, 903, 903, 903, 903, 936, 1189, 1225, 1295, 1295, 1353, 1385,
    1385, 1385, 1385, 1387, 1426, 1426, 1426, 1426, 1430, 1430, 1430, 1502,
    1516, 1549, 1549, 1563, 1596, 1628, 1628, 1759, 1759, 1804, 1954, 1954,
    1974, 2668, 2740, 2888, 2888, 2946, 2978, 2978, 2978, 6489, 6509, 6522,
    6522, 6541, 10052, 10106, 10106, 10106, 10106, 10122, 10154, 10154, 10161,
    10193, 12176, 12501, 12501, 12501, 12501, 12522, 12522, 12542, 12578, 12708,
    12805, 13250, 13347, 13347, 13483, 13509, 13528, 13541, 13541, 13541, 13541,
    13541, 13600, 13640, 13653, 13689, 13789, 13932, 13932, 13964, 14061, 14061,
    14126, 14126, 14126, 14229, 14617, 14639, 14674, 15321, 15431, 15431, 15488,
    15539, 15604, 15649, 15797, 15823, 15823, 15823, 15823, 15849, 16107, 16190,
    16190, 16190, 16190, 16255, 16255, 16255, 16287, 16397, 16410, 16435, 16435,
    16448, 16571, 16584, 17076, 17201, 18318, 18318, 18375, 18407, 18407, 19710,
    19710, 19724, 19762, 19762, 19863, 19908, 19908, 19934, 21223, 21223, 21223,
    21223, 21352, 21352, 21384, 21449, 21449, 21503, 21522, 21522, 21587, 21587,
    21663, 21698, 21896, 22638, 22767, 22824, 22895, 23256, 23295, 23424, 23472,
    23485, 23485, 23489, 23489, 24147, 24173, 24173, 24819, 24819, 24819, 24819,
    24819, 24819, 24904, 24904, 24932, 24932, 24932, 24939, 24965, 25357, 25393,
    25428, 25719, 25962, 26220, 26253, 26272, 26291, 26427, 26480, 26506, 26571,
    26589, 26589, 26603, 30120, 30204, 30237, 30280, 30359, 30371, 30701, 30775,
    31520, 31610, 31653, 31653, 32442, 32495, 32541, 33356, 34853, 35205, 35399,
    35399, 35464, 35503, 36350, 36350, 36371, 36397, 36410, 36439, 36439, 36439,
    40483, 40515, 40528, 40571, 40571, 40636, 40685, 41242, 41333, 41386, 41386,
    41406, 41542, 41800, 41813, 42189, 42461, 42532, 46542, 46607, 46607, 46639,
    47043, 47043, 47043, 47057, 47180, 47640, 47644, 48033, 48065, 48091, 48124,
    48169, 48637, 48640, 49943, 49956, 50293, 51033, 51513, 51795, 51815, 51945,
    51959, 52245, 52418, 52691, 53205, 53283, 53348, 53752, 54682, 54682, 55009,
    55678, 56296, 56686, 56950, 57030, 57047, 57054, 57086, 57523, 57567, 57580,
    57580, 57606, 57801, 58256, 61827, 62067, 62542, 62672, 63323, 63336, 63701,
    64134, 64296, 66153, 66153, 66153, 66153, 66415, 66415, 66415, 66415, 66441,
    66636, 66705, 66705, 66718, 66790, 67095, 67127, 67170, 67216, 67229, 67495,
    67502, 67580, 67659, 67699, 67913, 68426, 68621, 68993, 69320, 69749, 70146,
    70697, 70697, 71819, 71920, 72244, 72355, 73198, 73211, 73211, 74308, 75084,
    75815, 76373, 76697, 77459, 77459, 78294, 78547, 78561, 78582, 79043, 79140,
    79751, 79928, 80238, 81693, 81718, 82020, 83477, 84262, 84414, 85249, 85313,
    86121, 86285, 86617, 87360, 87496, 88503, 88535, 89452, 90190, 90886, 91574,
    91613, 92389, 92772, 92841, 92847, 92939, 93716, 93858, 94383, 94596, 94745,
    94990, 95500, 96052, 96642, 98519, 99084, 99165, 99165, 99281, 99766, 99766,
    100531, 100660, 101495, 101559, 101820, 101865, 102019, 102107, 102245,
    102473, 102550, 102965, 104344, 104672, 105688, 105784, 105784, 105977,
    106189, 106459, 106526, 106900, 107388, 108080, 108973, 109005, 109005,
    109190, 109466, 110119, 112680, 112680, 112879, 113039, 113145, 113218,
    113371, 113371, 113818, 113887, 114570, 114570, 115147, 115314, 115954,
    116079, 116079, 116770, 117081, 117351, 117448, 117700, 118056, 118735,
    118869, 120242, 120545, 121094, 121106, 121442, 121825, 122590, 122977,
    123366, 123443, 123447, 123798, 123993, 123993, 124041, 124041, 124160,
    124894, 124894, 125003, 125067, 125501, 125680, 126165, 126216, 127235,
    127912, 128030, 128986, 129606, 131226, 131261, 131261, 131293, 131293,
    131293, 131657, 132130, 132194, 132194, 132322, 132525, 134628, 135255,
    135323, 135387, 135455, 136068, 136095, 136185, 137394, 138437, 140681,
    140895, 141369, 142923, 147652, 149065, 150434, 150961, 151479, 153414,
    154867, 156018, 156471, 156806, 157157, 157300, 157300, 158258, 158961,
    159185, 159332, 159684, 161111, 161306, 161497, 161891, 161923, 162785,
    163092, 163782, 164313, 164441, 164530, 164629, 165779, 165805, 166143,
    166865, 167018, 168117, 168651, 168970, 169075, 169107, 169287, 169287,
    169867, 169867, 170903, 171554, 171752, 171835, 172669, 173853, 174378,
    176357, 178479, 178960, 184039, 185785, 188316, 188575, 188886, 189796,
    190130, 192321, 206911, 208001, 209954, 214891, 216262, 216542, 217719,
    217957, 218359, 220571, 221701, 222860, 228515, 230067, 230535, 232140,
    233578, 235068, 236578, 237987, 238745, 240183, 241922, 244996, 245290,
    246515, 246732, 248310, 249951, 251303, 252861, 255789, 256838, 257254,
    262155, 266427, 268266, 270928, 274900, 276910, 278435, 282416, 286993,
    287208, 287425, 287475, 287494, 287520, 287625, 287696, 288018, 288130,
    288137, 288169, 288190, 288252, 288529, 288593, 288962, 289032, 289236,
    289297, 289507, 289683, 291363, 291735, 291735, 291789, 291967, 292388,
    292388, 292564, 292755, 292762, 292985, 292987, 293082, 293082, 293090,
    293128, 293205, 293216, 293261, 293898, 293976, 294077, 294112, 294188,
    294303, 294303, 294303, 294315, 294488, 294632, 294829, 294891, 295038
];
const start2016 = Date.UTC(2015, 0, 2); // index at 0

const byDay2018 = [
    15, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 193, 193, 193,
    228, 513, 652, 671, 996, 1168, 1223, 1286, 1369, 1580, 1580, 1611, 1726,
    1961, 1972, 2014, 2584, 2584, 2891, 2933, 2996, 3060, 3108, 3143, 3764,
    3853, 4088, 4461, 4927, 5630, 5792, 5827, 6371, 6588, 6588, 6717, 6774,
    7133, 7222, 7291, 7392, 7459, 7726, 7726, 7726, 7875, 8043, 8303, 8322,
    8805, 8855, 8932, 9117, 9174, 9228, 9260, 9575, 10379, 10458, 10685, 11044,
    11057, 11719, 11908, 12076, 12168, 12484, 12770, 13004, 13038, 13681, 13807,
    13853, 14066, 14118, 14184, 14260, 14432, 14490, 14759, 15174, 15529, 15579,
    15624, 15776, 16877, 18195, 18715, 19525, 19552, 19688, 20512, 20645, 20740,
    21419, 21510, 21533, 21722, 22030, 22355, 22839, 23209, 23811, 24000, 24162,
    24680, 24951, 25047, 25577, 25589, 25830, 25969, 26024, 26024, 26108, 26315,
    26412, 26689, 27051, 27113, 27318, 28705, 30029, 30791, 31095, 31853, 32387,
    32733, 32885, 33010, 33091, 33280, 33603, 33898, 34217, 34309, 34737, 36227,
    36577, 36719, 37007, 37603, 38110, 38116, 38185, 38411, 38641, 38889, 40325,
    40793, 41061, 41186, 41375, 41573, 41677, 42010, 42490, 42886, 43150, 43522,
    44525, 44635, 44830, 45095, 45447, 45894, 46122, 46470, 47344, 47608, 47621,
    47823, 48081, 48081, 48081, 48081, 48213, 48468, 49024, 50107, 50198, 50233,
    50264, 50295, 50308, 50434, 50779, 50779, 50905, 50918, 50918, 50918, 50990,
    51999, 51999, 52023, 52087, 52087, 52093, 52233, 52893, 52893, 53107, 53182,
    53748, 54208, 54394, 54487, 54607, 54674, 54974, 55087, 55153, 55184, 55184,
    55234, 55234, 56268, 56268, 56500, 56526, 56526, 56526, 56526, 56561, 56573,
    57390, 57473, 57724, 58977, 59071, 59102, 59102, 59381, 60665, 60911, 60958,
    61224, 61310, 61386, 61520, 61690, 64807, 64997, 65028, 65028, 68447, 68759,
    68821, 68866, 70268, 70337, 73578, 74263, 74263, 74609, 74834, 74950, 75001,
    76308, 79736, 79898, 80035, 80035, 80350, 82376, 83124, 83276, 83669, 85032,
    85893, 86456, 87079, 87145, 87426, 87488, 87525, 87525, 87699, 87699, 87930,
    87936, 87940, 88149, 88287, 88336, 88336, 88465, 88516, 88528, 89027, 89127,
    89140, 89452, 90054, 90553, 90747, 90843, 91056, 91591, 91817, 92376, 93287,
    93287, 93361, 93392, 93434, 94968, 94968, 95135, 95447, 95822, 95912, 95919,
    96106, 96125, 96552, 96579, 96759, 96972, 96979, 97081, 98584, 98590, 98765,
    99073, 99260, 99392, 99551, 101085, 101469, 103368, 104211, 104308, 104651,
    105169, 105244, 106495, 107091, 108226, 109732, 110664, 111214, 112178,
    112895, 112980, 113058, 113085, 113104, 113323, 113984, 114346, 114801,
    115173, 115581, 115890, 116077, 116271, 116648, 118731, 119066, 120585,
    121856, 122691, 122772, 122785, 122803, 122915, 122927, 123263, 123522,
    123716, 123871, 124032, 124118, 124290, 124979, 125010, 125162, 125516,
    125604, 125692, 125925, 126036, 126067, 126800, 127082, 128000, 128202,
    128388, 128788, 128972, 129072, 129257, 129524, 129549, 129771, 129833,
    129951, 130098, 130160, 130302, 130383, 130856, 130896, 130914, 131099,
    131408, 131461, 131694, 132099, 132355, 132443, 132526, 133394, 134692,
    134763, 135017, 135140, 135326, 135623, 136043, 136608, 136802, 136836,
    136849, 137041, 137096, 137574, 137774, 138713, 139095, 139101, 139415,
    140023, 140667, 140717, 140744, 141058, 141254, 141471, 141490, 141681,
    141681, 141718, 142001, 142217, 142495, 142643, 142995, 143072, 143104,
    144063, 144914, 144914, 144988, 145000, 145192, 145214, 145564, 145698,
    145718, 146577, 146614, 146927, 147007, 147038, 147118, 147437, 147437,
    147527, 147664, 147710, 147875, 147902, 147959, 148174, 148235, 148487,
    148635, 148985, 149189, 149346, 149743, 150049, 150110, 150156, 152193,
    152204, 152260, 152546, 152567, 152897, 152934, 152964, 153392, 153429,
    153447, 153585, 153774, 154289, 154303, 154358, 154566, 154716, 154753,
    155584, 155645, 155768, 155995, 156502, 156593, 156975, 157025, 157380,
    157380, 157487, 158183, 159027, 159544, 160860, 161097, 161153, 161434,
    162765, 163070, 163131, 163174, 163331, 163539, 163539, 163638, 164939,
    165031, 165269, 165683, 165719, 166037, 166189, 166429, 166885, 167610,
    168517, 169350, 174458, 174654, 174901, 174931, 175483, 175795, 176099,
    176549, 178789, 179068, 179098, 179098, 179394, 179526, 179556, 179556,
    180136, 180408, 180983, 180989, 181313, 181409, 181832, 182424, 182503,
    182857, 183245, 183688, 184052, 185051, 185703, 187358, 189320, 189764,
    189866, 193504, 193562, 197079, 198012, 199041, 199505, 199880, 201372,
    201410, 203308, 206353, 210051, 210435, 210540, 210627, 216372, 216769,
    217441, 217890, 218731, 222949, 223032, 223490, 224338, 225338, 230008,
    231528, 235483, 236361, 236638, 237400, 238144, 238540, 238918, 239911,
    241774, 245485, 249394, 249650, 250405, 253172, 253615, 253927, 255630,
    258763, 258801, 259229, 259470, 260683, 261959, 263591, 264151, 265485,
    265865, 267187, 268746, 270090, 277729, 280442, 280950, 282023, 283621,
    284930, 287314, 293359, 296861, 299314, 301098, 303190, 304118, 309107,
    328355, 331689, 332394, 333727, 334540, 337349, 338436, 338892, 340056,
    344316, 345140, 348087, 349576, 352655, 355500, 357507, 359207, 361669,
    365248, 367481, 368703, 371261, 374082, 374240, 375005, 376038, 376200,
    376332, 376585, 376617, 376836, 376897, 377309, 377439, 378877, 378921,
    378997, 379104, 379296, 379296, 379369, 379656, 379689, 378942, 379320,
    379549, 380039, 380647, 380709, 380770, 380794, 381127, 381213, 381267,
    381521, 381674, 381796, 381796, 381858, 381954, 381978, 381997, 382021,
    382052, 382065, 382079, 382085, 382146, 382249, 382249, 382324, 382324,
    382324, 382419, 382799, 383029, 383091, 383809, 384179
];
const start2018 = Date.UTC(2016, 11, 15);

const byDay2020 = [
    55, 55, 111, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134,
    134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134,
    134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134,
    134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134,
    134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134,
    134, 134, 134, 134, 134, 134, 195, 247, 308, 487, 548, 655, 795, 872, 933,
    933, 994, 994, 994, 994, 994, 1025, 1649, 1663, 1669, 1700, 1822, 1852,
    1932, 1993, 2290, 2324, 2482, 2529, 2915, 3084, 3529, 3602, 3691, 3813,
    4003, 4228, 4269, 4396, 4488, 4561, 9405, 10683, 10683, 10835, 10987, 11169,
    11169, 11182, 11226, 12077, 12263, 12287, 14886, 14958, 15236, 15491, 15868,
    16002, 16762, 16823, 16865, 16938, 17252, 17476, 17561, 17755, 17876, 17937,
    17937, 18034, 18246, 19460, 19498, 20224, 20367, 20752, 20832, 22065, 24879,
    24907, 24907, 25103, 25436, 29714, 30053, 30307, 30750, 32129, 32266, 34470,
    34618, 34703, 34802, 35067, 35699, 35740, 36019, 36139, 36217, 36251, 36464,
    36497, 36515, 36919, 37076, 37330, 37361, 37375, 37417, 37489, 38735, 38828,
    38894, 38972, 39277, 39518, 40011, 40177, 40856, 41384, 41411, 41561, 41688,
    42124, 42364, 42405, 42685, 42902, 43382, 43798, 43902, 44023, 44053, 44092,
    44176, 44228, 44427, 44440, 44475, 44493, 44535, 44672, 44725, 44818, 44854,
    45247, 45519, 45685, 45997, 47167, 48883, 48883, 48955, 49136, 49155, 49261,
    49592, 49852, 50004, 50185, 50204, 51027, 51399, 52183, 52259, 52292, 52353,
    53033, 53058, 53105, 53141, 53589, 53987, 54041, 54611, 54674, 55677, 58828,
    60486, 61216, 63457, 63559, 63727, 63889, 63893, 63982, 64035, 64329, 64695,
    65152, 65484, 65654, 65686, 65698, 65977, 66157, 66235, 66682, 67042, 68157,
    68179, 68366, 70152, 71425, 71437, 71683, 71835, 72258, 72388, 72570, 73323,
    73930, 74052, 74381, 74630, 74842, 75034, 76387, 76658, 77096, 77232, 77324,
    77680, 78033, 78885, 78918, 79154, 79394, 79627, 79741, 79880, 80003, 80492,
    82169, 82261, 82411, 82486, 82645, 83472, 83704, 84125, 84827, 86844, 86997,
    87257, 87745, 87922, 88022, 88245, 88582, 90211, 90563, 90766, 91251, 93422,
    96324, 98930, 99218, 99641, 99745, 99923, 100597, 100963, 101071, 101789,
    102717, 102919, 103856, 104564, 105173, 105635, 106754, 115976, 116954,
    117828, 118277, 118444, 118706, 118845, 119326, 120701, 120966, 121225,
    124951, 125202, 125602, 126926, 127558, 127923, 128501, 128768, 128899,
    129088, 130394, 131811, 132297, 132930, 133056, 133239, 133879, 134156,
    134317, 135474, 136620, 136771, 137275, 138170, 138414, 138695, 138837,
    139514, 139675, 139961, 142289, 142579, 142937, 143092, 143219, 143495,
    143931, 144423, 144695, 145646, 146385, 146994, 148936, 149096, 149141,
    149495, 150209, 150636, 151070, 151285, 152831, 153519, 153621, 153923,
    154840, 156388, 158030, 158816, 159247, 159987, 160431, 160924, 161296,
    162187, 162356, 165849, 166105, 168262, 168984, 170029, 171446, 171868,
    172658, 174754, 175162, 175321, 175553, 176367, 177242, 178030, 180181,
    183029, 183197, 183736, 183896, 185460, 185665, 186069, 186912, 187344,
    188457, 188989, 190005, 190496, 190915, 191614, 192151, 192542, 192708,
    192796, 194096, 195529, 195835, 196404, 196776, 197256, 197721, 198779,
    199310, 200496, 202383, 207270, 209652, 210160, 212331, 212993, 214292,
    215555, 216709, 218503, 220743, 221522, 222342, 224355, 226752, 227520,
    228014, 229807, 230159, 231194, 232883, 235789, 239549, 243562, 245908,
    248035, 249678, 250474, 252105, 253324, 255049, 258470, 261549, 263154,
    263810, 272814, 274477, 275365, 277050, 280616, 282177, 283751, 286200,
    286492, 286832, 287224, 287863, 288463, 289754, 290048, 290531, 290573,
    290717, 291317, 291453, 291951, 292286, 292557, 293681, 294450, 294824,
    297662, 299286, 296076, 296213, 296530, 296621, 296787, 297294, 298503,
    298857, 299308, 299338, 299773, 300001, 300148, 300566, 300995, 302494,
    304499, 304800, 305709, 306046, 306319, 306979, 307756, 315301, 315807,
    318816, 321771, 322374, 323920, 324982, 325384, 325564, 326037, 326216,
    326831, 327403, 327685, 328120, 329000, 329060, 329286, 330936, 331559,
    332159, 332802, 333298, 334193, 335497, 335899, 337924, 338947, 339394,
    339747, 339957, 342454, 342676, 343408, 343598, 345296, 346108, 347984,
    351843, 355035, 356690, 359452, 362445, 363760, 369924, 377551, 378494,
    382544, 384325, 384376, 384386, 385332, 385884, 386461, 400643, 407513,
    408999, 409598, 409893, 412548, 412899, 413547, 415291, 416497, 419588,
    420601, 421806, 425307, 428733, 429182, 431703, 431860, 433084, 433737,
    434259, 434660, 440311, 442223, 442751, 446452, 446964, 449698, 452688,
    459865, 460066, 460771, 464150, 465331, 466497, 466820, 467536, 468268,
    469091, 474973, 476327, 476607, 482118, 482522, 487284, 489098, 489415,
    492259, 502312, 506258, 510511, 511742, 513778, 520708, 521071, 530305,
    534088, 542138, 543840, 546485, 560317, 584609, 593119, 597923, 606848,
    614963, 615892, 619498, 627411, 630121, 632999, 639712, 651917, 665908,
    673195, 696469, 702496, 706744, 707950, 718807, 726983, 753283, 754859,
    755422, 760804, 781746, 784926, 792405, 794758, 802415, 806534, 809866,
    811216, 820022, 844044, 857593, 864567, 875153, 878377, 884636, 890717,
    893800, 905281, 908728, 920363, 942736, 946025, 976711, 980205, 985654,
    987759, 990446, 998003, 1001638, 1007090, 1015344, 1024192, 1034276,
    1046246, 1055473, 1058329, 1060679, 1062708, 1080886, 1087848, 1093624,
    1100778, 1104520, 1110855, 1113322, 1118002, 1122552, 1130018, 1136542,
    1141338, 1150889, 1160131, 1169604, 1177679, 1179672, 1182530, 1185164,
    1187948, 1194121, 1198952, 1204846, 1209623, 1210288, 1214439, 1217107,
    1227355, 1233672, 1236149, 1237679, 1239778, 1245485, 1246615, 1247219,
    1248192, 1248649, 1251064, 1253108, 1254772, 1255951, 1256266, 1258853,
    1261328, 1262631, 1264139, 1264775, 1266145, 1267321, 1268325, 1269614,
    1270115, 1271079, 1274360, 1274553, 1275141, 1275676, 1276467, 1277110,
    1278002, 1278808, 1280136, 1280499, 1281387, 1282092, 1283432, 1284248,
    1284316, 1284652, 1284812, 1285374, 1285802, 1287017, 1287540, 1289469
];
const start2020 = Date.UTC(2018, 9, 12);

const byDay2022 = [
    236, 236, 236, 354, 354, 366, 366, 369, 372, 372, 372, 372, 372, 372, 372,
    372, 372, 372, 372, 372, 372, 372, 372, 372, 372, 372, 372, 372, 372, 372,
    372, 372, 372, 372, 372, 372, 372, 372, 372, 372, 372, 372, 372, 372, 372,
    372, 372, 372, 372, 372, 372, 372, 962, 962, 962, 2025, 2136, 2431, 2431,
    2482, 2512, 2512, 2994, 3026, 3144, 3617, 4124, 4437, 4733, 5082, 5198,
    5772, 6006, 6138, 6528, 6613, 6734, 6804, 6949, 6968, 7010, 7010, 7913,
    9113, 9425, 9601, 10890, 10890, 11025, 11040, 11674, 11748, 11933, 12559,
    12930, 12995, 13651, 13713, 13830, 13953, 14118, 14895, 14993, 15577, 15672,
    15982, 16345, 16763, 16892, 16992, 17881, 18265, 18289, 18466, 19665, 19915,
    20166, 21249, 21249, 21378, 21524, 21560, 21723, 22086, 22971, 22974, 23149,
    23456, 23602, 23813, 23912, 24492, 24679, 25024, 25139, 25551, 25697, 26287,
    27048, 28085, 29610, 30003, 31222, 31470, 31519, 31555, 33083, 33374, 33403,
    34281, 34345, 34745, 35004, 35736, 36119, 36967, 37719, 37812, 38646, 38652,
    38699, 39414, 39835, 39957, 40262, 40357, 40415, 40770, 40773, 40868, 40940,
    40971, 41060, 42816, 43784, 43848, 44159, 44159, 44323, 44323, 44352, 44388,
    44680, 44966, 45404, 45945, 45989, 47223, 47829, 47835, 47996, 48408, 48740,
    49499, 50139, 50240, 50410, 50467, 51073, 51167, 51456, 51970, 52384, 53693,
    55154, 55171, 55654, 55671, 56463, 59341, 59414, 60420, 60603, 60983, 63411,
    64096, 65631, 65813, 67137, 67992, 68400, 68447, 68826, 69484, 69604, 70575,
    70632, 71955, 72023, 72084, 72965, 72969, 73082, 73390, 73396, 73694, 74062,
    74088, 75362, 75468, 75468, 75517, 75949, 76323, 76400, 77581, 79775, 80410,
    80528, 80720, 80782, 80828, 81640, 82108, 82257, 82556, 82697, 82965, 83454,
    83457, 83551, 83555, 83555, 84088, 84212, 84509, 84610, 84644, 84644, 85075,
    85075, 85153, 86041, 86300, 86642, 87526, 87639, 88459, 88509, 88565, 88795,
    88850, 89014, 89110, 89600, 90506, 92062, 92103, 92268, 92268, 92271, 92307,
    92339, 92901, 93038, 93235, 94093, 94253, 94344, 94378, 94622, 96404, 96492,
    96807, 97122, 97320, 99159, 99344, 100381, 100476, 100605, 101132, 101160,
    101346, 101747, 102252, 102326, 102722, 102911, 103016, 103156, 104330,
    104506, 104537, 104610, 105039, 105051, 105391, 105524, 105670, 105715,
    105821, 105933, 106291, 106633, 107098, 107309, 107741, 108837, 110284,
    110467, 110834, 111168, 111464, 114197, 114611, 114673, 115023, 115196,
    115440, 115479, 115482, 115545, 115604, 115604, 115762, 115879, 116434,
    116817, 116851, 116851, 116956, 116976, 117356, 118297, 120800, 122494,
    122750, 122889, 124453, 124830, 124902, 125157, 125340, 125408, 125858,
    127639, 128889, 129238, 129411, 129570, 129570, 129595, 129714, 131499,
    131530, 131665, 132257, 132659, 132869, 133052, 133083, 133533, 133533,
    133609, 134583, 135944, 136273, 137168, 138120, 138179, 138455, 138941,
    139090, 139252, 140054, 140389, 141097, 142120, 142391, 142510, 142720,
    142760, 142878, 142898, 143047, 143438, 143758, 144081, 144157, 144190,
    144807, 144946, 144974, 145049, 145328, 146106, 146444, 147271, 149192,
    150972, 150992, 151157, 151288, 151414, 151514, 151530, 151791, 151852,
    155409, 155845, 156181, 156761, 156901, 156950, 156954, 156973, 157064,
    157201, 157458, 157529, 158815, 158979, 159155, 159487, 159671, 160221,
    160374, 160438, 160520, 160794, 161931, 161951, 162033, 162146, 162407,
    162452, 162484, 165365, 167595, 168083, 168251, 168321, 168348, 169105,
    170295, 170407, 170516, 170664, 170773, 171038, 171060, 171109, 171136,
    171240, 171419, 171894, 172168, 172363, 173730, 174874, 175246, 175940,
    176063, 176215, 176451, 178496, 178615, 178883, 178968, 179022, 179049,
    179052, 179367, 179390, 180739, 181121, 182245, 182502, 183588, 184145,
    184171, 185451, 185927, 189131, 189455, 189594, 189763, 190134, 190134,
    191432, 191542, 191596, 191697, 191819, 192182, 193635, 194403, 194463,
    194888, 194915, 194968, 195016, 195075, 195258, 195470, 195470, 195506,
    195713, 196928, 196944, 198152, 201520, 203086, 203086, 203398, 203858,
    205726, 205848, 206007, 207328, 207411, 207464, 207964, 208148, 208387,
    208746, 209438, 209512, 210170, 210423, 210544, 210607, 211005, 211191,
    211463, 211807, 217126, 219805, 220192, 220419, 220440, 220466, 220651,
    222757, 225186, 225449, 226043, 226236, 227407, 228084, 229508, 229575,
    229674, 229991, 230266, 233928, 237624, 238067, 238130, 240228, 240732,
    242498, 242680, 243051, 243412, 243971, 243987, 245505, 246664, 246938,
    247104, 247705, 247990, 248557, 249985, 250881, 252722, 254046, 254181,
    256003, 256569, 257290, 257394, 257762, 258429, 258602, 260389, 261594,
    261736, 262079, 262546, 263984, 264348, 264512, 265537, 266772, 266887,
    267255, 267359, 268152, 268350, 268392, 268545, 268685, 268763, 268938,
    269523, 270476, 270952, 275582, 275778, 279225, 279354, 279925, 281844,
    282533, 282758, 283164, 285487, 286890, 287524, 291268, 291580, 291616,
    293910, 295770, 298697, 300505, 301141, 301631, 302372, 302774, 303325,
    304956, 305112, 306260, 306541, 307018, 307310, 308051, 309861, 310937,
    312668, 313059, 313423, 313953, 315064, 315247, 316447, 316903, 319205,
    320804, 322152, 323716, 332566, 332678, 333090, 333741, 333998, 336322,
    337559, 341105, 342365, 343593, 343690, 344532, 345917, 346963, 348888,
    349690, 350056, 353306, 358089, 362266, 363273, 363877, 365399, 366834,
    367939, 370286, 370778, 371549, 374848, 375493, 377717, 378469, 380020,
    381017, 381951, 382299, 382852, 384544, 386465, 386734, 391623, 392606,
    394616, 395255, 398523, 399350, 400045, 402992, 407991, 411868, 415521,
    418656, 419690, 421490, 422838, 424543, 426919, 427493, 430164, 433021,
    434480, 435191, 436798, 437661, 440653, 440834, 441085, 441736, 442339,
    442489, 442897, 443147, 443296, 443340, 444010, 444675, 445467, 445914,
    446477, 447041, 447562, 447950, 448277, 448895, 449240, 449683, 449908,
    449914, 450352, 450482, 450663, 450663, 450692, 450793, 450796, 450806,
    450871, 450881, 451166, 451244, 451268, 451346, 451527, 451631, 451733,
    452005, 452248, 452373, 452893, 453517, 453972
];
const start2022 = Date.UTC(2020, 9, 27);

yAxisLabels = [0, 295038, 384179, 453972, 1289469];

color2016 = '#C16622';
color2018 = '#800000';
color2020 = '#155F83';
color2022 = '#8A9045';

Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});

Highcharts.chart('chart-div1', {
    // Setting default colors
    colors: ['#C16622', '#800000', '#155F83', '#8A9045'],

    // All code for your chart goes here
    chart: {
        type: 'spline'
    },
    title: {
        text: 'Cumulative Donations by Cycle from 2016-2022',
        align: 'center'
    },
    subtitle: {
        text: 'The 2020 Election saw record breaking donations by UChicago professors and nationwide.',
        align: 'center',
        style: {
            fontSize: '15px'
        }
    },
    xAxis: {
        type: 'datetime',
        labels: {
            format: '{value:%b %Y}'
        },
        tickInterval: 30 * 24 * 3600 * 1000 * 4
    },
    yAxis: {
        title: {
            text: ''
        },
        labels: {
            enabled: false
        },
        tickPositions: yAxisLabels,
        endOnTick: false
        //maxPadding: .5
    },
    plotOptions: {
        spline: {
            lineWidth: 7,
            states: {
                hover: {
                    lineWidth: 8
                }
            },
            marker: {
                enabled: false
            },
            label: {
                enabled: false
            }
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        valuePrefix: '$',
        xDateFormat: '%b %Y'
    },
    annotations: [
        {
            draggable: '',
            labelOptions: {
                borderRadius: 0,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                borderWidth: 0,
                borderColor: '#AAA'
            },
            labels: [
                {
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: Date.UTC(2016, 11, 1),
                        y: 350000
                    },
                    style: {
                        fontSize: '14px'
                    },
                    text: '2016 Presidential Election<br><div style="color:#C16622"><b>$295,038<b>'
                },
                {
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: Date.UTC(2018, 9, 1),
                        y: 350000
                    },
                    style: {
                        fontSize: '14px'
                    },
                    text: '2018 Midterm Election<br><div style="color:#800000"><b>$384,179<b>'
                },
                {
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: Date.UTC(2020, 3, 1),
                        y: 800000
                    },
                    style: {
                        fontSize: '14px'
                    },
                    text: '2020 Presidential Election<br><div style="color:#155F83"><b>$1,289,469<b>'
                },
                {
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: Date.UTC(2022, 8, 1),
                        y: 350000
                    },
                    style: {
                        fontSize: '14px'
                    },
                    text: '2022 Midterm Election<br><div style="color:#8A9045"><b>$453,972<b>'
                }
            ]
        }
    ],
    series: [
        {
            name: '2016 Donations',
            data: byDay2016,
            pointStart: start2016,
            pointIntervalUnit: 'day'
        },
        {
            name: '2018 Donations',
            data: byDay2018,
            pointStart: start2018,
            pointIntervalUnit: 'day'
        },
        {
            name: '2020 Donations',
            data: byDay2020,
            pointStart: start2020,
            pointIntervalUnit: 'day'
        },
        {
            name: '2022 Donations',
            data: byDay2022,
            pointStart: start2022,
            pointIntervalUnit: 'day'
        }
    ]
});