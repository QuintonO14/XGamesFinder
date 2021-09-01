const Developers = ({title}) => {
    return (
        <div className="flex flex-col w-1/2 md:w-1/3 lg:w-1/4">
            <div className="text-white text-center">
            <h2 className="text-xl">Developed by:</h2>
            {title.involved_companies.map((comp) => {
                return (
                        <p key={comp.id}>{comp.company.name}</p>
                )
            })}
            </div>
        </div>
    )
}

export default Developers