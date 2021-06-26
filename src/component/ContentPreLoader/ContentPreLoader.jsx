/**
 * Example code:
*   <ContentPreLoader 
        style={ {width: "200px", height:"200px", backgroundColor: '#0001'} }
    />

    default width: 100%; and default height: 100%
 */



import classes from "./ContentPreLoader.module.css";

const ContentPreLoader = ({style}) => {
    return(
        <div className={classes.loader} style={style}>
            <div className={classes.loader_container}>
                <span className={classes.ball}></span>
                <span className={classes.ball}></span>
                <span className={classes.ball}></span>
                <span className={classes.ball}></span>
                <span className={classes.ball}></span>
                <span className={classes.ball}></span>
                <span className={classes.ball}></span>
                <span className={classes.ball}></span>
                <span className={classes.ball}></span>
                <span className={classes.ball}></span>
            </div>
        </div>
    );
}

export default ContentPreLoader;