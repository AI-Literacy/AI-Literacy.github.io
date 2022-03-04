import { SyntheticEvent, useState } from "react";
import './NewGame.css';

const NewGame = () => {
    const [dimensions, setDimensions] = useState<number[]>([30, 30]);
    const [rounds, setRounds] = useState<number>(3);
    const [generation, setGeneration] = useState<string>('10% spawn probability');

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
    }

    return (
        <div className="app w-4/5 mt-8 mx-auto flex flex-row">
            <div className="flex flex-col w-1/2">
                <h1 className="text-4xl mb-8">Create a new game</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="width">
                            <span className="text-gray-200 text-xl">Grid width</span>
                        </label>
                        <input 
                            type="number" 
                            className="input" 
                            name="width" 
                            value={dimensions[0]}
                            onChange={e => setDimensions([parseInt(e.target.value), dimensions[1]])}
                            min={10}
                            max={60}
                        ></input>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="height">
                            <span className="text-gray-200 text-xl">Grid height</span>
                        </label>
                        <input 
                            type="number" 
                            className="input" 
                            name="height" 
                            value={dimensions[1]}
                            onChange={e => setDimensions([dimensions[0], parseInt(e.target.value)])}
                            min={10}
                            max={60}
                        ></input>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rounds">
                            <span className="text-gray-200 text-xl">Number of rounds</span>
                        </label>
                        <input 
                            type="number" 
                            className="input" 
                            name="rounds" 
                            value={rounds}
                            onChange={e => setRounds(parseInt(e.target.value))}
                            min={3}
                            max={10}
                        ></input>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="generation">
                            <span className="text-gray-200 text-xl">Generation pattern</span>
                        </label>
                        <select 
                            className="input" 
                            name="generation"
                            value={generation}
                            onChange={e => setGeneration(e.target.value)}
                        >
                            <option>10% spawn probability</option>
                            <option>30% spawn probability</option>
                            <option>50% spawn probability</option>
                            <option>Gaussian</option>
                            <option>Checkerboard</option>
                        </select>
                    </div>
                    <div className="mt-10">
                        <button 
                            onClick={handleSubmit} 
                            className="
                                border border-transparent 
                                text-base font-medium 
                                rounded-md text-white 
                                bg-indigo-600 hover:bg-indigo-700 
                                md:py-2 md:text-lg md:px-6
                            "
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex flex-col justify-center items-end">
                <img className="w-4/5 mb-6" style={{ maxHeight: '60%' }} src="/img/new-game.svg" alt="" />
            </div>
        </div>
    );
}

export default NewGame;