const Room = require('../models/RoomModel');
const {mongooseToObject, mutipleMongooseToObject}=require('../../ultil/mongoose');
class MeController {
  //[get]/news

  JoinRoom(req, res,next) {
      var idPlayer={idPlayer:req.query.idplayer};
      var UserName={UserName:req.query.Username};
      var Loca={Loca:req.query.Loca};
      var Of={Of:req.query.Of};
   res.render('HarvestFestival/HarvestFestivalStartRoom',{
     idPlayer:idPlayer,
     Username:UserName,
     Loca:Loca,
     Of:Of,
 })
       }
  JoinGame(req,res)
  { 
    var id=req.params.id;
    // console.log(id);
    res.render('HarvestFestival/HarvestFestivalWaitingRoom',{id});
  }
  Save1(req, res) {
    var data = req.body;
    var keys = `[`;
    keys += Object.keys(data);
    keys += `]`;
    var dataArray = JSON.parse(keys);
    // console.log(dataArray);
  // console.log(dataArray);
    // Xóa toàn bộ dữ liệu trong collection trước khi thêm mới
    Room.deleteMany({})
      .then(() => {
        console.log("Đã xóa toàn bộ dữ liệu thành công!");
  
        // Thêm dữ liệu mới
        return Promise.all(
          dataArray.map((item) => {
            var bien = {
              Code: item.id,
              Room: item.Room,
            };
  
            const room = new Room(bien);
            return room.save();
          })
        );
      })
      .then(() => {
        console.log("Đã thêm mới dữ liệu thành công");
      })
      .catch((err) => {
        console.error(err);
      });
    // Room.deleteMany({})
    // .then(() => {
    //   console.log("Đã xóa toàn bộ dữ liệu thành công!");
  
    //   // Kiểm tra nếu dữ liệu đã tồn tại trước khi thêm mới
    //   return Promise.all(
    //     dataArray.map(async (item) => {
    //       const filter = { Code: item.id };
    //       const update = {
    //         $setOnInsert: {
    //           Code: item.id,
    //           Room: item.Room,
    //         },
    //       };
  
    //       const result = await Room.updateOne(filter, update, { upsert: true });
  
    //       if (result.upserted) {
    //         console.log(`Đã thêm mới phòng với Code ${item.id}`);
    //       } else {
    //         console.log(`Phòng với Code ${item.id} đã tồn tại. Skipping...`);
    //       }
    //     })
    //   );
    // })
    // .then(() => {
    //   console.log("Đã thêm mới dữ liệu thành công");
    // })
    // .catch((err) => {
    //   console.error(err);
    // });
  }
}
module.exports = new MeController();
