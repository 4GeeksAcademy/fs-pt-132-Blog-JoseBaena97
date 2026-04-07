export const initialStore=()=>{
  return{
    characters: [],
    locations: [],
    episodes: [],
    favorites: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_characters':
      return {
        ...store,
        characters: action.payload
      };
    case 'set_locations':
      return {
        ...store,
        locations: action.payload
      };
    case 'set_episodes':
      return {
        ...store,
        episodes: action.payload
      };
    case 'add_favorite':
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };
    case 'remove_favorite':
      return {
        ...store,
        favorites: store.favorites.filter(item => item.id !== action.payload.id || item.type !== action.payload.type)
      };
    default:
      throw Error('Unknown action.');
  }    
}
