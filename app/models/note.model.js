

const mongoose = require('mongoose');


const mongoSchema = mongoose.Schema


var noteSchema = new mongoSchema({

  userId: {
    type: mongoSchema.Types.ObjectId,
    ref: 'User',
    required: [true, "UserId required"]
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  archive: {
    type: Boolean
  },
  trash: {
    type: Boolean
  },
  pinned: {
    type: Boolean
  },
  color: {
    type: String
  },
reminder:{
  type:String
}
},
  {
    timestamps: true,
  },

);


var note = mongoose.model("Note", noteSchema)

//function noteModel() { }

function noteModel() { }

noteModel.prototype.createNote = (objectNote, callback) => {
  //console.log("Input in create note==>", objectNote.body);


  var obj = {
    "userId": objectNote.decoded.payload.user_id,
    "title": objectNote.body.title,
    "description": objectNote.body.description,
    "archive": objectNote.body.archive,
    "pinned":objectNote.body.pinned,
    "trash":objectNote.body.trash
  }
  console.log("????????????????????????????????????????????????????????????????", obj);


  const noteData = new note(obj)


  noteData.save((err, result) => {
    if (err) {
      console.log('aaaaaaaaaaaaaaaaaa', err);
      callback(err);

    }
    else {
      console.log('Data Saved in Database===>', result);
      callback(null, result)
    }
  })

}

/*
noteModel.prototype.getNote = (data, callback) => {
  console.log('model==>',data)
  let obj = {
    "_id": data._id
  }
  note.findById(obj, (err, result) => {
    if (err) {
      console.log(err);
      callback(err)

    } else {
      //console.log();
      callback(null, result)
    }
  })
}
*/

noteModel.prototype.getNotes = (req, callback) => {
  // console.log("<><><><><><><><><><><>", req.decoded.payload.user_id);

  note.find({ userId: req.decoded.payload.user_id }, (err, result) => {
    if (err) {
      console.log("Model not found");
      callback(err)
    }
    else {
      console.log("Note Retrieved Successfully");
      callback(null, result)
    }
  })
}

noteModel.prototype.updateColor = (noteId, updateNote, callback) => {
  note.findOneAndUpdate(
    {
      _id: noteId
    },
    {
      $set:
      {
        color: updateNote
      }
    }, (err, result) => {
      if (err) {
        console.log("Color has not been updated");
        callback(err)
      } else {
        console.log("Color Updated successfully", result);
        callback(null, updateNote)
      }
    }
  )
}

noteModel.prototype.deleteNote = (data, callback) => {
  console.log("noteId given to delete note >", data);

  note.deleteOne({ _id: data }, (err, result) => {
    if (err) {
      console.log("error in deleting note");
      callback(err)
    } else {
      // console.log("Result in NoteModel===>",result);

      const obj = {
        status: 200,
        message: "Note deleted successfully",
        result: result,
      }
      callback(null, obj)
      console.log("Result in NoteModel===>", obj);

    }
  })
}

noteModel.prototype.editTitle = (data, callback) => {
  var paramData = data.title
  var paramId = data.noteId
  note.findOneAndUpdate(
    {
      _id: paramId
    },
    {
      $set:
      {
        title: paramData,
      }
    },
    (err, result) => {
      if (err) {
        console.log("error in editing title");
        callback(err)
      } else {
        console.log("title edited");
        callback(nul, paramData, result)   // here result is optional
      }
    }
  )
}

noteModel.prototype.editDescription = (paramId,paramData, callback) => {
  console.log("\nparamId<=====>",paramId);
  console.log("paramData<====>",paramData);
  
  note.findOneAndUpdate(
    {
      _id: paramId
    },
    {
      $set:
      {
        description: paramData
      }
    },
    (err, result) => {
      if (err) {
        console.log("error in editing description");
        callback(err)
      } else {
        console.log("Edited profile",result);
        console.log("description edited",paramData);
        callback(null,  paramData,)      
      }
    }
  )
}


noteModel.prototype.isArchived = (noteId, archiveData, callback) => {
  console.log("noteId in model==>", noteId);
  console.log("archiveData in model", archiveData);

  note.findOneAndUpdate({
    _id: noteId
  }, {
      $set: {
        archive: archiveData,
        // pinned: false,
        // trash: false,
      }
    }, (err, result) => {
      if (err) {
        console.log("couldnt update archived data");
        callback(err);
      } else {
        console.log("archived data updated successfully");
        callback(null, result)
      }
    })
}
noteModel.prototype.isPinned = (noteId, pinnedData, callback) => {
  console.log("noteId in model==>", noteId);
  console.log("pinned Data in model", pinnedData);

  note.findOneAndUpdate({
    _id: noteId
  }, {
      $set: {
        pinned: pinnedData,
       
      }
    }, (err, result) => {
      if (err) {
        console.log("couldnt update pinnned data");
        callback(err);
      } else {
        console.log("pinned data updated successfully");
        callback(null, result)
      }
    })
}


//zibtek  || zipteck
noteModel.prototype.clearisPinned=(noteId,pinnedData,callback)=>{
  console.log("noteId<><><><>",noteId);
  console.log("pinnedData<><><><>",pinnedData);
  
  note.findOneAndUpdate({
    _id:noteId  
  },{
    $set:{
      pinned:pinnedData,
      archive:false,
      trash:false
    }
  },(err,result)=>{
    if(err){
      console.log("Couldnt update pinned info");
      callback(err)
    }else{
      console.log("pinned data updated successfully");
      callback(null,result)
    }
  })
}

noteModel.prototype.isTrashed=(noteId,trashedData,callback)=>{
  console.log("nodeId-----",noteId);
  console.log("trashData---",trashedData);
    
  note.findOneAndUpdate({
    _id:noteId
  },{
    $set:{
      trash:trashedData,
      archive:false,
      pinned:false,
    }
  },(err,result)=>{
    if(err){
      console.log("Couldnt update trash info");
      callback(err)
    }else{
      console.log("trash data updated successfully",result);
      callback(null,result)
    }
  })
}
noteModel.prototype.setReminder=(data,callback)=>{
  console.log("noteId-----",data.nodeId);
  console.log("reminserData-----",data.reminder);
  note.findOneAndUpdate({
    _id:data.noteId
  },{
    $set:{
      renminder:data.reminder,
      trash:false
    }
    },(err,result)=>{
      if(err){
        console.log(' couldnt update reminder info');
        callback(err)
      }
      else{
        console.log('r4eminder data updated successfully',result);
        callback(null,result)
      }
    
  })
}





module.exports = new noteModel();