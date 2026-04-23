import React, { useEffect, useState } from "react";

const formatDuration = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return [hrs, mins, secs].map((value) => String(value).padStart(2, "0")).join(":");
};

function MeetingTimer({ startAt, isActive = true, className = "" }) {
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    useEffect(() => {
        if (!isActive || !startAt) {
            setElapsedSeconds(0);
            return;
        }

        const updateElapsed = () => {
            const diffInSeconds = Math.max(0, Math.floor((Date.now() - startAt) / 1000));
            setElapsedSeconds(diffInSeconds);
        };

        updateElapsed();
        const timerId = setInterval(updateElapsed, 1000);

        return () => clearInterval(timerId);
    }, [isActive, startAt]);

    return (
        <div className={className}>
            <i className="fa-solid fa-clock"></i> : {formatDuration(elapsedSeconds)}
        </div>
    );
}

export default MeetingTimer;
