export const fetchInitialData = async () => {
    return (
        await fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
    )
}