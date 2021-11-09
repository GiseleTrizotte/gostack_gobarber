import handlebars from 'handlebars';
import fs from 'fs';

import IParseTemplateMailTemplateDTO from "../dtos/IParseTemplateMailTemplateDTO";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: IParseTemplateMailTemplateDTO): Promise<string> {
    const templaFileContent = await fs.promises.readFile(file, {
      encoding: 'utf8',
    });

    const parseTemplate = handlebars.compile(templaFileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
