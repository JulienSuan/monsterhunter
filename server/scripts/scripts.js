const fs = require('fs');
const {offsets} = require('../utils/offsets');
const {items, swords} = require("../datas/datas")

const Offsets = {
    NAME_OFFSET: 0x18cc9C,
    NAME_OFFSET2: 0x2AC560,
  NAME_OFFSET3: 0x3cbe24,
};
let allSaves = []


function extractData(saveData) {
  allSaves = []
  let saves = []
   const saveOne = saveData.toString("utf-8", Offsets.NAME_OFFSET, Offsets.NAME_OFFSET + 32)
   if (!saveOne) {
    throw new Error("stop")
   }
   console.log(saveOne.split(""))
   if (saveOne.split("")[0] == "\x00") {
    console.log("ya rien")
   } else {
    console.log(saveOne)
    saves[0] = Offsets.NAME_OFFSET
   }
   const saveTwo = saveData.toString("utf-8", Offsets.NAME_OFFSET2, Offsets.NAME_OFFSET2 + 32)
   console.log(saveTwo)
   if (saveTwo.split("")[0] == "\x00") {
    console.log("ya rien")
   } else {
    console.log(saveTwo)
    saves[1] = Offsets.NAME_OFFSET2
   }
   const saveThree = saveData.toString("utf-8", Offsets.NAME_OFFSET3, Offsets.NAME_OFFSET3 + 32)
   console.log(saveThree)
   if (saveThree.split("")[0] == "\x00") {
    console.log("ya rien")
   } else {
    console.log(saveThree)
    saves[2] = Offsets.NAME_OFFSET3
   }
   
   console.log(saves)





   for (const offs of saves) {
      const player = {
        boxItems: [],
        charName: '',
        playTime: 0,
        funds: 0,
      };
  player.charName = saveData.toString('utf8', offs, offs + offsets.name.size).split("\x00")[0];
  const playTime = saveData.readInt32LE((offs + offsets.play_time.val));
  const heures = Math.floor(playTime / 3600);
  const minutes = Math.floor((playTime % 3600) / 60);
  player.playTime = {
    heures,
    minutes
  }
  console.log(heures + " heures");
  console.log(minutes + " minutes");
  player.funds = saveData.readInt32LE((offs + offsets.funds.val));
  player.hunterRank = saveData.readInt16LE((offs + offsets.hunter_rank.val));
  player.hunter_art_1 = saveData.readInt16LE((offs + offsets.hunter_art_1.val));
  player.hunter_art_2 = saveData.readInt16LE((offs + offsets.hunter_art_2.val));
  player.hunter_art_3 = saveData.readInt16LE((offs + offsets.hunter_art_3.val));
  player.weapon_type = swords[saveData.readInt8((offs + offsets.weapon_type.val)) - 1];
  player.features = saveData.readInt8((offs + offsets.features.val));
  player.hr_points = saveData.readInt32LE((offs + offsets.hr_points.val));
  player.academy_points = saveData.readInt32LE((offs + offsets.academy_points.val));
  player.bherna_points = saveData.readInt32LE((offs + offsets.bherna_points.val));
  player.kokoto_points = saveData.readInt32LE((offs + offsets.kokoto_points.val));
  player.pokke_points = saveData.readInt32LE((offs + offsets.pokke_points.val));
  player.yukumo_points = saveData.readInt32LE((offs + offsets.yukumo_points.val));
  const playerSexe = saveData.readInt8(608);
  let gender = playerSexe === 0 ? "Homme" : "Femme"
  player.playerGender = gender

 console.log(Math.floor(19 / 8))
 console.log(Math.floor(19 % 8))
  
  const itemsBuffer = saveData.subarray(offs + offsets.box_items.val, offs + offsets.box_items.val + offsets.box_items.size);
  let bitOffset = 0;
  while (bitOffset + 19 <= itemsBuffer.length * 8) {
    const byteOffset = Math.floor(bitOffset / 8);
    const bitShift = bitOffset % 8;
    const itemData = (itemsBuffer.readUInt8(byteOffset) >> bitShift) |
      (itemsBuffer.readUInt8(byteOffset + 1) << (8 - bitShift)) |
      (itemsBuffer.readUInt8(byteOffset + 2) << (16 - bitShift));

    const itemCount = (itemData >> 12) & 0x7F; // 7 high bits 📍  
    const itemId = itemData & 0xFFF; // 12 low bits 📍 
    if (itemId === 0) {
      bitOffset += 19;
      continue;
    }
    player.boxItems.push({ itemId, itemCount, name: items[itemId] });   
    bitOffset += 19;
  }
  console.log("index : " +  saves.indexOf(offs))
  allSaves[saves.indexOf(offs)]  =  player;
   } 
   return allSaves
}




module.exports.extractData = extractData