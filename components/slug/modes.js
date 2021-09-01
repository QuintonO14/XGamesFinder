import { useState, useEffect } from "react"

const Modes = ({title}) => {
    const [index, setIndex] = useState(0)
    const [mode, setMode] = useState(title.game_modes ? title.game_modes[0] : null)
    const platform = title.platforms.map((plat) => {return plat.abbreviation})
    const playstation = platform.includes('PS1') || platform.includes('PS2') || platform.includes('PS3') ||
    platform.includes('PS4') || platform.includes('PS5')
    const computer = platform.includes('PC')
    const nintendo = platform.includes('Switch')
    useEffect(() => {
        if(mode) {
            const timerId = setInterval(
                () => setIndex((i) => (i + 1) % title.game_modes.length),
                2000
            );
            setMode(title.game_modes[index])
            return () => clearInterval(timerId)
        } 
    }, [index])
   
    return (
        <div className="text-center bg-primary text-white w-full">
        <h2 className="text-xl font-bold">Modes:</h2>
        {mode ? (
        <p className="uppercase">{mode.name}</p>
        ) : 
        <p>No Known Modes</p> }
        {platform != 'XONE' ? (
        <div className="my-2 w-full text-center">
            <h2 className="text-xl font-bold">Other Platforms</h2>
            <div className="flex justify-evenly h-auto p-1">
            {playstation && (
                <figure>
                <img src="./playstation.svg" className="h-12 mx-auto" alt="playstation" />
                <figcaption>Playstation</figcaption>
                </figure>
            )}
            {computer && (
                <figure>
                <img src="./computer.svg" className="h-12 mx-auto" alt="pc" />
                <figcaption>PC</figcaption>
                </figure>
            )}
            {nintendo && (
                <figure>
                <img src="./switch.svg" alt="switch" className="h-12 mx-auto" />
                <figcaption>Switch</figcaption>
                </figure>
            )}
            </div>
        </div>
        ) : null }
        </div>
    )
}

export default Modes