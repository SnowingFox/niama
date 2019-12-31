import { apiFr } from '@niama/api';
import { authFr } from '@niama/auth';
import { coreFr, merge } from '@niama/core';

export default merge(coreFr, apiFr, authFr, {
  menus: {
    publicAbout: 'A propos',
    publicHome: 'Accueil',
    publicProfile: 'Profil',
    publicSignin: 'Connexion',
    publicSignup: 'Inscription',
  },
  titles: {
    about: 'A propos',
    index: 'Accueil',
    profile: 'Mon profil',
    signin: 'Connexion',
    signup: 'Inscription',
  },
});
