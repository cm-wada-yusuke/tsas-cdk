import * as commander from 'commander';
import { print } from './config/logging';

const invalidCommand = new commander.Command();
invalidCommand.parse(process.argv);

print(
    `Invalid command: ${invalidCommand.args[0]}\nSee --help for a list of available commands.`,
);
process.exit(1);
