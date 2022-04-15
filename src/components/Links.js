import React, { useEffect,useState } from 'react'
import LinkForm from './LinkForm';
import { db } from '../enviroment/firebaseconfig'
import { toast } from 'react-toastify';

const Link = () => {

    const [links,setLinks] = useState([])
    const [currendId,setCurrendId] = useState("")

    const notifyS = () => toast.success('hecho', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const notifyE = () => toast.error('hecho', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    useEffect(() => {
        getLinks();
    },[])

    const getLinks = async () => {
        db.collection('links').orderBy("name", "desc").onSnapshot(querySnapshot => {
            const docs = []
            querySnapshot.forEach(doc => {
                docs.push({...doc.data(),id:doc.id})
            });
            setLinks(docs)
            }
        );
    }

    const addTask = async (linkObject) => {
        if(currendId === ""){
            await db.collection('links').doc().set(linkObject).then(res => {
                notifyS()
                console.log(links)
            }).catch(err => {
                console.log(err)
            })   
        }else{
            db.collection('links').doc(currendId).update(linkObject).then(res => {
                notifyS()
                setCurrendId('')
            })
        }
    }

    const deleteLink = async  id => {
        if(window.confirm('Are you sure? ')){
            await db.collection('links').doc(id).delete().then(res => {
                notifyE()
                console.log('eliminado')
            })
        }
    }

    const editLink = id => {
        console.log(id)
    }

    return <div>
        <div className="col-md-4 p-2">
            <LinkForm {...{addTask,currendId,links}} />
        </div>
        <div className="col-md-8 p-2">
            {links.map((link) => (
                <div className="card mb-1" key={link.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h4>{link.name}</h4>
                            <div>
                            <i className="material-icons text-danger" onClick={() => deleteLink(link.id)}>close</i>
                            <i className="material-icons text-warning" onClick={() => setCurrendId(link.id)}>edit</i>
                            </div>
                        </div>
                        <p>{link.description}</p>
                        <a href={link.url}>GO</a>
                    </div>
                </div>
            ))}  
        </div>
    </div>
}

export default  Link;
