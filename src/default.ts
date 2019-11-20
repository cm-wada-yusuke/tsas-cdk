import * as Console from 'console';
import * as commander from 'commander';

const invalidCommand = new commander.Command();
invalidCommand.parse(process.argv);

Console.log(
    `Invalid command: ${invalidCommand.args[0]}\nSee --help for a list of available commands.`,
);
process.exit(1);
