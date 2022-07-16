import React, { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { useForm } from "react-hook-form";
import '../css/comments.css';
import formatDate from '../js/plugins';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import $ from 'jquery';
import { url } from '../shared_data/Url';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingCmp';
import {postComment, updateComment, deleteComment} from '../Redux/Actions';
import { createImageFromInitials, getRandomColor } from '../js/ProfileImgGenerator';

export default function CommentCmp (props) {

    const comments = useSelector(state => state.comments);
    const auth = useSelector(state => state.auth);
    const filteredComments = comments.comments.filter(item => item.product_id === props.productId);
    const dispatch = useDispatch();


    /* $$$$$$$$$$$$$$$$$$$$ BEGIN POST COMMENT $$$$$$$$$$$$$$$$$$$$*/
    // Handling form state
    const { register, handleSubmit, formState: { errors }  } = useForm({mode: "all"});

    const HandlePostComment = (data, e) =>{
        dispatch(postComment(props.productId, data.comment));
        e.target.reset();
    };
    /* $$$$$$$$$$$$$$$$$$$$ END POST COMMENT $$$$$$$$$$$$$$$$$$$$*/

    /* $$$$$$$$$$$$$$$$$$$$ BEGIN EDIT COMMENT $$$$$$$$$$$$$$$$$$$$*/
    // Edit button clicked or not if yes the editMode state will take the id of the comment
    const[editMode, setEditMode] = useState("");

    // Check if the edit comment form fields has changed or not
    useEffect(() => {
        $("#edit-comment-form :input").on("change", function() {
            $("#edit-comment-form").data("changed",true);
        });
    });

    //if there is a change in the form, send the updated comment values to the server otherwise DON'T bother him 
    const handleUpdateComment = (commentId, e) =>{
        let data = {comment: e.target[0].value};
        if ($("#edit-comment-form").data("changed")) {
            dispatch(updateComment(commentId, data));
            setEditMode("");
        }else
        console.log("Nothing was edited in the form fields, I'm not gonna bother the server");
        setEditMode("");
    }
    /* $$$$$$$$$$$$$$$$$$$$ END EDIT COMMENT $$$$$$$$$$$$$$$$$$$$*/

    /* $$$$$$$$$$$$$$$$$$$$ BEGIN DELETE COMMENT $$$$$$$$$$$$$$$$$$$$*/
    const handleDeleteComment = (commentId) =>{
        confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className='custom-ui'>
						<h3>Are you sure?</h3>
						<p className="text-danger">You want to delete this comment?</p>
						<button onClick={onClose}>No, Cancel</button>
						<button className="text-danger"
							onClick={() => {
                                dispatch(deleteComment(commentId));
								onClose();
							}}
						>
							Yes, Delete!
						</button>
					</div>
				);
			}
		});
    }
    /* $$$$$$$$$$$$$$$$$$$$ END DELETE COMMENT $$$$$$$$$$$$$$$$$$$$*/

    /* $$$$$$$$$$$$$$$$$$$$ BEGIN RENDER COMMENTS $$$$$$$$$$$$$$$$$$$$*/
    const renderComments = filteredComments.map((item, index) =>{
        return(
            <div style={{minWidth:"100%"}}
                className={index % 2 === 0 ? "comment mt-4 text-justify float-left" : 
                            "comment mt-4 text-justify float-left bg-transparent"
                        }
                key={item._id} 
            >
                <div className="row mb-3">
                    <div className="col-12 col-md-8 col-sm-12 d-flex justify-content-md-start justify-content-center">
                        <img
                            src={item.user.avatar !== undefined && item.user.avatar.includes('http') ? item.user.avatar
                                : item.user.avatar !== undefined ? url + item.user.avatar
                                : createImageFromInitials(500, `${item.user.firstname} ${item.user.lastname}`, getRandomColor
                                ())
                            }
                            className="rounded-circle" width="50" height="50"
                            alt={item.user.firstname}
                        />
                        <h5 className="text-capitalize"> {item.user.firstname} {item.user.lastname} </h5>
                    </div>
                    
                    <div className="col-12 col-md-4 col-sm-12 d-flex justify-content-md-end justify-content-center">
                        <small className={index % 2 === 0 ? "text-light" : "text-dark"}> {formatDate(item.createdAt, '-')} </small>
                    </div>
                </div>
                <hr/>
                
                    {
                        editMode === item._id ?
                            <Form id="edit-comment-form" className="col" onSubmit={(e) => handleUpdateComment(item._id, e)}>
                                <FormGroup className="mx-n5 pr-2">
                                    <textarea rows={4} cols={33} autoFocus name="updatedComment" id="updatedComment" defaultValue={item.comment} className="form-control" />
                                </FormGroup>
                                <FormGroup className="d-flex justify-content-end mb-0 mr-n3">
                                    <div className="btn-group">
                                        <button type="submit" className="btn btn-success btn-xs" title="Done">
                                            <span className="fa fa-check-circle-o"></span>
                                        </button>
                                        <button onClick={() => setEditMode("")} type="button" className="btn btn-danger btn-xs" title="Cancel">
                                            <span className="fa fa-window-close"></span>
                                        </button>
                                    </div>   
                                </FormGroup> 
                            </Form>
                        :
                        <>
                            <div className="row">
                                <p> {item.comment} </p>
                            </div>
                            <div className="d-flex justify-content-end">
                                {
                                    auth.user.username === item.user.username ?
                                        <div className="btn-group">
                                            <button onClick={() => setEditMode(item._id)} type="button" className="btn btn-primary btn-xs" title="Edit">
                                                <span className="fa fa-pencil"></span>
                                            </button>
                                            <button onClick={() => handleDeleteComment(item._id)} type="button" className="btn btn-danger btn-xs" title="Delete">
                                                <span className="fa fa-trash"></span>
                                            </button>
                                        </div>
                                    :
                                        null
                                }
                            </div>
                        </>
                    }
                </div>
        )
    });
    /* $$$$$$$$$$$$$$$$$$$$ END RENDER COMMENTS $$$$$$$$$$$$$$$$$$$$*/

    if (comments.loading){
        return<Loading />
    }else if(comments.errMsg){
        return <h5 className="text-danger">{comments.errMsg}</h5>
    }else
    return (
        <div id="comment-form-and-comments">
            {/* $$$$$$$$$$$$$$$$$$$$ BEGIN COMMENT FORM $$$$$$$$$$$$$$$$$$$$*/}
            <div className="row">
                <div className="col-12">
                    <Form onSubmit={handleSubmit(HandlePostComment)}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="comment" className="comment-label">
                                        Comments <span className="badge badge-dark">{filteredComments.length}</span> 
                                    </Label>
                                    <textarea rows={6} cols={33} name="comment" placeholder="Wtite a comment" className={errors.comment ? "form-control is-invalid" : " form-control is-valid"}
                                        {...register("comment", 
                                            {  
                                                required: "Required field",
                                                minLength:{
                                                value: 3,
                                                message: "Comment should have at least 3 caracters"
                                                },
                                                maxLength:{
                                                value: 150,
                                                message: "Comment should have at most 150 caracters"
                                                }
                                            })
                                        }         
                                    /> 
                                    {errors.comment && (
                                        <div className="invalid-feedback">{errors.comment.message}</div>
                                    )}      
                                </FormGroup>
                                <FormGroup className="d-flex justify-content-end">
                                    <Button type="submit" value="Submit Comment" className="btn btn-success" 
                                        disabled={errors.comment || !auth.isAuthenticated ? true : false}>
                                        <i className="fa fa-paper-plane" aria-hidden="true"></i> Submit Comment
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            {/* $$$$$$$$$$$$$$$$$$$$ END COMMENT FORM $$$$$$$$$$$$$$$$$$$$*/}
            <hr />
            <br />
            {/* $$$$$$$$$$$$$$$$$$$$ BEGIN RENDER COMMENTS $$$$$$$$$$$$$$$$$$$$*/}
            
                {
                    filteredComments.length > 0 ?
                        <div className="row comment-container mx-1 mx-md-0">
                            <div className="col-12 p-1 p-md-5">
                                {renderComments}
                            </div>
                        </div>
                    :
                        <h6 className="text-center">There is no comment yet, be the first</h6>
                }
            
            {/* $$$$$$$$$$$$$$$$$$$$ END RENDER COMMENTS $$$$$$$$$$$$$$$$$$$$*/}
        </div>
    );
};