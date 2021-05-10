module.exports.notes = [
  {
    title: 'Front',
    sub: `Github: ${process.env.REPO_FRONT}`,
    content: 'Realizado en React.js junto con styled-components./nLos formularios se validan con formik y yup./nComunicación con la API via axios.',
    category: 'Dev' 
  },
  {
    title: 'Back',
    sub: `GitHub: ${process.env.REPO_BACK}`,
    content: 'Algunas de las tecnologias usadas son: node.js, express.js y passport: facebook-strategy',
    category: 'Dev' 
  },
  {
    title: '¡Tambien aceptamos links!',
    sub: '¿Como era esa pagina que tanto me gustaba?',
    content: `Porque navegar es buscar en todos lados te dejamos guardar links a tus sitios preferidos. Por ejemplo: ${process.env.CHECKOUT_LINK}`,
    category: 'Links' 
  },
  {
    title: '¡Hola /USER_NAME/, guardemos data!',
    sub: `Creado por ${process.env.CONTACT_LINK}`,
    content: 'Aca vas a poder ver todas tus notas, ademas de filtrarlas por categorias./nNunca más pierdas una idea!',
    category: 'Bienvenid@' 
  }
];