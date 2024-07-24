import { FastAverageColor } from 'fast-average-color';
import { useEffect, useState } from 'react';


export function TopicPreview({ topic }) {
    const [color, setColor] = useState(null)

    useEffect(() => {
        const fac = new FastAverageColor();

        fac.getColorAsync(topic.img)
            .then(color => {
                setColor(color.rgb)
            })
            .catch(e => {
                console.log(e);
            });
    }, [])
    if(color === null) return
    return <article style={{backgroundColor: color}} className='topic-box'>
        <h1>{topic.name}</h1>
        <img src={topic.img} alt='' />
    </article>

}