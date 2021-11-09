import IParseTemplateMailTemplateDTO from "../../MailTemplateProvider/dtos/IParseTemplateMailTemplateDTO";

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseTemplateMailTemplateDTO;
}
