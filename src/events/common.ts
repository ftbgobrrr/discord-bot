import { TextChannel } from "discord.js";
import { ArgsOf, Client, Once } from "discordx";
import { Discord, On } from "discordx";
import { getStatus, StatusEmbed } from "../utils/Status.js";

@Discord()
export class Example {
  @On()
  messageDelete([message]: ArgsOf<"messageDelete">, client: Client): void {
    console.log("Message Deleted", client.user?.username, message.content);
  }

  public lastStatus: any = null;

  @Once({ event: 'ready' })
  ready(args: ArgsOf<"ready">, client: Client) {
   
      const statusCycle = async () => {
          const status = await getStatus();
          if (this.lastStatus == null || status.online && status.players.length != this.lastStatus.players.length) {
              const channel = client.channels.cache.get(process.env.STATUS_CHANNEL as string);
              if (channel && channel.isTextBased() && channel instanceof TextChannel) {
                let fetched;
                do {
                  fetched = await channel.messages.fetch({limit: 100});
                  channel.bulkDelete(fetched);
                }
                while(fetched.size >= 2);
                channel.send({ embeds: [await StatusEmbed()]})
              }
          }
          this.lastStatus = status;
          setTimeout(() => statusCycle(), 5000);
      }
      statusCycle();
  }
}
