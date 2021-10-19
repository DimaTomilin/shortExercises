const fs=require("fs")
const fsPromises = require('fs').promises;
const path = require("path")
const os = require("os");

async function promiseTreasure(roomPath) {
    fsPromises.readdir(roomPath)
    .then((files) => {
        files.forEach(file => {
            fsPromises.lstat(path.join(roomPath, file))
            .then((result) => {
                if(result.isFile())
                    promiseChest(path.join(roomPath, file));
            })
            .catch((reject) => {
                console.log(reject);
                return;
            });
        })
    })
    .catch((reject) => {
        console.log(reject);
        return;
    })
}

async function promiseChest(roomPath) {
    fsPromises.readFile(roomPath)
    .then((clue) => {
        clue = clue.toString().trim();
        if(checkJson(clue)){
            drawMapSync(roomPath);
            if(JSON.parse(clue).treasure !== undefined){
                drawMapSync("Treasure!");
                console.log("treasure found!");
                return;
            }
            promiseTreasure(JSON.parse(clue).clue)
        }
    })
    .catch(err => {
        console.error(err)
        return;
    });
}

async function drawMapSync(currentRoomPath) {
    fs.appendFileSync("./treasureMap.txt", currentRoomPath + os.EOL);

}


const checkJson=(data) => {
    try{
        data=JSON.parse(data);
    } catch(err) {
        return false;
    }
    return true;  
}

fs.writeFileSync(`./treasureMap.txt`,(''));
promiseTreasure(`./maze`);