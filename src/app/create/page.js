"use client";
import {useRouter} from "next/navigation";  // 왜 navigation 인지 ㅎㅎ 

export default function Create(){
    const router = useRouter();     
    const onSubmit = (e)=> {
        e.preventDefault();
        
        const title = e.target.title.value;
        const body = e.target.body.value;

        console.log(title, body);

        const options = {
            method:'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({title,body})
        }
        
        fetch(`http://localhost:9999/topics`, options)
        .then(res => res.json())
        .then( result=> {
            console.log(result);
            const lastId = result.id
            console.log("id", lastId);
            router.push(`/read/${lastId}`);  // read/번호로 move 함.
        })
    };
    return(
        <form onSubmit={onSubmit} >
            <p><input type = "text" name="title" placeholder="title" /></p>
            <p><textarea name = "body" placeholder="body"  /></p>
            <p><input type = "submit" value="create" /></p>
        </form>
       
    )
}