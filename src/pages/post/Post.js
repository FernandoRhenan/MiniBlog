import { useParams } from 'react-router-dom'
import styles from './Post.module.css'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Post = () => {

    const { id } = useParams()
    const { document: post, loading } = useFetchDocument('posts', id)

    return (
        <div className={styles.post_container}>
            {loading && <p>Carregando...</p>}
            {post &&
                <>
                    <img src={post.image} alt={post.title} />
                    <h1>{post.title}</h1>
                    <p className={styles.body}>{post.body}</p>
                    <div className={styles.tags}>
                        {post.tagsArray.map((tag) => ((
                            <p key={tag}>
                                <span>#</span>
                                {tag}</p>
                        )))}
                    </div>
                </>
            }
        </div>
    )
}

export default Post