import IParseTemplateMailTemplateDTO from "../dtos/IParseTemplateMailTemplateDTO";

export default interface IMailTemplateProvider {
  parse(data: IParseTemplateMailTemplateDTO): Promise<string>;
}
