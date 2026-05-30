// //Addon originally written by C++, but rewritten by trplnr

// const commandName = '/eval'
// // https://stackoverflow.com/questions/9609393/catching-console-log-in-node-js
// let log = [],
// hook_stream = function (_stream, fn) {
//     // Reference default write method
//     let old_write = _stream.write;
//     // _stream now write with our shiny function
//     _stream.write = fn;
//     return function () {
//         // reset to the default write method
//         _stream.write = old_write;
//     };
// }

module.exports = ({Events}) => {
    // Events.on('chatMessage', ({ message, socket, preventDefault }) => {
    //     const perms = socket.permissions
    //     if (!message.startsWith(commandName)) return
    //     if (!perms) return
    //     if (!perms.evalCommand) return
    //     const self = socket, // urself
    //         all = sockets.clients, // everyone
    //         others = sockets.clients.filter(client => client != self) // everyone excluding you
    //     let js = message.substring(commandName.length + 1) // cut that /eval part
    //     unhook_stdout = hook_stream(process.stdout, (string, encoding, fd) => {
    //         log.push(string)
    //     }) // lets catch that output
    //     try {
    //         eval(js)
    //         if (log[0] != undefined) {
    //             let lines = log[0].split('\n').reverse()
    //             for (let i = 0; i < lines.length; i++) socket.talk('m', lines[i])
    //         }
    //         unhook_stdout() // unhook our capture system
    //         console.log(log[0]) // log to the actual console
    //         log = [] // reset the logs
    //     } catch (err) { // no crash :)
    //         socket.talk('m', err.toString()) // send the error to the player
    //         unhook_stdout() // unhook our capture system
    //     }
    //     preventDefault() // you shall not pass!
    // })
}