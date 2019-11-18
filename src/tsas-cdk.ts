import * as commander from 'commander';
import { APP_VERSION } from './constant';

const tsasCdk = new commander.Command();
tsasCdk.version(APP_VERSION);

tsasCdk
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');

tsasCdk.parse(process.argv);

if (tsasCdk.debug) console.log(tsasCdk.opts());
console.log('pizza details:');
if (tsasCdk.small) console.log('- small pizza size');
if (tsasCdk.pizzaType) console.log(`- ${tsasCdk.pizzaType}`);
