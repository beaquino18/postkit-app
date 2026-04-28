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
        className="w-full px-4 py-2 bg-[#0a1628] border border-[#162035] rounded-lg text-sm text-[#d4e0f5] placeholder-[#3d5070] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
      />
    </div>
  )
}
