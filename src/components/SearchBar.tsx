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
        className="w-full px-4 py-2 bg-[#fffdf5] border border-[#e0d0a0] rounded-lg text-sm text-[#1a1408] placeholder-[#b0a080] focus:outline-none focus:ring-2 focus:ring-[#e8971a]/40 focus:border-[#e8971a]/60"
      />
    </div>
  )
}
