const fs = require("fs");
const path = require("path");
const os = require("os");


function findTreasure(roomPath, cb) {
    fs.readdir(roomPath, (err, files) => {
        if (err){
            return;
        }
        files.forEach(file => {
            fs.lstat(path.join(roomPath, file), (err, stat) => {
                if(err){
                    return;
                }
                if(stat.isFile()){
                    cb((path.join(roomPath, file)), findTreasure);
                }
            })
        });
    }
    );
}

function openChest(chestPath, cb) {
    fs.readFile(chestPath, (err, data) => {
        if (err){   
            return;
        }
        if(checkJson(data.toString().trim())){ 
            data = JSON.parse(data.toString().trim());
            drawMapSync(chestPath);
            if(data.treasure !== undefined){
                drawMapSync("treasure!")
                console.log("found the treasure!");
                return;
            }
            cb(data.clue, openChest);
        }
    })
}

function drawMapSync(currentRoomPath) {
    fs.appendFileSync("./treasureMap.txt", currentRoomPath + os.EOL);
}

const checkJson=(data) => {
    try{
        JSON.parse(data);
    } catch(err) {
        return false;
    }
    return true;
}

fs.writeFileSync(`./treasureMap.txt`,(''));
findTreasure(`./maze`, openChest)