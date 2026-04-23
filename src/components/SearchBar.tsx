import { useStore } from "../lib/store"

export default function SearchBar() {
  const search = useStore((state) => state.search)
  const setSearch = useStore((state) => state.setSearch)

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  )
}
