import { useState, useEffect, type JSX } from "react";
import { Wheel } from 'react-custom-roulette'
import type { WheelData } from "react-custom-roulette/dist/components/Wheel/types";
import '../styles/Luckywheel.css'
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2'
import Confetti from 'react-confetti';
import { usePersonContext } from "../contexts/PersonContext";

export default function LuckyWheel(): JSX.Element {
    const colors = ['green', 'red', 'blue', 'pink', 'purple', 'orange', 'brown']
    const { people } = usePersonContext()
    function generateData(): WheelData[] {
        let data: WheelData[] = []
        for (let i = 0; i < people.length; i++) {
            if (people[i].presents > 0) {
                for (let j = 0; j < people[i].presents; j++) {
                    data.push({
                        option: people[i].name,
                        style: { backgroundColor: colors[i % colors.length], textColor: 'white' }
                    })
                }
            }
        }
        return data
    }

    const[mustSpin, setMustSpin] = useState<boolean>(false)
    const[prizeNumber, setPrizeNumber] = useState<number>(0)
    const[data, setData] = useState<WheelData[]>([])

    useEffect(() => {
        const newData = generateData()
        setData(newData)
        setMustSpin(false)
        setPrizeNumber(0)
    }, [people])

    const[showConfetti, setShowConfetti] = useState<boolean>(false)
    const height = window.innerHeight
    const width = window.innerWidth

    function handleSpinCLick(): void {
        if(!mustSpin){
            const newPrizeNumber = Math.floor(Math.random()* data.length)
            setPrizeNumber(newPrizeNumber)
            setMustSpin(true)
        }
    }

    function handleStopSpinning(): void {
        setMustSpin(false);
        const newData = data.filter((_, index)=> index !== prizeNumber)
        setData(newData)
        setShowConfetti(true)
        Swal.fire({
            title: 'Frohe Weihnachten!',
            text: 'Beni darf auspacken!',
            background: '#1a1a1a', // Hintergrundfarbe des Popups
            color: 'white',       // Textfarbe (Weihnachtsrot)
            confirmButtonColor: '#15803d', // Button-Farbe (Grün)
            confirmButtonText: 'Geilo! 🎁',
            backdrop: `
              rgba(0,0,123,0.4)
              url("/path/to/snow-animation.gif")
              left top
              no-repeat
            `,
            customClass: {
              popup: 'rounded-3xl border-4 border-red-600',
              title: 'text-3xl font-serif',
              confirmButton: 'px-8 py-3 rounded-full uppercase'
            }
          }).then(() => setShowConfetti(false))
    }

    if (data.length < 1) {
        return (
            <div className="wheel-container">
                <h1 className="wheel-header">Glücksrad</h1>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginTop: '40px' }}>
                    Bitte füge Personen mit Geschenken hinzu, um das Glücksrad zu nutzen.
                </p>
            </div>
        )
    }

    return (
        <div className="wheel-container">
            <h1 className="wheel-header">Glücksrad</h1>
            {showConfetti && <Confetti width={width} height={height} numberOfPieces={2000}/>}
            <Wheel
               mustStartSpinning={mustSpin}
               data={data}
               backgroundColors={['#3e3e3e', '#df3428']}
               textColors={['black']}
               prizeNumber={prizeNumber}
               onStopSpinning={handleStopSpinning}
               spinDuration={0.2}
            />
            {data.length > 1  && <button className="wheel-button" onClick={handleSpinCLick} disabled={mustSpin}>Drehen</button>}
            {data.length < 2 && <button className="wheel-button"> Beenden </button>}

        </div>
    )
}