import * as path from 'path';
import * as fs from 'fs-extra';
import * as readlineSync from 'readline-sync';
import { print, success, warning } from '../../config/logging';

const camelCase = require('camelcase');
const decamelize = require('decamelize');

type InitReadlineConf = {
    appName: string;
    defaultRegion: string;
};

const readlineForConfig = (): InitReadlineConf => {
    const appName = readlineSync.question(
        'What your serverless application name? [$<defaultInput>]',
        {
            defaultInput: decamelize(
                path.basename(path.resolve(process.cwd())),
            ),
        },
    );
    const defaultRegion = readlineSync.question(
        'What your default region? [$<defaultInput>]',
        {
            defaultInput: 'ap-northeast-1',
        },
    );
    return { appName, defaultRegion };
};

const expandPlaceholder = (
    templateString: string,
    project: InitReadlineConf,
): string => {
    return templateString
        .replace(/%appName%/g, project.appName)
        .replace(/%appName\.camelCased%/g, camelCase(project.appName))
        .replace(
            /%appName\.PascalCased%/g,
            camelCase(project.appName, { pascalCase: true }),
        )
        .replace(/%defaultRegion%/g, project.defaultRegion);
};

const installProcessed = async (
    templatePath: string,
    toFile: string,
    project: InitReadlineConf,
): Promise<void> => {
    const template = await fs.readFile(templatePath, { encoding: 'utf-8' });
    await fs.writeFile(toFile, expandPlaceholder(template, project));
};

const installFilesRecursive = async (
    fromDirectory: string,
    targetDirectory: string,
    project: InitReadlineConf,
): Promise<void> => {
    for (const file of await fs.readdir(fromDirectory)) {
        const fromFile = path.join(fromDirectory, file);
        const toFile = path.join(
            targetDirectory,
            expandPlaceholder(file, project),
        );
        if ((await fs.stat(fromFile)).isDirectory()) {
            await fs.mkdir(toFile);
            await installFilesRecursive(fromFile, toFile, project);
        } else if (file.match(/^.*\.template\.[^.]+$/)) {
            await installProcessed(
                fromFile,
                toFile.replace(/\.template(\.[^.]+)$/, '$1'),
                project,
            );
        } else if (file.match(/^.*\.hook\.[^.]+$/)) {
            warning('not implemented');
        } else {
            await fs.copy(fromFile, toFile);
        }
    }
};

export const init = async (): Promise<void> => {
    print('initialize');
    const conf: InitReadlineConf = readlineForConfig();
    const templatesDir = path.join(__dirname, 'init-templates');
    const currentDir = process.cwd();
    await installFilesRecursive(templatesDir, currentDir, conf);

    success(`✅ All done!`);
};
