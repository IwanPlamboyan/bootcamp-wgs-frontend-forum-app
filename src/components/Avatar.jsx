import React from 'react';

const Avatar = ({ imageUrl, width, height }) => {
  return (
    <div className={`${width ? `w-${width}` : 'w-12'} ${height ? `h-${height}` : 'h-12'} border rounded-full overflow-hidden`}>
      <img src={imageUrl} alt="Foto-Profile-User" className="block w-full h-full" />
    </div>
  );
};

export default Avatar;
