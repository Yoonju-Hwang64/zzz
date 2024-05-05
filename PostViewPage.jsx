import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Page.module.css'
import style from '../ui/Button.module.css'
import CommentList from '../list/CommentList'
import TextInput from '../ui/TextInput'
import Button from '../ui/Button'
import data from '../../data.json'
import {db} from '../../firebase'
import Year from "react-live-clock";
import Month from "react-live-clock";

const Calendar = () => {
  return <div></div>;
};

function PostViewPage(props){
   const postId = useParams().id;
   const nav =useNavigate();
    
   const[post, setPost] = useState({
    id:'',
    title:'',
    content: '',
    comments: []
    })

    useEffect(function(){
        db.collection('post').doc(postId).get().then(function(doc){
            setPost( doc.data())
        })
    }, [])


    // const post = data.find(function(item){
    //     return item.id == postId
    // })

    const [comment, setComment] = useState('')

    return (
        <div className={styles.Page_Wrapper}>
            <div className={styles.Page_Container}>
                <h1 className={styles.blog_title}>{post.title}</h1>
                <div className={styles.date}>
                  <p className={styles.page_date}>2023.05.05. 금요일</p>
                  <span className="material-symbols-rounded" id={styles.share_icon}>share</span>
                </div>
                <p className={styles.blog_content}><span className={styles.blog_content_text}>{post.content}</span></p>
        <div className={styles.Page_Comments}>
        <CommentList comments = {post.comments}></CommentList>
        
        <TextInput height = {40} value = {comment} onChange = {function(e){ setComment(e.target.value)}}></TextInput>
        <Button 
            className={styles.Button}
            title="Back"
                    onClick={function(){
                       nav('/')
                    }} />
        <Button 
            className={styles.Button}
            title="Delete"
            
                    onClick={function(){
                        if (window.confirm("글을 삭제하시겠습니까?")) {

                        alert("삭제되었습니다.");
                        db.collection('post').doc(postId).delete().then(function(){ nav('/')})
                  
                      } else {
                  
                      }
                       
                    }} />

        <Button 
          className={style.Button2}
          title="Send"
            onClick={function(){
                let timestamp = new Date().getTime().toString();
                let tempComments = post.comments
                tempComments.push({
                id: (postId + '_' + timestamp),
                content: comment
                })

                
            }}/>
            </div>
            
                </div>
            </div>
                )       
            }

                

export default PostViewPage