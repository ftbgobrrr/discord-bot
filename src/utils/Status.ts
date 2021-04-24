import { MessageAttachment } from "discord.js";
import sharp from "sharp";
import mcstatus from 'minecraft-server-status';

export async function getStatus(getFavicon: boolean): Promise<any> {
    return new Promise((resolve) => {
        mcstatus('mc.ftbgobrrr.llelievr.dev', 25500, async res => {
            if (getFavicon && res.favicon) {
                const buf = Buffer.from(res.favicon.replace('data:image/png;base64,', ''), "base64");
                const favicon = new MessageAttachment(
                    await sharp(buf)
                        .resize(52, 52)
                        .toBuffer(), 
                    'favicon.png'
                );
                resolve({ ...res, favicon });
            }
            else
                resolve(res);
        }, error => console.log(error))
    })
}