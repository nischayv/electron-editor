const loader = require('monaco-loader')
const { remote } = require('electron')
const { dialog } = require('electron').remote
const fs = require('fs')

loader().then(monaco => {
  let editor = monaco.editor.create(document.getElementById('container'), {
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true
  })

document.getElementById('open').onclick = () => {
  dialog.showOpenDialog({}, (files) => {
    if(files && files.length > 0) {
      fs.readFile(files[0], 'utf8', (err, res) => {
        if (!err) {
          editor.setModel(monaco.editor.createModel(res, 'javascript'));
        }
      })
    }
  })
}

document.getElementById('save').onclick = () => {
  remote.dialog.showSaveDialog(filename => {
   let data = ''
   let model = editor.getModel()
   console.log('no error')

   model._lines.forEach(line => data += line.text + model._EOL)
   fs.writeFile(filename, data, 'utf-8')
 })
}

})
