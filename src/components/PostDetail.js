import { Link } from 'react-router-dom'
import styles from './PostDetail.module.css'


const PostDetail = ({ post }) => {

    console.log(post)
    return (
        <div className={styles.post_detail}>
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <p className={styles.createdBy}>{post.createdBy}</p>
            <div className={styles.tags}>
                {post.tagsArray.map((tag) => (
                    <p key={tag}><span>#</span>{tag}</p>
                ))}
            </div>
            <Link className={styles.show} to={`/posts/${post.id}`}>Ver mais...</Link>
        </div>
    )
}

export default PostDetail