import React from 'react'

class PostItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            post_id: this.props.post.id,
            body: '',
            dropdown: false,
            showComments: false
        }
        this.createComment=this.createComment.bind(this)
        this.fetchAllComments=this.fetchAllComments.bind(this)
        this.openCreateComment = this.openCreateComment.bind(this)
        this.openDropdown = this.openDropdown.bind(this)
        this.closeDropdown = this.closeDropdown.bind(this)
        this.renderDropdown = this.renderDropdown.bind(this)
        this.renderViewComments = this.renderViewComments.bind(this)
    }

    // updateField(field) {
    //     return e => this.setState({
    //         [field]: e.target.value
    //     })
    // }

    openCreateComment() {
        if (document.getElementsByClassName("create-message").length < 1) {
            // <form action="/action_page.php" method="get" id="form1">
            //     <label for="fname">First name:</label>
            //     <input type="text" id="fname" name="fname"/>
            //         <label for="lname">Last name:</label>
            //         <input type="text" id="lname" name="lname"/>
            // </form>

            // <button type="submit" form="form1" value="Submit">Submit</button>
                
            // <div className="">
            //     <form className="create-comment-form" action="" onSubmit={this.createComment()}>
            //         <input type="text" id="create-comment-input" className="create-message" placeholder="Add a comment"/>

            //     </form>
            //     <button form="create-comment-form" type="submit" value="Submit">Submit</button>
            // </div>



            let createCommentdiv = document.createElement("div")
            let createCommentForm = document.createElement("form")
            let submitCommentButton = document.createElement("button")
            let createCommentpic = document.createElement("img")
            createCommentpic.setAttribute("class", "comment-pic")
            submitCommentButton.setAttribute("type", "submit")
            submitCommentButton.innerHTML = "Submit";
            createCommentForm.onsubmit = (e) => this.createComment()
            createCommentForm.setAttribute("class", "create-comment-form")
            let createCommentInput = document.createElement("input")
            createCommentInput.setAttribute("type", "text");
            createCommentInput.setAttribute("id", "create-comment-input");
            createCommentInput.setAttribute("class", "create-message")
            createCommentInput.placeholder = "Add a comment..."
            createCommentForm.appendChild(createCommentpic)
            createCommentForm.appendChild(createCommentInput)
            createCommentForm.appendChild(submitCommentButton)
            document.getElementsByClassName("post-item")[0].append(createCommentForm)
            this.setState({showComments: true})
            this.fetchAllComments()
        } else {
            this.setState({showComments: false})
            document.getElementsByClassName("create-comment-form")[0].remove()
        }
        console.log(document.getElementsByClassName("create-message"))
    }

    createComment() {
        let comment = {
            body: document.getElementById("create-comment-input").value,
            post_id: this.props.post.id
        }
        this.props.createComment(comment)
    }

    fetchAllComments() {
        this.props.fetchAllComments(this.props.post.id)
    }

    openDropdown() {
        this.setState({dropdown: true})
    }

    closeDropdown() {
        this.setState({dropdown: false})
    }

    renderDropdown() {
        if (this.state.dropdown === true) {
            return (
                <div id="post-dropdown-content">
                    <div id="edit-button"><i class="far fa-edit"></i> Edit Post</div>
                    <div id="delete-button" onClick={() => this.props.deletePost(this.props.post.id)}><i class="far fa-trash-alt"></i> Delete Post</div>
                </div>
            )
        } else {
            return (
                <div id="three-dot-dropdown"></div>
            )
        }
    }

    renderViewComments() {
        if (this.state.showComments) {
            return (
                <div>
                    {this.props.comments.map(comment => {
                    if (comment.postId === this.props.post.id) {
                        return (
                            <div className="comment-list" key={comment.id}>
                                <div className="comment-pic"></div>
                                <div className="comment-body">{comment.body}</div>
                            </div>
                        )
                    } else {
                        return (
                            <div>null</div>
                        )
                    }
                })}
                </div>
                )
        } else {
            return null;
        }
    }


    render() {
        let that = this;
        window.onclick = function(e) {
            if (!e.target.matches("#post-dropdown-content")) {
                that.closeDropdown();
            }
        }
        return (
            <div className="post-item">
                <div className="post-item-container">

                    
                    <div id="self-post"></div>
                    <div id="post-item-header-text">
                        <div id="post-item-name-dropdown">
                            <div id="post-item-name">Albert Chen</div>
                            <button id="three-dot-dropdown" onClick={this.openDropdown}>
                                {this.renderDropdown()}
                                {/* <div id="post-dropdown-content">
                                    <div id="delete-button" onClick={() => this.props.deletePost(this.props.post.id)}>Delete Post</div>
                                    <div>HELLO</div>
                                </div> */}
                            </button>
                        </div>

                        <div id="post2-headline">Software Engineer</div>
                        <div id="post2-time">1m</div>
                    </div>
                </div>
                <div className="post2-body-text">
                    {this.props.post.body}
                    {this.props.post.photoFile}
                </div>
                <div className="post-likes-comments" onClick={this.openCreateComment}>
                    <div className="post-likes">0 Likes </div> 
                    {/* <h4 onClick={this.openCreateComment}> */}
                    <div className="post-comments">0 comments</div>
                    
                    {/* </h4> */}
                </div>
                <div className="post-reacts">
                    <div className="like"><i className="far fa-thumbs-up"></i> Like </div>
                    <div className="comment" onClick={this.openCreateComment}><i className="far fa-comment-alt"></i> Comment </div>
                    <div className="share"><i className="far fa-share-square"></i> Share </div>
                </div>
                {this.renderViewComments()}
            </div>
        )
    }
}

export default PostItem