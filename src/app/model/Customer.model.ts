export class Client {
  idCl: number;
  CodeCl: string;
  nomCl: string;
  prenomCl: string; 
  adresseCl: string;
  emailCl: string;
  numeroTelCl: string;
  actif: boolean;

  // Add a constructor with default values or make properties optional
  constructor(
    idCl: number = 0,
    CodeCl: string = '',
    nomCl: string = '',
    prenomCl: string = '',
    adresseCl: string = '',
    emailCl: string = '',
    numeroTelCl: string = '',
    actif: boolean = false
  ) {
    this.idCl = idCl;
    this.CodeCl = CodeCl;
    this.nomCl = nomCl;
    this.prenomCl = prenomCl;
    this.adresseCl = adresseCl;
    this.emailCl = emailCl;
    this.numeroTelCl = numeroTelCl;
    this.actif = actif;
  }
}
