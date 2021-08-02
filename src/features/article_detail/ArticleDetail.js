import ContentShow from "@/compoent_d/ContentShow/ContentShow";


export default function ArticleDetail(props){

  
    let objectId=props.location.state.objectId
    return(
        <ContentShow id={objectId} />
    )
}