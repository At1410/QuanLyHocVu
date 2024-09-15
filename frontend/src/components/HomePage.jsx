import React, { useEffect, useState } from 'react';
import Img from '../img/Baby.png';
import { styled, Typography } from '@mui/material';

export default function HomePage() {
    const StyleImg = styled('img')({
        width: '100%',
        height: '30rem',
        marginBottom: '10px',
        marginTop: '10px',
    });

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/thong-tin')
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div style={{ marginTop: 70 }}>
            <StyleImg src={Img} alt="Img" />
            <div style={{ margin: '10px' }}>
                {data.map(item => (
                    <div key={item.id} style={{ marginBottom: '20px' }}>
                        <Typography variant='h5'>
                            {item.TenDM}
                        </Typography>
                        <Typography variant='p'>
                            {item.NoiDung}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    );
}