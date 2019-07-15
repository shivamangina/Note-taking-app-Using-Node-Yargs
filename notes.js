const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.find((note) => {
        return note.title === title
    }
    )


    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {
   const notes = loadNotes()
   const notesToKeep = notes.filter((note) => {
    
       return note.title != title
      
   })
   saveNotes(notesToKeep)
   if (notes.length>notesToKeep.length){
    console.log(chalk.green.inverse('Note Removed'))
   }
   else{
    console.log(chalk.red.inverse('Note not Found'))
   }
  
  
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse("Your Notes"));
    notes.forEach(note => {
        console.log(chalk.inverse(note.title))
   
    });
    
}

const readNote = (title) => {
    const notes = loadNotes()
    const note  = notes.find((note) => {
        return note.title === title
    })

    if(note){
        console.log(chalk.inverse(note.title))
        console.log(chalk.yellow(note.body))
        
    }
    else{
        console.log(chalk.red.inverse("note not found"))
    }
   
}




module.exports = {
    removeNote:removeNote,
    getNotes: getNotes,
    addNote: addNote,
    listNotes:listNotes,
    readNote:readNote
}