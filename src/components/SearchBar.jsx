import '../styles/components/SearchBar.css'

export function SearchBar() {
  return (
    <div className="searchbar">
        <input className='searchbar__input' placeholder='Busca algún producto de la tienda: escribelo en inglés' type="text" />
    </div>
  )
}
