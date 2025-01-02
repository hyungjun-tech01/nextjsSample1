"use client";
import {useRouter, useParams} from "next/navigation";  
import {useEffect, useState} from "react";

export default function Update(){
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const router = useRouter();     
    const params = useParams();
    const id = params.id;

    useEffect(()=> {
        fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+id)
        .then(resp=>resp.json())
        .then(result=>{
            console.log(result);
            setTitle(result.title);
            setBody(result.body);
        });
    },[]);

    const onSubmit = (e)=> {
        e.preventDefault();
        
        const title = e.target.title.value;
        const body = e.target.body.value;

        console.log(title, body);

        const options = {
            method:'PATCH',    //update는 patch 
            headers : {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({title,body})
        }
        
        fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+id, options)
        .then(res => res.json())
        .then( result=> {
            const lastId = result.id
            router.push(`/read/${lastId}`);  // read/번호로 move 함.
        })
    };
    return(
        <form onSubmit={onSubmit} >
            <p><input type = "text" name="title" placeholder="title" value={title} onChange={e=>setTitle(e.target.value)}/></p>
            <p><textarea name = "body" placeholder="body"  value={body} onChange={e=>setBody(e.target.value)}/></p>
            <p><input type = "submit" value="update" /></p>
        </form>
       
    )
}