// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
export class News extends Component {
  // static propTypes = {}
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title= `${this.Capitalize(this.props.category)} - NewsMonkey`
  }

  async updateNews(pageNo){
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0c91aed5a5c5416589b78cc8a30a2497&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      const data = await fetch(url);
      const parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        totalArticles: parsedData.totaldataults,
        loading:false
      });
    }
    catch (e) {
      console.log("something is not working");
    }

  }

  async componentDidMount() {
    this.updateNews()
  }

  handleNextClick = async () => {
    this.setState({page: this.state.page+1});
    this.updateNews()
  }
  handlePrevClick = async () => {
    this.setState({page: this.state.page-1});
    this.updateNews()
  }
  Capitalize=(str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

  static defaultProps={
    country:"in",
    pageSize: 6,
    category:"general",
    key: "general"
  }

  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    keys: PropTypes.string
  }


  render() {
    
    return (
      <div className='container my-3'>
        <h2 className="text-center">NewsMonkey - Top Headlines {this.Capitalize(this.props.category)}</h2>
        {this.state.loading && <Spinner/>}
        <div className='row' >
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.hindustantimes.com/tech/img/2022/06/20/1600x900/FVdeKMzaAAAjeci_1655696710410_1655696737084.jpeg"} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevClick} className="btn btn-dark mx-1">&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles /this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark mx-1">Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News