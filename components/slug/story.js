const Story = ({title}) => {
    return (
        <div className="bg-primary text-center text-white w-full">
        <strong className="m-4 text-xl">{title.total_rating ? `Rating:${Math.round(title.total_rating)}` : 'Not Rated'}</strong>
        <p className="m-4 text-left">{title.storyline}</p>
        </div>
    )
}

export default Story