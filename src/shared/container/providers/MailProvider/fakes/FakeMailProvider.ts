import ISendMailDTO from "../dtos/ISendMailDTO";
import IMailProvider from "../models/IMailProvider";

interface Message {
  to: string;
  body: string
}

export default class FakeMailProvider implements IMailProvider {
  private massages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.massages.push(message);
  }
}
