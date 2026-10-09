/* =========================================================
   EDIT THIS FILE: your contact details, menu and prices.
   ========================================================= */
window.CONFIG = {
  whatsapp: "27719441177", // WhatsApp Business (country code 27, no + or spaces)
  phone: "071 944 1177",
  hoursText: "",
  // Optional "Open now" badge. Leave days empty to hide it.
  openDays: [],
  openHour: 7,
  closeHour: 17
};

/* Menu. Change "price" and the site updates everywhere.
   Set "img" to "" for a pattern card.
   Keep the original fields for compatibility, and add clearer metadata for future use. */
window.MENU = [
  { id:"plain", slug:"plain-fatkoek", category:"plain", name:"Plain Fatkoek", price:6, img:"plain", desc:"Fresh, round and fluffy. Where everyone starts.", star:false, featured:false },
  { id:"russian", slug:"russian", category:"plain", name:"Russian", price:10, img:"", desc:"Just the Russian, on its own.", star:false, featured:false },
  { id:"liver", slug:"fatkoek-with-liver", category:"liver", name:"Fatkoek with Liver", price:12, img:"liver", desc:"Chicken livers, cooked fresh.", star:false, featured:false },
  { id:"pattie", slug:"fatkoek-with-pattie", category:"pattie", name:"Fatkoek with Pattie", price:12, img:"pattie", desc:"A burger patty in a soft, crunchy fatkoek.", star:false, featured:false },
  { id:"fkrussian", slug:"fatkoek-with-russian", category:"plain", name:"Fatkoek with Russian", price:15, img:"", desc:"A hot Russian, tucked in.", star:false, featured:false },
  { id:"breakfast", slug:"pat-breakfast", category:"breakfast", name:"Pat Breakfast", price:15, img:"breakfast", desc:"Egg, tomato and polony.", star:false, featured:false },
  { id:"fullhouse", slug:"full-house-fatkoek", category:"plain", name:"Full House Fatkoek", price:20, img:"fullhouse", desc:"Burger patty, boiled egg, tomato, polony and lettuce if you want it. You choose what goes in.", star:false, featured:false },
  { id:"kota", slug:"kota", category:"plain", name:"Kota", price:20, img:"", desc:"A proper street-food favourite.", star:true, featured:true }
];

// Backwards-compatible alias for the existing app.
window.MENU.forEach(function (item) {
  if (item.featured && typeof item.star === "undefined") item.star = true;
});

window.CATS = { all:"All", plain:"Plain", breakfast:"Pat Breakfast", pattie:"Pattie", liver:"Liver", stall:"On the stall" };

/* Gallery (45 unique photos). Files are in images/thumb and images/full. */
window.GALLERY = [
  { id:"p30", cat:"stall", w:640, h:287, alt:"Fresh on the stall" },
  { id:"p01", cat:"plain", w:480, h:986, alt:"Plain fatkoek" },
  { id:"p16", cat:"breakfast", w:480, h:1066, alt:"Pat Breakfast: egg and polony" },
  { id:"p11", cat:"pattie", w:640, h:254, alt:"Fatkoek with burger patty" },
  { id:"p37", cat:"liver", w:640, h:287, alt:"Fatkoek with chicken livers" },
  { id:"p31", cat:"stall", w:640, h:287, alt:"Fresh on the stall" },
  { id:"p02", cat:"plain", w:480, h:986, alt:"Plain fatkoek" },
  { id:"p17", cat:"breakfast", w:480, h:986, alt:"Pat Breakfast: egg and polony" },
  { id:"p12", cat:"pattie", w:640, h:254, alt:"Fatkoek with burger patty" },
  { id:"p32", cat:"stall", w:640, h:287, alt:"Fresh on the stall" },
  { id:"p03", cat:"plain", w:640, h:254, alt:"Plain fatkoek" },
  { id:"p18", cat:"breakfast", w:480, h:986, alt:"Pat Breakfast: egg and polony" },
  { id:"p13", cat:"pattie", w:640, h:254, alt:"Fatkoek with burger patty" },
  { id:"p33", cat:"stall", w:640, h:287, alt:"Fresh on the stall" },
  { id:"p04", cat:"plain", w:640, h:254, alt:"Plain fatkoek" },
  { id:"p19", cat:"breakfast", w:480, h:986, alt:"Pat Breakfast: egg and polony" },
  { id:"p14", cat:"pattie", w:640, h:254, alt:"Fatkoek with burger patty" },
  { id:"p34", cat:"stall", w:640, h:287, alt:"Fresh on the stall" },
  { id:"p05", cat:"plain", w:480, h:1066, alt:"Plain fatkoek" },
  { id:"p20", cat:"breakfast", w:480, h:986, alt:"Pat Breakfast: egg and polony" },
  { id:"p15", cat:"pattie", w:640, h:254, alt:"Fatkoek with burger patty" },
  { id:"p35", cat:"stall", w:640, h:287, alt:"Fresh on the stall" },
  { id:"p07", cat:"plain", w:480, h:1066, alt:"Fresh fatkoek from the kitchen" },
  { id:"p21", cat:"breakfast", w:480, h:986, alt:"Pat Breakfast: egg and polony" },
  { id:"p22", cat:"breakfast", w:480, h:986, alt:"Pat Breakfast: egg and polony" },
  { id:"p38", cat:"stall", w:640, h:287, alt:"Fresh on the stall" },
  { id:"p08", cat:"plain", w:640, h:254, alt:"Plain fatkoek" },
  { id:"p23", cat:"breakfast", w:480, h:986, alt:"Pat Breakfast: egg and polony" },
  { id:"p39", cat:"stall", w:640, h:287, alt:"Fresh on the stall" },
  { id:"p09", cat:"plain", w:640, h:254, alt:"Plain fatkoek" },
  { id:"p24", cat:"breakfast", w:640, h:287, alt:"Pat Breakfast: egg and polony" },
  { id:"p40", cat:"stall", w:640, h:287, alt:"Fresh on the stall" },
  { id:"p10", cat:"plain", w:480, h:986, alt:"Plain fatkoek" },
  { id:"p25", cat:"breakfast", w:640, h:287, alt:"Pat Breakfast: egg and polony" },
  { id:"p41", cat:"stall", w:640, h:287, alt:"Fresh on the stall" },
  { id:"p26", cat:"breakfast", w:640, h:287, alt:"Pat Breakfast: egg and polony" },
  { id:"p42", cat:"stall", w:640, h:287, alt:"Fresh on the stall" },
  { id:"p27", cat:"breakfast", w:640, h:287, alt:"Pat Breakfast: egg and polony" },
  { id:"p43", cat:"stall", w:640, h:287, alt:"Fresh on the stall" },
  { id:"p28", cat:"breakfast", w:640, h:287, alt:"Pat Breakfast: egg and polony" },
  { id:"p44", cat:"stall", w:640, h:287, alt:"Fresh on the stall" },
  { id:"p29", cat:"breakfast", w:640, h:287, alt:"Pat Breakfast: egg and polony" },
  { id:"p45", cat:"stall", w:640, h:287, alt:"Fresh on the stall" },
  { id:"p36", cat:"stall", w:640, h:287, alt:"Fresh on the stall" },
  { id:"p46", cat:"stall", w:640, h:287, alt:"Fresh on the stall" }
];
