/* DEWED catalogue. Edit rows freely. Format: Category|Type|Name|Price|MRP|Shades|Finish|Badge|Colour
   Prices are indicative INR placeholders for a premium Indian brand - verify before launch. */
const ROWS = `
Face|Primer|Veil Pore Blur Primer|899|999|1|Satin|BESTSELLER|#d9c3b0
Face|Foundation|Skin Veil Foundation|1299|1499|24|Satin|BESTSELLER|#c79a77
Face|Foundation|Matte Order Foundation|1199|1399|20|Matte||#b98660
Face|Foundation|Second Skin Tint|1099|1299|16|Dewy|NEW|#d3a883
Face|Cushion Foundation|Cloud Cushion Compact|1499|1699|12|Dewy||#caa07c
Face|Concealer|Cloud Touch Concealer|799|899|18|Satin|BESTSELLER|#d6aa86
Face|Concealer|Precision Lift Concealer|749|849|14|Matte||#c99870
Face|Compact|Pressed Silk Compact|899|999|10|Matte||#cfae92
Face|Loose Powder|Translucent Cloud Powder|999|1099|3|Matte||#e6d8c8
Face|Setting Spray|Hold & Dew Setting Mist|899|999|1|Dewy|NEW|#e9dccd
Face|Face Palette|Studio Face Palette|1799|1999|3|Satin|LIMITED EDITION|#c4967a
Face|Tinted Base / Sunscreen|Daylight Tinted Base SPF 30|1099|1199|8|Dewy||#d8b090
Cheeks|Blush|Melt Blush|899|999|8|Dewy|BESTSELLER|#c4756f
Cheeks|Blush|Powder Petal Blush|799|899|6|Matte||#c98a84
Cheeks|Highlighter|Afterglow Highlighter|999|1099|5|Shimmer|BESTSELLER|#dcc09a
Cheeks|Bronzer|Soft Sculpt Bronzer|1099|1199|5|Matte||#a8785a
Cheeks|Contour|Shadow Line Contour Stick|999|1099|6|Satin|NEW|#8f6a54
Cheeks|Multi-use|Lip & Cheek Silk Balm|749|849|6|Dewy||#b8625f
Lips|Lip Primer|Plush Lip Primer|599|699|1|Satin||#e3c3b8
Lips|Lip Oil|Glass Veil Lip Oil|899|999|6|Gloss|BESTSELLER|#c47c70
Lips|Lipstick|Silk Matte Lip Colour|899|999|16|Matte|BESTSELLER|#8c2f3b
Lips|Lipstick|Satin Cream Lipstick|849|949|12|Satin||#a8484f
Lips|Liquid Lipstick|Velvet Ink Liquid Lip|799|899|14|Matte||#7a2433
Lips|Lip Crayon|Draw Me Lip Crayon|749|849|10|Matte|NEW|#9a3d44
Lips|Lip Liner|Contour Lip Liner|499|599|8|Matte||#80393f
Lips|Lip Gloss|Mirror Lip Gloss|699|799|8|Gloss||#c98a80
Lips|Lip Tint|Water Stain Lip Tint|649|749|6|Dewy||#b4545a
Eyes|Eyeshadow Palette|Noir Eye Palette|1599|1799|1|Shimmer|BESTSELLER|#4a3228
Eyes|Eyeshadow Palette|Soft Dune Eye Palette|1499|1699|1|Matte|NEW|#b08a6d
Eyes|Kajal|Precision Kajal|399|449|2|Smudge-proof|BESTSELLER|#2b2220
Eyes|Eyeliner|Ink Line Liquid Liner|549|599|2|Matte||#241c1a
Eyes|Mascara|Lash Definition Mascara|799|899|2|Volumising|BESTSELLER|#2e2422
Eyes|Mascara|Lift & Curl Mascara|749|849|1|Curling||#33281f
Eyes|Brow|Brow Architect Pencil|549|649|5|Natural||#6b4a38
Eyes|Brow|Brow Set Gel|599|699|2|Natural|NEW|#85624a
Tools|Brushes|Foundation Buffing Brush|899|999|1|Tool||#a58a78
Tools|Brushes|Soft Focus Powder Brush|799|899|1|Tool||#b9a090
Tools|Brushes|Blush Cheek Brush|749|849|1|Tool||#b9a090
Tools|Brushes|Precision Eye Brush Set|1299|1499|1|Tool|LIMITED EDITION|#8d7364
Tools|Makeup tools|Cloud Blending Sponge|449|499|1|Tool||#e0b7a8
Tools|Makeup tools|Lash Curler|599|699|1|Tool||#7b6f6a
Tools|Accessories|Travel Makeup Pouch|999|1199|1|Tool||#5a3a33
Tools|Accessories|Brush Cleansing Mat|499|599|1|Tool||#c9b5a8
`.trim().split("\n");
const SHADE_NAMES = ["Porcelain","Ivory","Fair","Light","Beige","Sand","Honey","Golden","Tan","Caramel","Almond","Chestnut","Mocha","Cocoa","Espresso","Deep"];
const BLURB = {Face:"Skin-first complexion that sits softly and wears comfortably through the day.",Lips:"Considered colour with a refined finish, built for easy everyday wear.",Eyes:"Defined eyes without heaviness, designed to layer and blend with ease.",Cheeks:"Colour and dimension that melt into skin for a natural, lit-from-within look.",Tools:"Well-balanced tools designed to make application feel effortless."};
const PRODUCTS = ROWS.map((r,i)=>{const [category,type,n,price,mrp,shades,finish,badge,color]=r.split("|");
 const rating=+(4.3+((i*7)%7)/10).toFixed(1);
 return {id:i+1,name:"DEWED "+n,category,type,price:+price,mrp:+mrp,shades:+shades,finish,rating,reviews:24+((i*37)%260),badge,color,
  stock:i%13===5?"low":(i%17===9?"out":"in"),
  description:`${BLURB[category]} A DEWED ${type.toLowerCase()} in a ${finish.toLowerCase()} finish.`,
  how:`Apply to clean, prepared skin and build gradually. Blend with fingertips or a DEWED tool.`,
  ingredients:"Full ingredient list to be added by the brand once formulations are finalised."};});
/* Photo mapping: product id -> image numbers in assets/products/dewed-NN.jpg (first = main). Edit freely. */
const IMG={1:[27,25],2:[25,26,23],3:[26,25],4:[23,26],5:[24,21],6:[22,23],7:[22,26],8:[21,24],9:[20,21],10:[19,27],11:[17,18],12:[16,26],13:[3,2],14:[4,2],15:[39,17],16:[2,20],17:[1,2],18:[38,15],19:[10,38],20:[38,10],21:[12,37],22:[37,13],23:[13,12],24:[12,15],25:[12,13],26:[11,15],27:[15,11],28:[9,39],29:[9,17],30:[7,37],31:[8,37],32:[6,37],33:[6,37],34:[37,5],35:[5,37],36:[35,25],37:[34,4],38:[33,4],39:[32,22],40:[31,23],41:[30,37],42:[29,28],43:[28,29]};
PRODUCTS.forEach(p=>p.imgs=(IMG[p.id]||[]).map(n=>`assets/products/dewed-${String(n).padStart(2,"0")}.jpg`));
