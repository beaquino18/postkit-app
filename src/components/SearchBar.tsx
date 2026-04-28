import { useStore } from "../lib/store"

export default function SearchBar() {
  const search = useStore((state) => state.search)
  const setSearch = useStore((state) => state.setSearch)

  return (
    <div className="mb-4">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search posts..."
        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>
  )
}
