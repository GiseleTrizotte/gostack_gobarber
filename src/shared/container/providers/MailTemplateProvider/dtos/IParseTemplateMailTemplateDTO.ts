interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseTemplateMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
