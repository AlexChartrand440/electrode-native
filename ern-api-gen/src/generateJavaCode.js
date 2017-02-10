import {mustacheRenderToOutputFileUsingTemplateFile} from './renderer';
import shell from 'shelljs';
import log from './log';
import jView from './javaView';

export default async function generateJavaCode(view, apiGenDir) {
    view = jView(view, apiGenDir);
    let destPath = view.namespace.replace(/\./g, '/');

    const javaOutputPath = `android/lib/src/main/java/${destPath}/${view.apiName}/api`;
    shell.mkdir('-p', javaOutputPath);

    log.info(`Generating ${javaOutputPath}/${view.pascalCaseApiName}ApiClient.java`);
    await mustacheRenderToOutputFileUsingTemplateFile(
        `${apiGenDir}/templates/java/ApiClient.java.mustache`,
        view,
        `${javaOutputPath}/${view.pascalCaseApiName}ApiClient.java`);

    log.info(`Generating ${javaOutputPath}/${view.pascalCaseApiName}Api.java`);
    await mustacheRenderToOutputFileUsingTemplateFile(
        `${apiGenDir}/templates/java/Api.java.mustache`,
        view,
        `${javaOutputPath}/${view.pascalCaseApiName}Api.java`);

    log.info(`Generating ${javaOutputPath}/Names.java`);
    await mustacheRenderToOutputFileUsingTemplateFile(
        `${apiGenDir}/templates/java/Names.java.mustache`,
        view,
        `${javaOutputPath}/Names.java`);

}
