import React, { Component } from 'react'

export class NewsItems extends Component {

    render() {
        // const title=this.props.title;
        // const description=this.props.description
        const {title, description, imageUrl, newsUrl, author, date}=this.props;

        return (
            <div className='my-3'>
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                        <p className="card-text my-1"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItems