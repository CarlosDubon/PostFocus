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


const getGenders=(user)=>{
    return new Promise(resolve=>{
        fetch(`https://api.genderize.io?name=${user.name.split(" ")[0]}`,configGet)
        .then(res=>{
            if(res.ok){
                res.json()
                .then(data=>{
                    const {gender} = data
                    resolve(gender)
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

async function render(){
    var users = []

    users = await getUsers()
    users = await getPosts(users)
    var $container = document.getElementById("main-container")
    

    for(const u of users){
        u.posts.sort((a,b)=>{
            return b.title.length - a.title.length 
        })

        let $div = document.createElement("div")
        let $profileContainer = document.createElement("div")
        let $postContainer = document.createElement("div")
        let $nameText = document.createTextNode(u.name)
        let $name = document.createElement("h5")
        let $avatar = document.createElement("img")

        let gender = await getGenders(u)
        gender==="male"?gender = "/assets/img/jacques.svg":gender = "/assets/img/josephine.svg"
        $avatar.src = gender
    
        u.posts.forEach(post=>{
            let $post = document.createElement("p")
            let $textPost  = document.createTextNode(post.title)
            
            $post.append($textPost)

            $postContainer.append($post)
        })


        //Append section
        $name.append($nameText)
        $profileContainer.append($avatar)
        $profileContainer.append($name)
        $div.append($profileContainer)
        $div.append($postContainer)
        $container.append($div)
    }
        

}


window.addEventListener('load',render())