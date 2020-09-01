import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem; 
    }
`;

const NewsList = ({ category }) => {
    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(
            `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=e23f34fef0304f239ead33f83d62e2f1`
        );
    }, [category]);
    /*
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);  // API 요청이 대기 중인지 판별

    useEffect(() => {
        //async 사용하는 함수(fetchData) 따로 선언 ( useEffect에 async 사용불가)
        const fetchData = async () => {
            setLoading(true);
            try{
                const query = category === 'all' ? '' : `&category=${category}`;
                const response = await axios.get(
                    `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=e23f34fef0304f239ead33f83d62e2f1`
                );
                setArticles(response.data.articles);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [category]);
    // 대기 중일 때
    if (loading) { 
        return <NewsListBlock>대기 중...</NewsListBlock>
    }
    // 아직 articles 값(API)이 설정되지 않았을 때
    if (!articles) {
        return null;
    }
    */
    if (loading) {
        return <NewsListBlock>대기중...</NewsListBlock>;
    }

    if (!response) {
        return null;
    }

    if (error) {
        return <NewsListBlock>에러 발생</NewsListBlock>;
    }

    const { articles } = response.data;

    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
};

export default NewsList;