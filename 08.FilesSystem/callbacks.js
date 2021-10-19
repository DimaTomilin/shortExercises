const fs = require("fs")
const os = require("os");

const myMap=[];

let found = false;
const findTreasureSync=(roomPath, cb)=> {
    fs.readdir(roomPath, (err, files)=>{
        if(err) return console.error(err);
        else {
            files.forEach(check => {
                if(check.endsWith('.json')&&!found){
                    return cb(`${roomPath}/${check}`)
                }
            })
        }
    });
    ;
}


const openChestSync=(chestPath, cb)=> {
    try {
        const file=JSON.parse(fs.readFileSync(chestPath).toString().trim());
        drawMapSync(chestPath);
        if(file.treasure!==undefined){
            drawMapSync("treasure!")
            found = true;
            return;
        }
        const clue = file.clue;
        return (findTreasureSync(clue));
    } catch (error) {
        console.error(error)
        return;
    }
}


const drawMapSync=(currentRoomPath, cb)=> {
    fs.appendFileSync("./treasureMap.txt", currentRoomPath+os.EOL);
}

findTreasureSync(`./maze`, openChestSync);



/*

const fs=require("fs")

function findTreasure(roomPath, cb) {
    fs.readdir(roomPath,(err,files)=>{
        if(err)
            return;
        files.forEach(check => {
            if(check.endsWith('.json'))
            {
                cb(`${roomPath}/${check}`,)
            }            
        });
    }
    );
}


function openChest(chestPath, cb) {
    let clue = fs.lstat(chestPath,(err,data)=>{
        if (err)
            return;
                console.log(data);
    })
}


function drawMapSync(currentRoomPath, cb) {

}

findTreasure(`./maze`,openChest)
*/