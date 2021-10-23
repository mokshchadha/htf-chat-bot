import { useRouter } from "next/router"

export default function  Room ({room}){
    const router = useRouter();
    const id = router.query.id
    return <div>{"This is the room " + id}</div>
}

// export async  function getStaticProps({params}){   //this will return  the props to the function 
//     return {props:{room:"hello g hello"}} 
// }

// export async function getStaticPaths(){}

export async function getServerSideProps(){
    return {props:{room:"hello g hello"}} 
}