//jshint esversion:8
const { MessageMedia } = require('whatsapp-web.js');
const { download } = require('../helpers/song');

const execute = async (client, msg, args) => {
    if (msg.hasQuotedMsg) {
        msg.delete(true);
        let quotedMsg = await msg.getQuotedMessage();
        let getdata = await download(args[0], quotedMsg.id.id);
        if (getdata.status) {
            await client.sendMessage(msg.to, new MessageMedia(getdata.content.image.mimetype, getdata.content.image.data, getdata.content.image.filename), { caption: getdata.content.text });
        } else {
            await client.sendMessage(msg.to, getdata.content);
        }
    }
    else {
        await client.sendMessage(msg.to, '```Cerca una canzone dalla lista song e rispondi alla canzone nella lista```');
      

};

module.exports = {
    name: 'Download Song',
    description: 'Download selected song from the list',
    command: '!dldsong',
    commandType: 'plugin',
    isDependent: true,
    help: 'use !help song to learn about this command',
    execute
};
