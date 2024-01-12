
const Stars = ({rating, setRating}) => {
    const handleClick = (newRating) => {
        setRating(newRating)
    }

    return (
        <>
        {
            
            [1,2,3,4,5].map((oneStar, i) => {
                return (
                    <span key={i}
                    onClick={()=> handleClick(oneStar)}
                    style={{cursor: 'pointer', color: oneStar <= rating ? 'gold' : 'grey'}}
                    >
                    ★ 
                    </span>
                )
            })
        }
        </>
    );
};

export default Stars;