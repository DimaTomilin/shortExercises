const fs=require("fs")
const os = require("os");

let found = false;
const findTreasureSync=(roomPath)=> {
    const skelton = fs.readdirSync(roomPath, );
    skelton.forEach(file => {
        const fileInformation = fs.statSync(`${roomPath}/${file}`)
        if(fileInformation.isFile()&&!found){
            return openChestSync(`${roomPath}/${file}`)
        }
    });
}


const openChestSync=(chestPath)=> {
    try {
        const file = JSON.parse(fs.readFileSync(chestPath).toString().trim());
        drawMapSync(chestPath);
        if(file.treasure!==undefined){
            drawMapSync("treasure!")
            found = true;
            return;
        }
        const clue = file.clue;
        return (findTreasureSync(clue));
    } catch (error) {
        return console.error(error)
    }
}

const drawMapSync=(currentRoomPath)=> {
    fs.appendFileSync("./treasureMap.txt", currentRoomPath+os.EOL);
}

findTreasureSync(`./maze`);