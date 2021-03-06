import React, {useState, useEffect} from "react";
import axios from 'axios';
import UserPost from './UserPost'


const BASE_URL = 'https://strangers-things.herokuapp.com/api/2104-uic-rm-web-ft';


// function postMatches(post, text) {
//   // return true if any of the fields you want to check against include the text
//   // strings have an .includes() method 
// }



// then, in our jsx below... map over postsToDisplay instead of posts

const Home = ({currentUser, searchTerm}) => {

    const [posts, setPosts] = useState([]);

    async function getPosts() {
        let data = (await axios.get(BASE_URL + '/posts')).data
        return data.data.posts;
    }

    useEffect ( async () =>{
        setPosts(await getPosts());
    }, [])

    // useEffect ( () => {

        const postMatches = function(post, term) {
            if (post.title.includes(term) || post.description.includes(term) ||
                post.price.includes(term) || post.author.username.includes(term)){
                    return true;
                } else {
                    return false;
                }
        }

        const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
        const postsToDisplay = searchTerm.length ? filteredPosts : posts;
    // }, [])

    return <>
    { localStorage.getItem('currentUser') ? 
        <>
            {postsToDisplay.map( (post) => {
                return <UserPost
                    title={post.title}
                    description={post.description}
                    price={post.price}
                    seller={post.author.username}
                    location={post.location}
                    deliverable={post.willDeliver}
                    currentUser={localStorage.getItem('currentUser')}
                    key={post._id}
                    id={post._id}
                />})
            }
        </> :
        <>
            {postsToDisplay.map( (post) => {
                return <UserPost
                    title={post.title}
                    description={post.description}
                    price={post.price}
                    seller={post.author.username}
                    location={post.location}
                    deliverable={post.willDeliver}
                    currentUser={localStorage.getItem('currentUser')}
                    key={post._id}
                />})
            }
        </>
    }
    </>

}

export default Home