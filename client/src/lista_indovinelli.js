

function Indovinello(id, testo, durata, risposta, suggerimento1, suggerimento2, stato,difficolta, user, scadenza ) {
  this.id = id;
  this.testo = testo;
  this.difficolta = difficolta;
  this.durata = durata;
  this.risposta = risposta;
  this.suggerimento1 = suggerimento1;
  this.suggerimento2 = suggerimento2;
  this.stato = stato;
  this.user = user;
  this.scadenza = scadenza;
}

function ListaIndovinelli() {
  this.list = [];

  this.addNewIndovinello = (indovinello) => {
    if(!this.list.some(i => i.id == indovinello.id))
      this.list.push(indovinello);
    else
      throw new Error('Duplicate id');
  };

  this.print = () => {
    console.log("***** Lista di indovinelli *****");
    this.list.forEach((indovinello) => console.log(indovinello.toString()));
  }
}

export   {Indovinello, ListaIndovinelli};

