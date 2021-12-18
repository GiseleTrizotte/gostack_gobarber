import IParseTemplateMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
	parse(data: IParseTemplateMailTemplateDTO): Promise<string>;
}
