import {
    CommandMessage,
    Command
} from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import { Client } from "discord.js";
import { getStatus } from "../utils/Status";

export abstract class StatusCommand {
    @Command("status")
    async status(command: CommandMessage, client: Client) {
        const status = await getStatus(true);
        const embed = new MessageEmbed()
            .setTitle("FTB GO BRRR STATUS")
            .setColor(status.online ? 0x00FF00 : 0xFF0000)
            .setTimestamp()
            .setThumbnail('attachment://favicon.png')
            .setFooter(`requested by (${command.author.tag})`)
            .addField('Status', status.online ? 'Online' : 'Offline')
        if (status.online) {
            embed.addField('Motd', status.motd)
                .addField('Players', `${status.players.now}/${status.players.max}`)
                .addField('Version', status.server.name, true)
                .addField('Players', status.players.sample.map(({ name }) => name).join(', ') || 'No players')
                .attachFiles([status.favicon])
        }
        command.channel.send(embed);
    }
}