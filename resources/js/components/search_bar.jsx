export default function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <div className="relative w-full md:h-full md:pr-10">
            <input 
                type="text" value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-lg w-full min-h-8 md:min-h-10 text-sm placeholder-black focus:outline-none text-black pl-3 bg-[#D9D9D9]" 
                placeholder="Mau Cari Apa?"
            />
            <img
                src="http://127.0.0.1:8000/storage/assets/Search.png"
                alt="Search"
                className="absolute right-3 md:right-15 top-1/2 transform -translate-y-1/2 w-[25px] h-[25px]"
            />
        </div>
    );
}