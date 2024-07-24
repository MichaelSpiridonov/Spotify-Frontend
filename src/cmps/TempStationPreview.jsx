import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import playlistDefaultImage from '../assets/icons/myplaylist.svg';
import { StationModal } from './modals/StationModal';

export function StationPreview({ station }) {
    const [modalState, setModalState] = useState({
        isOpen: false,
        position: { left: 0, top: 0 },
        stationId: null
    });

    const handleContextMenu = (event) => {
        event.preventDefault(); // Prevent the default context menu

        // Calculate position for modal
        const x = event.clientX;
        const y = event.clientY;

        setModalState({
            isOpen: true,
            position: { left: x, top: y },
            stationId: station._id
        });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, position: { left: 0, top: 0 }, stationId: null });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const modal = document.querySelector('.station-modal');
            if (modal && !modal.contains(event.target)) {
                closeModal();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    if(!station.tags) return;
    return (
        <>
            <Link to={`/station/${station._id}`}>
                <div
                    id={station.name}
                    className='station-preview'
                    role='button'
                    onContextMenu={handleContextMenu}
                >
                    <img
                        src={station.createdBy.imgUrl || playlistDefaultImage}
                        alt='Station'
                        className='station-image'
                    />
                    <div className='station-details'>
                        <p className='station-name'>{station.name}</p>
                        <p className='station-createdby'>Playlist · {station.name}</p>
                    </div>
                </div>
            </Link>
            {modalState.isOpen && (
                <StationModal
                    stationId={modalState.stationId}
                    position={modalState.position}
                    onClose={closeModal}
                />
            )}
        </>
    );
}
