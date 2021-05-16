const links = {
  gitHubLink: 'https://github.com/JuanStromanIlz',
  linkedInLink: 'https://www.linkedin.com/in/jstromanilz',
  checkoutLink: 'https://youtu.be/g5nzLQ63c9E'
};

const welcomeTextAPI = {
  author: {
    name: 'Juan Stroman Ilz',
    gitHub: links.gitHubLink,
    linkedIn: links.linkedInLink
  }
};

const defaultNotes = [
  {
    title: '¡Hola /USER_NAME/, guardemos data!',
    sub: `Creado por ${links.gitHubLink}`,
    content: 'Aca vas a poder ver todas tus notas, ademas de filtrarlas por categorias./nNunca más pierdas una idea!',
    category: 'Bienvenid@' 
  },
  {
    title: '¡Tambien aceptamos links!',
    sub: '¿Como era esa pagina que tanto me gustaba?',
    content: `Porque navegar es buscar en todos lados te dejamos guardar links a tus sitios preferidos. Por ejemplo: ${links.checkoutLink}`,
    category: 'Links' 
  }
];

export { welcomeTextAPI, defaultNotes }