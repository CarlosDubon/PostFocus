const ENDPOINT = "https://jsonplaceholder.typicode.com"
var configGet = {
    method:"GET",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
}
const getUsers=()=>{
    return new Promise(resolve=>{
        fetch(`${ENDPOINT}/users`,configGet)
        .then(res=>{
            if(res.ok){
                res.json()
                .then(data=>{
                    resolve(data)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        })  
        .catch(err=>{
            console.log(err)
        })
    })
    
}

const getPosts=(users)=>{
    return new Promise(resolve=>{
        fetch(`${ENDPOINT}/posts`,configGet)
        .then(res=>{
            if(res.ok){
                res.json()
                .then(data=>{
                    let posts = data
                    users.forEach(u=>{
                        let userPosts = posts.filter((post)=>{
                            return post.userId === u.id
                        })
                        u.posts = userPosts
                    })
                    resolve(users)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
    
}

async function main(){
    var users = []
    users = await getUsers()
    users = await getPosts(users)
}


window.addEventListener('load',main())