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
  },
  projectName: '¡No lo pierdas!',
  POSTMAN: 'use x-www-form-urlencoded',
  routes: {
    user: {
      register: {
        info: 'Register a user to the API.',
        method: 'POST',
        path: 'user/register',
        fields: ['username', 'email', 'porfileImg', 'password', 'passwordConfirmation']
      },
      login: {
        info: 'log in into the API',
        method: 'POST',
        path: 'user/login',
        fields: ['username', 'password']
      },
      logout: {
        info: 'Log out from the API.',
        method: 'GET',
        path: 'user/logout'
      },
      profile: {
        info: 'Get the profile info from the user currenly logged.',
        method: 'GET',
        path: 'user/profile'
      },
      deleteUser: {
        info: 'Delete all user info.',
        method: 'DELETE',
        path: 'user/profile'
      },
      allNotes: {
        info: 'Get all notes from the user currenly logged.',
        method: 'GET',
        path: 'user/allNotes'
      },
      allCategories: {
        info: 'Get all categories from the user currenly logged.',
        method: 'GET',
        path: 'user/allCategories'
      },
      createNote: {
        info: 'Create a new note by the user.',
        method: 'POST',
        path: 'user/note',
        fields: ['title', 'sub', 'content', 'category']
      },
      updateNote: {
        info: 'Save new fields of a note sending a body with all fields suministred by the API from the note itself.',
        method: 'PATCH',
        path: 'user/note/${note_id}',
        fields: ['title', 'sub', 'content', 'category']
      },
      deleteNote: {
        info: 'Delete note by sending _id from note.',
        method: 'DELETE',
        path: 'user/note/${note_id}'
      }
    }
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