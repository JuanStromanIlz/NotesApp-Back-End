const links = {
  contactLink: 'https://github.com/JuanStromanIlz',
  checkoutLink: 'https://youtu.be/g5nzLQ63c9E',
  repoBack: 'https://github.com/JuanStromanIlz/NotesApp-Back-End',
  repoFront: 'https://github.com/JuanStromanIlz/NotesApp-Front-End'
};

module.exports.notes = [
  {
    title: 'Front',
    sub: `Github: ${links.repoFront}`,
    content: 'Realizado en React.js junto con styled-components./nLos formularios se validan con formik y yup./nComunicación con la API via axios.',
    category: 'Dev' 
  },
  {
    title: 'Back',
    sub: `GitHub: ${links.repoBack}`,
    content: 'Algunas de las tecnologias usadas son: node.js, express.js y passport: facebook-strategy',
    category: 'Dev' 
  },
  {
    title: '¡Tambien aceptamos links!',
    sub: '¿Como era esa pagina que tanto me gustaba?',
    content: `Porque navegar es buscar en todos lados te dejamos guardar links a tus sitios preferidos. Por ejemplo: ${links.checkoutLink}`,
    category: 'Links' 
  },
  {
    title: '¡Hola /USER_NAME/, guardemos data!',
    sub: `Creado por ${links.contactLink}`,
    content: 'Aca vas a poder ver todas tus notas, ademas de filtrarlas por categorias./nNunca más pierdas una idea!',
    category: 'Bienvenid@' 
  }
];