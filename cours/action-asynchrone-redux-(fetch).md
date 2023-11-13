# Action Asynchrone

Les actions classiques avec redux n'ont qu'un seul état. C'est à dire que l'action est déclenchée, le reducer est appelé et le state est modifié.

Mais dans notre développement il nous arrive souvent de devoir faire des actions asynchrones. Par exemple, lorsqu'on veut récupérer des données depuis une API.

Dans ce cas notre action à besoin de gérer plusieurs état :

- En cours (pending)
- Réussi (fullfilled)
- Echoué (rejected)

## createAsyncThunk

`createAsyncThunk` permet de créer une action asynchrone, cad une action avec 3 états.

### Exemple

```ts
const monAction = createAsyncThunk('leNomDe/MonAction', async () => {});
```

Côté reducer on va pouvoir gérer la modification des données en fonction des 3 états de notre requête.

Les 3 cas à gérer seront

`monAction.pending` : Lorsque la requête est en cours
`monAction.fulfilled` : Lorsque la requête est réussi
`monAction.rejected` : Lorsque la requête est en erreur

```ts
const monSlice = createSlice({
  name: 'monSlice',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  // La gestion des actions asynchrone se fait dans la propriété extraReducers
  extraReducers(builder) {
    builder
      // Lorsque mon action viens d'être lancer
      .addCase(monAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Lorsque mon action est réussi
      .addCase(monAction.fulfilled, (state, action) => {
        // j'arrête l'affichage du loader qui se baserai sur ma variable loading
        state.loading = false;
        // je modifie mon state avec les données récupérées
        state.data = action.payload;
      })
      // Lorsque mon action est en erreur
      .addCase(monAction.rejected, (state) => {
        // j'arrête l'affichage du loader qui se baserai sur ma variable loading
        state.loading = false;
        // J'afficher un message d'erreur
        state.error = "Oups, quelque chose s'est mal passé";
      });
  },
});
```

### Exemple de createAsyncThunk

#### Création de mon action

```ts
const fetchCategories = createAsyncThunk(
  'fetchCategories',
  async (slug: string) => {
    // On fais notre requête API
    // `data` est la propriété retourner par axios contenant les données réponse de l'API
    // On en profite également pour typer le retour de notre requête
    type Category = {
      id: number;
      name: string;
      slug: string;
    };
    const { data } = await axios.get<Category[]>(
      `http://localhost:3001/categories/${slug}`
    );

    return data;
  }
);
```

#### Utilisation de l'action

```tsx
function Categories() {
  const slug = 'toto';
  const dispatch = useAppDispatch();

  useEffect(() => {
    // On emet notre intention asynchrone comme une intention classique
    dispatch(fetchCategories(slug));
  }, []);
}
```
