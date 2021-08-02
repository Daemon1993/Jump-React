import ContentShow from "@/compoent_d/ContentShow/ContentShow";


export default function ArticleDetail(props){

    console.log(props)
    let objectId=props.match.params.objectId
    return(
        <ContentShow id={objectId} />
    )
}