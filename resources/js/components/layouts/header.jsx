export default function Header() {
    return (
        <div className="grid grid-cols-2 text-2xl gap-10 min-w-full md:pt-3 md:pl-10">
            <div>
                <h1 className="md:text-[50px]">Logo</h1>
            </div>
            <div className="flex w-full justify-end gap-2 md:pt-3 md:pr-10">
                <img
                    src="http://127.0.0.1:8000/storage/assets/Bolt.png"
                    alt="Bolt"
                    className="w-[45px] h-[45px] object-cover"
                />
                <p className="text-right font-bold mr-2 text-white text-[30px]">
                    3000
                </p>
                <img
                    src="http://127.0.0.1:8000/storage/assets/Heart.png"
                    alt="Heart"
                    className="w-[45px] h-[45px] object-cover"
                />
                <p className="text-right font-bold text-white text-[30px]">
                    3/5
                </p>
            </div>
        </div>
    );
}
