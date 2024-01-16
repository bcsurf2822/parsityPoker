import Table1 from "./Table1";
import Seat1 from "./Seat1";
import Clock from "./Clock";



const About = () => {
    return (
        <div className="poker-room container">
            <div className="row">
                <div className="col-12">
                    <Table1 />
                    {[...Array(6)].map((_, i) => <Seat1 key={i} seatNumber={i + 1} />)}
                    {/* <Clock /> */}
                </div>
            </div>
        </div>
    );
};

export default About;
