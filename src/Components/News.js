// import PropTypes from 'prop-types'
import React, { useEffect, useState} from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
  // static propTypes = {}
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const updateNews = async ()=> {
    try {
      props.setProgress(10);

      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0c91aed5a5c5416589b78cc8a30a2497&page=${page}&pageSize=${props.pageSize}`
      setLoading(true)
      const data = await fetch(url);
      props.setProgress(30);
      const parsedData = await data.json();
      props.setProgress(50);
      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      setLoading(false)
      props.setProgress(100)
    }
    catch (e) {
      console.log("something is not working");
    }
  }
  
  useEffect(() => {
    document.title = `${Capitalize(props.category)} - NewsMonkey`

    updateNews()
  }, [])


  // const handleNextClick = async () => {
  //   setPage(page+1);
  //   updateNews()
  // }
  // const handlePrevClick = async () => {
  //   setPage(page - 1 );
  //   updateNews()
  // }
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const fetchMoreData = async() => {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2947849a6e884b84bf5d73bc32c90a8f&page=${page + 1}&pageSize=${props.pageSize}`
      
      setPage(page+1);
      const data = await fetch(url);
      const parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      setLoading(false)
    }
    catch (e) {
      console.log("something is not working");
    }

  };

  News.defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
    key: "general"
  }

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    keys: PropTypes.string
  }



    return (
      <div className='container my-3'>
        <h2 className="text-center" style={{marginTop:"80px", marginBottom:"20px"}}>NewsMonkey - Top Headlines {Capitalize(props.category)}</h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className='row' >
          
          {articles.map((element,index) => {
              return <div className="col-md-4"  key = {index}>
                <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.hindustantimes.com/tech/img/2022/06/20/1600x900/FVdeKMzaAAAjeci_1655696710410_1655696737084.jpeg"} newsUrl={element.url} author={element.author} date={element.publishedAt} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
      </div>
    )
}

export default News