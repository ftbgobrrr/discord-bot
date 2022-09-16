import { CommandInteraction, EmbedBuilder, Message } from "discord.js";
import type { SimpleCommandMessage } from "discordx";
import {
  Discord,
  Slash,
} from "discordx";
import { StatusEmbed } from "../utils/Status.js";

@Discord()
export class Example {

  @Slash({ name: "status" })
  async status(command: CommandInteraction): Promise<void> {
    const embed = await StatusEmbed()
    command.reply({ embeds: [embed] });
  }
}
