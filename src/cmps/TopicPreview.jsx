


export function TopicPreview({ topic }) {
  
    return <article  className='topic-box'>
        <h1>{topic.name}</h1>
        <img src={topic.img} alt='' />
    </article>

}