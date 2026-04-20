import { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import withAuth from '../utils/withAuth';

function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const formatDate = (dateValue) => {
        const parsedDate = new Date(dateValue);
        return parsedDate.toLocaleString();
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(Array.isArray(history) ? history : []);
            } catch (err) {
                const message = err.response?.data?.message || 'Unable to load meeting history.';
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [getHistoryOfUser]);
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(145deg,#020617_0%,#0b1220_56%,#0f172a_100%)] flex flex-col">
            <div className=" absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(34,211,238,0.12),transparent_38%)] opacity-70"></div>
            <div className=" absolute inset-0 bg-linear-to-b from-cyan-400/5 to-transparent"></div>
            <nav className="relative w-full z-10 flex justify-between items-center pt-8 pl-5 pr-5 flex-wrap gap-4">
                <div>
                    <Link to="/" className=' px-5 text-3xl font-bold tracking-wide text-white drop-shadow-md'>
                        Huddle
                    </Link>
                </div>
                <div className="flex gap-4 md:gap-8 items-center text-white/90 flex-wrap md:flex-nowrap">
                    <button className="transition-colors hover:text-cyan-200 text-sm md:text-base"
                        onClick={() => navigate('/home')}>
                        <i className="fa-regular fa-house"></i>
                        &nbsp;Home
                    </button>
                    <button className="logout-btn text-sm" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
            <div className='flex-1 flex flex-col lg:flex-row mt-10 lg:mt-0 justify-center lg:justify-around items-center gap-8 lg:gap-0 px-4'>
                <section className="relative z-10 px-6 md:px-8 pt-10 md:pt-20 pb-10 md:pb-16 w-full lg:w-1/2">
                    <div className="max-w-xl rounded-2xl border border-slate-400/20 bg-slate-900/60 p-6 text-white shadow-[0_10px_32px_rgba(2,6,23,0.35)] backdrop-blur-xs">
                        <p className='text-lg md:text-xl font-semibold'>Meeting History</p>

                        {loading && (
                            <p className='mt-4 text-white/70 text-sm md:text-base'>Loading your meeting history...</p>
                        )}

                        {!loading && error && (
                            <p className='mt-4 text-red-300 text-sm md:text-base'>{error}</p>
                        )}

                        {!loading && !error && meetings.length === 0 && (
                            <p className='mt-4 text-white/70 text-sm md:text-base'>No meetings yet. Join or create one to see it here.</p>
                        )}

                        {!loading && !error && meetings.length > 0 && (
                            <div className='mt-5 max-h-80 space-y-3 overflow-y-auto pr-2'>
                                {meetings.map((meeting) => (
                                    <div
                                        key={meeting._id}
                                        className='rounded-xl border border-slate-500/25 bg-slate-800/65 p-4'
                                    >
                                        <p className='text-base md:text-lg font-medium tracking-wide'>
                                            <span className='text-cyan-200'>Meeting Code: </span>
                                            {meeting.meetingCode}
                                        </p>
                                        <p className='mt-1 text-xs md:text-sm text-white/70'>
                                            Date: {formatDate(meeting.date)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
                <img src="history.svg" className='w-64 md:w-72 lg:w-2/6 drop-shadow-2xl self-center' alt="" />
            </div>
        </div>
    );
}

export default withAuth(History);