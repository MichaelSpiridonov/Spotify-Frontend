import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { removeStation, addNewStation } from '../../store/actions/station.actions';
import { makeId } from '../../services/util.service';

export function StationModal({ stationId, position = { left: 0, top: 0 }, onClose }) {
    const stations = useSelector(storeState => storeState.stationModule.stations);
    const navigate = useNavigate();

    const onAddNewStation = async () => {
        const newStation = {
            createdBy: { imgUrl: '' },
            likedByUsers: ["{minimal-user}", "{minimal-user}"],
            name: 'My playlist #' + stations.length,
            songs: [],
            tags: [],
            _id: makeId()
        };
        await addNewStation(newStation);
        navigate(`/station/${newStation._id}`);
        onClose();
    };

    const onRemoveStation = () => {
        if (stationId) {
            removeStation(stationId);
            onClose();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const modal = document.querySelector('.station-modal');
            if (modal && !modal.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [onClose]);

    return (
        <article
            className="station-modal"
            style={{
                position: 'absolute',
                left: `${position.left}px`,
                top: `${position.top}px`,
                display: 'block' // Ensure display is handled by state
            }}
        >
            <ul key={'modal-container'}>
                <li>
                    <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16">
                        <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path>
                    </svg>
                    Edit details
                </li>
                <li onClick={onRemoveStation}>
                    <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16">
                        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                        <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path>
                    </svg>
                    Delete
                </li>
                <li onClick={onAddNewStation}>
                    <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16">
                        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                        <path d="M8 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"></path>
                    </svg>
                    Create playlist
                </li>
            </ul>
        </article>
    );
}
