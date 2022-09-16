import sharp from "sharp";
// import status from 'minecraft-server-status';
import { getStatus as status } from 'mc-server-status'
import { EmbedBuilder } from "@discordjs/builders";

export async function getStatus(): Promise<any> {

    try {
        const s = await status(process.env.SERVER_IP as string) as any;
        const sample: { id: string, name: string }[] = s.players.sample || []
        return { online: true, players: sample, motd: s.description.text, maxPlayers: s.players.max };
    } catch (e) {
        return { online: false }
    }
}

export async function StatusEmbed() {
    const status = await getStatus();
    const embed = new EmbedBuilder()
        .setTitle("FTB GO BRRR STATUS")
        .setColor(status.online ? 0x00FF00 : 0xFF0000)
        .setTimestamp()
        .addFields({ name: 'Status', value: status.online ? 'Online' : 'Offline'})
    if (status.online) {
        embed.addFields({ name: 'Motd', value: status.motd});
        embed.addFields({ name: 'Players', value: `${status.players.length}/${status.maxPlayers}`});
        embed.addFields({ name: 'Players Online', value: status.players.map(({ name }: { name: string }) => name).join(', ') || 'No players'})
    }
    return embed;
}