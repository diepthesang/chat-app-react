import React from 'react';

type AvatarType = {
    diameter: string,
    urlAvt?: string,

}

const MyAvatar = ({diameter, urlAvt}: AvatarType) => {
    return (
        <img alt='avatar'
             src={`${urlAvt || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNAUvIj8tIlcc6MemlkLaXGlOLNplzf-3euA&usqp=CAU'}`}
             style={{
                 borderRadius: '50%',
                 width: diameter,
                 height: diameter,
                 border: '1px solid white'
             }}>
        </img>
    );
};

export default MyAvatar;
