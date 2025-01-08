# Documentation de l'Application

## Introduction

Cette application est construite avec React, TypeScript, Redux Toolkit et une gestion rigoureuse des typages. Elle s'articule autour de la gestion d'état centralisée avec Redux et de la distribution de données via des composants réutilisables.

---

## Architecture Redux

### Store

Le store est configuré via `configureStore` dans le fichier `store.ts`. Les reducers sont combinés dans `rootReducer.ts`, et le middleware `logger` est ajouté pour surveiller les actions.

**Extrait du code :**
```typescript
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger as Middleware),
});
```

**Types associés :**
- `RootState`: Représente l'état global de l'application.
- `AppDispatch`: Type pour le dispatch des actions.

---

### Reducers

#### `userSlice`

Le reducer utilisateur (`userSlice.ts`) gère :
- L'état utilisateur (profil, authentification, token, erreurs).
- Les thunks pour les appels API :
  - `createUser`
  - `loginUser`
  - `getProfile`
  - `updateProfile`

**Exemple de typage :**
```typescript
export interface IUserState {
  profile: IProfile | null;
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
}
```

**Gestion des actions asynchrones :**
```typescript
.addCase(loginUser.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
  state.loading = false;
  state.isAuthenticated = true;
  state.token = action.payload.body.token;
})
```

---

## Gestion des Pages

### `LandingPage`

La page d'accueil (`LandingPage.tsx`) affiche des informations promotionnelles et des fonctionnalités sous forme de cartes dynamiques.

**Composant clé :**
- `FeatureCard`

**Exemple de typage :**
```typescript
export interface IFeatureCardProps {
  props: {
    icon: string;
    title: string;
    overview: string;
  };
}
```

### `AuthPage`

La page d'authentification gère les formulaires d'inscription et de connexion via le composant `SignForm`.

**Typage des props :**
```typescript
interface ISignFormProps {
  isSignUp: boolean;
  toggleSignForm: () => void;
}
```

### `HomePage`

Cette page est protégée et vérifie l'authentification. Si l'utilisateur n'est pas connecté, il est redirigé vers `/auth`.

**Exemple d'utilisation de Redux :**
```typescript
const { isAuthenticated } = useSelector((state: RootState) => state.user);
```

---

## Composants

### `SignForm`

Le formulaire d'authentification prend en charge l'inscription et la connexion. Il utilise Redux pour gérer les actions comme `loginUser` et `createUser`.

**Exemple d'utilisation de Redux :**
```typescript
const dispatch: AppDispatch = useDispatch();
const { loading, error, isAuthenticated } = useSelector(
  (state: RootState) => state.user
);
```

### `TransactionCard`

Affiche les détails d'une transaction avec un typage strict.

**Typage :**
```typescript
export interface ITransactionCardProps {
  data: {
    transactionName: string;
    transactionAmount: number;
    transactionType: string;
  };
}
```

### `UserProfile`

Gère l'affichage et l'édition du profil utilisateur.

**Exemple de typage :**
```typescript
const [firstName, setFirstName] = useState(profile?.firstName);
const [lastName, setLastName] = useState(profile?.lastName);
```

### Autres Composants
- `Banner`: Affiche une bannière promotionnelle.
- `FeatureCard`: Carte de fonctionnalités.
- `Header` et `Footer`: En-tête et pied de page de l'application.
- `Loader`: Affiche un indicateur de chargement.

---

## Initialisation de l'Application

Le fichier d'entrée `main.tsx` configure le fournisseur Redux et rend l'application principale.

**Extrait du code :**
```typescript
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

---

## Passage et Gestion des Données

1. **Actions Dispatchées :**
   - Les composants dispatchent des actions via Redux Toolkit (e.g., `createUser`, `getProfile`).

2. **Centralisation dans Redux :**
   - Les réponses des API sont stockées dans le store global.

3. **Typage Strict :**
   - Tous les états et actions sont fortement typés pour éviter les erreurs.

4. **Distribution aux Composants :**
   - Les composants consomment les données à travers des hooks comme `useSelector`.

---

## Navigation

L'application utilise React Router pour la navigation entre les pages (`LandingPage`, `AuthPage`, `HomePage`). 

**Extrait de configuration :**
```typescript
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/auth" element={<AuthPage />} />
  <Route path="/home" element={<HomePage />} />
</Routes>
```