import {
    CommandMessage,
    Command
} from "@typeit/discord";

export abstract class TestCommand {
    @Command("test")
    async test(command: CommandMessage) {
        command.reply("TEST OK!");
    }
}