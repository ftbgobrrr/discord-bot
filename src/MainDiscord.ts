import { ArgsOf, Client, CommandMessage, CommandNotFound, Discord, On, Once } from "@typeit/discord";
import { Channel, Message, MessageEmbed } from 'discord.js'
import * as Path from "path";
import { getStatus } from "./utils/Status";

@Discord('!', 
    {
        import: [
            Path.join(__dirname,  "commands", "*.ts"),
            Path.join(__dirname,  "events", "*.ts")
        ]
    }
) // Decorate the class
export class MainDiscord {

    public lastStatus: any = null;

    @CommandNotFound()
    notFoundA(command: CommandMessage) {
        command.reply("Command not found");
    }

    @Once('ready')
    ready(args: ArgsOf<"ready">, client: Client) {
        console.log('Connected')
        const statusCycle = async () => {
            // const diff = (a, b) => { 
                // return a.filter(x => !b.includes(x)); 
            // }
            const status = await getStatus(false);
            if (this.lastStatus != null && status.players.now != this.lastStatus.players.now) {
                const channel = client.channels.cache.get("831528071835549706");
                // const diffplayers = diff(status.players.sample.map(({ name }) => name), this.lastStatus.players.sample.map(({ name }) => name));
                // const diffplayersrevers = diff(this.lastStatus.players.sample.map(({ name }) => name), status.players.sample.map(({ name }) => name));
                if (channel?.isText()) {
                    channel.send(new MessageEmbed().setTitle(`${status.players.now} players online`).setColor(0x2C0000))
                }
            }
            this.lastStatus = status;
            setTimeout(() => statusCycle(), 5000);
        }
        statusCycle();
    }
}
