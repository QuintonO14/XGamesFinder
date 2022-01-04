const Story = ({title}) => {
    return (
        <div className="bg-primary text-center text-xwhite w-full md:w-11/12">
            <p className="m-4 text-left text-lg">{title.storyline}</p>
        </div>
    )
}

export default Story