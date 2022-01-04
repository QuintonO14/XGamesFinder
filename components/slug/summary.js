const Summary = ({title}) => {
    return (
        <>
        {title.collection && (
        <h3 className="text-center bg-primary text-white underline text-lg pt-4 w-full">
            {`Part of the ${title.collection.name} collection`}
        </h3>
        )}
        <p className="text-left text-white bg-primary p-3 text-lg">{title.summary}</p>
        </>
    )
}

export default Summary 